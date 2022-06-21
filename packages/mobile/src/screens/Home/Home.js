import {View} from 'react-native';
import {Button, Layout} from '@ui-kitten/components';
import axios from "axios";
import {restaurant} from "../../router/routes";


export const Home = () => {
    return (
        <View style={{flex: 1, backgroundColor: '#000000'}}>
            <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Button onPress={() => axios.get(restaurant+'1',{credential: true, withCredentials: true}).then(res => res.data).then(data => alert(data.id))}>OPEN DETAILS</Button>
            </Layout>
        </View>
    );
};
