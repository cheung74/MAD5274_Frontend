import { View, Text } from "react-native";
import React from "react";
import GoogleAds from "../components/GoogleAds";
import { useNavigation } from "@react-navigation/native";
import { Screens } from "../navigation/ScreenNames";

const Ads = () => {
  const navigate = useNavigation();
  return (
    <GoogleAds
      type={"full"}
      onPress={() => {
        navigate.navigate(Screens.root);
      }}
    />
  );
};

export default Ads;
