import { createDrawerNavigator } from "@react-navigation/drawer";
import { Screens } from "./ScreenNames";
import Home from "../view/Home";
import Profile from "../view/Profile";

const Drawer = createDrawerNavigator();

const HomeDrawer = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen name={Screens.home} component={Home} />
      <Drawer.Screen name={Screens.profile} component={Profile} />
    </Drawer.Navigator>
  );
};

export default HomeDrawer;
