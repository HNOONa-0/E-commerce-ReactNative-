import {
  Button,
  Center,
  HStack,
  Modal,
  VStack,
  View,
  Text,
  Image,
} from "native-base";
import React, { useState } from "react";
import { Colors, orderInfos } from "../../data/data";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

const [bg, color, mt] = [Colors.black, Colors.white, 5];
const [size1] = ["lg"];
const [maxWidth2] = [350];
const [space3] = [10];
const [color4, fz4, mb4] = [Colors.black, 14, 8];

const PlaceOrderModel = () => {
  const navegation = useNavigation();

  const [showModel, setShowModel] = useState(false);
  // cant use a buttone properly
  return (
    <Center>
      <Button
        onPress={() => setShowModel(true)}
        bg={Colors.main}
        color={color}
        mt={mt}
        w={"100%"}
        _pressed={{ bg: Colors.main }}
      >
        SHOW PAYMENT & TOTAL
      </Button>
      <Modal
        isOpen={showModel}
        onClose={() => setShowModel(false)}
        size={size1}
      >
        <Modal.Content maxWidth={maxWidth2}>
          <Modal.CloseButton />
          <Modal.Header>Order</Modal.Header>
          <Modal.Body>
            <VStack
              // space is not working
              space={space3}
              // style={{marginBottom:'10px'}}
            >
              {orderInfos.map((obj, i) => {
                return (
                  <HStack
                    key={i}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                  >
                    <Text fontWeight={"medium"}>{obj.title}</Text>
                    <Text
                      bold
                      color={obj.color === "main" ? Colors.main : Colors.black}
                      fontSize={fz4}
                      // mb={mb4}
                    >
                      ${obj.price}
                    </Text>
                  </HStack>
                );
              })}
            </VStack>
          </Modal.Body>
          <Modal.Footer>
            <Pressable
              w="full"
              justifyContent="center"
              bg={Colors.paypal}
              h={45}
              onPress={() => setShowModel(false)}
            >
              <Image
                source={require("../../../assets/paypal.png")}
                alt="paypal"
                resizeMode="cover"
                // cant set width to 100%
                // w="300"
                w={"full"}
                h={34}
              />
            </Pressable>
            <Button
              flex={1}
              bg={Colors.main}
              h={45}
              _text={{
                color: Colors.white,
              }}
              onPress={() => navegation.navigate("buttom")}
              _pressed={{
                bg: Colors.main,
              }}
            >
              PLACE AN ORDER
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Center>
  );
};
export default PlaceOrderModel;
