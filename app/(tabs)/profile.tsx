import Titlebar from "@/components/Titlebar";
import { Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
    return (
        <SafeAreaView edges={["top", "left", "right"]} style={{ backgroundColor: "#FFFFFF", flex: 1 }}>
            <View style={{ padding: 24, height: "100%" }}>
                <Titlebar Title="Profile" logout_shown={true} />
                <View style={{ padding: 12 }}>
                    <Text style={{ fontSize: 20, fontWeight: "700", color: "#303030", paddingVertical: 12 }}>Elina Hovakimyan</Text>
                    <Text style={{ fontSize: 14, fontWeight: "400", color: "#808080", paddingBottom: 24 }}>hello@gmail.com</Text>

                    <View style={{height: 80, shadowColor: "#000",justifyContent:"center",  shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 2, backgroundColor: "white", padding: 16, marginBottom: 32 }}>
                        <Text style={{ fontSize: 18, fontWeight: "700", color: "#4F63AC" }}>My Listings</Text>
                        <Text style={{ fontSize: 12, fontWeight: "400", color: "#808080", paddingTop: 5 }}>Already have 10 listings</Text>
                        <Image style={{ position: "absolute",right:10, top: 28 ,height: 24, width: 24 }} source={require("@/assets/icons/view_more.png")}></Image>
                    </View>
                    <View style={{height: 80, shadowColor: "#000",justifyContent:"center",  shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 2, backgroundColor: "white", padding: 16, marginBottom: 16 }}>
                        <Text style={{ fontSize: 18, fontWeight: "700", color: "#4F63AC" }}>Settings</Text>
                        <Text style={{ fontSize: 12, fontWeight: "400", color: "#808080" }}>Account, FAQ, Contact</Text>
                        <Image></Image>
                        <Image style={{ position: "absolute",right:10, top: 28 ,height: 24, width: 24 }} source={require("@/assets/icons/view_more.png")}></Image>
                    </View>
                </View>

                <Pressable style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 60, backgroundColor: "#FFFFFF" }}>
                    <Text>Add a new listing</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

export default Profile;