import {AuthProvider} from './src/context/AuthContext';
import Main from "./Main";
import Toast from 'react-native-toast-message';
import * as Notifications from 'expo-notifications';
import {GestureHandlerRootView} from "react-native-gesture-handler";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});


export default function App() {
    return (
        <>
            <AuthProvider>
                <GestureHandlerRootView style={{flex: 1}}>
                    <Main/>
                </GestureHandlerRootView>
            </AuthProvider>
            <Toast/>
        </>
    );
}
