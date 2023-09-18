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
    cart.push({...product,quantity:buyAm } );
  }
  return cart;
}

// Function to remove a product from the cart
function SingleProductScreen({route}) {
  const {product,userData,setLocalUserData}=route.params;
  const[buyAm,setBuyAm] = useState(0);
  const[cart,setCart]=useState(userData.cart);
  // const navegation = useNavigation();
  // console.log(product.reviews);
  // console.log(buyAm);

  // useEffect(() => {
  //   if(!auth.currentUser) return;
  //   const docRef=doc(db, 'test-users', auth.currentUser.uid);
    
  //   const unsubscribe = onSnapshot(docRef,(doc)=>{
  //     const res=doc.data();
  //     setCart(res.cart);
  //   })
  //   return () => unsubscribe();
  // }, [auth.currentUser]);
  const asyncAddToCart=async()=>{
    if(buyAm===0){
      throw "The quantity to be bought must be a number > 0"
    };
    try{
      const docRef=doc(db,'test-users',auth.currentUser.uid);
      const newCart=addToCart([...cart],product,buyAm);
      console.log(newCart);
      const res=await updateDoc(docRef,{cart:newCart} );
      return res;
    }catch(err){
      throw err;
    }
  }
  const updateData=(data)=>{
    asyncAddToCart(data)
        .then((res)=>{
            console.log("succesfully added to cart");
            setLocalUserData();
        })
        .catch((err)=>{
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

        {/* <Rating value={product.rating}  text={`${product.numReviews} reviews`} /> */}
        <Rating value={product.rating}  text={`${product.reviews?.length} review(s)`} />


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

          {/* <Spacer /> */}
          <Heading bold color={Colors.black} fontSize={19}>
            {product.price}$
          </Heading>
        </HStack>

        <Text lineHeight={24} fontSize={12}>
          {product.descrption}
        </Text>

        <Button bg={Colors.main} color={Colors.white} mt={10}
          onPress={()=>{
            // const ff=async()=>{
            //   const userData=await getUser(db,'test-users',auth.currentUser.uid).catch((error) => {console.log("getuser: ", error)});;
            //   const newCart=addToCart([...cart],product);
            //   const res=await updateUser(db,'test-users',auth.currentUser.uid,{...userData,cart:newCart}).catch((error) => {console.log("updateUser: ", error)});;
            //   setCart(newCart);
            // }
            // ff().catch((error) => {console.log("ff 4: ", error)});;
            updateData();
          }}
          isDisabled={product.quantity===0}
        >
          ADD TO CART
        </Button>
        {/* <Review {...product.reviews[0]}/> */}
        {product.reviews.map((eachReview,i)=>{
          return <Review key={i} rating={eachReview.rating} text={eachReview.text} reviewerName={eachReview.reviewerName} date={eachReview.date}/>
        })}
      </ScrollView>
    </Box>
  );
}

export default SingleProductScreen;
