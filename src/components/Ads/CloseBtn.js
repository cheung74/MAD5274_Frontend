import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

const CloseBtn = ({ onPress, style }) => {
  return (
    <TouchableOpacity {...{ onPress, style }}>
      <AntDesign name="closecircleo" size={36} color="black" />
    </TouchableOpacity>
  );
};

export default CloseBtn;
