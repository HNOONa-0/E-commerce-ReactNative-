import { Box, Flex, ScrollView, Text, View ,Pressable, Image, Heading } from 'native-base';
import React from 'react';
import { Colors, products } from '../../data/data';
import Rating from '../Rating';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { useState } from 'react';

function HomeProducts({searchText,setSearchText,products}) {
  const[displayProducts,setDisplayProducts]=useState([]);
  const navegation=useNavigation();
  useEffect(()=>{
    if(!products.length )return;
    setDisplayProducts(products.filter((product) => {
      return product.name.toLowerCase().includes(searchText);
    }) );
  },[searchText,products]);
  return (
    <ScrollView>
      <Flex flexWrap={'wrap'} direction='row' justifyContent={'space-between'} px={6}>
        {displayProducts.map((product) => {
          return (
            <Pressable onPress={()=>navegation.navigate("SingleProduct",product)} key={product.id} w="47%" bg={Colors.white} rounded={'md'} shadow={2} pt={0.3} my={3} pb={2} overflow={'hidden'} >
              <Image source={{uri:product.image}} alt={product.name} w={'full'} h={24} resizeMode='contain' />
              <Box px={4} pt={1} >
              <Heading size={'sm'}  bold >
                $ {product.price}
                </Heading>
                <Text fontSize={10} mt={1} isTruncated w={'full'}> 
                {product.name} 
                </Text>
                {/* Rating Part */}
                <Rating value={product.rating}/>
              </Box>
            </Pressable>
          );
        })}
      </Flex>
    </ScrollView>
  );
}

export default HomeProducts;
