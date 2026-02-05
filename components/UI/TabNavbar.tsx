import { router } from "expo-router";
import { Image, Pressable, View } from "react-native";

const TabNavbar = () => {
    return (
        <View style={{ width:"100%", flexDirection: "row", alignItems: "center",justifyContent:"center", height: 75, gap: 65, backgroundColor: "#FFFFFF", shadowColor: "#000", shadowOffset: { width: 0, height: -2 }, shadowOpacity: 0.1, shadowRadius: 4,}}>
            <Pressable onPress={() => router.replace("/home")}>
                <Image style={{width: 24, height: 24}} source={require("@/assets/icons/TabNavbar/home.png")}></Image>
            </Pressable>
            <Pressable onPress={() => router.replace("/favorites")}>
                <Image style={{width: 24, height: 24}} source={require("@/assets/icons/TabNavbar/favorites.png")}></Image>
            </Pressable>
            <Pressable onPress={() => router.replace("/profile")}>
                <Image style={{width: 24, height: 24}} source={require("@/assets/icons/TabNavbar/user.png")}></Image>
            </Pressable>
        </View>
    );
};
export default TabNavbar;