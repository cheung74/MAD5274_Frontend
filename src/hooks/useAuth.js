import { useNavigation } from "@react-navigation/native";
import React from "react";
import { storeLocalUserData } from "../services/asyncStorage";
import { createUser, login } from "../services/user";
import { Screens } from "../navigation/ScreenNames";
export function useAuth() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [mobile, setMobile] = React.useState("");
  const [fullName, setFullName] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [isLogin, setIsLogin] = React.useState(false);

  const navigation = useNavigation();

  const handleRegister = async () => {
    setLoading(true);
    const result = await createUser({
      email,
      password,
      fullName,
      mobile,
    });
    if (result) {
      const _res = await storeLocalUserData(result);
      if (_res) {
        navigation.navigate(Screens.root);
      }
    }
    setLoading(false);
  };

  const handleLogin = async () => {
    setLoading(true);
    const result = await login(email, password);
    if (result) {
      if (result.status === "success" && result.user) {
        //login success
        const _result = await storeLocalUserData(result.user);
        if (_result) {
          navigation.navigate(Screens.root);
        }
      } else if (result.msg) {
        alert(result.msg);
      }
    }
    setLoading(false);
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    mobile,
    setMobile,
    fullName,
    setFullName,
    loading,
    isLogin,
    setIsLogin,
    handleLogin,
    handleRegister,
  };
}
