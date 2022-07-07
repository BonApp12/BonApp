import {ScrollView, StyleSheet} from "react-native";
import {Divider, Layout, Text} from "@ui-kitten/components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useCallback, useEffect, useState} from "react";
import SafeAreaView from "react-native/Libraries/Components/SafeAreaView/SafeAreaView";
import ListItem from "../../components/listItem";
import {useFocusEffect} from "@react-navigation/native";

export function Help() {
    const [helps, setHelps] = useState([]);
    const handleDismiss = (help) => {
         AsyncStorage.getItem('helpNeeded').then((helps) => {
            let helpToRemove = JSON.parse(helps);
            helpToRemove = helpToRemove.filter(help => help.libelleTable !== helps.libelleTable)
            AsyncStorage.setItem('helpNeeded', JSON.stringify(helpToRemove));
         });
    }
    useFocusEffect(
        useCallback(() => {
            AsyncStorage.getItem('helpNeeded').then((helpNeeded) => {
                if (helpNeeded) {
                    setHelps(JSON.parse(helpNeeded));
                }
            });
            return () => {
                //AsyncStorage.clear();
            };
        }, [])
    );

    return (
        <SafeAreaView style={{flex: 1}}>
            <Text style={styles.title}>Demandes client</Text>
            <ScrollView>
                {helps.map(help =>
                    <ListItem
                        key={help.idTable}
                        task={help}
                        onDismiss={() => handleDismiss(help)}
                        openModel={null}
                        title={'Table ' + help.libelleTable + ' - ' + help.message}
                    />
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 40,
        marginVertical: 20,
        paddingLeft: '5%',
    }
});