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
import { useProfile } from "../hooks/userProfile";
import { useNavigation } from "@react-navigation/native";
import { Screens } from "../navigation/ScreenNames";

const Profile = () => {
  const { handleLogout, user } = useProfile();
  const navigation = useNavigation();
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
          <TouchableOpacity
            style={styles.edit}
            onPress={() => {
              navigation.navigate(Screens.editProfile);
            }}
          >
            <AntDesign name="edit" size={25} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.subCon}>
          <Text style={styles.text}>{user?.fullName}</Text>
          <Text style={styles.text2}>{user?.email}</Text>
        </View>
        <View style={{ paddingHorizontal: 16 }}>
          <TouchableOpacity style={styles.btnCon}>
            <Image
              source={require("../assets/images/badge.png")}
              style={styles.icon}
            />
            <Text style={styles.text3}>Badges</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnCon}>
            <Image
              source={require("../assets/images/call.png")}
              style={styles.icon}
            />
            <Text style={styles.text3}>Contact Us</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnCon}>
            <Image
              source={require("../assets/images/privacy-policy.png")}
              style={styles.icon}
            />
            <Text style={styles.text3}>Privacy Policy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnCon}>
            <Image
              source={require("../assets/images/terms-and-conditions.png")}
              style={styles.icon}
            />
            <Text style={styles.text3}>Terms And Condition</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnCon} onPress={handleLogout}>
            <Image
              source={require("../assets/images/logout.png")}
              style={styles.icon}
            />
            <Text style={styles.text3}>Logout</Text>
          </TouchableOpacity>
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
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
  },
  icon: {
    width: 20,
    height: 20,
  },
});
