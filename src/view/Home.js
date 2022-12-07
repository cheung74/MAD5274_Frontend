import React, { useEffect, useState, useRef } from "react";
import MapView, { Marker, Callout } from "react-native-maps";
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Animated,
  View,
  TouchableOpacity,
  Text
} from "react-native";
import * as Location from "expo-location";
import ItemCard from "../components/ItemCard";
import InputModal from "../components/InputModal";
import { getPost } from "../services/post";
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.005;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function Home() {
  const mapRef = useRef();
  const scrollViewRef = useRef();
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
  const [markersRef, setMarkersRef] = useState({})

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

  const onCardPress = (e, index) => {
    mapRef.current.animateToRegion(
      { latitude: e.latitude, longitude: e.longitude },
      350
    );
    for(const key in markersRef) {
      markersRef[key].hideCallout()
    }
    markersRef[e._id].showCallout()
    // console.log((index+1) * 220 + 100)
    scrollViewRef.current.scrollTo({x: index * 220 + 100, y: 0, animated: true})
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
              ref={ref=>{
                let newRef = markersRef
                let key = post._id
                newRef[key] = ref
                setMarkersRef(newRef)
              }}
            >
              <Callout tooltip={true}>
                <View>
                  <TouchableOpacity
                    // onPress={importPhoto}
                    variant="outline"
                    style={{ ...styles.btn }}
                  >
                    <View style={styles.rowAlign}>
                        <Text style={styles.text}>Create Chatroom</Text>
                        <Entypo name="chat" size={24} color="black" />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    // onPress={importPhoto}
                    variant="outline"
                    style={{ ...styles.btn }}
                  >
                    <View style={styles.rowAlign}>
                        <Text style={styles.text}>Item {post.type === 'Lost' ? "Found" : "Returned"}</Text>
                        {post.type === 'Lost' ?
                          <FontAwesome5 name="smile" size={24} color="black" /> :
                          <MaterialCommunityIcons name="handshake-outline" size={24} color="black" />
                        }
                    </View>
                  </TouchableOpacity>
                </View>
              </Callout>
            </Marker>
          ))}
      </MapView>
      <Animated.ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
        contentContainerStyle={styles.endPadding}
        ref={scrollViewRef}
      >
        {posts &&
          posts.map((post, index) => (
            <ItemCard
              item={{ ...post }}
              onCardPress={onCardPress}
              key={post._id}
              index={index}
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
  rowAlign: {
    flexDirection: "row",
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 5
  },
  btn: {
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 3,
    margin: 5
  },
  text: {
    padding: 8,
  },
});
