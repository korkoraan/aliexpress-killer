import React, {useState} from "react";
import Icon from "react-native-vector-icons/Ionicons";
import {StyleSheet, TextInput, TouchableOpacity, View} from "react-native";

export default function SearchBar({ searchFunc }) {

    const [textInput, setTextInput] = useState("")

    return (<View style={styles.search_bar}>
        <Icon
            style={styles.search_icon}
            name={'search-outline'}
            size={30}>
        </Icon>
        <TextInput
            style={styles.search_input}
            value={textInput}
            placeholder={"Поиск"}
            keyboardType={"default"}
            onChangeText={(text) => {
                setTextInput(text)
                searchFunc(text)
            }}
            onSubmitEditing={({ nativeEvent: { text}}) => searchFunc(text)}
        >
        </TextInput>
        <TouchableOpacity onPress={() => setTextInput("")}>
            <Icon
                style={styles.cancel_icon}
                name={'close-circle-outline'}
                size={30}>
            </Icon>
        </TouchableOpacity>
    </View>)
}

const styles = StyleSheet.create({
    search_bar: {
        marginTop: 10,
        flexDirection: "row",
        marginHorizontal: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "gray",
    },
    search_input: {
        width: 300,
    },
    search_icon: {
        alignSelf: "center",
        marginStart: 10
    },
    cancel_icon: {
        alignSelf: "flex-start",
        marginTop: 8,
    }
});
