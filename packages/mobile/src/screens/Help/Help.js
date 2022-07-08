import {ScrollView, StyleSheet} from "react-native";
import {Text} from "@ui-kitten/components";
import SafeAreaView from "react-native/Libraries/Components/SafeAreaView/SafeAreaView";
import ListItem from "../../components/listItem";
import {useDispatch, useSelector} from "react-redux";
import {removeHelp} from "../../redux/reducer";

export function Help() {
    const helps = useSelector(state => state.helpNeededs);
    const dispatch = useDispatch();
    const handleDismiss = (help) => {
        dispatch(removeHelp(help));
    };

    return (
        <SafeAreaView style={{flex: 1}}>
            <Text style={styles.title}>
                Demandes client
            </Text>
            <ScrollView>
                {helps.map((help, index) =>
                    <ListItem
                        key={index}
                        task={help}
                        onDismiss={() => handleDismiss(help)}
                        openModal={() => alert(`Le client à la table ${help.libelleTable} a demandé de l'aide`)}
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
