import { Box, Center, Heading, Image, Text, VStack } from "native-base";
import { React } from "react";
import { Colors } from "../data/data";
import Buttone from "./../Components/Buttone";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../../firebase";

function NotVerfityScreen({ navigation }) {

  return (
    <Box flex={1} bg={Colors.main} safeAreaTop>
      <Center w={"full"} h={250}>
        <Image
          source={require("../../assets/icons.jpg")}
          alt="logo"
          size={"lg"}
        />
      </Center>
      <VStack space={6} px={5} alignItems={"center"}>
        <Heading color={Colors.lavender}>Welcome to our app.</Heading>
        <Text color={Colors.lavender} fontSize={20}>
          You have to prove you are one of us first.
        </Text>
        <Buttone
          bg={Colors.white}
          color={Colors.black}
          childern={"Register"}
          onPress={() => {
            navigation.navigate("Register");
          }}
        />
        <Buttone
          bg={Colors.white}
          color={Colors.black}
          childern={"Login"}
          onPress={() => {
            navigation.navigate("Login");
          }}
        />
      </VStack>
    </Box>
  );
}

export default NotVerfityScreen;
