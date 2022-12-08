import { Callout } from "react-native-maps";
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text
} from "react-native";
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Screens } from "../navigation/ScreenNames"

export default function CustomCallout({ post, navigation }) {

    return (
        <Callout tooltip={true}>
            <View>
                <TouchableOpacity
                    onPress={()=>navigation.navigate(Screens.chatroom)}
                    variant="outline"
                    style={{ ...styles.btn }}
                >
                    <View style={styles.rowAlign}>
                        <Text style={styles.text}>Create Chatroom</Text>
                        <Entypo name="chat" size={24} color="black" />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    // onPress={importPhoto}
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
