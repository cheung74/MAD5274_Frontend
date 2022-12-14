import { StyleSheet, Text, View, ImageBackground, Image } from "react-native";
import React from "react";
import CloseBtn from "./CloseBtn";

const FullScreenAds = ({ shown, onPress }) => {
  const [shownBtn, setShownBtn] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setShownBtn(true);
    }, 2000);
  }, []);

  if (!shown) {
    return;
  }

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <Image
        resizeMode={"stretch"}
        source={require("../../assets/images/ads-full-size.png")}
        style={styles.image}
      />
      <CloseBtn
        {...{ onPress }}
        style={{
          position: "absolute",
          top: 50,
          zIndex: 5,
          right: 40,
          backgroundColor: "white",
          borderRadius: 25,
          display: shownBtn ? "flex" : "none",
        }}
      />
    </View>
  );
};

export default FullScreenAds;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
});
