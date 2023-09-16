import { React } from "react";
import { Box, Button, Heading, Image, Input, Pressable, VStack, Text } from "native-base";
import { Colors } from "../data/data";
import { useState } from "react";
import Inputs from "../Components/Login&SignUp/Inputs"
import Loader from "../Components/Login&SignUp/Loader";
 import Buttone from "../Components/Buttone";
 import { sendPasswordResetEmail } from "firebase/auth";
 import { auth } from "../../firebase";



const ForgetPasswordScreen = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});


  const validate = async () => {
    let isValid = true;
    if (!inputs.email) {
      handleError("please enter the email. ", "email");
      isValid = false;
    } else if (inputs.email.match(/\s+@\s+\.\s+/)) {
      handleError("please enter valid email. ", "email");
      isValid = false;
    }
    if (isValid)
    handlerest();
  };

  const handleError = (text, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: text }));

  };
  const handleOnChange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));

  };

  const handlerest = () => {
    sendPasswordResetEmail(auth, inputs.email)
    .then(() => {
      alert("Email has been sent successfully")
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
    setLoading(true);
    navigation.navigate('Login');
  }


  return (
    <Box flex={1} bg={Colors.black}>
      <Image
        flex={1}
        alt="logo"
        resizeMode="cover"
        size="lg"
        w="full"
        source={require("../../assets/cover.jpg")}
      />
      <Loader visible={loading}/>
      <Box
        w="full"
        h="full"
        position="absolute"
        top="0"
        px="6"
        justifyContent="center"
      >
        <Heading color={Colors.underline}>RESET PASSWORD</Heading>
        <VStack space={5} pt={6} >
        <Inputs
              label="Email"
              iconName="user"
              placeholder=" Enter Your Email"
              onChangeText={(text) => handleOnChange(text, "email")}
              onFocus={() => handleError(null, "email")}
              error={errors.email}
            />
        </VStack>
        <Buttone my={30} rounded={50} bg={Colors.white} onPress={validate} childern={"SEND"} />
        <Pressable mt={4} onPress={()=>{navigation.navigate('Register');}}  >
          <Text color={Colors.lavender}>SIGN UP</Text>
        </Pressable>
        <Pressable mt={4} onPress={()=>{navigation.navigate('Login');}}  >
          <Text color={Colors.lavender}>SIGN IN</Text>
        </Pressable>
      </Box>
    </Box>

  );
};

export default ForgetPasswordScreen;