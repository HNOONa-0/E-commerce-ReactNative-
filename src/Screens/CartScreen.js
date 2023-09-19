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
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { getNowDate } from "../data/other";

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

function CartScreen({userData,setLocalUserData,updateProducts}) {
  const navegation = useNavigation();
  const[cart,setCart]=useState(userData.cart);
  const[loading,setLoading]=useState(false);

  let price=0;
  for(let i=0;i<cart.length;i++)price+=(cart[i].quantity*cart[i].price);

  const asyncUpdateProducts=async()=>{
    const productDocRefArr=[];
    for(let i=0;i<cart.length;i++) productDocRefArr.push(doc(db,'products',cart[i].id) );

    try{
      for(let i=0;i<cart.length;i++){
        const res=await updateDoc(productDocRefArr[i], {quantity:cart[i].maxQuantity-cart[i].quantity} );
      }  
    }
    catch(err){
      throw err;
    }
    return true;
  }
  const onCheckout=async()=>{
    // this should be a transaction, this needs alot of work
    setLoading(true);

    const userDocRef=doc(db,'test-users',auth.currentUser.uid);
    const cartForOrder=[...cart];
    for(let i=0;i<cartForOrder.length;i++) delete cartForOrder[i].maxQuantity;
    const ok=true;
    
    updateDoc(userDocRef, {
      cart:[]
      ,orders:[{cart:cartForOrder,date:getNowDate(),debit:Math.min(0,userData.credit-price)} ]
      ,credit:userData.credit-price} )
      .then(res=>{
        console.log("success add to order")
        setLocalUserData();
      })
      .catch(err=>{
        alert(err);
        ok=false;
      })
    if(!ok){
      setLoading(false);
      return;
    }


    const productDocRefArr=[];
    for(let i=0;i<cart.length;i++) productDocRefArr.push(doc(db,'products',cart[i].id) );

    const map=new Map();
    for(let i=0;i<cart.length;i++)map.set(cart[i].productId,{quantity:cart[i].maxQuantity-cart[i].quantity} )

    asyncUpdateProducts()
      .then(res=>{
        console.log("succesfully update all products");
        updateProducts(map);
        setLoading(false);
      })
      .catch(err=>{
        // something went wrong, we need to undo previous transaction, there must be a better way to do this
        alert(err);
        setLoading(false);
      })
  }
  useEffect(() => {
    setCart(userData.cart);
  }, [userData]);
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
              isDisabled={cart.length===0||loading}
            />
          </View>
        </Center>
      </ScrollView>
    </Box>
  );
}

export default CartScreen;
