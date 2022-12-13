import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Screens } from "../navigation/ScreenNames";
import { clearLocalUserData, getLocalUserData } from "../services/asyncStorage";
import { getUserFoundItem } from "../services/post";

export function useProfile() {
  const navigation = useNavigation();
  const [user, setUser] = React.useState(null);
  const [count, setCount] = React.useState(0);
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

  React.useEffect(() => {
    const getCount = async (id) => {
      const result = await getUserFoundItem(id);

      if (result) {
        setCount(result);
      }
    };
    if (user) {
      //dummy id :638c17a20ac22875e8323788
      // getCount("638c17a20ac22875e8323788");
      getCount(user._id);
    }
  }, [user]);

  return {
    handleLogout,
    user,
    count,
  };
}
