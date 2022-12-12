import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Screens } from "../navigation/ScreenNames";
import { clearLocalUserData, getLocalUserData } from "../services/asyncStorage";

export function useProfile() {
  const navigation = useNavigation();
  const [user, setUser] = React.useState(null);
  const handleLogout = async () => {
    const _res = await clearLocalUserData();
    if (_res) {
      navigation.navigate(Screens.auth);
    }
  };

  React.useEffect(() => {
    const getCurrentUser = async () => {
      const _user = await getLocalUserData();
      if (_user) {
        setUser(_user);
      }
    };
    getCurrentUser();
  }, []);

  return {
    handleLogout,
    user,
  };
}
