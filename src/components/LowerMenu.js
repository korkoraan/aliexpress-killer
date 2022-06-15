import {StyleSheet, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import React from "react";

export default function LowerMenu({ navigation }) {
    return (
        <View style={styles.lower_menu}>
            <TouchableOpacity
                style={styles.lower_menu_button}
                title={'btn_home'}
                onPress={() =>
                    navigation.navigate('Home')
                }>
                <Icon name={"home-outline"} size={60} style={{alignSelf: "center"}}></Icon>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.lower_menu_button}
                title={'btn_shopping_cart'}
                onPress={() =>
                    navigation.navigate('Shopping Cart')
                }>
                <Icon name={"cart-outline"} size={60} style={{alignSelf: "center"}}></Icon>
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
        width:65,
        height:65,
        borderRadius:10,
        marginHorizontal:10,
        marginTop:3
    },
})
