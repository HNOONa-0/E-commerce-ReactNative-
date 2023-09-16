import { Box, Center, Text, ScrollView, Button, HStack } from "native-base";
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

function CartScreen() {
  const navegation = useNavigation();
  const[cart,setCart]=useState([]);

  useEffect(() => {
    if(!auth.currentUser) return;
  
    const docRef=doc(db, 'test-users', auth.currentUser.uid);

    const unsubscribe = onSnapshot(docRef,(doc)=>{
      const res=doc.data();
      setCart(res.cart);
    })
    return () => unsubscribe();
  }, [auth.currentUser]);
  let price=0;
  for(let i=0;i<cart.length;i++)price+=(cart[i].quantity*cart[i].price);

  return (
    <Box flex={1} safeAreaTop bg={Colors.lavender}>
      {/* The Header Of The Page */}
      <Center w="full" py={5}>
        <Text color={Colors.black} fontSize={20} bold>
          Cart
        </Text>
      </Center>

      {/* if cart empty*/}
      {/* <CartEmpty/>  */}

      <ScrollView showsVerticalScrollIndicator={false}>
        <CartItem 
          cart={cart}
          setCart={setCart}
        />
        <Center mt={2}>
          <HStack
            rounded={50}
            justifyContent="space-between"
            bg={Colors.white}
            shadow={2}
            w="90%"
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
          <Buttone
            bg={Colors.black}
            color={Colors.white}
            mt={100}
            childern={"CheckOut"}
            onPress={() => navegation.navigate("Shipping")}
          />
        </Center>
      </ScrollView>
    </Box>
  );
}

export default CartScreen;
