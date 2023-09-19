import React from "react";
import { Box, Button, HStack, ScrollView ,Text } from 'native-base';
import { Colors } from "../../data/data";
import { Pressable } from "react-native";

const Orders = ({userData,setlocalUserData}) => {
    // console.log(userData.orders);
    // console.log(userData.orders[0].date);
    // console.log(userData.orders[0].cart);
    return(
        <Box h='full' bg={Colors.white} pt={5} >
            <ScrollView showsVerticalScrollIndicator={false}>
                {userData.orders.map((eachOrder,i)=>{
                    const{cart,debit,date}=eachOrder;
                    let price=0;
                    for(let i=0;i<cart.length;i++) price+=cart[i].quantity*cart[i].price;
                    return(
                        <Pressable>
                            {/* color and size of text field */}
                            <HStack space={4} justifyContent="space-between" 
                            alignItems={"center"} bg={Colors.deepGray}
                            py={5} 
                            px={2}>
                                <Text fontSize={9} color={Colors.blue} isTruncated>
                                    items
                                </Text>
                                <Text fontSize={15} bold color={Colors.black} isTruncated>
                                    {debit<0?"UNPAID":"PAID"}
                                </Text>
                                <Text fontSize={11} italic color={Colors.black} isTruncated>
                                    {date}
                                </Text>
                                <Button 
                                    px={7} 
                                    py={1.5} 
                                    rounded={50}
                                    bg={debit<0?Colors.red:Colors.main} 
                                    _text={{color:Colors.white}} 
                                    _pressed={{bg: Colors.main}}
                                >
                                        {price+"$"}
                                </Button> 
                            </HStack>
                        </Pressable>        
                    )
                })}
            </ScrollView>
        </Box>
    )
}

export default Orders


