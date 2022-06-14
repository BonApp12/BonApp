import React, {useState} from 'react';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {NavigationContainer} from "@react-navigation/native";
import BottomTabBarStack from "./src/navigation/BottomTabBarStack";
import {Details} from "./src/screens/Details/Details";
import {Help} from "./src/screens/Help/Help";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Login from "./src/screens/Login/Login";

const Stack = createNativeStackNavigator()

export default function App(){
    const [user,setUser] = useState(null);
    return (
        <>
            <IconRegistry icons={EvaIconsPack}/>
            <ApplicationProvider {...eva} theme={eva.light}>
                <NavigationContainer>
                    {!user ? (
                        <Stack.Navigator>
                            <Stack.Screen name="login" options={{headerShown:false}} component={Login}/>
                        </Stack.Navigator>
                    ) : (
                        <Stack.Navigator>
                            <Stack.Screen name="TabFlow" options={{headerShown:false}} component={BottomTabBarStack}/>
                            <Stack.Screen name="Detail" component={Details}/>
                            <Stack.Screen name="help" component={Help}/>
                        </Stack.Navigator>
                    )}

                </NavigationContainer>
            </ApplicationProvider>
        </>
    )
};
