import React from "react";
import { storeLocalUserData } from "../services/asyncStorage";
import { createUser } from "../services/user";

export function useAuth() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [mobile, setMobile] = React.useState("");
  const [fullName, setFullName] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [isLogin, setIsLogin] = React.useState(false);

  const handleRegister = async () => {
    setLoading(true);
    const result = await createUser({
      email,
      password,
      fullName,
      mobile,
    });
    if (result) {
      await storeLocalUserData(result);
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
    handleRegister,
  };
}
