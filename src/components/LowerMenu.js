import {StyleSheet, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import React from "react";
import storage from "../data/asyncStorage";

export default function LowerMenu({ navigation }) {
    return (
        <View style={styles.lower_menu}>
            <TouchableOpacity
                style={styles.lower_menu_button}
                title={'btn_home'}
                onPress={() =>
                    navigation.navigate('Home')
                }>
                <Icon name={"home-outline"} size={50} style={{alignSelf: "center"}}></Icon>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.lower_menu_button}
                title={'btn_shopping_cart'}
                onPress={() =>
                    navigation.navigate('Shopping Cart')
                }>
                <Icon name={"cart-outline"} size={50} style={{alignSelf: "center"}}></Icon>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.lower_menu_button}
                title={'btn_history'}
                onPress={() =>
                    navigation.navigate('History')
                }>
                <Icon name={"reader-outline"} size={50} style={{alignSelf: "center"}}></Icon>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.lower_menu_button}
                title={'btn_test'}
                onPress={() => {
                    storage.getHistory()
                        .then((data) => {
                            console.log(data)
                        })
                        .catch(err => console.log(err))
                }
                }>
                <Icon name={"build-outline"} size={50} style={{alignSelf: "center"}}></Icon>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.lower_menu_button}
                title={'btn_trash'}
                onPress={ async () => {
                    await storage.clearHistory()
                    await storage.getHistory()
                        .then(data => console.log(data)
                        )
                }
                }>
                <Icon name={"trash-outline"} size={50} style={{alignSelf: "center"}}></Icon>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    lower_menu: {
        flex: 0.15,
        backgroundColor: "lightblue",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:"center",
    },
    lower_menu_button: {
        borderColor:'grey',
        backgroundColor:'white',
        width:55,
        height:55,
        borderRadius:10,
        marginHorizontal:10,
        marginTop:3
    },
})
