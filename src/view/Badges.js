import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Share,
} from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { useProfile } from "../hooks/userProfile";
import { Font } from "../utils/Fonts";
import CustomButton from "../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { Screens } from "../navigation/ScreenNames";

const Badges = () => {
  const { user, count } = useProfile();
  const navigation = useNavigation();

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: `I have found ${count || 0} items!!!!`,
      });
      if (result.action === Share.shareAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <Text style={styles.text}>Your Badge</Text>
      {count === 0 ? (
        <Image
          source={require("../assets/images/badge-1.png")}
          style={[styles.badge, { tintColor: "grey" }]}
        />
      ) : count === 1 ? (
        <Image
          style={styles.badge}
          source={require("../assets/images/badge-1.png")}
        />
      ) : count === 2 ? (
        <Image
          style={styles.badge}
          source={require("../assets/images/badge-3.png")}
        />
      ) : (
        <Image
          style={styles.badge}
          source={require("../assets/images/badge-4.png")}
        />
      )}
      <Text style={styles.text}>{`You have found ${
        count || 0
      } items, keep it up!`}</Text>

      <View />
      <View style={{ flexDirection: "row" }}>
        <CustomButton title={"Back"} onPress={() => navigation.goBack()} />
        <View style={{ width: 40 }} />
        <CustomButton title={"Share"} onPress={handleShare} />
      </View>
    </SafeAreaView>
  );
};

export default Badges;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: Font.GilroyBold,
    fontSize: 16,
    paddingVertical: 16,
  },
  badge: {
    width: 100,
    height: 100,
  },
});
