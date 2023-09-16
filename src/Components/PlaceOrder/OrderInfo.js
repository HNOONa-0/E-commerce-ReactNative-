import { Box, Center, Heading, NativeBaseProvider, ScrollView, Text , View } from 'native-base';
import { React } from 'react';
const [bg,w,py,rounded,shadow,mb,ml,mr,px]=["white",200,2,10,4,2,5,1,4];
const [bg1,w1,h1,rounded1]=["green.500",60,60,"full"];
const [fz2,mt2,mb2,bg2]=[12,3,2,"black"];
const [bg3,w3,h3,rounded3]=["green.500",60,60,"full"];
const [fz4,col4]=[12,"black"];
const [py5,mt5,rounded5,w5,bg5]=[2,2,5,"full","blue.500"];
const [fz6,col6]=[12,"white"];
// const [py6,mt6,rounded6,w6,bg6]=[2,2,5,"full","red.500"];
const [py7,mt7,rounded7,w7,bg7]=[2,2,5,"full","red.500"];

const OrderInfo=({icon,title,subTitle,text,success,danger})=>{
  return (
    // takes full height, alignself:"flex-start" is a quick fix
    <Center
        bg={bg}
        // height={"40px"}
        // style={{
        //     alignSelf: "flex-start"
        // }}
        w={w}
        py={py}
        rounded={rounded}
        shadow={shadow}
        mb={mb}
        ml={ml}
        mr={mr}
        px={px}
    >
        <Center
            bg={"#000000"}
            w={w3}
            h={h3}
            rounded={rounded3}
        >
            {icon}
        </Center>
        <Heading
            bold
            isTruncated
            fontSize={fz2}
            mt={mt2}
            mb={mb2}
            color={bg2}
        >
            {title}
        </Heading>
        <Text
            fontSize={fz4}
            color={col4}
        >
            {subTitle}
        </Text>
        <Text
            fontSize={fz4}
            color={col4}
            textAlign={"center"}
            italic
        >
            {text}
        </Text>
        {success &&
            <Center
                py={py5}
                mt={mt5}
                rounded={rounded5}
                // have to change this to take full width
                w={w5}
                // w={"100%"}
                bg={bg5}
            >
                <Text
                    fontSize={fz6}
                    color={col6}
                >
                    Paid on Jan 12 2021.
                </Text>
            </Center>
        }
        {danger &&
            <Center
                py={py7}
                mt={mt7}
                rounded={rounded7}
                w={w7}
                bg={bg7}
            >
                <Text
                    // fontSize={fz8}
                    // color={col8}
                    fontSize={fz6}
                    color={col6}
                >
                    Not delivered.
                </Text>
            </Center>
        }
    </Center>
  );
}

export default OrderInfo ;