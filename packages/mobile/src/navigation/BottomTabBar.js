import {BottomNavigation, BottomNavigationTab, Icon} from "@ui-kitten/components";

export default function BottomTabBar({navigation, state, tabs}){
    return (
        <BottomNavigation
            selectedIndex={state.index}
            style={{height: 80}}
            onSelect={index => navigation.navigate(state.routeNames[index])}>
            {tabs.map((tab,index) => (
                <BottomNavigationTab title={tab.name} icon={<Icon name={tab.icon} />} key={index} />
            ))}
        </BottomNavigation>
    )
}