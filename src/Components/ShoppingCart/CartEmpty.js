import { View, Box, Center, Text } from "native-base";
import React from "react";
import { products, Colors } from "../../data/data";
import Buttone from "../Buttone";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";


const CartEmpty = () => {
  const navegation = useNavigation();

  return (
    <Box flex={1} >
      <Center h="90%">
        <Center w={200} h={200} bg={Colors.white} rounded="full">
        <FontAwesome5 name="shopping-basket" size={64} color={Colors.main} />
        </Center>
        <Text color={Colors.main} bold mt={5}>
          CART IS EMPTY
        </Text>
      </Center> 
    </Box>
  );
};

export default CartEmpty;
