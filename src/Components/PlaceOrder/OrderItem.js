import { Box, Button, Center, FlatList, HStack, Pressable, Text, VStack, View, Image} from 'native-base';
import { React, useEffect, useState } from 'react';
// import { products } from '../../data/data';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { auth, db, getUser } from '../../../firebase';
import { collection } from 'firebase/firestore';

const[mb]=[3];
const[bg1,shadow1,rounded1,overflow1,mt1]=[Colors.white,1,10,"hidden",2];
const[w2,bg2]=["25%",Colors.deepGray];
const[w3,h3,resizeMode3]=["full",24,"contain"];
const[w4,px4]=["60%",2];
const[color5,fz5]=[Colors.black,14];
const[color6,mt6]=[Colors.lightBlack,2];
const[bg7,_pressed7,_text7]=[Colors.main,Colors.main,Colors.white];

const OrderItem=({})=>{
  const imageUrl = 'https://example.com/image.jpg';
  const[cart,setCart]=useState([] );
  useEffect(()=>{
    const ff=async()=>{
      const res=await getUser(db,'test-users',auth.currentUser.uid);
      setCart(res.cart);
    }
    ff();
  },[auth.currentUser.uid] )
  const products=cart;
  return (
    <FlatList
    showsHorizontalScrollIndicator={false}
    // data={apicall() }
    data={products}
    keyExtractor={item=>{
      // console.log(item.image);
      return item._id;
    }}
    renderItem={obj=>(
      // its item.item???
      // console.log(item.item)
      <Pressable>
        <Box>
          <HStack
            alignItems={"center"}
            bg={bg1}
            shadow={shadow1}
            rounded={rounded1}
            overflow={overflow1}
            mt={mt1}
          >
            <Center
              w={w2}
              bg={bg2}
            >
              <Image
                w={w3}
                h={h3}
                resizeMode={resizeMode3}
                source={{uri:obj.item.image}}
                alt={obj.item.name}
              />
            </Center>
            <VStack
              w={w4}
              px={px4}
            >
              <Text
                isTruncated
                color={color5}
                fontSize={fz5}
                bold
              >
                {obj.item.name}
              </Text>
              <Text
                color={color6}
                mt={mt6}
                bold
              >
                ${obj.item.price}
              </Text>
            </VStack>
            <Center>
              <Button
                // something off with colors here

                // this doesnt work
                // bg={bg7}
                // this does
                bg={"#000000"}

                // here the properties receive object not literals
                // _pressed={{bg:_pressed7}}
                _pressed={{bg:"#000000"}}
                // _text={{bg:_text7}}
                // _text={{bg:"#FFFFFF"}}
              >
                {obj.item.quantity}
              </Button>
            </Center>
          </HStack>
        </Box>
      </Pressable>
      )
    }
  />
  );
}

export default OrderItem ;