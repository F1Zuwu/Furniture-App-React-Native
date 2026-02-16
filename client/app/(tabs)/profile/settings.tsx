import Titlebar from "@/components/Titlebar";
import { router } from "expo-router";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfileSettings = () => {
    return (
        <SafeAreaView edges={["top", "left", "right"]}>
            <View style={{ padding: 24 }}>
                <Titlebar Title="Settings" back_shown onBackPress={() => router.back()} />
            </View>
            <View style={{ paddingHorizontal: 20 }}>
                <View style={{ paddingTop: 32, flexDirection: "row", position: "relative" }}>
                    <Text style={{ fontSize: 16, color: "#909191", fontWeight: "600" }}>Personal Information</Text>
                    <Image style={{ position: "absolute", right: 0, top: 29, width: 24, height: 24 }} source={require("@/assets/icons/edit.png")} />
                </View>
                <View
                    style={{
                        height: 80,
                        shadowColor: "#000",
                        justifyContent: "center",
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.1,
                        shadowRadius: 2,
                        elevation: 2,
                        backgroundColor: "white",
                        padding: 16,
                        marginVertical: 15,
                        borderRadius: 6
                    }}
                >
                    <Text style={{ fontSize: 12, color: "#909191", fontWeight: "400", marginBottom: 5 }}>Name</Text>
                    <Text style={{ fontSize: 16, color: "#4F63AC", fontWeight: "600" }}>Bruno Pham</Text>
                </View>
                <View
                    style={{
                        height: 80,
                        shadowColor: "#000",
                        justifyContent: "center",
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.1,
                        shadowRadius: 2,
                        elevation: 2,
                        backgroundColor: "white",
                        padding: 16,
                        borderRadius: 6
                    }}
                >
                    <Text style={{ fontSize: 12, color: "#909191", fontWeight: "400", marginBottom: 5 }}>Email</Text>
                    <Text style={{ fontSize: 16, color: "#4F63AC", fontWeight: "600" }}>bruno203@gmail.com</Text>
                </View>
            </View>
            <View style={{paddingHorizontal: 20, marginTop:48, gap:10}}>
                <Text style={{ fontSize: 16, color: "#909191", fontWeight: "600" }}>Help Center</Text>
                <View style={{backgroundColor: "white", flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 15, paddingRight: 10, paddingLeft: 15, borderRadius: 4}}>
                    <Text style={{ fontSize: 16, fontWeight: "700", color: "#4F63AC"}}>FAQ</Text>
                    <Image style={{width: 24, height: 24}} source={require("@/assets/icons/view_more.png")}></Image>
                </View>
                <View style={{backgroundColor: "white", flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 16, paddingRight: 10, paddingLeft: 15, borderRadius: 4}}>
                    <Text style={{ fontSize: 16, fontWeight: "700", color: "#4F63AC"}}>Contact Us</Text>
                    <Image style={{width: 24, height: 24}} source={require("@/assets/icons/view_more.png")}></Image>
                </View>
                <View style={{backgroundColor: "white", flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 16, paddingRight: 10, paddingLeft: 15, borderRadius: 4}}>
                    <Text style={{ fontSize: 16, fontWeight: "700", color: "#4F63AC"}}>Privacy & Terms</Text>
                    <Image style={{width: 24, height: 24}} source={require("@/assets/icons/view_more.png")}></Image>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default ProfileSettings;
