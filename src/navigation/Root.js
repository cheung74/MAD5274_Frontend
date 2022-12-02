import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Auth from "../view/Auth";
import Home from "../view/Home";
import { Screens } from "./ScreenNames";

const Stack = createNativeStackNavigator();

const Root = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={Screens.auth} component={Auth} />
      <Stack.Screen name={Screens.root} component={Home} />
    </Stack.Navigator>
  );
};

export default Root;
