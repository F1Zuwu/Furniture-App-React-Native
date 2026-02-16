import { Image, Text, View } from "react-native";

const Tags = () => {
    return (
        <View>
            <View style={{flexDirection: "row", gap: 25, overflowX: "scroll"}}>
                <View>
                    <View style={{ padding: 12, backgroundColor: "#303030", width: 52, height: 52, borderRadius: 12, justifyContent: "center", alignItems: "center", marginBottom: 8, }}>
                        <Image style={{ width: 20, height: 20 }} source={require("@/assets/icons/star.png")}></Image>
                    </View>
                    <Text style={{textAlign: "center"}}>Popular</Text>
                </View>
                
                <View>
                    <View style={{ padding: 12, backgroundColor: "#F5F5F5", width: 52, height: 52, borderRadius: 12, justifyContent: "center", alignItems: "center", marginBottom: 8, }}>
                        <Image style={{ width: 15, height: 28 }} source={require("@/assets/icons/chair.png")}></Image>
                    </View>
                    <Text style={{textAlign: "center"}}>Chair</Text>
                </View>

                <View>
                    <View style={{ padding: 12, backgroundColor: "#F5F5F5", width: 52, height: 52, borderRadius: 12, justifyContent: "center", alignItems: "center", marginBottom: 8, }}>
                        <Image style={{ width: 20, height: 20 }} source={require("@/assets/icons/table.png")}></Image>
                    </View>
                    <Text style={{textAlign: "center"}}>Table</Text>
                </View>

                <View>
                    <View style={{ padding: 12, backgroundColor: "#F5F5F5", width: 52, height: 52, borderRadius: 12, justifyContent: "center", alignItems: "center", marginBottom: 8, }}>
                        <Image style={{ width: 28, height: 28 }} source={require("@/assets/icons/sofa.png")}></Image>
                    </View>
                    <Text style={{textAlign: "center"}}>Armchair</Text>
                </View>
                <View>
                    <View style={{ padding: 12, backgroundColor: "#F5F5F5", width: 52, height: 52, borderRadius: 12, justifyContent: "center", alignItems: "center", marginBottom: 8, }}>
                        <Image style={{ width: 20, height: 20 }} source={require("@/assets/icons/lamp.png")}></Image>
                    </View>
                    <Text style={{textAlign: "center"}}>Lamp</Text>
                </View>
            </View>
        </View>
    );
};

export default Tags;