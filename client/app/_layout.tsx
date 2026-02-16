import * as Font from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";

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
    <>
      <StatusBar style="dark" />
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />

        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        <Stack.Screen name="product/[id]" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
