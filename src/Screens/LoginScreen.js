import { React } from "react";
import { Box, Button, Heading, Image, Input, Pressable, VStack, Text } from "native-base";
import { Colors, minPassLen } from "../data/data";
import { useState } from "react";
import Inputs from "../Components/Login&SignUp/Inputs"
import Loader from "../Components/Login&SignUp/Loader";
import Buttone from "../Components/Buttone";
import { getAuth , signInWithPopup, GoogleAuthProvider , onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../../firebase";

const provider = new GoogleAuthProvider();

function LoginScreen({navigation}) {
  const [inputs, setInputs] = useState({
    email: "z@a.com",
    password: "123456",
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] =useState(false);

  const handleOnChange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const validate = async () => {
    let isValid = true;
    if (!inputs.email) {
      handleError("please enter the email. ", "email");
      isValid = false;
    } else if (inputs.email.match(/\s+@\s+\.\s+/)) {
      handleError("please enter valid email. ", "email");
      isValid = false;
    }
    if (!inputs.password) {
      handleError("please enter the password. ", "password");
      isValid = false;
    } else if (inputs.password.length < minPassLen) {
      handleError("minimum password length is "+minPassLen, "password");
      isValid = false;
    }
    if (isValid)
      handleLogin();
  };

  const handleError = (text, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleLogin = () => {
    const {email,password}=inputs;
    setLoading(true);
    const asyncLogin=async()=>{
      try{
        const res=await auth.signInWithEmailAndPassword(email, password);
      }
      catch(err){
        // alert(err);
        throw err;
      }
    }
    asyncLogin()
      .then((res)=>{
        console.log("success logg in");
        setLoading(false);
        navigation.replace("buttom");
      })
      .catch((res)=>{
        setLoading(false);
        console.log("fail log in");
      })
    // auth.signInWithEmailAndPassword(email, password)
    // .then((userCredential) => {
    //   const user = userCredential.user;
    //   // navigate to somewhere
    //   navigation.replace("buttom");
    // })
    // .catch((error) => {
    //   const errorCode = error.code;
    //   const errorMessage = error.message;
    //   alert(errorMessage)
    // });
  }

  return (
    <Box flex={1} bg={Colors.white}>
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
        <Heading color={Colors.underline}>Log in</Heading>
        <VStack space={5} pt={6} >
        <Inputs
              label="Email"
              iconName="user"
              placeholder=" Enter Your Email"
              onChangeText={(text) => handleOnChange(text, "email")}
              onFocus={() => handleError(null, "email")}
              value={inputs.email}
              error={errors.email}
            />

            <Inputs
              label="Password"
              iconName="lock"
              password
              placeholder=" Enter Your Password"
              onChangeText={(text) => handleOnChange(text, "password")}
              onFocus={() => handleError(null, "password")}
              value={inputs.password}
              error={errors.password}
              jsLabel={"password"}
            />
        </VStack>
          <Buttone
            my={30} rounded={50} bg={Colors.lavender} onPress={()=>{
              // console.log("hello world");
              validate();
            }} childern={"SIGN IN"} mt={5}
          />
          {/* <Buttone
            my={30} rounded={50} bg={Colors.lavender} onPress={GoogleAuth} childern={"SIGN IN With Google"} mt={5}
          /> */}
        <Pressable mt={4} onPress={()=>{navigation.navigate('Register');}}>
          <Text color={Colors.white}>SIGN UP</Text>
        </Pressable>
        <Pressable mt={4} onPress={()=>{navigation.navigate('ForgetPassword');}}>
          <Text color={Colors.white}>Forgot Password?</Text>
        </Pressable>
      </Box>
    </Box>
  );
}

export default LoginScreen;