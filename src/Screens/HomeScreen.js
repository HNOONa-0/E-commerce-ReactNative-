import { Box } from 'native-base';
import { React, useEffect, useState } from 'react';
import { Colors, appProducts, myProducts } from "../data/data";
import HomeSearch from '../Components/HomePage/HomeSearch';
import HomeProducts from '../Components/HomePage/HomeProducts';
import { db, getProducts, uploadProducts } from '../../firebase';
import { addDoc, collection, getDoc, getDocs } from 'firebase/firestore';

function HomeScreen({userData, setLocalUserData,products,setProducts,updateProducts}) {
  const[searchText,setSearchText]=useState("")
  
  
  return (
    <Box flex={1} bg={Colors.lavender} >
      <HomeSearch 
        searchText={searchText}
        setSearchText={setSearchText}
        userData={userData} 
        setLocalUserData={setLocalUserData}
      />
      <HomeProducts 
        searchText={searchText}
        setSearchText={setSearchText}
        products={products}
        updateProducts={updateProducts}
        userData={userData}
        setLocalUserData={setLocalUserData}
      />
    </Box>
  );
}

export default HomeScreen ;