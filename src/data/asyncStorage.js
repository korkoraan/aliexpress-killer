import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from 'react-native-uuid';

const getDate = () => {
    const date = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();

    return date + '/' + month + '/' + year;
}

export default class storage {
    static getHistory = async () => {
        try {
            let data = await AsyncStorage.getItem('history')
            return data != null ? JSON.parse(data) : null;
        } catch(e) {
            console.log(error)
        }
    }

    static getHistoryItems = async () => (await storage.getHistory()).map( item => JSON.parse(item))

    static addToHistory = async (item) => {
        try {
            console.log("ADDING NEW ITEM TO HISTORY: ")
            let n_item = JSON.parse(JSON.stringify(item))
            n_item.item_id = n_item.id
            n_item.id = uuid.v4()
            n_item.date = getDate()
            const jsonItem = JSON.stringify(n_item)
            console.log(jsonItem)
            const history = await storage.getHistory()
            console.log(history)
            await AsyncStorage.setItem('history', JSON.stringify([... history ? history : [], jsonItem]))
        } catch (error) {
            console.log(error)
        }
    }

    static clearHistory = async () => {
        try {
            await AsyncStorage.setItem('history', JSON.stringify([]))
        } catch (error) {
            console.log(error)
        }
    }
}
