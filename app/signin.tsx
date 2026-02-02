import { router } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LabeledTextInput } from "../components/LabeledTextInput";

export default function SignInScreen() {
    return (
        <SafeAreaView style={{ padding: 36 }}>
            <Pressable onPress={() => router.back()} style={{ flexDirection: "row", alignItems: "center", gap: 16, marginBottom: 64 }}>
                <Image style={{ width: 18, height: 18 }} source={require("@/assets/icons/icons_back.png")} />
                <Text style={{ fontFamily: "Montserrat", fontSize: 26, color: "#4F63AC", fontWeight: "600" }}>Sign in</Text>
            </Pressable>

            <View style={{ gap: 20 }}>

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

                <Pressable style={{
                    paddingVertical: 12,
                    paddingHorizontal: 18,
                    borderRadius: 8,
                    backgroundColor: "#4F63AC",
                    height: 60,
                    justifyContent: "center",
                    width: "100%",
                    alignItems: "center",
                }} onPress={() => router.push("/home")}><Text style={{ color: "white", fontFamily: "Montserrat", fontSize: 16, fontWeight: "700" }}>Sign In</Text></Pressable>

                <View style={{ flexDirection: "row", alignItems: "center", gap: 12, marginTop: 16, justifyContent: "center" }}>
                    <View style={{ backgroundColor: "black", height: 1, width: 90 }}></View>
                    <Text style={{ fontFamily: "Montserrat", fontSize: 14, color: "#4F63AC", fontWeight: "600" }}>Or sign in with</Text>
                    <View style={{ backgroundColor: "black", height: 1, width: 90 }}></View>
                </View>

                <Pressable style={{ backgroundColor: "#3F4A59", height: 60, width: 140, borderRadius: 14, justifyContent: "center", alignItems: "center", marginTop: 16, alignSelf: "center" }}>
                    <Image source={require("@/assets/icons/google_login_icon.png")}></Image>
                </Pressable>

                <View style={{ alignItems: "center", marginTop: 24 }}>
                    <Text style={{ fontFamily: "Montserrat", fontSize: 14, color: "#4F63AC", fontWeight: "600" }}>Don't have an account? <Text style={{ fontWeight: "700", fontFamily: "Montserrat", fontSize: 14 }} onPress={() => router.push("/signup")}>Sign up</Text></Text>
                </View>
            </View>
        </SafeAreaView>
    );
}