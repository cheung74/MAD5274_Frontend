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

const CustomButton = ({ onPress, loading, title }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text
        style={{
          fontSize: 16,
          fontWeight: "bold",
        }}
      >
        {title}
      </Text>

      <Lottie
        style={{
          width: 40,
          display: loading ? "flex" : "none",
          alignSelf: "baseline",
        }}
        source={require("../assets/animations/loadingDots.json")}
        autoPlay
        loop
      />
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 16,
    backgroundColor: Colors.quaternary,
    borderRadius: 16,
    marginVertical: 16,
    borderColor: Colors.dark,
    borderWidth: 1.2,
  },
});
