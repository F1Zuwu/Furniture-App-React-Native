import * as Font from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { View } from "react-native";

import TabNavbar from "@/components/UI/TabNavbar";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    const prepare = async () => {
      try {
        await Font.loadAsync({
          DM_Sans: require("@/assets/fonts/DM_Sans/DMSans.ttf"),
          Montserrat: require("@/assets/fonts/Montserrat/Monst.ttf"),
          Nunito: require("@/assets/fonts/Nunito_Sans/Nunito.ttf"),
          Gelasio: require("@/assets/fonts/Gelasio/Gelasio.ttf"),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        await SplashScreen.hideAsync();
      }
    };
    prepare();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <View style={{ flex: 1 }}>
        <Stack
          screenOptions={{
            headerShown: false,
            animation: "none",
            gestureEnabled: false,
          }}
        >
          <Stack.Screen name="home" />
          <Stack.Screen name="favorites" />
          <Stack.Screen name="profile" />
        </Stack>
      </View>

      <TabNavbar />
    </View>
  );
}
