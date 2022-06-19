import {FlatList, Text, TouchableOpacity, View, StyleSheet, RefreshControl} from "react-native";
import React from "react";
import { useSelector } from "react-redux";

export default function ItemsList({ items, itemPreset, itemPressHandler, onRefresh }) {

    const { items_in_shopping_cart } = useSelector(state => state)
    const { status } = useSelector(state => state)

    const inCart = (item) => items_in_shopping_cart.find(i => i.id === item.id)

    return (
        <View style={styles.items_list} pointerEvents={status && status.type === 'loading' ? 'none' : 'auto'}>
            <FlatList
                data={items}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.item} onPress={() => itemPressHandler(item)}>
                        <Text style={{marginStart: 50, marginTop: 23, color: 'black'}}>{item.name}</Text>
                        <Text style={styles.check_in_cart}>{inCart(item) ? 'V' : ''}</Text>
                    </TouchableOpacity>
                )}
                refreshControl={
                    <RefreshControl
                        refreshing={ status && status.type === 'loading' }
                        onRefresh={onRefresh}>
                    </RefreshControl>
                }>
            </FlatList>
        </View>
    )
}

const styles = StyleSheet.create({
    items_list: {
        flex: 1,
        marginHorizontal: 10,
        marginTop: 10,
        borderRadius: 5,
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
})
