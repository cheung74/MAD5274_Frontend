import { useNavigation } from "@react-navigation/native";
import { Screens } from "../navigation/ScreenNames";
import { clearLocalUserData } from "../services/asyncStorage";

export function useProfile() {
  const navigation = useNavigation();

  const handleLogout = async () => {
    const _res = await clearLocalUserData();
    if (_res) {
      navigation.navigate(Screens.auth);
    }
  };

  return {
    handleLogout,
  };
}
