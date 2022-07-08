import {useContext, useEffect} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {socket} from "../context/socket";
import {AuthContext} from "../context/AuthContext";
import {useDispatch} from "react-redux";
import {addHelp} from "../redux/reducer";

export function SocketInitializer() {
    const {setState} = useContext(AuthContext);
    const dispatch = useDispatch();
    useEffect(() => {
        socket.on('needSomething', async (data) => {
            console.log("SocketInitializer");
            dispatch(addHelp(data));
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

    return null;
}
