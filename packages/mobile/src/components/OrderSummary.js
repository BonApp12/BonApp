import React from 'react';
import {FlatList, Image, StyleSheet, Text, View} from "react-native";

export const OrderSummary = (order) => {
    const currentOrder = order.order;
    const Item = (plate) => {
        return (
            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    source={{
                        uri: `${process.env.BACKEND_URL}plate/uploads/${plate.plate?.plate?.photo || 'img.png'}`,
                        width: 80,
                        height: 80
                    }}/>
                <Text styles={styles.plateName}>{plate.plate.plate.name}</Text>
                <Text>{plate.plate.quantity}</Text>
            </View>
        );
    };
    return (
        <>
            <View>
                <Text style={styles.title}>
                    Table {currentOrder?.table.libelle} - Commande n°{currentOrder.id}
                </Text>
            </View>
            <FlatList data={currentOrder.orderPlates} renderItem={({item}) => <Item plate={item}/>}/>
        </>
    );
};
const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        textAlign: 'center',
        //marginVertical: 20,
        //paddingLeft: '5%',
    },
    image: {
        borderRadius: 20,
    },
    imageContainer: {
        marginTop: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 40,
        // Shadow ios
        shadowOpacity: 0.09,
        shadowOffset: {
            height: 0,
            width: 20
        },
        shadowRadius: 10,
        //Shadow for android
        elevation: 5,
    },
});
