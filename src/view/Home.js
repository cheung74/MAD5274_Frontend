import React, { useEffect, useState, useRef } from "react";
import MapView, { Marker } from "react-native-maps";
import {
  StyleSheet,
  Dimensions,
  Animated,
  View,
  TouchableOpacity,
} from "react-native";
import * as Location from "expo-location";
import ItemCard from "../components/ItemCard";
import InputModal from "../components/InputModal";
import CustomCallout from "../components/CustomCallout";
import { getPost } from "../services/post";
import { useNavigation } from "@react-navigation/native";
import { getLocalUserData } from "../services/asyncStorage";
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.005;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function Home() {
  const mapRef = useRef();
  const scrollViewRef = useRef();
  const navigation = useNavigation();
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
  const [user, setUser] = useState();

  const getLatestPost = async () => setPosts(await getPost())

  const getUser = async () => { await getLocalUserData().then(user => setUser(user)) }

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

      getLatestPost()
      getUser()
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
    // place animate to region at the end
    markersRef[e._id].showCallout()
    scrollViewRef.current.scrollTo({ x: index * 220 + 100, y: 0, animated: true })
    mapRef.current.animateToRegion(
      { latitude: e.latitude, longitude: e.longitude },
      500
    );
  };

  const MarkerWithRef = (post) => {
    const myRef = ref => {
      let newRef = markersRef
      let key = post._id
      newRef[key] = ref
      setMarkersRef(newRef)
    }
    return (
      <Marker
        coordinate={{
          latitude: post.latitude,
          longitude: post.longitude,
        }}
        key={post._id}
        ref={myRef}
      >
        <CustomCallout post={post} navigation={navigation} user={user} getLatestPost={getLatestPost} />
      </Marker>
    )
  }

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
        {posts && posts.map(MarkerWithRef)}
      </MapView>
      <TouchableOpacity
        onPress={getLatestPost}
        style={styles.refreshBtnBg}
      >
        <Ionicons name="refresh" size={40} color="black" style={styles.refreshBtn} />
      </TouchableOpacity>
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
          getPost={getLatestPost}
          user={user}
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
  refreshBtnBg: {
    alignSelf: "center", 
    position: 'absolute', 
    top: 40, 
    backgroundColor: 'white', 
    borderRadius: '50%',
    shadowColor: 'gray',
    shadowRadius: 5,
    shadowOpacity: 0.5, height: 50, width: 50
  },
  refreshBtn: {
    flex: 1, 
    alignSelf: 'center', 
    justify: 'center', 
    paddingTop: 2
  }
});
