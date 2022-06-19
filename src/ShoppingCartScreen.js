import React from 'react';
import {StyleSheet, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {offCart, toCart} from "./data/store";
import LowerMenu from "./components/LowerMenu";
import ItemsList from "./components/ItemsList";

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

    const onRefresh = () => {}

    return (
        <View style={styles.container}>
            <ItemsList itemPressHandler={itemPressHandler} onRefresh={onRefresh} items={items_in_shopping_cart}/>
            <LowerMenu navigation={ navigation }/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column"
    },
})

export default ShoppingCartScreen
