import { StyleSheet, Text, View, ImageBackground } from "react-native";
import React from "react";
import CloseBtn from "./CloseBtn";

const FullScreenAds = ({ shown, onPress }) => {
  const [shownBtn, setShownBtn] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setShownBtn(true);
    }, 1000);
  }, []);

  if (!shown) {
    return;
  }

  return (
    <ImageBackground
      source={require("../../assets/images/ads-full-size.png")}
      style={styles.image}
    >
      <CloseBtn
        {...{ onPress }}
        style={{
          position: "absolute",
          top: 50,
          right: 40,
          backgroundColor: "white",
          borderRadius: 25,
          display: shownBtn ? "flex" : "none",
        }}
      />
    </ImageBackground>
  );
};

export default FullScreenAds;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    position: "relative",
  },
});
