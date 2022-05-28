import React, {useState} from "react";
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {offCart, toCart} from "./store/store";
import {useDispatch, useSelector} from "react-redux";

function HomeScreen ({ navigation }) {

    const { items_available_list } = useSelector((state) => {
        return state
    })
    const { items_in_shopping_cart } = useSelector(state => state)
    const dispatch = useDispatch()

    const inCart = (item) => items_in_shopping_cart.find(i => i.id === item.id)

    const itemPressHandler = (item) => {
        if (!inCart(item)) {
            dispatch(toCart(item))
        }
        else {
            dispatch(offCart(item))
        }
    }

    function testFoo() {
        console.log('-------------------------------')
        console.log('AVAILABLE: ')
        console.log(items_available_list)
        console.log('-------------------------------')
        console.log('CART: ')
        console.log(items_in_shopping_cart)
        console.log('-------------------------------')

    }

    return (
        <View style={[styles.container, {
            flexDirection: "column"
        }]}>
            <View style={styles.items_list}>
                <FlatList
                    data={items_available_list}
                    renderItem={({ item }) => ( //почему item в таких скобках?
                        <TouchableOpacity style={styles.item} onPress={() => itemPressHandler(item)}>
                            <Text>{item.name}</Text>
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
                        navigation.navigate('Shopping Cart')
                    }
                />

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    items_list: {
        flex: 1,
        marginHorizontal: 10,
        backgroundColor: 'pink'
    },
    check_in_cart: {
        textAlign: 'right',
        marginEnd: 100,
        color: 'green',
        fontSize: 20,
        fontWeight: '900'
    },
    item: {
        flex:1,
        marginTop: 10,
        borderWidth:1,
        borderColor:'black',
        backgroundColor:'white',
        height:70,
        borderRadius:10,
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
    test_button: {
        borderWidth:5,
        borderColor:'black',
        backgroundColor:'black',
        width:70,
        height:70,
        borderRadius:10,
        marginHorizontal:10,
        marginTop:3
    }
});

export default HomeScreen
