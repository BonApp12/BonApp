import React, {useContext, useEffect} from 'react';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Login from "./src/screens/Login/Login";
import {AuthContext} from './src/context/AuthContext';
import axiosConfig from "./src/utils/axiosConfig";
import NotificationProvider from "./NotificationProvider";
import BottomTabBarStack from "./src/navigation/BottomTabBarStack";
import {Details} from "./src/screens/Details/Details";
import {Help} from "./src/screens/Help/Help";
import {Provider} from "react-redux";
import store from './src/redux/store';
import {SocketInitializer} from "./src/components/socketInitialize";
import {socket} from "./src/context/socket";

const Stack = createNativeStackNavigator();


export default function Main() {
    const {state, setState} = useContext(AuthContext);

    axiosConfig(setState);
    useEffect(() => {
        state?.user ? socket.emit('joinWaiterRoom', state?.user) : null;
    }, [state]);

    return (
        <>

            <Provider store={store}>
                <SocketInitializer/>
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
            </Provider>
        </>
    );
}
