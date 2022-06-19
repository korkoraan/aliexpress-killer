import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ShoppingCartScreen from "./ShoppingCartScreen";
import HomeScreen from "./HomeScreen";
import HistoryScreen from "./HistoryScreen";
import {Provider} from "react-redux";
import {store} from "./data/store";
import {createDrawerNavigator} from "@react-navigation/drawer";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName="Home"
                    screenOptions={{headerShown: false}}>
                    {/*<Drawer.Navigator initialRouteName="Home">*/}
                    {/*    <Drawer.Screen name="Home" component={HomeScreen} />*/}
                    {/*    <Drawer.Screen name="Shopping Cart" component={ShoppingCartScreen} />*/}
                    {/*    <Drawer.Screen name="History" component={HistoryScreen} />*/}
                    {/*</Drawer.Navigator>*/}
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="Shopping Cart" component={ShoppingCartScreen} />
                    <Stack.Screen name="History" component={HistoryScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}

export default App;
