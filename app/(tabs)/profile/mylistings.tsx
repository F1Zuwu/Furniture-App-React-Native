import Titlebar from "@/components/Titlebar";
import { router } from "expo-router";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MyListings = () => {
    return (
        <SafeAreaView edges={["top", "left", "right"]} style={{ backgroundColor: "#FFFFFF", flex: 1 }}>
            <ScrollView style={{padding: 24}}>
                <Titlebar Title="My Listings" back_shown={true} onBackPress={() => router.back()} />

                <View style={{padding: 12}}></View>

                <View style={{flexDirection: "row", borderBottomColor: "#E0E0E0", borderBottomWidth: 1, paddingVertical: 16, gap: 16, position: "relative"}}>
                    <Image style={{width: 100, height: 100, borderRadius: 10}} source={require("@/assets/content/template_products/stand.png")}/>
                    <View>
                        <Text style={{fontSize: 14, fontWeight: "600", color: "#606060"}}>Coffee Table</Text>
                        <Text style={{fontSize: 16, fontWeight: "700"}}>$ 50.00</Text>
                    </View>
                    <Pressable style={{width: 24, height:24, position: "absolute", right: 4, top: 18}}>
                        <Image style={{width: 24, height: 24}} source={require("@/assets/icons/trash.png")}></Image>
                    </Pressable>
                </View>
                
            </ScrollView>
        </SafeAreaView>
    );
};

export default MyListings;