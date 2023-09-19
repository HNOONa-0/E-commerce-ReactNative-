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
import { Colors, appProducts } from "../../data/data";
import { StyleSheet } from "react-native";
import ProfileScreen from "../../Screens/ProfileScreen";
import CartScreen from "../../Screens/CartScreen";
import { addDoc, collection, doc, getDoc, getDocs } from "firebase/firestore";
import { auth, db } from "../../../firebase";
import Loader from "../Login&SignUp/Loader";

// const productsColRef=collection(db,'products');
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

  const setLocalUserData=()=>{
    const docRef = doc(db, 'test-users', auth.currentUser.uid);
    getDoc(docRef)
    .then((docSnap)=>{
      console.log('succesfully got user data' );
      setUserData(docSnap.data() );
    })
    .catch((err)=>{
      console.log(err);
      throw 'couldnt fetch user data, please try agian later'
      alert(err);
    });
  }
  useEffect(() => {
    setLocalUserData();
  }, []);

  const[products,setProducts]=useState([]);
  // async better since we upload mul products
  const uploadProducts=async()=>{
    const colRef=collection(db,'products');
    try{
        for(let i=0;i<appProducts.length;i++)
          await addDoc(colRef,{...appProducts[i] } );
      }
      catch(err){
        throw err+". couldnt upload some products";
        alert(err);
      }
  }
  // async better since we call function twice
  const getProducts= async()=>{
    const colRef=collection(db,'products');
    try{
      const snapshot=await getDocs(colRef);
      if(!snapshot.docs.length )
        await uploadProducts()
        .then((res)=>{
          getProducts();
        })
        .catch((err)=>{
          throw err;
        });
      else{
        let newProducts=[];
        snapshot.docs.forEach((eachDoc)=>{
          newProducts.push({...eachDoc.data(),id:eachDoc.id} );
        })
        console.log(newProducts.length);
        setProducts(newProducts);
      }
    }
    catch(err){
      // throw err;
      alert(err);
    }
  }
  const updateProducts=(map)=>{
    const newProducts=[...products];
    for(let i=0;i<newProducts.length;i++){
        if(!map.has(newProducts[i].id) ) continue;
        newProducts[i]={...newProducts[i],...map.get(newProducts[i].id) };
    }
    console.log("succ update product")
    setProducts(newProducts);
  }
  useEffect(()=>{
    getProducts();
  },[]);
  
  if(!userData||!products.length ) return <Loader visible={true} />;
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
        {()=><HomeScreen userData={userData} setLocalUserData={setLocalUserData} products={products} setProducts={setProducts} updateProducts={updateProducts}/>}
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
        {()=><CartScreen userData={userData} setLocalUserData={setLocalUserData} updateProducts={updateProducts} />}
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
