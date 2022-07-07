import React from 'react';
import {FlatList, View, Text} from "react-native";

export const OrderSummary = (order) => {
    const currentOrder = order.order;
    const Item = (plate) => {
        return (
            <View>
                <Text>{plate.plate.plate.name}</Text>
                <Text>{plate.plate.quantity}</Text>
            </View>
        );
    };
    return (
        <>
            <Text>
                Table {currentOrder?.table.libelle} - Commande n°{currentOrder.id}
            </Text>
            <FlatList data={currentOrder.orderPlates} renderItem={({item}) => <Item plate={item}></Item>}/>
        </>
    )
}