import { useNavigation } from "@react-navigation/native";
import React, { useState, useCallback, useLayoutEffect } from "react";
import { TouchableOpacity, SafeAreaView } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { Ionicons } from "@expo/vector-icons";
import { Screens } from "../navigation/ScreenNames";
import app from "../../firebaseConfig";
import {
  getFirestore,
  onSnapshot,
  addDoc,
  collection,
  orderBy,
  query,
} from "@firebase/firestore";
const CHAT = "chat";

export default function Chatroom() {
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();
  const db = getFirestore(app);

  useLayoutEffect(() => {
    const q = query(
      collection(db, CHAT),
      orderBy("createdAt", "desc")
      // where("state", "==", "CA")
    );
    const unsub = onSnapshot(q, (snapshot) => {
      let tmp = [];
      snapshot.forEach((doc) => tmp.push(doc.data()));
      setMessages(tmp);
    });
    return unsub;
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    const { _id, text, user } = messages[0];
    addDoc(collection(db, CHAT), {
      _id,
      createdAt: Date.now(),
      text,
      user,
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableOpacity
        onPress={() => navigation.navigate(Screens.homeStack)}
        style={{ alignSelf: "flex-end", padding: 15 }}
      >
        <Ionicons name="ios-exit-outline" size={36} color="black" />
      </TouchableOpacity>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 2,
        }}
        style={{ flex: 1 }}
      />
    </SafeAreaView>
  );
}
