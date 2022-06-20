import {AuthProvider} from './src/context/AuthContext';
import Main from "./Main";
import Toast from 'react-native-toast-message';

export default function App(){
    return (
        <>
            <AuthProvider>
                <Main />
            </AuthProvider>
            <Toast />
        </>
    )
}
