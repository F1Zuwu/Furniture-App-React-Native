import { Image, Pressable, Text, View } from "react-native";

interface TitlebarProps {
    Title: string;
    search_shown?: boolean;
    logout_shown?: boolean;
    back_shown?: boolean;
    onBackPress?: () => void;
}

const Titlebar = ({ Title, search_shown, logout_shown, back_shown, onBackPress }: TitlebarProps) => {
    return (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
            {back_shown ? (
                <Pressable
                    onPress={onBackPress}
                    style={{ position: "absolute", left: 0, height: 24, width: 24 }}
                    hitSlop={10}
                >
                    <Image
                        style={{ height: 24, width: 24 }}
                        source={require("@/assets/icons/back.png")}
                    />
                </Pressable>
            ) : (
                search_shown && (
                    <Image
                        style={{ position: "absolute", left: 0, height: 24, width: 24 }}
                        source={require("@/assets/icons/search_icon.png")}
                    ></Image>
                )
            )}

            <Text style={{ fontSize: 16, fontWeight: "700", fontFamily: "Montserrat", width: "100%", textAlign: "center"}}>{Title}</Text>

            {logout_shown && (
                <Image style={{position: "absolute", right: 0, height:24, width:25}} source={require("@/assets/icons/logout.png")}></Image>
            )}
        </View>
    );
}

export default Titlebar;