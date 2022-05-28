import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ShoppingCartScreen from "./ShoppingCartScreen";
import HomeScreen from "./HomeScreen";
import {Provider} from "react-redux";
import {store} from "./store/store";

const Stack = createNativeStackNavigator();

function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="Shopping Cart" component={ShoppingCartScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}

export default App;