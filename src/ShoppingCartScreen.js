import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";

function ShoppingCartScreen() {

    const { items_in_shopping_cart } = useSelector(state => state)
    const dispatch = useDispatch()


    function itemPressHandler(item) {
        return undefined;
    }

    return (
        <View style={styles.items_list}>
            <FlatList
                data={items_in_shopping_cart}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.item} onPress={() => itemPressHandler(item)}>
                        <Text>{item.name}</Text>
                    </TouchableOpacity>
                )}>
            </FlatList>
        </View>
    );
}

const styles = StyleSheet.create({
    items_list: {
        flex: 1,
        marginHorizontal: 10,
        backgroundColor: 'pink'
    },
    item: {
        flex:1,
        marginTop: 10,
        borderWidth:1,
        borderColor:'black',
        backgroundColor:'white',
        height:70,
        borderRadius:10,
    }
})

export default ShoppingCartScreen