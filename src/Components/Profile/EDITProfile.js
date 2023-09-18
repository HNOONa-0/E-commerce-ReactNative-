import React from "react";
import { Box, FormControl, Input, ScrollView, VStack ,Button, View} from 'native-base';
import { Colors, calculateAge, inputs, labelToPlaceholder } from "../../data/data";
import UpdateProfile from './UpdateProfile';
import { useState } from "react";
import { useEffect } from "react";
import { auth, db, getUser } from "../../../firebase";
import UploadImage from "./UserPhoto";

// define label and label types

const EDITProfile = ({userData,setLocalUserData}) => {
    // console.log("rerender");
    const[showModal,setShowModal]=useState(false);
    // const[userData,setUserData]=useState({});
    
    // const fetchData = async () => {
    //     console.log("fetching data");
    //     const res= await getUser(db,'test-users','bDLRie4vbvTa8883dMEwO6jUeLs2');
    //     setUserData(res);
    //     return res;
    // };
    // useEffect(() => {
    //     // fetchData().catch((error) => {console.log("fetchData: ", error)});
    //     fetchData();
    // }, [auth.currentUser.uid]  );
    // console.log(userData);
    // return (null);
    return(
        <Box h='full' bg={Colors.white} px={5}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <VStack space={10} mt={5} pb={10}>
                    {inputs.map((eachInput, index)=>{
                        // if(eachInput.label==="password") return null;
                        return (
                            <FormControl key={index} >
                                <FormControl.Label
                                    _text={{
                                        fontSize: "12px",
                                        fontWeight: "bold",
                                        // if you want USERNAME appear with deep black run the code below
                                        // color : Colors.black,
                                    }}
                                >
                                    {labelToPlaceholder.get(eachInput.label) }
                                </FormControl.Label>
                                <Input
                                    name={eachInput.label}
                                    value={!userData[eachInput.label]&&eachInput.label!=="age"?"":(eachInput.label==="age"?calculateAge(userData.birthDate):userData[eachInput.label] ) }
                                    borderWidth={0.2}
                                    bg={Colors.lavender}
                                    borderColor= {Colors.main}
                                    py={4}
                                    type={eachInput.type}
                                    color={Colors.main}
                                    fontSize={15}
                                    _focus={{
                                        bg:Colors.lavender,
                                        borderColor: Colors.main,
                                        borderWidth: 1
                                    }}
                                />
                            </FormControl>
                        )
                    })
                    }

                    {/* <UpdateProfile
                        userData={userData}
                        setLocalUserData={setLocalUserData}
                    /> */}
                    <Button
                        flex={1}
                        bg={Colors.main}
                        onPress={()=>{
                            // locUpdateUser();
                            setShowModal(true);
                        }}
                        h={45}
                        _text={{
                            color:Colors.white
                        }}
                        _pressed={{
                            bg:Colors.main
                        }}
                        // isDisabled
                    >
                        Update PROFILE
                    </Button>
                    {showModal&&<UpdateProfile initData={userData} userData={userData} setLocalUserData={setLocalUserData} setShowModal={setShowModal}/>}
                </VStack>
            </ScrollView>
        </Box>
    )
}

export default EDITProfile;