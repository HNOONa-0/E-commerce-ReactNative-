import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import LoginScreen from './screens/LoginScreen';
// import HomeScreen from './screens/HomeScreen';
import { NativeBaseProvider, StatusBar } from "native-base";
import HomeScreen from "./src/Screens/HomeScreen";
import PlaceOrderScreen from "./src/Screens/PlaceOrderScreen";
import ButtomNav from "./src/Components/HomePage/ButtomNav";
import CartScreen from "./src/Screens/CartScreen";
import LoginScreen from "./src/Screens/LoginScreen";
import NotVerfityScreen from "./src/Screens/NotVerfiyScreen";
import ProfileScreen from "./src/Screens/ProfileScreen";
import RegisterScreen from "./src/Screens/RegisterScreen";
import ShippingScreen from "./src/Screens/ShippingScreen";
import SingleProductScreen from "./src/Screens/SingleProductScreen";
import ForgetPasswordScreen from "./src/Screens/ForgetPasswordScreen";


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <StatusBar hidden={true} />
        <Stack.Navigator
          initialRouteName="NotVerfiy"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="PlaceOrderScreen" component={PlaceOrderScreen} />
          <Stack.Screen name="buttom" component={ButtomNav} />
          <Stack.Screen name="Cart" component={CartScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="ForgetPassword" component={ForgetPasswordScreen} />
          <Stack.Screen name="Shipping" component={ShippingScreen} />
          <Stack.Screen name="NotVerfiy" component={NotVerfityScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="SingleProduct" component={SingleProductScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
