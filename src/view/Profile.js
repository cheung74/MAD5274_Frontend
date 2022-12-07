import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { Font, FontSize } from "../utils/Fonts";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "../utils/Colors";

const Profile = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar />
      <View style={styles.container}>
        <Text style={styles.header}>Lost and found</Text>
        <View style={styles.subCon}>
          <Image
            style={styles.icon1}
            defaultSource={require("../assets/images/icon_template.png")}
          />
          <TouchableOpacity style={styles.edit}>
            <AntDesign name="edit" size={25} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.subCon}>
          <Text style={styles.text}>ABC EDG</Text>
          <Text style={styles.text2}>123@gmail.com</Text>
        </View>
        <View style={{ paddingHorizontal: 16 }}>
          <View style={styles.btnCon}>
            <Image
              source={require("../assets/images/badge.png")}
              style={styles.icon}
            />
            <Text style={styles.text3}>Badges</Text>
          </View>
          <View style={styles.btnCon}>
            <Image
              source={require("../assets/images/call.png")}
              style={styles.icon}
            />
            <Text style={styles.text3}>Contact Us</Text>
          </View>
          <View style={styles.btnCon}>
            <Image
              source={require("../assets/images/privacy-policy.png")}
              style={styles.icon}
            />
            <Text style={styles.text3}>Privacy Policy</Text>
          </View>
          <View style={styles.btnCon}>
            <Image
              source={require("../assets/images/terms-and-conditions.png")}
              style={styles.icon}
            />
            <Text style={styles.text3}>Terms And Condition</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  header: {
    fontFamily: Font.GilroyExtraBold,
    fontSize: FontSize.h2,
    paddingBottom: 8,
  },
  subCon: {
    alignItems: "center",
    paddingVertical: 8,
  },
  icon1: {
    width: 200,
    height: 200,
    borderWidth: 1,
    borderRadius: 100,
    borderColor: Colors.dark,
  },
  edit: {
    top: -35,
    left: 50,
    borderWidth: 2,
    borderRadius: 20,
    padding: 4,
    backgroundColor: "black",
  },
  text: {
    fontFamily: Font.GilroySemiBold,
    fontSize: FontSize.h3,
    paddingBottom: 16,
  },
  text2: {
    fontFamily: Font.GilroyMedium,
    fontSize: FontSize.p,
    paddingBottom: 16,
    color: Colors.dark,
  },
  text3: {
    fontFamily: Font.GilroyRegular,
    fontSize: FontSize.p,
    color: Colors.dark,
    paddingHorizontal: 16,
  },
  btnCon: {
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 20,
    height: 20,
  },
});
