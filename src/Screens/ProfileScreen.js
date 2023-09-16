import { Button, Center, Heading, Image, Text, Box, Spacer } from "native-base";
import React from "react";
import { Colors } from "../data/data";
import Tabs from './../Components/Profile/Tabs';
import UploadImage from './../Components/Profile/UserPhoto';
import { useState , useEffect } from "react";
import { auth, db, getUser } from "../../firebase";
import Buttone from "../Components/Buttone";
import { signOut } from "firebase/auth";

function ProfileScreen ({navigation}) {
  const [userData, setUserData] = useState({});

  const fetchData = async () => {
    const res = await getUser(db, 'test-users', auth.currentUser.uid);
    setUserData(res);
    return res;
  };

  useEffect(() => {
    fetchData().catch((error) => {console.log("fetchData: ", error)});;
  }, []);

  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigation.replace("Login")
    }).catch((error) => {
      alert(error.message)
    });
}

  return (
    <Box flex={1}>
      <Box bg={Colors.main} py={6}>
        <Center>
          <UploadImage/>
          <Heading bold fontSize={15} isTruncated my={2} color={Colors.lavender}>
            {userData.firstName}
          </Heading>
          <Text italic fontSize={10} color={Colors.lavender}>
            {userData.birthDate}
          </Text>
        </Center>
        <Box p={2} position="absolute" top={4} right={4}  >
          <Button onPress={handleSignOut} variant="outline" size="sm" bgColor={Colors.white} >
            <Text>Logout</Text>
          </Button>
        </Box>
      </Box>
      {/* TABS */}
      <Tabs/>
    </Box>
  );
}

export default ProfileScreen;
