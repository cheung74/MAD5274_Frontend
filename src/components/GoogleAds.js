import React from "react";
import { Dimensions, View, Image } from "react-native";

import FullScreenAds from "./Ads/FullScreenAds";

const height = Dimensions.get("screen").height;

const GoogleAds = ({ type }) => {
  const [shown, setShown] = React.useState(true);

  const AdsBanner = ({ shown }) => {
    return (
      <Image
        source={require("../assets/images/ads-banner.png")}
        style={{ width: "100%" }}
        resizeMode="contain"
      />
    );
  };

  const MidAdsBanner = ({ shown }) => {
    return (
      <Image
        source={require("../assets/images/ads-mid-banner.png")}
        style={{ width: "100%" }}
        resizeMode="contain"
      />
    );
  };

  const adsScreens = {
    full: <FullScreenAds {...{ shown, onPress: () => setShown(false) }} />,
    banner: <AdsBanner {...{ shown }} />,
    midBanner: <MidAdsBanner {...{ shown }} />,
  };

  return adsScreens[type] ? adsScreens[type] : null;
};

export default GoogleAds;
