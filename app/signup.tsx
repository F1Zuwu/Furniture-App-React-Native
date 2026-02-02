import { Checkbox } from "@/components/Checkbox";
import { router } from "expo-router";
import { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LabeledTextInput } from "../components/LabeledTextInput";

export default function SignUpScreen() {
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    return (
        <SafeAreaView style={{ padding: 36 }}>
            <Pressable onPress={() => router.back()} style={{ flexDirection: "row", alignItems: "center", gap: 16, marginBottom: 64 }}>
                <Image style={{ width: 18, height: 18 }} source={require("@/assets/icons/icons_back.png")} />
                <Text style={{ fontFamily: "Montserrat", fontSize: 26, color: "#4F63AC", fontWeight: "600" }}>Sign up</Text>
            </Pressable>

            <View style={{ gap: 20 }}>

                <LabeledTextInput
                    label="Name"
                    placeholder="John Doe"
                    autoCapitalize="words"
                    textContentType="name"
                />

                <LabeledTextInput
                    label="Email"
                    placeholder="example@gmail.com"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    autoCorrect={false}
                    textContentType="emailAddress"
                />

                <LabeledTextInput
                    label="Password"
                    placeholder="••••••••"
                    secureTextEntry
                    autoCapitalize="none"
                    autoCorrect={false}
                    textContentType="password"
                />

                <View style={{ flexDirection: "row", alignItems: "center", gap: 12, marginTop: 12 }}>
                    <Checkbox
                        checked={agreedToTerms}
                        onCheckedChange={setAgreedToTerms}
                    />
                    <Text style={{ fontFamily: "Montserrat", fontSize: 14, color: "#4F63AC", fontWeight: "500" }}>I agree with <Text style={{ fontWeight: "700", fontFamily: "Montserrat", fontSize: 14 }}>Terms</Text> and <Text style={{ fontWeight: "700", fontFamily: "Montserrat", fontSize: 14 }}>Conditions</Text></Text>
                </View>
                <Pressable style={{
                    paddingVertical: 12,
                    paddingHorizontal: 18,
                    borderRadius: 8,
                    backgroundColor: "#4F63AC",
                    height: 60,
                    justifyContent: "center",
                    width: "100%",
                    alignItems: "center",
                }}><Text style={{ color: "white", fontFamily: "Montserrat", fontSize: 16, fontWeight: "700" }}>Sign Up</Text></Pressable>
                <View style={{flexDirection: "row", alignItems: "center", gap: 12, marginTop: 16, justifyContent: "center" }}>
                    <View style={{ backgroundColor: "black", height:1, width:90  }}></View>
                    <Text style={{ fontFamily: "Montserrat", fontSize: 14, color: "#4F63AC", fontWeight: "600" }}>Or sign up with</Text>
                    <View style={{ backgroundColor: "black", height:1, width:90  }}></View>
                </View>

                <Pressable style={{backgroundColor: "#3F4A59", height: 60, width: 140, borderRadius: 14, justifyContent: "center", alignItems: "center", marginTop: 16, alignSelf: "center" }}>
                    <Image source={require("@/assets/icons/google_login_icon.png")}></Image>
                </Pressable>

                <View style={{alignItems:"center", marginTop: 24}}>
                    <Text style={{ fontFamily: "Montserrat", fontSize: 14, fontWeight: "600" }}>Already have an account? <Text style={{ fontWeight: "700", fontFamily: "Montserrat", fontSize: 14, color: "#4F63AC" }} onPress={() => router.push("/signin")}>Sign in</Text></Text>
                </View>
            </View>
        </SafeAreaView>
    );
}
