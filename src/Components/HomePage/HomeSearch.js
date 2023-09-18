import { Box, HStack, Pressable, Text, View } from "native-base";
import { React } from "react";
import { Colors } from "../../data/data";
import { Input } from "native-base";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { useState } from "react";
import { auth, db } from "../../../firebase";
import { doc, onSnapshot } from "firebase/firestore";

function HomeSearch({searchText,setSearchText,userData,setLocalUserData}) {
  const[cart,setCart]=useState(userData.cart);
  const navegation = useNavigation();
  let sum=0;
  for(let i=0;i<cart.length;i++)sum+=(cart[i].quantity);
  useEffect(() => {
    setCart(userData.cart);
  }, [userData]);
  return (
    <HStack
      space={3}
      w="full"
      px={6}
      py={4}
      alignItems="center"
      bg={Colors.main}
      safeAreaTop
    >
      <Input
        placeholder="Search Here ... "
        value={searchText}
        onChangeText={(text)=>{
          setSearchText(text);
        }}
        w="85%"
        bg={Colors.white}
        type="Search"
        variant={'filled'}
        h={12}
        borderWidth={0}
        _focus={{ bg: Colors.white }}
      />
      <Pressable m={3} onPress={()=>navegation.navigate("Cart")}>
        <FontAwesome5 name="shopping-basket" size={24} color={Colors.white} />
        <Box
          px={1}
          rounded={"full"}
          position={"absolute"}
          top={-15}
          left={5}
          bg={Colors.red}
          _text={{ color: Colors.white, fontSize: "11px" }}
        >
         {sum}
        </Box>
      </Pressable>
    </HStack>
  );
}

export default HomeSearch;