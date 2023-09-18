import { Button, Center,  Modal, VStack, FormControl,Input} from "native-base";
import React, { useState } from "react";
import { Colors, date2str, str2date,inputs, labelToPlaceholder, testId,calculateAge } from "../../data/data";
import { auth, db, setUser, updateUser } from "../../../firebase";
import { useEffect } from "react";
import { addDoc, doc, setDoc, updateDoc } from "firebase/firestore";

const [bg,color,mt]=[Colors.black,Colors.white,5];
const [size1]=["lg"];
const [maxWidth2]=[350];
const [space3]=[10];
const [color4,fz4,mb4]=[Colors.black,14,8];
    
const UpdateProfile=({userData,setLocalUserData,setShowModal})=>{
    // console.log("rerender");
    // console.log(setLocalUserData);
    const[userState,setUserState]=useState(userData)
    const asyncUpdateData=async()=>{
        const docRef=doc(db,'test-users',auth.currentUser.uid);
        try{
            // delete newData["password"];
            // delete newData["confirmPassword"];
            // delete newData["photoUrl"];
            // console.log(newData);

            // important! this updates the data, it will not rewrite entire data, updates necessary attributes only
            // const res=await updateDoc(docRef,newData);

            // this will set the data to entire new object
            const res=await setDoc(docRef,userState);
            return userState;
        }
        catch(err){
            throw err;
        }
    }
    const updateData=()=>{
        asyncUpdateData()
            .then((res)=>{
                setLocalUserData();
                setShowModal(false);
            })
            .catch((err)=>{
                alert(err);
            })
    }
    // useEffect(() => {
    //     setUserData(tempUserData);
    // }, [tempUserData]);
    // const locUpdateUser=()=>{
    //     const updateUser=async()=>{
    //         const res1=await updateUser(db,'test-users',auth.currentUser.uid,userData );
    //         const res2=await fetchData();
    //         return res1;
    //     }
    //     updateUser().catch((error) => {console.log("updateUser: ", error)});;
    // }

    const renderedInputs=inputs.map((eachInput, index) =>{
        // console.log("map is rerendering")
        // if(eachInput.label!=="firstName"||eachInput.label!=="lastName") return null;
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
                    {eachInput.label}
                </FormControl.Label>
                {/* Text input */}
                <Input
                    name={eachInput.label}
                    value={!userState[eachInput.label]&&eachInput.label!=="age"?"":(eachInput.label==="age"?calculateAge(userState.birthDate):userState[eachInput.label] ) }
                    // value={userState[eachInput.label] }
                    onChangeText={(text)=>{
                        setUserState({...userState, [eachInput.label]:text } )
                    }}
                    isDisabled={eachInput.label==="email"||eachInput.label==="birthDate"||eachInput.label==="age"||eachInput.label==="credit"}
                    borderWidth={0.2}
                    bg={Colors.subGreen}
                    borderColor= {Colors.main}
                    py={4}
                    type={eachInput.type}
                    color={Colors.main}
                    fontSize={15}
                    _focus={{
                        bg:Colors.subGreen,
                        borderColor: Colors.main,
                        borderWidth: 1
                    }}
                />
            </FormControl>   
    )})
    return(
        <Center>
            <Modal
                isOpen={true}
                size={size1}
            >
                <Modal.Content 
                    maxWidth={maxWidth2}
                >
                    <Modal.CloseButton
                        onPress={()=>{
                            setShowModal(false);
                        }}
                    />    
                    <Modal.Header>
                        PROFILE
                    </Modal.Header>
                    <Modal.Body>
                        <VStack
                            space={space3}
                        >
                            {renderedInputs}
                        </VStack>
                    </Modal.Body>
                    <Modal.Footer
                    >
                        <Button
                            flex={1}
                            bg={Colors.main}
                            onPress={()=>{
                                // locUpdateUser();
                                // console.log("its not working");
                                // setShowModal(false);
                                updateData();
                            }}
                            h={45}
                            _text={{
                                color:Colors.white
                            }}
                            _pressed={{
                                bg:Colors.main
                            }}
                        >
                            Confirm
                        </Button>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
        </Center>
    )
}
export default UpdateProfile;