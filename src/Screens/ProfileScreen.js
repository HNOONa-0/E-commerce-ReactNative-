import { Button, Center, Heading, Image, Text, Box, Spacer, KeyboardAvoidingView } from "native-base";
import React from "react";
import { Colors } from "../data/data";
import Tabs from './../Components/Profile/Tabs';
import UploadImage from './../Components/Profile/UserPhoto';
import { useState , useEffect } from "react";
import { auth, db, getUser } from "../../firebase";
import Buttone from "../Components/Buttone";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

function ProfileScreen ({userData,setLocalUserData}) {
  // console.log("profile");
  // console.log(userData);
  // console.log(setLocalUserData);
  // const [userData, setUserData] = useState(null);

  // const asyncFetchData=async()=>{
  //   const docRef = doc(db, 'test-users', auth.currentUser.uid);
  //   try{
  //     const docSnap = await getDoc(docRef);
  //     return docSnap.data();
  //   }
  //   catch(err){
  //     throw err;
  //   }
  // }
  // const setLocalUserData=()=>{
  //   asyncFetchData()
  //   .then((res)=>{
  //     setUserData(res);
  //   })
  //   .catch((err)=>{
  //     console.log(err);
  //   })
  // }
  // useEffect(() => {
  //   setLocalUserData();
  // }, []);

  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigation.replace("Login")
    }).catch((error) => {
      alert(error.message)
    });
  }
  if(!userData) return null;
  return (
    <KeyboardAvoidingView flex={1}>
        <Box flex={1}>
        <Box bg={Colors.main} py={6}>
          <Center>
            <UploadImage userData={userData} setLocalUserData={setLocalUserData}/>
            <Heading bold fontSize={15} isTruncated my={2} color={Colors.lavender}>
              {userData?.firstName}
            </Heading>
            <Text italic fontSize={10} color={Colors.lavender}>
              {userData?.birthDate}
            </Text>
          </Center>
          <Box p={2} position="absolute" top={4} right={4}  >
            <Button onPress={handleSignOut} variant="outline" size="sm" bgColor={Colors.white} >
              <Text>Logout</Text>
            </Button>
          </Box>
        </Box>
        {/* TABS */}
        <Tabs userData={userData} setLocalUserData={setLocalUserData}/>
      </Box>
    </KeyboardAvoidingView>
  );
}

export default ProfileScreen;
