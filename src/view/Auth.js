import { useNavigation } from "@react-navigation/native";
import { Video } from "expo-av";
import React from "react";
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";

import CustomButton from "../components/CustomButton";
import CustomTextInput from "../components/CustomTextInput";
import { useAuth } from "../hooks/useAuth";

const { height } = Dimensions.get("window");

const Auth = () => {
  const navigation = useNavigation();
  const video = React.useRef(null);
  const {
    email,
    setEmail,
    password,
    setPassword,
    mobile,
    setMobile,
    fullName,
    setFullName,
    loading,
    handleRegister,
    handleLogin,
    isLogin,
    setIsLogin,
  } = useAuth();

  const handleBack = () => {
    setEmail("");
    setPassword("");
    setIsLogin(!isLogin);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="light" />
      <Video
        shouldPlay
        ref={video}
        useNativeControls={false}
        source={require("../assets/videos/loginFootage.mp4")}
        style={styles.backgroundVideo}
        muted={true}
        resizeMode={"cover"}
        rate={1.0}
        controls={true}
        isLooping
        ignoreSilentSwitch={"obey"}
      />
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
                onPress={handleLogin}
                loading={loading}
              />
              <CustomButton
                style={{ marginVertical: 8 }}
                title="Register"
                onPress={handleBack}
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
              <CustomButton
                style={{ marginVertical: 8 }}
                title="Submit"
                onPress={handleRegister}
                loading={loading}
              />
              <CustomButton
                style={{ marginVertical: 8 }}
                title="Back"
                onPress={handleBack}
              />
            </>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
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
  backgroundVideo: {
    height: height,
    position: "absolute",
    top: 0,
    left: 0,
    alignItems: "stretch",
    bottom: 0,
    right: 0,
  },
});
