import { Callout } from "react-native-maps";
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Alert
} from "react-native";
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Screens } from "../navigation/ScreenNames"
import { updatePost } from "../services/post";

export default function CustomCallout({ post, navigation, user, getLatestPost }) {
    
    const createChatroom = () => {
        if (post.status === 'pending' && post.createdBy !== user._id) {
            post.updatedBy = user._id
            post.status = 'chatting'
            console.log(post)
            updatePost(post)
        }
        navigation.navigate(Screens.chatroom, {post, user})
    }

    const postCompleted = () => {
        post.status = 'completed'
        updatePost(post)
        .then(Alert.alert("It is great to hear that lost item has been found."))
        .then(getLatestPost())
    }

    const chatroomBtn = () => {
        if (post.status === 'pending' && post.createdBy !== user._id // pending state, anyone can see
            || post.status === 'chatting' && post.createdBy === user._id // after state changes, only owner and creator can see
            || post.status === 'chatting' && post.updatedBy === user._id) {
            return (
                <TouchableOpacity
                    onPress={createChatroom}
                    variant="outline"
                    style={{ ...styles.btn }}
                >
                    <View style={styles.rowAlign}>
                        <Text style={styles.text}>Chat</Text>
                        <Entypo name="chat" size={24} color="black" />
                    </View>
                </TouchableOpacity>
            )
        }
    }

    const foundBtn = () => {
        if (post.status !== 'completed' && post.createdBy === user._id) {
            return (
                <TouchableOpacity
                    onPress={postCompleted}
                    variant="outline"
                    style={{ ...styles.btn }}
                >
                    <View style={styles.rowAlign}>
                        <Text style={styles.text}>Item {post.type === 'Lost' ? "Found" : "Returned"}</Text>
                        {post.type === 'Lost' ?
                            <FontAwesome5 name="smile" size={24} color="black" /> :
                            <MaterialCommunityIcons name="handshake-outline" size={24} color="black" />
                        }
                    </View>
                </TouchableOpacity>
            )
        }
    }

    return (
        <Callout tooltip={true}>
            <View>
                {chatroomBtn()}
                {foundBtn()}
            </View>
        </Callout>
    )
}

const styles = StyleSheet.create({
    marker: {
        width: 50,
        height: 50,
    },
    rowAlign: {
        flexDirection: "row",
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: 5
    },
    btn: {
        alignSelf: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 3,
        margin: 5
    },
    text: {
        padding: 8,
    },
});
