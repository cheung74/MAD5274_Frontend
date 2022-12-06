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
    if (!email || !password || !fullName || !mobile) {
      setLoading(false);
      alert("Please enter all fields");
      return;
    }
    const result = await createUser({
      email: email.trim(),
      password: password.trim(),
      fullName: fullName.trim(),
      mobile: mobile.trim(),
    });
    if (result && result.status === "success" && result.user) {
      const _res = await storeLocalUserData(result.user);
      if (_res) {
        navigation.navigate(Screens.root);
      }
    } else {
      alert(result.msg);
    }
    setLoading(false);
  };

  const handleLogin = async () => {
    setLoading(true);
    if (!email || !password) {
      alert("Please enter email and password");
      setLoading(false);
      return;
    }
    const result = await login(email.trim(), password).trim();
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
