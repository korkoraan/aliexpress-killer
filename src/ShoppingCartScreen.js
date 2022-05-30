import React from 'react';
import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {offCart, toCart} from "./store/store";

function ShoppingCartScreen({ navigation }) {

    const { items_in_shopping_cart } = useSelector(state => state)
    const dispatch = useDispatch()


    function itemPressHandler(item) {
        if (!inCart(item)) {
            dispatch(toCart(item))
        }
        else {
            dispatch(offCart(item))
        }
    }

    const inCart = (item) => items_in_shopping_cart.find(i => i.id === item.id)

    return (
        <View style={styles.container}>
            <View style={styles.items_list}>
                <FlatList
                    data={items_in_shopping_cart}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.item} onPress={() => itemPressHandler(item)}>
                            <Text style={{marginStart: 50, marginTop: 23, color: 'black'}}>{item.name}</Text>
                            <Text style={styles.check_in_cart}>{inCart(item) ? 'V' : ''}</Text>
                        </TouchableOpacity>
                    )}>
                </FlatList>
            </View>
            <View style={styles.lower_menu}>
                <TouchableOpacity
                    style={styles.lower_menu_button}
                    title={'btn_shopping_cart'}
                    onPress={() =>
                        navigation.navigate('Home')
                    }>
                    <Image style={styles.lower_menu_icon} source={require('../res/cart.png')} />
                </TouchableOpacity>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column"
    },
    items_list: {
        flex: 1,
        marginHorizontal: 10,
        backgroundColor: 'pink'
    },
    item: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 10,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: 'white',
        height: 70,
        borderRadius: 10,
    },
    check_in_cart: {
        textAlign: 'right',
        marginTop: 18,
        marginStart: 150,
        color: 'green',
        fontSize: 20,
        fontWeight: '900'
    },
    lower_menu: {
        flex: 0.15,
        backgroundColor: "lightblue",
        flexDirection: 'row',
        justifyContent: 'center'
    },
    lower_menu_button: {
        borderWidth:5,
        borderColor:'black',
        backgroundColor:'white',
        width:70,
        height:70,
        borderRadius:10,
        marginHorizontal:10,
        marginTop:3
    },
    lower_menu_icon: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'contain'
    },
})

export default ShoppingCartScreen
