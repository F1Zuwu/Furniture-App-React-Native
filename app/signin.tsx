import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function SignInScreen() {
  return (
    <View>
      <Text>Sign in</Text>
      <Text>This is another screen.</Text>

      <Pressable onPress={() => router.back()}>
        <Text>Back</Text>
      </Pressable>
    </View>
  );
}