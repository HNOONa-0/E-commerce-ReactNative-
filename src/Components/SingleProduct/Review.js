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
import Rating from "../Rating";
import Message from "./Message";
import { Colors } from "../../data/data";

export default function Review(review ) {
  // const { rate, setRate } = useState("");
  // const { comment, setComment } = useState("");
  const {rating,text,reviewerName,date}=review;
  // console.log(review);
  const onSubmit=()=>{

  }
  return (
    <Box my={9}>
      <Heading bold fontSize={15} mb={2}>
        Reviews
      </Heading>

      {/* If There's No Review */}
      {/* <Message
        color={Colors.main}
        bg={Colors.deepGray}
        size={10}
        children={"Make the first review on this product"}
        bold
      /> */}

      <Box p={3} bg={Colors.lavender} mt={5} rounded={5}>
        <Heading fontSize={15} color={Colors.black}>
          {reviewerName}
        </Heading>
        <Rating value={4} />
        <Text my={2} fontSize={11}>
          {date}
        </Text>
        <Message
          color={Colors.black}
          bg={Colors.white}
          size={12}
          children={
            text
          }
        />
      </Box>

      {/* Write Review */}
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
              selectedValue={rating}
            >
              <Select.Item label="1 - Poor" value="1" />
              <Select.Item label="2 - Fair" value="2" />
              <Select.Item label="3 - Average" value="3" />
              <Select.Item label="4 - Good" value="4" />
              <Select.Item label="5 - Excellent" value="5" />
            </Select>
          </FormControl>

          <FormControl>
            <FormControl.Label
              _text={{
                fontSize: "12px",
                fontWeight: "bold",
              }}>
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
              value={"cancer"}
            />
          </FormControl>

          <Buttone bg={Colors.main} color={Colors.white} childern={"Submit"} onPress={onSubmit}/>
          {/* If not logged in */}
          {/* <Message 
            color={Colors.white}
            bg={Colors.black}
            children={"Please login to wrtie a review"}
          /> */}
        </VStack>
      </Box>
    </Box>
  );
}
