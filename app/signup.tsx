import { router } from "expo-router";
import { Image, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignUpScreen() {
    return (
        <SafeAreaView style={{ padding: 20 }}>
            <Pressable onPress={() => router.back()} style={{ flexDirection: "row", alignItems: "center", gap:8, marginBottom: 20 }}>
                <Image style={{width: 18, height: 18}} source={require("../assets/icons/icons_back.png")} />
                <Text style={{ fontFamily: "Montserrat", fontSize: 26, color: "#4F63AC", fontWeight: "600" }}>Sign up</Text>
            </Pressable>
            
            <View style={{gap: 9}}>
              <Text>Name</Text>
              <TextInput placeholder="John Doe" placeholderTextColor="#C5C5C5" style={{height: 60, borderWidth:1, borderColor: "#8D9BB5", borderRadius: 14, paddingHorizontal: 17, paddingVertical: 21, fontSize: 14, fontFamily: "Montserrat", fontWeight: "500"}}></TextInput>
            </View>
        </SafeAreaView>
    );
}
