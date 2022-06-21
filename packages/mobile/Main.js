import React, {useContext, useEffect} from 'react';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {NavigationContainer} from "@react-navigation/native";
import BottomTabBarStack from "./src/navigation/BottomTabBarStack";
import {Details} from "./src/screens/Details/Details";
import {Help} from "./src/screens/Help/Help";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Login from "./src/screens/Login/Login";
import {AuthContext} from './src/context/AuthContext';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosConfig from "./src/utils/axiosConfig";

const Stack = createNativeStackNavigator();

export default function Main() {
    const {state,setState} = useContext(AuthContext);
    axiosConfig(setState);

    useEffect(() => {
        AsyncStorage.getItem('user').then(user => {
            if(user !== null){
                setState(JSON.parse(user));
            }
        })
    },[])

    return (
        <>
            <IconRegistry icons={EvaIconsPack}/>
            <ApplicationProvider {...eva} theme={eva.light}>
                <NavigationContainer>
                    {state.user === null || state.user === undefined ? (
                        <Stack.Navigator>
                            <Stack.Screen name="login" options={{headerShown:false}} component={Login}/>
                        </Stack.Navigator>
                    ) : (
                        <Stack.Navigator>
                            <Stack.Screen name="TabFlow" options={{headerShown:false}} component={BottomTabBarStack}/>
                            <Stack.Screen name="Detail" options={{headerShown:false}} component={Details}/>
                            <Stack.Screen name="help" options={{headerShown:false}} component={Help}/>
                        </Stack.Navigator>
                    )}

                </NavigationContainer>
            </ApplicationProvider>
        </>
    )
}