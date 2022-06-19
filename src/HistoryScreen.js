import React, {useState} from "react";
import {FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import LowerMenu from "./components/LowerMenu";
import DateFilter from "./components/DateFilter";
import storage from "./data/asyncStorage";
import Icon from "react-native-vector-icons/Ionicons";
import DatePicker from 'react-native-date-picker'
import moment from "moment"

moment().format();

const itemPressHandler = (item) => {
    void 0
}

export default function HistoryScreen ({ navigation }) {

    const [historyItems, setHistoryItems] = useState([])

    // useEffect(() => getHistoryItems())

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true)
        setHistoryItems(await storage.getHistoryItems())
        setRefreshing(false)
    }, [refreshing]);

    const [historyDay, setHistoryDay] = useState(new Date())
    const [datePickerOpen, setDatePickerOpen] = useState(false)
    function HistoryDatePicker() {
        return <DatePicker
            modal={true}
            mode={'date'}
            open={datePickerOpen}
            date={historyDay}
            androidVariant="nativeAndroid"
            onConfirm={(date) => {
                setHistoryDay(date)
                setDatePickerOpen(false)
                const fmt = 'DD-MM-YYYY'
                const filter_day = moment(date)
                // console.log(moment('2022-06-19').isSame(moment('19/6/2022', fmt), 'day'))
                setHistoryItems(historyItems.filter(item => {
                    // console.log(item.date, typeof item.date)
                    return moment(item.date, fmt).isSame(filter_day, 'day')
                }))
            }}
            onCancel={() => {
                setDatePickerOpen(false)
            }}
        />
    }

    function DateFilter() {
        return (
            <View style={styles.btn}>
                <TouchableOpacity
                    style={styles.btn}
                    title={'btn_filter'}
                    onPress={() => {
                        setDatePickerOpen(true)
                    }}>
                    <Icon name={"search-outline"} size={50} style={{alignSelf: "center"}}></Icon>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.items_list}>
                <FlatList
                    data={historyItems}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.item} onPress={() => itemPressHandler(item)}>
                            <Text style={{marginStart: 50, marginTop: 23, color: 'black'}}>{item.name}</Text>
                        </TouchableOpacity>
                    )}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}>
                        </RefreshControl>
                    }>
                </FlatList>
            </View>
            <DateFilter/>
            <HistoryDatePicker/>
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
});
