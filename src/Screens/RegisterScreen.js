import { Box, Button, Heading, Image, Input, Pressable, ScrollView, Text , VStack, View } from 'native-base';
import { React } from 'react';
import { Colors, isValidDate, minPassLen, minPhoneLen } from '../data/data';
import { useState } from "react";
import Inputs from "../Components/Login&SignUp/Inputs"
import Buttone from '../Components/Buttone';
import Loader from '../Components/Login&SignUp/Loader';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useEffect } from "react";
import { auth, db, setUser } from '../../firebase';
import { getAuth , signInWithPopup, GoogleAuthProvider , onAuthStateChanged, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from 'firebase/firestore';



 const RegisterScreen = ({navigation})=> {
  
  const [inputs, setInputs] = useState({
    firstName: "ahmed",
    lastName:"hani",
    email: "1@email.com",
    password: "123456",
    confirmPassword: "123456",
    phone: "01045631131",
    birthDate: "2000/01/01",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] =useState(false);

 
  const validate = () => {
    let isValid = true;
    if (!inputs.firstName) {
      handleError("please enter the First Name. ", "firstName");
      isValid = false;
    }
    if (!inputs.lastName) {
      handleError("please enter the Last Name. ", "lastName");
      isValid = false;
    }
    if (!inputs.phone) {
      handleError("please enter the phone. ", "phone");
      isValid = false;
    }else if (inputs.phone.length < minPhoneLen){
      handleError("minimum phone length is 11", "phone");
      isValid = false;
    }
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
    if (!inputs.confirmPassword) {
      handleError("please enter the password. ", "confirmPassword");
      isValid = false;
    } else if (inputs.confirmPassword != inputs.password) {
      handleError("password does not match ", "confirmPassword");
      isValid = false;
    }
    if(!isValidDate(inputs.birthDate) ){
      handleError("incorrect date format ", "birthDate");
      isValid = false;
    }
    if (isValid)
      register();
  };
  
  
  const register = async() => {
    // console.log(inputs)
    const {email,password}=inputs;
    setLoading(true);
    // const asyncRegister=async()=>{
    //     try{
    //       const res=await auth.createUserWithEmailAndPassword(email,password);
    //       return res;
    //     }
    //     catch(err){
    //       // alert(err);
    //       setLoading(false);
    //       throw err;
    //     }
    // }
    // asyncRegister()
    //   .then((res)=>{
    //     setLoading(false);
    //     console.log("success register");
    //     navigation.navigate("buttom");
    //   })
    //   .catch((res)=>{
    //     setLoading(false);
    //     console.log("fail register");
    //     console.log(res);
    //   })

    auth.createUserWithEmailAndPassword(email,password)
    .then((res)=>{
      const docRef=doc(db,'test-users',auth.currentUser.uid);
      let newData={...inputs};

      delete newData["password"];
      delete newData["confirmPassword"];

      newData.avatarUrl="https://hips.hearstapps.com/hmg-prod/images/cute-cat-photos-1593441022.jpg?crop=0.670xw:1.00xh;0.167xw,0&resize=640:*";
      newData.credit=5000;
      newData.cart=[];
      newData.orders=[];

      setDoc(docRef,newData)
        .then(res=>{
          setLoading(false);
          console.log('succesfully added new user');
          navigation.navigate("buttom");
        })
        .catch(res=>{
          setLoading(false);
          alert(res)        
        })
    })
    .catch((res)=>{
      setLoading(false);
      alert(res)
    })
  };

  const handleOnChange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));

  };

  const handleError = (text, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: text }));
  };
  const inputsArray = [
    {
      label: "First Name",
      iconName: "user-circle",
      placeholder: "Enter Your First Name",
      onChangeText: (text) => handleOnChange(text, "firstName"),
      onFocus: () => handleError(null, "firstName"),
      error: errors.firstName,
      jsLabel: "firstName"
    },
    {
      label: "Last Name",
      iconName: "user-circle",
      placeholder: "Enter Your Last Name",
      onChangeText: (text) => handleOnChange(text, "lastName"),
      onFocus: () => handleError(null, "lastName"),
      error: errors.lastName,
      jsLabel: "lastName"
    },
    {
      label: "Phone",
      iconName: "phone-alt",
      placeholder: "Enter Your Phone",
      onChangeText: (text) => handleOnChange(text, "phone"),
      onFocus: () => handleError(null, "phone"),
      error: errors.phone,
      jsLabel: "phone"
    },
    {
      label: "Email",
      iconName: "user",
      placeholder: "Enter Your Email",
      onChangeText: (text) => handleOnChange(text, "email"),
      onFocus: () => handleError(null, "email"),
      error: errors.email,
      jsLabel: "email"
    },
    {
      label: "Birth Date(yyyy/mm/dd)",
      iconName: "user",
      placeholder: "Enter Your Birth Date",
      onChangeText: (text) => handleOnChange(text, "birthDate"),
      onFocus: () => handleError(null, "birthDate"),
      error: errors.birthDate,
      jsLabel: "birthDate"
    },
    {
      label: "Password",
      iconName: "lock",
      password: true,
      placeholder: "Enter Your Password",
      onChangeText: (text) => handleOnChange(text, "password"),
      onFocus: () => handleError(null, "password"),
      error: errors.password,
      jsLabel: "password"
    },
    {
      label: "Confirm Password",
      iconName: "lock",
      password: true,
      placeholder: "Confirm Your Password",
      onChangeText: (text) => handleOnChange(text, "confirmPassword"),
      onFocus: () => handleError(null, "confirmPassword"),
      error: errors.confirmPassword,
      jsLabel: "confirmPassword"
    }
  ];

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
      <ScrollView showsVerticalScrollIndicator={false}>
      <Heading color={Colors.underline}>Register</Heading>
      <VStack space={2} pt={2}>
        {inputsArray.map((eachInputs)=>{
          return (
            <Inputs 
              key={eachInputs.label}
              label={eachInputs.label}
              iconName={eachInputs.iconName}
              placeholder={eachInputs.placeholder}
              onChangeText={eachInputs.onChangeText}
              onFocus={eachInputs.onFocus}
              error={eachInputs.error}
              value={inputs[eachInputs.jsLabel]}
              jsLabel={eachInputs.jsLabel}
            />      
          )
        })}
      
      </VStack>
      </ScrollView>
      <Buttone my={30} w="10%" rounded={50} bg={Colors.white} onPress={validate} childern={"SIGN UP"} mt={5} />
      <Pressable mt={4} onPress={()=>{navigation.navigate('Login');}} >
        <Text color={Colors.lavender}>LOG IN</Text>
      </Pressable>
    </Box>
  </Box>
  );
}

export default RegisterScreen ;