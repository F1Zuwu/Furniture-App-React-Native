import { router, useLocalSearchParams } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Product = () => {
    const { id } = useLocalSearchParams<{ id: string }>();

    return (
        <View style={{ flex: 1, backgroundColor: "#FFFFFF"}}>
            <View>
              <Image style={{maxHeight: 441, width: "100%" }} source={require("@/assets/content/template_products/stand_big.png")}></Image>
              <View style={{position: "absolute", bottom: 32, width: "100%", justifyContent: "center", alignItems: "center", gap:10, flexDirection: "row"}}>
                <View style={{height: 4, width: 30, backgroundColor: "#303030", borderRadius: 4}}></View>
                <View style={{height: 4, width: 15, backgroundColor: "#F0F0F0", borderRadius: 4}}></View>
                <View style={{height: 4, width: 15, backgroundColor: "#F0F0F0", borderRadius: 4}}></View>
              </View>
            </View>

            <SafeAreaView style={{position:"absolute", top:0, left: 14}}>
                <Pressable onPress={() => router.back()} style={{width: 40, height: 40, backgroundColor: "#FFFFFF", borderRadius: 6, justifyContent: "center", alignItems: "center", margin: 16, boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.15)"}}>
                    <Image style={{ width: 20, height: 20 }} source={require("@/assets/icons/back.png")}></Image>
                </Pressable>
            </SafeAreaView>

            <View style={{borderRadius: 16,width: "100%", height: 20 , backgroundColor: "#FFFFFF", transform: [{ translateY: -6 }]}}></View>
            <View style={{padding: 24}}>
                <Text style={{fontSize: 24, marginBottom: 18, fontFamily: "Gelasio", fontWeight: "500"}}>Minimal Stand</Text>
                <Text style={{fontSize: 12, marginBottom: 8, fontFamily: "Nunito", fontWeight: "300", opacity: 0.6}}>Product id: {id}</Text>
                <Text style={{fontSize: 30, marginBottom: 24, fontFamily: "Nunito", fontWeight: "700"}}>$ 50</Text>
                <Text style={{fontSize: 14, fontFamily: "Nunito", fontWeight: "300"}}>Minimal Stand is made of by natural wood. The design that is very simple and minimal. This is truly one of the best furnitures in any family for now. With 3 different colors, you can easily select the best match for your home. </Text>
            </View>

            <View style={{flexDirection: "row", alignItems:"center", paddingHorizontal: 25, position: "absolute", bottom: 30, width: "100%", justifyContent: "space-between"}}>
                <Pressable style={{borderRadius: 8, backgroundColor: "#F0F0F0", width: 60, height: 60, justifyContent: "center", alignItems: "center", marginRight: 16}}>
                    <Image style={{width: 28, height: 28}} source={require("@/assets/icons/TabNavbar/favorites.png")}></Image>
                </Pressable>
                <Pressable style={{backgroundColor: "#4F63AC", paddingVertical: 18, borderRadius: 8, height: 60, width: "80%", justifyContent: "center", alignItems: "center"}}>
                    <Text style={{color: "#FFFFFF", fontFamily: "Nunito", fontWeight: "700"}}>Contact seller</Text>
                </Pressable>
            </View>

        </View>
    )
}
export default Product;