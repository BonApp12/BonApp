import {View} from "react-native";
import {Divider, Layout, Text} from "@ui-kitten/components";

export function Help() {
    return (
        <View style={{flex: 1}}>
            <Divider/>
            <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text category="h1">help</Text>
            </Layout>
        </View>
    );
}
