import React, {useEffect, useRef, useState} from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';
import SafeAreaView from "react-native/Libraries/Components/SafeAreaView/SafeAreaView";
import ListItem from "../../components/listItem";
import ModalBottom from "../../components/modalBottom";
import AsyncStorage from "@react-native-async-storage/async-storage";
import getReadyOrders from "../../request/getReadyOrders";
import setOrderToCompleted from "../../request/setOrderToCompleted";
import {OrderSummary} from "../../components/OrderSummary";
import {socket} from "../../context/socket";
import toast from "../../utils/toast";
import {addOrder} from "../../redux/reducer";


export const Home = () => {
    const [taskToDisplay, setTaskToDisplay] = useState({});
    const modalBottomRef = useRef(null);
    const handleClick = (task) => {
        setTaskToDisplay(task);
        modalBottomRef.current?.handlePresentModalPress();
    };
    const handleDismiss = (order) => {
        setOrderToCompleted(order.id)
            .then((resOrder) => {
                socket.emit('orderCompleted', resOrder.data.raw[0]);
            })
            .catch((err) => {
                // TODO : Afficher une vraie erreur
                console.log('Une erreur est survenue');
            });
        setReadyOrders(readyOrders.filter(ord => ord.id !== order.id));
    };
    const [userState, setUserState] = useState({});
    const [readyOrders, setReadyOrders] = useState([]);
    const [orderReceived, setOrderReceived] = useState(false);

    // Gathering current user data and every ready orders.
    useEffect(() => {
        AsyncStorage.getItem('user').then((user) => {
            if (user) {
                const localUser = JSON.parse(user);
                setUserState(localUser);
                getReadyOrders(localUser.restaurant.id).then((resOrders) => {
                    setReadyOrders(resOrders.data);
                });
            }
        });

        /**
         * Prend en paramêtre order mais on ne l'utilise pas ici.
         */
        socket.on('orderStatusUpdated', () => {

            toast('success', 'Commande prête', 'Une nouvelle commande est prête 🎉');
            setOrderReceived(true);
        });
    }, []);

    useEffect(() => {
        if (orderReceived === true) {
            getReadyOrders(userState.restaurant.id).then((resOrders) => {
                setReadyOrders(resOrders.data);
                dispatch(addOrder(resOrders.data));
            });
            setOrderReceived(false);
        }
    }, [orderReceived]);

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
            <Text style={styles.title}>Commande prête</Text>
            <ScrollView>
                {readyOrders?.map(order =>
                    <ListItem
                        key={order.id}
                        task={order}
                        openModal={() => handleClick(order)}
                        onDismiss={() => handleDismiss(order)}
                        title={'Table ' + order.table.libelle + ' - Commande n°' + order.id}
                    />
                )}

            </ScrollView>
            <ModalBottom taskToDisplay={taskToDisplay} ref={modalBottomRef}
                         children={<OrderSummary order={taskToDisplay}/>}/>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    title: {
        fontSize: 40,
        marginVertical: 20,
        paddingLeft: '5%',
    }
});
