import React from 'react';
import {SafeAreaView} from 'react-native';
import {Button, Layout} from '@ui-kitten/components';


export const HomeScreen = ({/*navigation*/}) => {
    // FIXME: This is only for information
    // const navigateDetails = () => {
    //     navigation.navigate('Details');
    // };

    return (
        <SafeAreaView style={{flex: 1}}>
            <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                {/*<Button onPress={navigateDetails}>OPEN DETAILS</Button>*/}
                <Button onPress={() => alert('let\'s gooooo')}>OPEN DETAILS</Button>

            </Layout>
        </SafeAreaView>
    );
};
