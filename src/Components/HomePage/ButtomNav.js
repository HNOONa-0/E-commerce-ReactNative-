import { React, useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Center, Pressable, Text } from "native-base";
import HomeScreen from "../../Screens/HomeScreen";
import {
  AntDesign,
  Entypo,
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons
} from "@expo/vector-icons";
import { Colors } from "../../data/data";
import { StyleSheet } from "react-native";
import ProfileScreen from "../../Screens/ProfileScreen";
import CartScreen from "../../Screens/CartScreen";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase";

const Tab = createBottomTabNavigator();
const CusttomTab = ({ children , onPress }) => (
  <Pressable
    onPress={onPress}
    h={70}
    w={70}
    _pressed={{bg:Colors.black}}
    rounded={"full"}
    top={-30}
    bg={Colors.main}
    shadow={2}
  >
    {children }
  </Pressable>
);
function ButtomNav() {
  const [userData, setUserData] = useState(null);

  const asyncFetchData=async()=>{
    const docRef = doc(db, 'test-users', auth.currentUser.uid);
    try{
      const docSnap = await getDoc(docRef);
      return docSnap.data();
    }
    catch(err){
      throw err;
    }
  }
  const setLocalUserData=()=>{
    asyncFetchData()
    .then((res)=>{
      setUserData(res);
    })
    .catch((err)=>{
      console.log(err);
    })
  }
  useEffect(() => {
    setLocalUserData();
  }, []);
  if(!userData) return null;
  return (
    <Tab.Navigator
      backBehavior="Main"
      initialRouteName="Main"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: { ...styles.tab },
        headerShown: false,
        showLabel:false,
        tabBarHideOnKeyboard: true,
      }}
      // screenOptions={{
      //     headerShown: false,
      //     tabBarActiveTintColor: '#1a3c43',
      //     tabBarInactiveTintColor: '#1a3c43',
      //     tabBarActiveBackgroundColor: 'white',
      //     tabBarInactiveBackgroundColor: '#1a3c43',
         
      //     tabBarHideOnKeyboard: true,
   
      //     tabBarstyle: {
      //         backgroundColor: '#1a3c43',
      //         paddingBottom: 3
      //     }
      // }}
    >
      {/* Home */}
      <Tab.Screen
        name="Main"
        // component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Center>
              {focused ? (
                <Entypo name="home" size={24} color={Colors.main} />
              ) : (
                <AntDesign name="home" size={24} color={Colors.black} />
              )}
            </Center>
          ),
        }}
      >
        {()=><HomeScreen userData={userData} setLocalUserData={setLocalUserData} />}
      </Tab.Screen>
      {/* Cart */}
      <Tab.Screen
        name="Cart"
        // component={CartScreen}
        options={{
          tabBarButton: (props) => <CusttomTab {...props} />,
          tabBarIcon: ({ focused }) => (
            <Center>
              {focused ? (
                <FontAwesome5
                  name="shopping-basket"
                  size={24}
                  color={Colors.white}
                />
              ) : (
                <MaterialCommunityIcons
                  name="shopping-outline"
                  size={24}
                  color={Colors.white}
                />
              )}
            </Center>
          ),
        }}
      >
        {()=><CartScreen userData={userData} setLocalUserData={setLocalUserData}/>}
      </Tab.Screen>

      {/* Progile */}
      <Tab.Screen
        name="Profile"
        // component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Center>
              {focused ? (
                <FontAwesome name="user" size={24} color={Colors.main} />
              ) : (
                <AntDesign name="user" size={24} color={Colors.black} />
              )}
            </Center>
          ),
        }}
      >
        {()=><ProfileScreen userData={userData} setLocalUserData={setLocalUserData}/>}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tab: {
    elevation: 0,
    backgroundColor: Colors.white,
    height: 60,
  },
});
export default ButtomNav;
