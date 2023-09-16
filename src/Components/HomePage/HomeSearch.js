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

function HomeSearch({searchText,setSearchText}) {
  const[cart,setCart]=useState(0);
  // works
  const navegation = useNavigation();
  useEffect(() => {
    if(!auth.currentUser) return;
  
    const docRef=doc(db, 'test-users', auth.currentUser.uid);

    const unsubscribe = onSnapshot(docRef,(doc)=>{
      const res=doc.data();
      setCart(res.cart);
    })
    return () => unsubscribe();
  }, [auth.currentUser]);
  let sum=0;
  
    
    for(let i=0;i<cart.length;i++)sum+=(cart[i].quantity);
  
  
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