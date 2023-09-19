import {
  Box,
  ScrollView,
  Image,
  Heading,
  HStack,
  Spacer,
  Text,
  Button,
} from "native-base";
import { React, useEffect, useState } from "react";
import NumericInput from "react-native-numeric-input";
import { Colors } from "../data/data";
import { useNavigation } from "@react-navigation/native";
import Rating from "../Components/Rating";
import Review from './../Components/SingleProduct/Review';
import { auth, db, getUser, updateUser } from "../../firebase";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import WriteReview from "../Components/SingleProduct/WriteReview";

function addToCart(cart,product,buyAm) {
  // Check if the product already exists in the cart
  const {id,quantity,price}=product;
  const existingProductIndex = cart.findIndex(eachProd => eachProd.id === id);
  
  if (existingProductIndex >= 0) {
    // If the product already exists, update the quantity and price
    if(cart[existingProductIndex].quantity+buyAm>product.quantity) 
      throw `The total quantity cannot to be bought cannot exceed ${product.quantity}, you were trying to buy ${cart[existingProductIndex].quantity+buyAm}`;
    cart[existingProductIndex].quantity++;
  } else {
    // If the product does not exist, add it to the cart
    if(buyAm>product.quantity)
      throw `The total quantity cannot to be bought cannot exceed ${product.quantity}, you were trying to buy ${buyAm}`;
    cart.push({...product,quantity:buyAm,maxQuantity:product.quantity} );
  }
  return cart;
}

// Function to remove a product from the cart
function SingleProductScreen({route}) {
  const {product,userData,setLocalUserData,updateProducts}=route.params;
  const[buyAm,setBuyAm] = useState(0);
  const[cart,setCart]=useState(userData.cart);
  const[loading,setLoading]=useState(false);
  // console.log(cart);
  // console.log(product.reviews.length);
  // const navegation = useNavigation();
  // console.log(product.reviews);
  // console.log(buyAm);

  const asyncAddToCart=async()=>{
    if(buyAm===0){
      throw "The quantity to be bought must be a number > 0"
    };
    try{
      const docRef=doc(db,'test-users',auth.currentUser.uid);
      const newCart=addToCart([...cart],product,buyAm);
      // console.log(newCart);
      const res=await updateDoc(docRef,{cart:newCart} );
      return res;
    }catch(err){
      throw err;
    }
  }
  const updateData=()=>{
    setLoading(true);
    asyncAddToCart()
        .then((res)=>{
            console.log("succesfully added to cart");
            setLocalUserData();
            setLoading(false);
        })
        .catch((err)=>{
            setLoading(false);
            alert(err);
        })
  }
  useEffect(()=>{
    setCart(userData.cart);
  },[userData])
  return (
    <Box safeArea flex={1} bg={Colors.white}>
      <ScrollView px={5} showsVerticalScrollIndicator={false}>
        <Image
          source={{uri : product.image}}
          alt="Product Image"
          w="full"
          h={300}
          resizeMode="contain"
        />

        <Heading bold fontSize={15} mb={2} lineHeight={22}>
          {product.name}
        </Heading>

        <Rating value={product.rating}  text={`${product.reviews?.length} review(s)`} />

        {product.quantity>0?<Text>{product.quantity} in Stock</Text>:null}
        <HStack space={2} alignItems="center" my={5}>
          {
            product.quantity > 0 ? 
            // null
            (
              <NumericInput
                totalWidth={140}
                totalHeight={30}
                value={buyAm}
                minValue={0}
                maxValue={product.quantity}
                onChange={(value)=>setBuyAm(value)}
                iconSize={25}
                step={1}
                borderColor={Colors.deepGray}
                rounded
                textColor={Colors.black}
                iconStyle={{ color: Colors.white }}
                rightButtonBackgroundColor={Colors.main}
                leftButtonBackgroundColor={Colors.main}
              />
            ) 
            : (   
            <Heading bold color={Colors.red} italic fontSize={12}>
              Out Of Stock
            </Heading>
            )
          }

          <Heading bold color={Colors.black} fontSize={19}>
            {product.price}$
          </Heading>
        </HStack>

        <Text lineHeight={24} fontSize={12}>
          {product.descrption}
        </Text>

        <Button bg={Colors.main} color={Colors.white} mt={10}
          onPress={()=>{
            updateData();
          }}
          isDisabled={product.quantity===0 || loading}
        >
          ADD TO CART
        </Button>
        <Box my={9}>
        <Heading bold fontSize={15} mb={2}>
          Reviews
        </Heading>
          {product.reviews.map((eachReview,i)=>{
            return(
              <Review 
                key={i} rating={eachReview.rating} text={eachReview.text}
                reviewerName={eachReview.reviewerName} date={eachReview.date}
              />
            )
          })}
        </Box>
        <WriteReview product={product} userData={userData} setLocalUserData={setLocalUserData} updateProducts={updateProducts}/>
      </ScrollView>
    </Box>
  );
}

export default SingleProductScreen;
