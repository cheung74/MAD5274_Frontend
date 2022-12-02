import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { Colors } from "../utils/Colors";

const CustomTextInput = ({
  value,
  onChangeText,
  placeholder,
  textContentType,
  style,
}) => {
  return (
    <View style={style}>
      <TextInput
        autoCapitalize="none"
        {...{ value, onChangeText, placeholder, textContentType }}
        style={styles.input}
      />
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1.2,
    borderColor: Colors.dark,
    padding: 16,
    borderRadius: 16,
    backgroundColor: "white",
  },
});
