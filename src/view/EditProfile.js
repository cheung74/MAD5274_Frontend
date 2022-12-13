import {
  Image,
  SafeAreaView,
  ScrollView,
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
import * as ImagePicker from "expo-image-picker";
import CustomButton from "../components/CustomButton";
import { uploadImage } from "../services/firebaseStorage";
import CustomTextInput from "../components/CustomTextInput";
import { updateUser } from "../services/user";
import { storeLocalUserData } from "../services/asyncStorage";
import { useNavigation } from "@react-navigation/native";

const EditProfile = () => {
  const { handleLogout, user } = useProfile();
  const [image, setImage] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [mobile, setMobile] = React.useState("");
  const [fullName, setFullName] = React.useState("");
  const navigation = useNavigation();
  React.useEffect(() => {
    if (user && user.icon) {
      setImage(user.icon);
    }
    if (user && user.email) {
      setEmail(user.email);
    }
    if (user && user.mobile) {
      setMobile(user.mobile);
    }
    if (user && user.fullName) {
      setFullName(user.fullName);
    }
  }, [user]);

  const importPhoto = async () => {
    let res = {};
    await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 0.2,
    })
      .then((assets) => (res = assets))
      .catch((e) => console.log(e));

    if (!res.canceled) {
      if (!res.assets) {
        Alert.alert(
          "This photo can't be used, please report to the Administrator."
        );
        return;
      }
      setImage(res.assets[0].uri);
    }
  };

  const onSubmit = async () => {
    setLoading(true);
    let url = "";
    if (image) {
      url = await uploadImage(image);
    }
    const _user = {
      ...user,
      icon: url,
      email: email,
      fullName: fullName,
      mobile: mobile,
    };
    const _result = await updateUser(_user);
    if (_result.status === "success" && _result.user) {
      const _res = await storeLocalUserData(_result.user);
      setLoading(false);
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView>
        <StatusBar />
        <View style={styles.container}>
          <Text style={styles.header}>Edit Profile</Text>
          <View style={styles.subCon}>
            <Image
              style={styles.icon1}
              source={{ uri: image }}
              defaultSource={require("../assets/images/icon_template.png")}
            />
            <TouchableOpacity style={styles.edit} onPress={importPhoto}>
              <AntDesign name="camera" size={25} color="white" />
            </TouchableOpacity>
          </View>

          <CustomTextInput
            style={{ marginVertical: 8 }}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            textContentType="emailAddress"
          />
          <CustomTextInput
            style={{ marginVertical: 8 }}
            value={fullName}
            onChangeText={setFullName}
            placeholder="Enter your full name"
          />
          <CustomTextInput
            style={{ marginVertical: 8 }}
            value={mobile}
            onChangeText={setMobile}
            textContentType="telephoneNumber"
            placeholder="Enter your phone number"
          />
        </View>
        <View style={{ marginTop: "auto" }} />

        <View
          style={[
            styles.subCon,
            { flexDirection: "row", justifyContent: "center" },
          ]}
        >
          <CustomButton title="Back" onPress={() => navigation.goBack()} />
          <View style={{ width: 50 }} />
          <CustomButton title="Submit" onPress={onSubmit} loading={loading} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfile;

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
});
