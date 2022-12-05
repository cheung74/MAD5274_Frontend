import {
  BackHandler,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Lottie from "lottie-react-native";
import { Colors } from "../utils/Colors";
import { Font } from "../utils/Fonts";

const CustomButton = ({ onPress, loading, title, style }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        style,
        {
          backgroundColor:
            title === "Register"
              ? Colors.primary
              : title === "Back"
              ? Colors.secondary
              : Colors.quaternary,
        },
      ]}
    >
      <Lottie
        style={{
          width: 30,
          display: loading ? "flex" : "none",
          alignSelf: "baseline",
        }}
        source={require("../assets/animations/loadingDots.json")}
        autoPlay
        loop
      />
      <Text
        style={{
          fontSize: 16,
          fontFamily: Font.GilroyBold,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: Colors.quaternary,
    borderRadius: 16,
    borderColor: Colors.dark,
    borderWidth: 1.2,
  },
});
