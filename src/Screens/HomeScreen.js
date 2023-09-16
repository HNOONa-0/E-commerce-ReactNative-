import { Box } from 'native-base';
import { React, useEffect, useState } from 'react';
import { Colors } from "../data/data";
import HomeSearch from '../Components/HomePage/HomeSearch';
import HomeProducts from '../Components/HomePage/HomeProducts';
import { getProducts, uploadProducts } from '../../firebase';

function HomeScreen() {
  const[searchText,setSearchText]=useState("")

  const[products,setProducts]=useState([]);
  useEffect(()=>{    
    const initGetProduct = async()=>{
      await uploadProducts().catch((error) => {console.log("uploadProducts: ", error)});
      const res=await getProducts();
      setProducts(res);
    }
    initGetProduct().catch((error) => {console.log("initGetProduct: ", error)});;
  },[]);
  return (
    <Box flex={1} bg={Colors.lavender} >
      <HomeSearch 
        searchText={searchText}
        setSearchText={setSearchText}
      />
      <HomeProducts 
        searchText={searchText}
        setSearchText={setSearchText}
        products={products}
      />
    </Box>
  );
}

export default HomeScreen ;