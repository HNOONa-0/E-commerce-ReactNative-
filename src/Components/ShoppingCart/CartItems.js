import {
  Image,
  HStack,
  Pressable,
  Box,
  Center,
  Text,
  VStack,
  Button,
  IconButton,
  Icon,
} from "native-base";
import { SwipeListView } from "react-native-swipe-list-view";
import React from "react";
import FontAwesome, { FontAwesome5 } from "@expo/vector-icons";
import { Colors } from "../../data/data";
import { useState } from "react";
import { useEffect } from "react";
import { auth, db, getUser, updateUser } from "../../../firebase";
import { doc, updateDoc } from "firebase/firestore";

function removeFromCart(cart,product) {
  // Find the index of the product in the cart
  const {id,quantity,price}=product;
  const productIndex = cart.findIndex(eachProd => eachProd.id === id);
  let newCart;
  if (productIndex >= 0) {
    newCart = [...cart]; // Create a new array with the same elements as the original cart
    newCart[productIndex] = { ...newCart[productIndex], quantity: newCart[productIndex].quantity - 1 };

    if (newCart[productIndex].quantity === 0) {
      newCart.splice(productIndex, 1);
    }
  }
  return newCart; // Return the new array
}
const CartItem = ({cart,setCart,userData, setLocalUserData}) => {
  const products=cart;

  const Swiper = () => (
    <SwipeListView
      rightOpenValue={-50}
      previewRowKey="0"
      previewOpenValue={-40}
      previewOpenDelay={-3000}
      data={products }
      renderItem={renderItems}
      renderHiddenItem={renderHiddenItems}
      showsVerticalScrollIndicator={false}
    />
  );

  const renderItems = (data) => (
    <Pressable>
      <Box ml={6} mb={3}>
        <HStack
          alignItems="center"
          bg={Colors.white}
          shadow={1}
          rounded={10}
          overflow="hidden"
        >
          <Center w="25%" bg={Colors.lavender}>
            <Image
              source={{ uri: data.item.image }}
              alt={data.item.name}
              w="full"
              h={24}
              resizeMode="contain"
            />
          </Center>

          <VStack w="60%" px={2} space={2}>
            <Text isTruncated color={Colors.black} bold fontSize={10}>
              {data.item.name}
            </Text>
            <Text bold color={Colors.blue}>
              ${data.item.price}
            </Text>
          </VStack>

          <Center>
            <Button
              bg={Colors.main}
              _pressed={{ bg: Colors.main }}
              _text={{
                color: Colors.white,
              }}
            >
              {data.item.quantity}
            </Button>
          </Center>
        </HStack>
      </Box>
    </Pressable>
  );
  const asyncRemoveFromCart=async(data)=>{
    try{
      const docRef=doc(db,'test-users',auth.currentUser.uid);
      const newCart=removeFromCart([...cart],data.item);
      // console.log(newCart);
      const res=await updateDoc(docRef,{cart:newCart} );
      return res;
    }catch(err){
      throw err;
    }
  }
  const updateData=(data)=>{
    asyncRemoveFromCart(data)
        .then((res)=>{
            console.log("succesfully removed from cart");
            setLocalUserData();
        })
        .catch((err)=>{
            alert(err);
        })
  }
  const renderHiddenItems = (data) => (
    <Pressable
      w={50}
      roundedTopRight={10}
      roundedBottomRight={10}
      h="88%"
      ml="auto"
      justifyContent="center"
      bg={Colors.red}
      onPress={()=>updateData(data)}
    >
      <Center alignItems="center" space={2}>
        <FontAwesome5 name="trash" size={30} color={Colors.white} />
      </Center>
    </Pressable>
  );

  return (
    <Box mr={6}>
      <Swiper />
    </Box>
  );
};

export default CartItem;
