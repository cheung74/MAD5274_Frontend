import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Screens } from "./ScreenNames";
import Home from "../view/Home";
import Profile from "../view/Profile";
import Chatroom from "../view/Chatroom";
import { Colors } from "../utils/Colors";
import GoogleAds from "../components/GoogleAds";
import ProfileStack from "./Profile";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={Screens.homeStack} component={Home} />
      <Stack.Screen name={Screens.chatroom} component={Chatroom} />
    </Stack.Navigator>
  );
};
const HomeDrawer = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: Colors.dark,
      }}
    >
      <Drawer.Screen
        name={Screens.home}
        component={HomeStack}
        options={{
          title: "Home",
        }}
      />
      <Drawer.Screen
        name={Screens.profileStack}
        component={ProfileStack}
        options={{
          title: "Profile",
        }}
      />
    </Drawer.Navigator>
  );
};

export default HomeDrawer;
