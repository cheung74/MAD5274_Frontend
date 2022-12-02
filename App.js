import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";

import Root from "./src/navigation/Root";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Root />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
