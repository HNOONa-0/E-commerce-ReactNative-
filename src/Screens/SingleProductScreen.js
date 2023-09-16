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
import { doc, onSnapshot } from "firebase/firestore";

function addToCart(cart,product) {
  // Check if the product already exists in the cart
  const {id,quantity,price}=product;
  const existingProductIndex = cart.findIndex(eachProd => eachProd.id === id);
  
  if (existingProductIndex >= 0) {
    // If the product already exists, update the quantity and price
    cart[existingProductIndex].quantity++;
  } else {
    // If the product does not exist, add it to the cart
    cart.push({...product,quantity:1});
  }
  return cart;
}

// Function to remove a product from the cart
function SingleProductScreen({route}) {
  const { value, setValue } = useState(0);

  const[cart,setCart]=useState([]);
  const navegation = useNavigation();
  const product = route.params;

  useEffect(() => {
    if(!auth.currentUser) return;
    const docRef=doc(db, 'test-users', auth.currentUser.uid);
    
    const unsubscribe = onSnapshot(docRef,(doc)=>{
      const res=doc.data();
      setCart(res.cart);
    })
    return () => unsubscribe();
  }, [auth.currentUser]);
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

        <Rating value={product.rating}  text={`${product.numReviews} reviews`} />


        <HStack space={2} alignItems="center" my={5}>
          {
            product.quantity > 0 ? 
            null
            // (
            //   <NumericInput
            //   value={value}
            //   totalWidth={140}
            //   totalHeight={22}
            //   iconSize={25}
            //   step={1}
            //   maxValue={product.quantity}
            //   minValue={0}
            //   borderColor={Colors.deepGray}
            //   rounded
            //   textColor={Colors.black}
            //   iconStyle={{ color: Colors.white }}
            //   rightButtonBackgroundColor={Colors.main}
            //   leftButtonBackgroundColor={Colors.main}
            // />
            // ) 
            : (   
            <Heading bold color={Colors.red} italic fontSize={12}>
              Out Of Stock
            </Heading>
            )
          }

          {/* <Spacer /> */}
          <Heading bold color={Colors.black} fontSize={19}>
            {product.price}
          </Heading>
        </HStack>

        <Text lineHeight={24} fontSize={12}>
          {product.descrption}
        </Text>

        <Button bg={Colors.main} color={Colors.white} mt={10}
          onPress={()=>{
            const ff=async()=>{
              const userData=await getUser(db,'test-users',auth.currentUser.uid).catch((error) => {console.log("getuser: ", error)});;
              const newCart=addToCart([...cart],product);
              const res=await updateUser(db,'test-users',auth.currentUser.uid,{...userData,cart:newCart}).catch((error) => {console.log("updateUser: ", error)});;
              setCart(newCart);
            }
            ff().catch((error) => {console.log("ff 4: ", error)});;
          }}
        >
          ADD TO CART
        </Button>
 
        <Review />
      </ScrollView>
    </Box>
  );
}

export default SingleProductScreen;
