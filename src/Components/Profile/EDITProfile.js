import React from "react";
import { Box, FormControl, Input, ScrollView, VStack ,Button, View} from 'native-base';
import { Colors, calculateAge, inputs, labelToPlaceholder } from "../../data/data";
import UpdateProfile from './UpdateProfile';
import { useState } from "react";
import { useEffect } from "react";
import { auth, db, getUser } from "../../../firebase";
import UploadImage from "./UserPhoto";

// define label and label types

const EDITProfile = () => {
    const[showModal,setShowModal]=useState(false);
    const[userData,setUserData]=useState({});

    const fetchData = async () => {
        console.log("fetching data");
        const res= await getUser(db,'test-users','bDLRie4vbvTa8883dMEwO6jUeLs2');
        setUserData(res);
        return res;
    };
    useEffect(() => {
        // fetchData().catch((error) => {console.log("fetchData: ", error)});
        fetchData();
    }, [auth.currentUser.uid]  );
    return(
        <Box h='full' bg={Colors.white} px={5}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <VStack space={10} mt={5} pb={10}>
                    {
                        inputs.map((i, index) => (
                            // Form container
                            <FormControl key={index} >
                                <FormControl.Label
                                _text={{
                                    fontSize: "12px",
                                    fontWeight: "bold",
                                    // if you want USERNAME appear with deep black run the code below
                                    // color : Colors.black,
                                }}
                                >
                                    {labelToPlaceholder.get(i.label) }
                                </FormControl.Label>
                                {/* Text input */}

                                <Input
                                    name={i.label}
                                    value={!userData[i.label]&&i.label!=="age"?"":(i.label==="age"?calculateAge(userData.birthDate):userData[i.label] ) }
                                    onChangeText={(text)=>{
                                        setUserData({...userData, [i.label]:text } );
                                    }}
                                    isDisabled
                                    borderWidth={0.2}
                                    bg={Colors.lavender}
                                    borderColor= {Colors.main}
                                    py={4}
                                    type={i.type}
                                    color={Colors.main}
                                    fontSize={15}
                                    _focus={{
                                        bg:Colors.lavender,
                                        borderColor: Colors.main,
                                        borderWidth: 1
                                      }}
                                />
                            </FormControl>
                                ))
                    }

                    <UpdateProfile
                        tempUserData={userData}
                        fetchData={fetchData}
                    />
                </VStack>
            </ScrollView>

            
        </Box>
    )
}

export default EDITProfile;