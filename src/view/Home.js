import React, { useEffect, useState, useRef } from "react";
import MapView, { Marker, Callout } from "react-native-maps";
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Animated,
  View,
} from "react-native";
import * as Location from "expo-location";
import ItemCard from "../components/ItemCard";
import InputModal from "../components/InputModal";
import { getPost } from "../services/post";

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.005;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function Home() {
  const mapRef = useRef();
  const [onClickLocation, setOnClickLocation] = useState({});
  // const [currentLocation, setCurrentLocation] = useState({
  //   latitude: 43.78591,
  //   longitude: -79.28986,
  // }); //Bonis Ave
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 43.77335,
    longitude: -79.336,
  }); //Lambton
  const [modalVisible, setModalVisible] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync().catch(
        (e) => console.log(e)
      );
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      // enable simulator location, Features > Location > Custom Location
      await Location.getCurrentPositionAsync({})
        .then((location) => setCurrentLocation(location.coords))
        .catch((e) => console.log(e));
      setPosts(await getPost());
    })();
  }, []);

  const onMapPress = (coords) => {
    const { action, coordinate } = coords;
    if (action && action === "marker-press") {
      return;
    } else {
      setModalVisible(true);
      setOnClickLocation({
        latitude: coordinate.latitude,
        longitude: coordinate.longitude,
      });
    }
  };

  const onCardPress = (e) => {
    mapRef.current.animateToRegion(
      { latitude: e.latitude, longitude: e.longitude },
      350
    );
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        ref={mapRef}
        onPress={(e) => onMapPress(e.nativeEvent)}
        region={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
      >
        {posts &&
          posts.map((post) => (
            <Marker
              coordinate={{
                latitude: post.latitude,
                longitude: post.longitude,
              }}
              key={post._id}
            >
              <Callout tooltip={true}>
                <ItemCard item={{ ...post }} onCardPress={() => {}} />
              </Callout>
            </Marker>
          ))}
      </MapView>
      <Animated.ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
        contentContainerStyle={styles.endPadding}
      >
        {posts &&
          posts.map((post) => (
            <ItemCard
              item={{ ...post }}
              onCardPress={onCardPress}
              key={post._id}
            />
          ))}
      </Animated.ScrollView>
      {modalVisible && (
        <InputModal
          modalVisible={modalVisible}
          latlng={onClickLocation}
          onClose={() => setModalVisible(false)}
          getPost={async () => setPosts(await getPost())}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  marker: {
    width: 50,
    height: 50,
  },
  scrollView: {
    position: "absolute",
    bottom: 10,
    paddingHorizontal: 100,
    padding: 10,
  },
  endPadding: {
    paddingRight: 180,
  },
});
