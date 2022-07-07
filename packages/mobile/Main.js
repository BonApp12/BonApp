import React, {useContext, useEffect, useState} from 'react';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Login from "./src/screens/Login/Login";
import {AuthContext} from './src/context/AuthContext';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosConfig from "./src/utils/axiosConfig";
import NotificationProvider from "./NotificationProvider";
import BottomTabBarStack from "./src/navigation/BottomTabBarStack";
import {Details} from "./src/screens/Details/Details";
import {Help} from "./src/screens/Help/Help";
import {socket, SocketContext} from "./src/context/socket";

const Stack = createNativeStackNavigator();

export default function Main() {
    const {state, setState} = useContext(AuthContext);
    axiosConfig(setState);

    useEffect(() => {
        function pushHelpToStorage(data) {
            // Gathering existing elements in AsyncStoroage
            AsyncStorage.getItem('helpNeeded').then((helpNeeded) => {
                if (helpNeeded !== null) {
                    const helps = JSON.parse(helpNeeded);
                    helps.push(data);
                    // Pushing in key if already exists
                    AsyncStorage.setItem('helpNeeded', JSON.stringify(helps));
                } else {
                    // If there's not elements | key doesn't exist, insert new key and first element.
                    AsyncStorage.setItem('helpNeeded', JSON.stringify([data]));
                }
            });
        }

        socket.on('needSomething', async (data) => {
            await pushHelpToStorage(data);
        });

    }, []);

    useEffect(() => {
        AsyncStorage.getItem('user').then(user => {
            if (user !== null) {
                const localUser = JSON.parse(user);
                socket.emit('joinWaiterRoom', localUser);
                setState(localUser);
            }
        });
    }, []);

    return (
        <>
            <IconRegistry icons={EvaIconsPack}/>
            <ApplicationProvider {...eva} theme={eva.light}>
                <NavigationContainer>
                    {state.user === null || state.user === undefined ? (
                        <Stack.Navigator>
                            <Stack.Screen name="login" options={{headerShown: false}} component={Login}/>
                        </Stack.Navigator>
                    ) : (
                        <>
                            <NotificationProvider user={state.user}/>
                            <Stack.Navigator>
                                <Stack.Screen name="TabFlow" options={{headerShown: false}}
                                              component={BottomTabBarStack}/>
                                <Stack.Screen name="Detail" options={{headerShown: false}} component={Details}/>
                                <Stack.Screen name="help" options={{headerShown: false}} component={Help}/>
                            </Stack.Navigator>
                        </>
                    )}

                </NavigationContainer>
            </ApplicationProvider>
        </>
    );
}
