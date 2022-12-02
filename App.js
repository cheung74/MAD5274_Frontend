import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import Root from "./src/navigation/Root";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Font } from "./src/utils/Fonts";

export default function App() {
  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
  }, []);

  const [fontsLoaded] = useFonts({
    [Font.GilroyBold]: require("./src/assets/fonts/Gilroy-Bold.ttf"),
    [Font.GilroyExtraBold]: require("./src/assets/fonts/Gilroy-ExtraBold.ttf"),
    [Font.GilroyLight]: require("./src/assets/fonts/Gilroy-Light.ttf"),
    [Font.GilroyMedium]: require("./src/assets/fonts/Gilroy-Medium.ttf"),
    [Font.GilroyRegular]: require("./src/assets/fonts/Gilroy-Regular.ttf"),
    [Font.GilroySemiBold]: require("./src/assets/fonts/Gilroy-SemiBold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) setTimeout(SplashScreen.hideAsync, 100);
  }, [fontsLoaded]);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Root />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
