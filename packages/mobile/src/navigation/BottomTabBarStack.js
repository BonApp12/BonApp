import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Home} from "../screens/Home/Home";
import {Help} from "../screens/Help/Help";
import {Settings} from "../screens/Settings/Settings";
import BottomTabBar from "./BottomTabBar";

const Tab = createBottomTabNavigator();

const tabs = [
    {
        id: 0,
        icon: 'checkmark-circle-outline',
        name: 'Prête',
        component: Home
    },
    // {
    //     id: 1,
    //     icon: 'flip-outline',
    //     name: 'En préparation',
    //     component: Details
    // },

    {
        id: 2,
        icon: 'message-circle-outline',
        name: 'En direct',
        component: Help,
    },
    {
        id: 3,
        icon: 'settings-2-outline',
        name: 'Paramètres',
        component: Settings,
    }
];

export default function BottomTabBarStack() {
    return (
        <Tab.Navigator name={"TabFlow"} tabBar={props => <BottomTabBar {...props} tabs={tabs}/>}
                       screenOptions={{headerShown: false}}>
            {tabs.map((tab, index) => (
                <Tab.Screen
                    key={index}
                    name={tab.name}
                    component={tab.component}
                />
            ))}
        </Tab.Navigator>
    );
}
