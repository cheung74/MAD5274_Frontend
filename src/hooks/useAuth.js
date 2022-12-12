import { useNavigation } from "@react-navigation/native";
import React from "react";
import { getLocalUserData, storeLocalUserData } from "../services/asyncStorage";
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
        loginSuccess();
      }
    } else {
      alert(result.msg);
    }
    setLoading(false);
  };

  const loginSuccess = () => {
    setEmail("");
    setPassword("");
    setFullName("");
    setMobile("");
    navigation.navigate(Screens.ads);
  };

  React.useEffect(() => {
    const _getCurrentUser = async () => {
      const _user = await getLocalUserData();
      if (_user) {
        loginSuccess();
      }
    };
    _getCurrentUser();
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    if (!email || !password) {
      alert("Please enter email and password");
      setLoading(false);
      return;
    }
    const result = await login(email.trim(), password.trim());
    if (result) {
      if (result.status === "success" && result.user) {
        //login success
        const _result = await storeLocalUserData(result.user);
        if (_result) {
          loginSuccess();
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
