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
  return (
    <Box p={3} bg={Colors.lavender} mt={5} rounded={5}>
      <Heading fontSize={15} color={Colors.black}>
        {reviewerName}
      </Heading>
      <Rating value={rating} />
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
  );
}
