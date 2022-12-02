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
  const [rePassword, serRePassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [isLogin, setIsLogin] = React.useState(true);
  const [fullName, setFullName] = React.useState("");
  const [mobile, setMobile] = React.useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setLoading(false);
  };

  const handleRegister = () => {
    setIsLogin(!isLogin);
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
            {!isLogin ? (
              <>
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
                  onPress={handleRegister}
                  loading={loading}
                />
              </>
            ) : (
              <>
                <CustomTextInput
                  style={{ marginVertical: 8 }}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter your email"
                  textContentType="emailAddress"
                />
                <CustomTextInput
                  style={{ marginVertical: 8 }}
                  value={fullName}
                  onChangeText={setFullName}
                  placeholder="Enter your full name"
                />
                <CustomTextInput
                  style={{ marginVertical: 8 }}
                  value={mobile}
                  onChangeText={setMobile}
                  textContentType="telephoneNumber"
                  placeholder="Enter your phone number"
                />
                <CustomTextInput
                  style={{ marginVertical: 8 }}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Enter your password"
                  textContentType="password"
                />
                <CustomTextInput
                  style={{ marginVertical: 8 }}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Re enter password"
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
                  title="Back"
                  onPress={handleRegister}
                  loading={loading}
                />
              </>
            )}
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
