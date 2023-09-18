import { Box } from 'native-base';
import { React, useEffect, useState } from 'react';
import { Colors, appProducts, myProducts } from "../data/data";
import HomeSearch from '../Components/HomePage/HomeSearch';
import HomeProducts from '../Components/HomePage/HomeProducts';
import { db, getProducts, uploadProducts } from '../../firebase';
import { addDoc, collection, getDoc, getDocs } from 'firebase/firestore';

function HomeScreen({userData, setLocalUserData}) {
  const[searchText,setSearchText]=useState("")

  const[products,setProducts]=useState([]);
  // useEffect(()=>{    
  //   const initGetProduct = async()=>{
  //     await uploadProducts().catch((error) => {console.log("uploadProducts: ", error)});
  //     const res=await getProducts();
  //     setProducts(res);
  //   }
  //   initGetProduct().catch((error) => {console.log("initGetProduct: ", error)});;
  // },[]);
  useEffect(()=>{
    const colRef=collection(db,'products');
    const uploadProducts=async()=>{
      for(let i=0;i<appProducts.length;i++){
        try{
          const res=await addDoc(colRef,{...appProducts[i] } );
        }
        catch(err){
          console.log("could not add product "+i);
        }
      }
      console.log("uploaded products succesfully");
    }
    const getProducts= async()=>{
      try{
        const snapshot=await getDocs(colRef);
        if(!snapshot.docs.length )
          await uploadProducts()
          .then((res)=>{
            getProducts();
          })
          .catch((err)=>{
            console.log('couldnt upload products');
          });
        else{
          const newProducts=[];
          snapshot.docs.forEach((eachDoc)=>{
            newProducts.push({...eachDoc.data(),id:eachDoc.id} );
          })
          // console.log(snapshot.docs.length);
          // console.log(newProducts);
          console.log(newProducts.length);
          setProducts(newProducts);
        }
      }
      catch(err){
        console.log(err);
      }
    }
    getProducts();
  },[]);
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
        userData={userData}
        setLocalUserData={setLocalUserData}
      />
    </Box>
  );
}

export default HomeScreen ;