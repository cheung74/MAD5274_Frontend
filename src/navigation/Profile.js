import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Badges from "../view/Badges";
import EditProfile from "../view/EditProfile";
import Profile from "../view/Profile";
import { Screens } from "./ScreenNames";

const Stack = createNativeStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={Screens.profile} component={Profile} />
      <Stack.Screen name={Screens.editProfile} component={EditProfile} />
      <Stack.Screen name={Screens.badges} component={Badges} />
    </Stack.Navigator>
  );
};

export default ProfileStack;
