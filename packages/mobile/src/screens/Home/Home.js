import React from 'react';
import {View} from 'react-native';
import {Button, Layout} from '@ui-kitten/components';

export const Home = () => {
    return (
        <View style={{flex: 1, backgroundColor: '#000000'}}>
            <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Button onPress={() => alert('let\'s gooooo')}>OPEN DETAILS</Button>
            </Layout>
        </View>
    );
};
