import { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';

const CARD_HEIGHT = 250;
const CARD_WIDTH = CARD_HEIGHT - 30;

export default function ItemCard({ item, onCardPress }) {

    const [address, setAddress] = useState("")

    useEffect(() => {
        if (item.latitude && item.longitude) {
            (async () => {
                let result
                await Location.reverseGeocodeAsync({ latitude: item.latitude, longitude: item.longitude })
                    .then(res => result = res[0])
                    .catch(e => console.log(e))
                setAddress(`${result.name ? result.name + ", " : ""}${result.city ? result.city + ", " : ""}${result.country ? result.country + ", " : ""}${result.postalCode ? result.postalCode : ""}`)
            })()
        }
    }, [])

    return (
        <TouchableOpacity onPress={() => onCardPress(item)}>
            <View style={styles.background} key={item.id}>
                <View style={{ width: '100%', alignItems: 'center', padding: 5 }}>
                    <Image
                        style={styles.image}
                        source={{ uri: item.url }}
                    />
                </View>
                <Text style={styles.text}>Name: <Text style={styles.text}>{item.name ? item.name : ""}</Text></Text>
                <Text style={styles.text}>Description: <Text
                    style={styles.text}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >
                    {item.desc ? item.desc : ""}
                </Text>
                </Text>
                <Text style={styles.text}>Address: <Text style={styles.text}>{address}</Text></Text>
                <Text style={styles.text}>Date: <Text style={styles.text}>{new Date(item.timeStamp).toLocaleString()}</Text></Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'white',
        width: CARD_WIDTH,
        borderRadius: 10,
        shadowColor: 'gray',
        shadowRadius: 5,
        shadowOpacity: 0.5,
        padding: 5,
        marginHorizontal: 10,
        height: CARD_HEIGHT
    },
    text: {
        padding: 5,
    },
    image: {
        width: 100,
        height: 100,
    }
});