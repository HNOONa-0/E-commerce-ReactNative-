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
import { getAuth , signInWithPopup, GoogleAuthProvider , onAuthStateChanged } from "firebase/auth";



 const RegisterScreen = ({navigation})=> {

  
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName:"",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    birthDate: "",
  });
  const [dateOfBirth,setDateOfBirth]=useState(new Date());
  const [errors, setErrors] = useState({});
  const [loading, setLoading] =useState(false);
  const [showPiker, setShowPiker] = useState(false);

  const [isAuth, setisAuth] =useState(false);


  useEffect(() => {
    const state = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.replace("buttom")
      } 
    });
    return state
}, [])

 
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
  
  
  const register = () => {
    const {email,password}=inputs;
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const ff=async()=>{
          const user = userCredentials.user;
          // alert("signed up succesfully with:"+user.email)
          const res=await setUser(db,'test-users',auth.currentUser.uid,{
            ...inputs,photoUrl:"",cart:[],orders:[],credit:5000.0
          }).catch((error) => {console.log("SetUser: ", error)});
          return res;
        }
        setisAuth(true);
        ff().catch((error) => {console.log("ff 3: ", error)});; 
      })
      .catch(error => alert(error.message))
      setLoading(true);
  };

  const handleOnChange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));

  };

  const handleError = (text, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: text }));
  };

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

      <Inputs label="First Name"
            iconName="user-circle"
            placeholder=" Enter Your First Name"
            onChangeText={(text) => handleOnChange(text, "firstName")}
            onFocus={() => handleError(null, "firstName")}
            error={errors.firstName}
          />
        <Inputs label="Last Name"
            iconName="user-circle"
            placeholder=" Enter Your First Name"
            onChangeText={(text) => handleOnChange(text, "lastName")}
            onFocus={() => handleError(null, "lastName")}
            error={errors.lastName}
          />

          <Inputs label="Phone"
            iconName="phone-alt"
            placeholder=" Enter Your Phone"
            onChangeText={(text) => handleOnChange(text, "phone")}
            onFocus={() => handleError(null, "phone")}
            error={errors.phone}
          />

          <Inputs
            label="Email"
            iconName="user"
            placeholder=" Enter Your Email"
            onChangeText={(text) => handleOnChange(text, "email")}
            onFocus={() => handleError(null, "email")}
            error={errors.email}
          />

         <View>
            {/* {showPiker && ( <DateTimePicker mode="date" display="spinner" value={dateOfBirth} onConfirm={onDateChange} />)}
            <Pressable onPress={toggleDatepiker}>
              <Inputs label="Date Of Birthday" iconName="user" placeholder="Mar 21 2002" value={inputs.birthDate} editable={false} />
            </Pressable> */}
            <Inputs
            label="Birth Date(yyyy/mm/dd)"
            iconName="user"
            placeholder="Enter Your Birth Date"
            onChangeText={(text) => handleOnChange(text, "birthDate")}
            onFocus={() => handleError(null, "birthDate")}
            error={errors.birthDate}
          />
         </View>

          <Inputs
            label="Password"
            iconName="lock"
            password
            placeholder=" Enter Your Password"
            onChangeText={(text) => handleOnChange(text, "password")}
            onFocus={() => handleError(null, "password")}
            error={errors.password}
          />

          <Inputs
            label="Confirm Password"
            iconName="lock"
            password
            placeholder=" Confirm Your Password"
            onChangeText={(text) => handleOnChange(text, "confirmPassword")}
            onFocus={() => handleError(null, "confirmPassword")}
            error={errors.confirmPassword}
          />

      {/* <Input
        InputLeftElement={<AntDesign name="user" size={24} color={Colors.white} />}
          variant={"underlined"}
          placeholder="Amr Sameeh"
          w={"80%"}
          pl={2}
          color={Colors.white}
          borderBottomColor={Colors.deepestGray}

        />
        <Input
        InputLeftElement={<MaterialIcons name="email" size={20} color={Colors.white} /> }
          variant={"underlined"}
          placeholder="Email@Example.com"
          w={"80%"}
          pl={2}
          color={Colors.white}
          borderBottomColor={Colors.deepestGray}

        />
        <Input
        label="Password"
        InputLeftElement={<Ionicons name="eye" size={24} color={Colors.white}/>}
          variant={"underlined"}
          placeholder= " *********"
          w={"80%"}
          type="password"
          color={Colors.white}
          borderBottomColor={Colors.deepestGray}
        /> 
        <Input
        label=" ConfirmPassword"
        InputLeftElement={<Ionicons name="eye" size={24} color={Colors.white}/>}
          variant={"underlined"}
          placeholder= " *********"
          w={"80%"}
          type="password"
          color={Colors.white}
          borderBottomColor={Colors.deepestGray}
        />  */}
      </VStack>
      </ScrollView>
      <Buttone my={30} w="10%" rounded={50} bg={Colors.white} onPress={()=>{
        validate();
      }} childern={"SIGN UP"} mt={5} />
      <Pressable mt={4} onPress={()=>{navigation.navigate('Login');}} >
        <Text color={Colors.lavender}>LOG IN</Text>
      </Pressable>
    </Box>
  </Box>
  );
}

export default RegisterScreen ;