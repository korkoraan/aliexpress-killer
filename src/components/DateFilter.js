import React from "react";
import {TouchableOpacity, StyleSheet, View} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function DateFilter({ filterPressHandler }) {
    const test_press = (o) => {
        console.log('!!!!')
        console.log(JSON.stringify(o, null, 2))
    }

    return (
        <View style={styles.btn}>
            <TouchableOpacity
                style={styles.btn}
                title={'btn_filter'}
                onPress={() => test_press(filterPressHandler)}>
                {/*onPress={() => filterPressHandler()}>*/}
                <Icon name={"search-outline"} size={50} style={{alignSelf: "center"}}></Icon>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create( {
    btn: {
        borderColor:'grey',
        backgroundColor:'red',
        width:55,
        height:55,
        borderRadius:10,
        marginHorizontal:10,
        marginTop:3
    }
})
