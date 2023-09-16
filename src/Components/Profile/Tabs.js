import React, {useState} from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import Profile from "./EDITProfile";
import Orders from './Orders';
import { Colors } from "../../data/data";
import { Text } from "native-base";
import { styleProps } from "react-native-web/dist/cjs/modules/forwardedProps";


const renderScene = SceneMap({
    first:Profile,
    second:Orders
})

export default function Tabs() {

    const layout = useWindowDimensions()
    const [index,setIndex] = useState(0)
    const [routes] = useState([
        {
            key: "first",
            title:"PROFILE"
        },
        {
            key: "second",
            title:"ORDERS"
        },
    ]);

    const renderTabsBar = (props) => (
        <TabBar {...props} 
        tabStyle= {styles.tabStyle} 
        indicatorStyle={{backgroundColor:Colors.black}}
        activeColor= {Colors.red}
        inactiveColor= {Colors.white}
        renderLabel= {({route,color}) =>(<Text style={{color,...styles.text}}>{route.title}</Text>)}
        />
    );

    return (
        <TabView 
        navigationState={{index,routes}}
        renderScene= {renderScene}
        // set ui of profile and orders index
        onIndexChange= {setIndex} initialLayout={{width:layout.width}}
        renderTabBar={renderTabsBar}
        />
    );
}

const styles = StyleSheet.create({
    tabStyle:{
        backgroundColor:"black",
    },
    text:{
        fontSize: 13,
        fontWeight: "bold",
    },
});