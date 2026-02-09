import { LabeledPriceInput } from "@/components/LabeledPriceInput";
import { LabeledTextArea } from "@/components/LabeledTextArea";
import { LabeledTextInput } from "@/components/LabeledTextInput";
import Titlebar from "@/components/Titlebar";
import Dropdown from "@/components/UI/Dropdown";
import { router } from "expo-router";
import { useState } from "react";
import {
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

const CreateListing = () => {
    const insets = useSafeAreaInsets();
    const [category, setCategory] = useState<"lamp" | "chair" | "table" | "sofa" | "bed">();
    const [price, setPrice] = useState<string>("");
    const [description, setDescription] = useState<string>("");

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
                            <Pressable style={{ width: 90, height: 90, borderColor: "#909191", borderWidth: 1, borderRadius: 8, borderStyle: "dashed", justifyContent: "center", alignItems: "center" }}>
                                <View style={{ backgroundColor: "#DADADA", width: 30, height: 30, borderRadius: 150, justifyContent: "center", alignItems: "center" }}>
                                    <Text style={{ fontSize: 24, fontWeight: "500", marginTop: -3, color: "white" }}>+</Text>
                                </View>
                            </Pressable>

                            <View style={{ position: "relative" }}>
                                <Image style={{ width: 90, height: 90, borderRadius: 8 }} source={require("@/assets/content/template_products/Lamp.png")}></Image>
                                <Pressable style={{ position: "absolute", top: -10, right: -10 }}><Image style={{ width: 32, height: 32 }} source={require("@/assets/icons/close.png")}></Image></Pressable>
                            </View>
                        </View>

                        <View style={{ marginTop: 24, gap: 24 }}>
                            <LabeledTextInput label="Title" placeholder="Listing Title" />

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
                            }}>
                                <Text style={{ color: "white", fontFamily: "Montserrat", fontWeight: "600", fontSize: 16, textAlign: "center", paddingVertical: 12 }}>Submit</Text>
                            </Pressable>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    )
}

export default CreateListing;