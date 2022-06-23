import React from 'react';
import {View} from 'react-native';
import {Divider, Icon, Layout, Text, TopNavigationAction} from '@ui-kitten/components';

const BackIcon = (props) => (
    <Icon {...props} name="arrow-back"/>
);

export const Details = ({navigation}) => {
    const BackAction = () => (
        <TopNavigationAction icon={BackIcon} onPress={() => alert('nothing happened here')}/>
    );

    return (
        <View style={{flex: 1}}>
            <Divider/>
            <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text category="h1">DETAILS</Text>
            </Layout>
        </View>
    );
};
