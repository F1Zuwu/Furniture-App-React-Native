import { LabeledPriceInput } from "@/components/LabeledPriceInput";
import { LabeledTextArea } from "@/components/LabeledTextArea";
import { LabeledTextInput } from "@/components/LabeledTextInput";
import Titlebar from "@/components/Titlebar";
import Dropdown from "@/components/UI/Dropdown";
import { createService, uploadImages } from "@/lib/api";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
    Alert,
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    Text,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

type PickedImage = {
    uri: string;
    name?: string;
    type?: string;
};

const CreateListing = () => {
    const insets = useSafeAreaInsets();
    const [category, setCategory] = useState<"lamp" | "chair" | "table" | "sofa" | "bed">();
    const [title, setTitle] = useState<string>("");
    const [price, setPrice] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [pickedImages, setPickedImages] = useState<PickedImage[]>([]);
    const [submitting, setSubmitting] = useState(false);

    const pickPhotos = async () => {
        const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (perm.status !== "granted") {
            Alert.alert("Permission needed", "Please allow photo library access to upload images.");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsMultipleSelection: true,
            quality: 0.85,
        });

        if (result.canceled) return;

        const next: PickedImage[] = (result.assets ?? []).map((a) => ({
            uri: a.uri,
            name: (a as any).fileName ?? a.uri.split("/").pop() ?? `image-${Date.now()}.jpg`,
            type: (a as any).mimeType ?? "image/jpeg",
        }));

        setPickedImages((prev) => {
            const dedup = new Map<string, PickedImage>();
            for (const img of [...prev, ...next]) dedup.set(img.uri, img);
            return Array.from(dedup.values()).slice(0, 10);
        });
    };

    const removePhoto = (uri: string) => {
        setPickedImages((prev) => prev.filter((p) => p.uri !== uri));
    };

    const onSubmit = async () => {
        if (submitting) return;

        const trimmedTitle = title.trim();
        const trimmedDesc = description.trim();
        const numericPrice = Number(price.replace(",", "."));

        if (!trimmedTitle) {
            Alert.alert("Missing title", "Please enter a title.");
            return;
        }
        if (!category) {
            Alert.alert("Missing category", "Please select a category.");
            return;
        }
        if (!Number.isFinite(numericPrice) || numericPrice <= 0) {
            Alert.alert("Invalid price", "Please enter a valid price.");
            return;
        }
        if (!trimmedDesc) {
            Alert.alert("Missing description", "Please enter a description.");
            return;
        }

        setSubmitting(true);
        try {
            const urls = pickedImages.length ? await uploadImages(pickedImages) : [];

            await createService({
                title: trimmedTitle,
                price: numericPrice,
                description: trimmedDesc,
                category,
                images: urls,
            });

            Alert.alert("Success", "Listing created.");
            router.back();
        } catch (e: any) {
            Alert.alert("Failed", e?.message ?? "Something went wrong");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <SafeAreaView edges={["top", "left", "right"]} style={{ backgroundColor: "#FFFFFF", flex: 1 }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                    <View style={{ padding: 24 }}>
                        <Titlebar Title="Create a new listing" back_shown={true} onBackPress={() => router.back()}></Titlebar>
                    </View>

                    <ScrollView
                        automaticallyAdjustKeyboardInsets
                        keyboardShouldPersistTaps="handled"
                        keyboardDismissMode="on-drag"
                        contentContainerStyle={{
                            paddingHorizontal: 26,
                            paddingTop: 19,
                            // Extra room so the last fields can be scrolled above the keyboard (and above your bottom tab bar)
                            paddingBottom: 48 + insets.bottom + 160,
                        }}
                    >
                        <Text style={{ color: "#4F63AC", fontFamily: "Montserrat", fontWeight: "500" }}>Upload photos</Text>

                        <View style={{ flexDirection: "row", gap: 12, marginTop: 12 }}>
                            <Pressable
                                onPress={pickPhotos}
                                style={{ width: 90, height: 90, borderColor: "#909191", borderWidth: 1, borderRadius: 8, borderStyle: "dashed", justifyContent: "center", alignItems: "center" }}
                            >
                                <View style={{ backgroundColor: "#DADADA", width: 30, height: 30, borderRadius: 150, justifyContent: "center", alignItems: "center" }}>
                                    <Text style={{ fontSize: 24, fontWeight: "500", marginTop: -3, color: "white" }}>+</Text>
                                </View>
                            </Pressable>

                            {pickedImages.map((img) => (
                                <View key={img.uri} style={{ position: "relative" }}>
                                    <Image style={{ width: 90, height: 90, borderRadius: 8 }} source={{ uri: img.uri }} />
                                    <Pressable onPress={() => removePhoto(img.uri)} style={{ position: "absolute", top: -10, right: -10 }}>
                                        <Image style={{ width: 32, height: 32 }} source={require("@/assets/icons/close.png")}></Image>
                                    </Pressable>
                                </View>
                            ))}
                        </View>

                        <View style={{ marginTop: 24, gap: 24 }}>
                            <LabeledTextInput
                                label="Title"
                                placeholder="Listing Title"
                                value={title}
                                onChangeText={setTitle}
                            />

                            <Dropdown
                                label="Category"
                                placeholder="Select the category"
                                items={[
                                    { label: "Lamp", value: "lamp" },
                                    { label: "Chair", value: "chair" },
                                    { label: "Table", value: "table" },
                                    { label: "Sofa", value: "sofa" },
                                    { label: "Bed", value: "bed" },
                                ]}
                                value={category}
                                onChange={setCategory}
                            />

                            <LabeledPriceInput
                                label="Price"
                                placeholder="0.00"
                                value={price}
                                onChangeText={setPrice}
                            />

                            <LabeledTextArea
                                label="Description"
                                placeholder="Describe your item..."
                                value={description}
                                onChangeText={setDescription}
                                minHeight={160}
                            />

                            <Pressable style={{
                                backgroundColor: "#4F63AC",
                                marginBottom: 32,
                                borderRadius: 8,
                                justifyContent: "center",
                                height: 60,
                                opacity: submitting ? 0.7 : 1,
                            }} onPress={onSubmit} disabled={submitting}>
                                <Text style={{ color: "white", fontFamily: "Montserrat", fontWeight: "600", fontSize: 16, textAlign: "center", paddingVertical: 12 }}>{submitting ? "Submitting..." : "Submit"}</Text>
                            </Pressable>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    )
}

export default CreateListing;