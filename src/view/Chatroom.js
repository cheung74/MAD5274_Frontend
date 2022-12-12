import { useNavigation } from "@react-navigation/native";
import React, { useState, useCallback, useLayoutEffect } from "react";
import { TouchableOpacity, SafeAreaView } from "react-native";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { Ionicons } from "@expo/vector-icons";
import { Screens } from "../navigation/ScreenNames";
import app from "../../firebaseConfig";
import {
  getFirestore,
  onSnapshot,
  collection,
  orderBy,
  query,
  addDoc,
} from "@firebase/firestore";
const CHAT = "chat";

export default function Chatroom({ route }) {
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();
  const db = getFirestore(app);
  const postId = route.params.post._id
  const user = route.params.user
  
  useLayoutEffect(() => {
    const unsub = onSnapshot(
      query(
        collection(db, 'chat', postId, 'message'),
        orderBy('createdAt', 'desc')
      ),
      (snapshot) => {
        const latestMessages = snapshot.docs.map(doc => doc.data());
        setMessages(latestMessages);
      },
      (err) => console.log(err)
    );
    return unsub;
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    const { _id, text } = messages[0];
    const msg = { _id, text, user, createdAt: Date.now() }
    addDoc(collection(db, CHAT, postId, "message"), msg);
  }, []);

  const bubble = props => {
    return (
      <Bubble 
        {...props} 
        wrapperStyle={{left:{backgroundColor:'lightgrey'}}} 
        textProps={{style: {color: props.position === 'left' ? '#000' : '#fff'}}}
      />
    )
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableOpacity
        onPress={() => navigation.navigate(Screens.homeStack)}
        style={{ alignSelf: "flex-end", padding: 15 }}
      >
        <Ionicons name="ios-exit-outline" size={36} color="black" />
      </TouchableOpacity>
      <GiftedChat
        renderBubble={bubble}
        renderAvatar={null}
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{_id: user?._id}}
        style={{ flex: 1 }}
      />
    </SafeAreaView>
  );
}
