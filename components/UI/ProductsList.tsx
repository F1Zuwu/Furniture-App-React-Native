import { router } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";

const ProductsList = () => {
    return (
            <View style={{ display: "flex", flexWrap: "wrap", flexDirection: "row", gap: 16 }}>
                <Pressable style={{ gap: 10, width: "47%" }}>
                    <Image style={{ width: "100%", borderRadius: 14}} source={require("@/assets/content/template_products/Lamp.png")}></Image>
                    <Text style={{ fontSize: 14 }}>Black Simple Lamp</Text>
                    <Text style={{ fontSize: 14 }}>$12.00</Text>
                </Pressable>
                <Pressable onPress={() => router.push("/product")} style={{ gap: 10, width: "47%" }}>
                    <Image style={{ width: "100%", borderRadius: 14}} source={require("@/assets/content/template_products/stand.png")}></Image>
                    <Text style={{ fontSize: 14 }}>Black Simple Lamp</Text>
                    <Text style={{ fontSize: 14 }}>$12.00</Text>
                </Pressable>
                <Pressable style={{ gap: 10, width: "47%" }}>
                    <Image style={{ width: "100%", borderRadius: 14}} source={require("@/assets/content/template_products/Lamp.png")}></Image>
                    <Text style={{ fontSize: 14 }}>Black Simple Lamp</Text>
                    <Text style={{ fontSize: 14 }}>$12.00</Text>
                </Pressable>
                <Pressable style={{ gap: 10, width: "47%" }}>
                    <Image style={{ width: "100%", borderRadius: 14}} source={require("@/assets/content/template_products/stand.png")}></Image>
                    <Text style={{ fontSize: 14 }}>Black Simple Lamp</Text>
                    <Text style={{ fontSize: 14 }}>$12.00</Text>
                </Pressable>
                <Pressable style={{ gap: 10, width: "47%" }}>
                    <Image style={{ width: "100%", borderRadius: 14}} source={require("@/assets/content/template_products/Lamp.png")}></Image>
                    <Text style={{ fontSize: 14 }}>Black Simple Lamp</Text>
                    <Text style={{ fontSize: 14 }}>$12.00</Text>
                </Pressable>
                <Pressable style={{ gap: 10, width: "47%" }}>
                    <Image style={{ width: "100%", borderRadius: 14}} source={require("@/assets/content/template_products/stand.png")}></Image>
                    <Text style={{ fontSize: 14 }}>Black Simple Lamp</Text>
                    <Text style={{ fontSize: 14 }}>$12.00</Text>
                </Pressable>
                <Pressable style={{ gap: 10, width: "47%" }}>
                    <Image style={{ width: "100%", borderRadius: 14}} source={require("@/assets/content/template_products/Lamp.png")}></Image>
                    <Text style={{ fontSize: 14 }}>Black Simple Lamp</Text>
                    <Text style={{ fontSize: 14 }}>$12.00</Text>
                </Pressable>
            </View>
    )
}

export default ProductsList;