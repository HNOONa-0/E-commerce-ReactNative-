import React from "react";
import { Box, Button, HStack, ScrollView ,Text } from 'native-base';
import { Colors } from "../../data/data";
import { Pressable } from "react-native";

const Orders = () => {
    return(
        <Box h='full' bg={Colors.white} pt={5} >
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Paid order */}
                <Pressable>
                    {/* color and size of text field */}
                    <HStack space={4} justifyContent="space-between" 
                    alignItems={"center"} bg={Colors.deepGray}
                    py={5} 
                    px={2}>
                        <Text fontSize={9} color={Colors.blue} isTruncated>
                            Ay7aga
                        </Text>
                        <Text fontSize={15} bold color={Colors.black} isTruncated>
                            PAID
                        </Text>
                        <Text fontSize={11} italic color={Colors.black} isTruncated>
                            April 4 2023
                        </Text>
                        <Button 
                            px={7} 
                            py={1.5} 
                            rounded={50} 
                            bg={Colors.main} 
                            _text={{color:Colors.white}} 
                            _pressed={{bg: Colors.main}}>
                                $500
                        </Button> 
                    </HStack>
                </Pressable>
                {/* Not Paid */}
                <Pressable>
                    {/* color and size of text field */}
                    <HStack space={4} justifyContent="space-between" 
                    alignItems={"center"} 
                    py={5} 
                    px={2}>
                        <Text fontSize={9} color={Colors.blue} isTruncated>
                            Ay7aga
                        </Text>
                        <Text fontSize={15} bold color={Colors.black} isTruncated>
                            NOT PAID
                        </Text>
                        <Text fontSize={11} italic color={Colors.black} isTruncated>
                            JUN 1 2020
                        </Text>
                        <Button 
                            px={7} 
                            py={1.5} 
                            rounded={50} 
                            bg={Colors.red} 
                            _text={{color:Colors.white}} 
                            _pressed={{bg: Colors.red}}>
                                $23
                        </Button> 
                    </HStack>
                </Pressable>

            </ScrollView>
        </Box>
    )
}

export default Orders