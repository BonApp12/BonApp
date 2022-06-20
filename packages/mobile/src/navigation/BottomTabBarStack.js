import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Home} from "../screens/Home/Home";
import {Details} from "../screens/Details/Details";
import {Help} from "../screens/Help/Help";
import BottomTabBar from "./BottomTabBar";

const Tab = createBottomTabNavigator();

const tabs = [
    {
        id:0,
        icon: 'checkmark-circle-outline',
        name: 'Commande prête',
        component: Home
    },
    {
        id:1,
        icon: 'flip-outline',
        name: 'En préparation',
        component: Details
    },
    {
        id:2,
        icon: 'question-mark-circle-outline',
        name: 'Demande d\'aide',
        component: Help,
    }
];

export default function BottomTabBarStack() {
    return (
        <Tab.Navigator name={"TabFlow"} tabBar={props => <BottomTabBar {...props} tabs={tabs} />} screenOptions={{headerShown: false}}>
            {tabs.map((tab,index) => (
                <Tab.Screen
                    key={index}
                    name={tab.name}
                    component={tab.component}
                />
            ))}
        </Tab.Navigator>
    )
}