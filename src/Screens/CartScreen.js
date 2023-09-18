import { Box, Center, Text, ScrollView, Button, HStack, View } from "native-base";
import CartItem from "../Components/ShoppingCart/CartItems";
import CartEmpty from "../Components/ShoppingCart/CartEmpty";
import { React } from "react";
import { products, Colors } from "../data/data";
import Buttone from "../Components/Buttone";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useEffect } from "react";
import { useState } from "react";
import { auth, db } from "../../firebase";
import { doc, onSnapshot } from "firebase/firestore";

function removeFromCart(cart,product) {
  // Find the index of the product in the cart
  const {id,quantity,price}=product;
  const productIndex = cart.findIndex(eachProd => eachProd.id === id);
  
  if (productIndex >= 0) {
    // If the product exists in the cart, decrement the quantity by 1
    cart[productIndex].quantity--;
    
    // If the quantity is now 0, remove the product from the cart
    if (cart[productIndex].quantity === 0) {
      cart.splice(productIndex, 1);
    }
  }
  return cart;
}

function CartScreen({userData,setLocalUserData}) {
  const navegation = useNavigation();
  const[cart,setCart]=useState(userData.cart);

  // useEffect(() => {
  //   if(!auth.currentUser) return;
  
  //   const docRef=doc(db, 'test-users', auth.currentUser.uid);

  //   const unsubscribe = onSnapshot(docRef,(doc)=>{
  //     const res=doc.data();
  //     setCart(res.cart);
  //   })
  //   return () => unsubscribe();
  // }, [auth.currentUser]);
  const onCheckout=()=>{
    // const docRef=doc(db,'test-users',auth.currentUser.uid);
    // const newCart=addToCart([...cart],product,buyAm);
    // console.log(newCart);
    // const res=await updateDoc(docRef,{cart:newCart} );
  }
  useEffect(() => {
    setCart(userData.cart);
  }, [userData]);
  let price=0;
  for(let i=0;i<cart.length;i++)price+=(cart[i].quantity*cart[i].price);
  return (
    <Box flex={1} safeAreaTop bg={Colors.lavender}>
      {/* The Header Of The Page */}
      <Center w="full" py={5}>
        {/* <Text color={Colors.black} fontSize={20} bold>
          Cart
        </Text> */}
      </Center>

      {/* if cart empty*/}
      {cart.length===0?
        <CartEmpty/>:
        <CartItem 
          cart={cart}
          setCart={setCart}
          userData={userData}
          setLocalUserData={setLocalUserData}
        /> 
      }
      <ScrollView showsVerticalScrollIndicator={false}>
        <Center mt={2}>
          <HStack
            rounded={50}
            justifyContent="space-between"
            bg={Colors.white}
            shadow={2}
            w="80%"
            pl={5}
            h={45}
            alignItems="center"
          >
            <Text pl={5}>Total </Text>
            <Button
              px={10}
              h={45}
              rounded={50}
              bg={Colors.main}
              _text={{
                color: Colors.white,
                fontWeight: "semibold",
              }}
              _pressed={{
                bg: Colors.main,
              }}
            >
              {price+"$"}
            </Button>
          </HStack>
          <HStack
            mt={2}
            rounded={50}
            justifyContent="space-between"
            bg={Colors.white}
            w="80%"
            pl={5}
            h={45}
            alignItems="center"
          >
            <Text pl={5}>Credit</Text>
            <Button
              px={10}
              h={45}
              rounded={50}
              backgroundColor={userData.credit>price?"green.400":"red.400"}
              // bg={Colors.main} 
              _text={{
                color: Colors.white,
                fontWeight: "semibold",
              }}
              _pressed={{
                bg: Colors.main,
              }}
            >
              {userData.credit+"$"}
            </Button>
          </HStack>
          <View
            w="60%"
          >
            <Buttone
              bg={Colors.black}
              color={Colors.white}
              mt={50}
              childern={"CheckOut"}
              // childern={userData.credit<price?"Not enough credit":"CheckOut"}
              // isDisabled={price===0||userData.credit<price?true:false}
              // onPress={() => navegation.navigate("Shipping",{userData,setLocalUserData} )}
              onPress={() => onCheckout()}
            />
          </View>
        </Center>
      </ScrollView>
    </Box>
  );
}

export default CartScreen;
