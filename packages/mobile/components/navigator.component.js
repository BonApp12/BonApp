import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomNavigation, BottomNavigationTab, Icon} from '@ui-kitten/components';
import {DetailsScreen} from "./details.component";
import {HomeScreen} from "./home.component";
import {HelpComponent} from "./help.component";

const {Navigator, Screen} = createBottomTabNavigator();


const BottomTabBar = ({navigation, state}) => (
    <BottomNavigation
        selectedIndex={state.index}
        onSelect={index => navigation.navigate(state.routeNames[index])}>
        <BottomNavigationTab title="Commande prête" icon={<Icon name="checkmark-circle-outline"/>}/>
        <BottomNavigationTab title="en préparation" icon={<Icon name="flip-outline"/>}/>
        <BottomNavigationTab title="demande d'aide" icon={<Icon name="question-mark-circle-outline"/>}/>

    </BottomNavigation>
);

const TabNavigator = () => (
    <Navigator tabBar={props => <BottomTabBar {...props} />}>
        <Screen name="Detail" component={DetailsScreen}/>
        <Screen name="Home" component={HomeScreen}/>
        <Screen name="help" component={HelpComponent}/>
    </Navigator>
);

export const AppNavigator = () => (
    <NavigationContainer>
        <TabNavigator/>
    </NavigationContainer>
);
