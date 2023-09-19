import React, { useState } from "react";
import {
  Box,
  CheckIcon,
  FormControl,
  Heading,
  Select,
  Text,
  TextArea,
  VStack,
} from "native-base";
import Buttone from "../Buttone";
import { Colors } from "../../data/data";
import { auth, db } from "../../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const WriteReview=({product,userData,setLocalUserData,updateProducts} )=>{
  const[userRate,setUserRate]=useState(1);
  // const[userComment,setUserComment]=useState("The Seraphina Wand is a beautiful and well-made wand, but it's not without its flaws. The wood is smooth and polished, and the core is sturdy and powerful. However, the wand is a bit on the heavy side, and it can be difficult to control for beginners. Additionally, the wand is a bit too flashy for my taste. I prefer a more understated wand")
  const[userComment,setUserComment]=useState();
  const[loading,setLoading]=useState(false);

  const productId=product.id;

  const possibleRates=['1 - Poor', '2 - Fair', '3 - Average', '4 - Good', '5 - Excellent'];
  const formatDate=()=>{
    const today = new Date();
    // Get the month, day, and year
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const year = today.getFullYear();
    const monthName = new Date(today.getFullYear(), month - 1, 1).toLocaleString('default', { month: 'long' });
    // Format the date string
    const formattedDate = `${monthName.slice(0,Math.min(monthName.length,3) )} ${day} ${year}`;
    
    // Return the formatted date string
    return formattedDate;
  }
  const onSubmit=()=>{
    setLoading(true);
    const rating=userRate;
    const text=userComment;
    const userId=auth.currentUser.uid;
    const reviewerName=userData.firstName+' '+userData.lastName;
    const date=formatDate();
    const docRef=doc(db,'products',productId);

    // need to update products in homescreen
    const obj={reviews:[...product.reviews, {
      rating,text,userId,reviewerName,date
    }]};
    updateDoc(docRef,obj)
      .then(res=>{
        console.log('uploaded review succesfully')
        alert("added review refresh to see it");
        const map=new Map();
        map.set(productId,obj);
        updateProducts(map);
        setLoading(false);
      })
      .catch(res=>{
        alert(res);
        setLoading(false);
      })
  }
    return (
        <Box mt={6}>
        <Heading fontSize={15} bold mb={4}>
          REVIEW THIS product
        </Heading>
        <VStack space={6}>
          <FormControl>
            <FormControl.Label
              _text={{
                fontSize: "12px",
                fontWeight: "bold",
              }}>
              Rating
            </FormControl.Label>

            <Select
              bg={Colors.lavender}
              borderWidth={0}
              rounded={5}
              py={4}
              placeholder="Choose Rate"
              _selectedItem={{
                bg: Colors.lavender,
                endIcon: <CheckIcon size={3} />,
              }}
              onValueChange={(value)=>setUserRate(value) }
              selectedValue={userRate}
            >
              {possibleRates.map((eachRate,i)=>{
                return (
                  <Select.Item key={eachRate} label={eachRate} value={i+1} />
                )
              })}
            </Select>
          </FormControl>

          <FormControl>
            <FormControl.Label
              _text={{
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              Comment
            </FormControl.Label>

            <TextArea
              h={20}
              w="full"
              placeholder="This is an awesome product ...."
              borderWidth={0}
              bg={Colors.lavender}
              py={4}
              _focus={{
                bg: Colors.lavender,
              }}
              onChangeText={(text)=>setUserComment(text) }
              value={userComment}
            />
          </FormControl>
          <Buttone mb={6} mt={0} bg={Colors.main} color={Colors.white} childern={"Submit"} onPress={()=>onSubmit()} isDisabled={loading}/>
        </VStack>
      </Box>
    )
}
export default WriteReview;