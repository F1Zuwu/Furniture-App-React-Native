import { router } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";
import { homeStyles } from "../styles/home";

export default function Index() {

  return (
    <View
      style={homeStyles.container}
    >
      <Image
        style={homeStyles.image}
        source={require("@/assets/content/splash_image.png")}
      />

      <Text style={homeStyles.headline}>You'll Find</Text>
      <Text style={homeStyles.headlineStrong}>All you need</Text>
      <Text style={homeStyles.headline}>Here!</Text>

      <Pressable
        style={homeStyles.SignupButton}
        onPress={() => router.push("/signup")}
      >
        <Text style={homeStyles.SignupButtonText}>Sign up</Text>
      </Pressable>

      <Pressable
        style={homeStyles.SignInButton}
        onPress={() => router.push("/signin")}
      >
        <Text style={homeStyles.SignInButtonText}>Sign in</Text>
      </Pressable>

    </View>
  );
}
