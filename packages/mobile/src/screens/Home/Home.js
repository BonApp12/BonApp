import React, {useRef, useState} from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';
import SafeAreaView from "react-native/Libraries/Components/SafeAreaView/SafeAreaView";
import ListItem from "../../components/listItem";
import ModalBottom from "../../components/modalBottom";


// MOCK LES ORDERS
const TITLES = [
    'Record the dismissible tutorial 🎥',
    'Leave 👍🏼 to the video',
    'Check YouTube comments',
    'Subscribe to the channel 🚀',
    'Leave a ⭐️ on the GitHub Repo',
];
const TASKS = TITLES.map((title, index) => ({index, title}));

export const Home = () => {
    const [tasks, setTasks] = useState(TASKS);
    const [taskToDisplay, setTaskToDisplay] = useState({});
    const modalBottomRef = useRef(null);
    const handleClick = (task) => {
        setTaskToDisplay(task);
        modalBottomRef.current?.handlePresentModalPress();
    };
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
            <Text style={styles.title}>Commande prête</Text>
            <ScrollView>
                {tasks.map(task =>
                    <ListItem task={task}
                              key={task.index}
                              openModal={() => handleClick(task)}
                              onDismiss={(id) => {
                                  setTasks(tasks.filter(task => task.index !== id));
                              }}

                    />
                )}
            </ScrollView>
            <ModalBottom taskToDisplay={taskToDisplay} ref={modalBottomRef}/>
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
