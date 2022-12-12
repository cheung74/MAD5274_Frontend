import { StyleSheet, Text, TextInput, View, Keyboard } from "react-native";
import React from "react";
import { Colors } from "../utils/Colors";
import { Font } from "../utils/Fonts";

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
        keyboardType={
          textContentType === "telephoneNumber" ? "number-pad" : "default"
        }
        {...{ value, onChangeText, placeholder, textContentType }}
        style={styles.input}
        onSubmitEditing={Keyboard.dismiss}
        secureTextEntry={textContentType === "password"}
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
    fontFamily: Font.GilroyBold,
  },
});
