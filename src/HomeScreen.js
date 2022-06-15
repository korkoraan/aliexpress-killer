import 'react-native-gesture-handler';
import React, {useEffect} from "react";
import {StyleSheet, TextInput, View} from "react-native";
import { offCart, toCart, fetchData} from "./store/store";
import {useDispatch, useSelector} from "react-redux";
import Icon from "react-native-vector-icons/Ionicons"
import ItemsList from "./components/ItemsList";
import LowerMenu from "./components/LowerMenu";

function HomeScreen ({ navigation }) {

    const dispatch = useDispatch()
    const { items_in_shopping_cart } = useSelector(state => state)
    const { items_available_list } = useSelector(state => state)
    const inCart = (item) => items_in_shopping_cart.find(i => i.id === item.id)

    const itemPressHandler = (item) => {
        if (!inCart(item)) {
            dispatch(toCart(item))
        }
        else {
            dispatch(offCart(item))
        }
    }

    function onRefresh() {
        dispatch(fetchData())
    }

    useEffect(() => {
        dispatch(fetchData())
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.search_bar}>
                <Icon
                    style={styles.search_icon}
                    name={'search-outline'}
                    size={30}>
                </Icon>
                <TextInput
                    style={styles.search_input}
                    placeholder={"Поиск"}
                    keyboardType={"default"}>
                </TextInput>
            </View>
            <ItemsList itemPressHandler={itemPressHandler} onRefresh={onRefresh} items={items_available_list}/>
            <LowerMenu navigation={navigation}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column"
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
    },
    search_bar: {
        marginTop: 10,
        flexDirection: "row",
        marginHorizontal: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "gray",
    },
    search_input: {
        width: 370,
    },
    search_icon: {
        alignSelf: "center",
        marginStart: 10
    }
});

export default HomeScreen
