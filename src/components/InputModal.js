import React, { useState, useEffect } from "react";
import {
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Image,
    Alert
} from "react-native";
import * as Location from 'expo-location';
import { Entypo, AntDesign } from '@expo/vector-icons';
import * as ImagePicker from "expo-image-picker";
import { uploadImage } from "../services/firebaseStorage";
import { createPost } from "../services/post";

export default function InputModal({ latlng, modalVisible, onClose, getPost }) {
    const [name, onChangeName] = React.useState()
    const [desc, onChangeDesc] = React.useState()
    const [timeStamp] = useState(Date.now())
    const [address, setAddress] = useState("")
    const [image, setImage] = useState("")

    const importPhoto = async () => {
        let res = {}
        await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 0.2,
        })
            .then(assets => res = assets)
            .catch(e => console.log(e))

        if (!res.canceled) {
            if (!res.assets) {
                Alert.alert("This photo can't be used, please report to the Administrator.")
                return
            }
            setImage(res.assets[0].uri);
        }
    };

    useEffect(() => {
        if (latlng.latitude && latlng.longitude) {
            (async () => {
                let result
                await Location.reverseGeocodeAsync(latlng)
                    .then(res => result = res[0])
                    .catch(e => console.log(e))
                setAddress(`${result.name ? result.name + ", " : ""}${result.city ? result.city + ", " : ""}${result.country ? result.country + ", " : ""}${result.postalCode ? result.postalCode : ""}`)
            })()
        }
    }, [])

    const onPressAdd = async () => {
        const url = await uploadImage(image)
        const item = {
            name,
            desc,
            timeStamp,
            latitude: latlng.latitude,
            longitude: latlng.longitude,
            url
        }
        if (name && desc) {
            await createPost(item)
            Alert.alert("Successfully create a lost item")
            onClose()
            getPost()
        } else {
            Alert.alert("Name and description can't be empty")
        }
    }

    return (
        <Modal
            animationType="fade"
            visible={modalVisible}
            transparent
        >
            <View style={styles.modalBackground}>
                <View style={styles.container}>
                    <TouchableOpacity onPress={() => onClose()} style={{ alignSelf: 'flex-end' }}>
                        <Entypo name="cross" size={24} color="black" />
                    </TouchableOpacity>
                    <View style={styles.rowAlign}>
                        <Text>Photo:</Text>
                        {image ? (
                            <View style={{ ...styles.rowAlign, marginHorizontal: 10 }}>
                                <Image
                                    resizeMode="contain"
                                    source={{ uri: image }}
                                    alt="image"
                                    style={{ width: 200, height: 150 }}
                                />
                                <TouchableOpacity onPress={() => setImage("")} style={{ marginLeft: 25 }}>
                                    <Text style={{ color: 'red' }}>Remove</Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <TouchableOpacity
                                onPress={importPhoto}
                                variant="outline"
                                isDisabled={image}
                                style={{ ...styles.addBtn, marginLeft: 10 }}
                            >
                                <View style={styles.rowAlign}>
                                    <Text style={styles.btnText}>Import photo </Text>
                                    <AntDesign name="upload" size={24} color="white" />
                                </View>
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={styles.rowAlign}>
                        <Text>Name: </Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={onChangeName}
                            value={name}
                            placeholder="Give it a name"
                        />
                    </View>
                    <View style={styles.rowAlign}>
                        <Text>Description: </Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={onChangeDesc}
                            value={desc}
                            placeholder="Describe the lost item"
                        />
                    </View>
                    <View style={styles.rowAlign}>
                        <Text >Address: {address}</Text>
                    </View>
                    <View style={styles.rowAlign}>
                        <Text >Date: {new Date(timeStamp).toLocaleString()}</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.addBtn}
                        onPress={() => onPressAdd()}
                    >
                        <View style={styles.rowAlign}>
                            <Text style={styles.btnText}>Add lost item</Text>
                            <Entypo name="magnifying-glass" size={24} color="white" />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        width: '90%',
    },
    text: {
        padding: 8,
    },
    input: {
        backgroundColor: '#ededed',
        borderWidth: 1,
        padding: 8,
        borderColor: "white",
        borderRadius: 10,
        width: 250,
        color: 'grey',
    },
    rowAlign: {
        flexDirection: "row",
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: 5
    },
    addBtn: {
        alignSelf: 'center',
        backgroundColor: '#0174CC',
        borderRadius: 10,
    },
    btnText: {
        color: 'white'
    }
});