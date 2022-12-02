import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React from "react";
import { Colors } from "../utils/Colors";
import CustomTextInput from "../components/CustomTextInput";
import CustomButton from "../components/CustomButton";

const Auth = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setLoading(false);
  };

  return (
    <ImageBackground
      style={styles.image}
      source={require("../assets/images/auth_background_1.jpg")}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          style={{ flexGrow: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : null}
        >
          <View style={styles.container}>
            <View style={{ marginTop: "auto" }} />
            <CustomTextInput
              style={{ marginVertical: 8 }}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              textContentType="emailAddress"
            />
            <CustomTextInput
              style={{ marginVertical: 8 }}
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              textContentType="password"
            />

            <CustomButton
              style={{ marginVertical: 8 }}
              title="Submit"
              onPress={handleSubmit}
              loading={loading}
            />
            <CustomButton
              style={{ marginVertical: 8 }}
              title="Register"
              onPress={handleSubmit}
              loading={loading}
            />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Auth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  image: {
    flex: 1,
    resizeMode: "stretch",
  },
});
