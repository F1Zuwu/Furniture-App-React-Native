import { router } from "expo-router";
import { useState } from "react";
import { Image, Pressable, View } from "react-native";

const TabNavbar = () => {

    const [activeTab, setActiveTab] = useState("home");

    return (
        <View style={{ width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "center", height: 75, gap: 65, backgroundColor: "#FFFFFF", shadowColor: "#000", shadowOffset: { width: 0, height: -2 }, shadowOpacity: 0.1, shadowRadius: 4, }}>
            {activeTab === "home" ? (
                <Image style={{ width: 24, height: 24 }} source={require("@/assets/icons/TabNavbar/home.png")}></Image>
            ) : (
                <Pressable onPress={() => { setActiveTab("home"); router.replace("/home"); }}>
                    <Image style={{ width: 20, height: 20 }} source={require("@/assets/icons/TabNavbar/home_inactive.png")}></Image>
                </Pressable>
            )}
            {activeTab === "favorites" ? (
                <Image style={{ width: 24, height: 24 }} source={require("@/assets/icons/TabNavbar/favorites.png")}></Image>
            ) : (
                <Pressable onPress={() => { setActiveTab("favorites"); router.replace("/favorites"); }}>
                    <Image style={{ width: 24, height: 24 }} source={require("@/assets/icons/TabNavbar/favorites_inactive.png")}></Image>
                </Pressable>
            )}
            {activeTab === "profile" ? (
                <Image style={{ width: 20, height: 20 }} source={require("@/assets/icons/TabNavbar/user.png")}></Image>
            ) : (
                <Pressable onPress={() => { setActiveTab("profile"); router.replace("/profile"); }}>
                    <Image style={{ width: 24, height: 24 }} source={require("@/assets/icons/TabNavbar/user_inactive.png")}></Image>
                </Pressable>
            )}
        </View>
    );
};
export default TabNavbar;