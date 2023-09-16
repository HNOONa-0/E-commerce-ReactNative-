import { Button, Center,  Modal, VStack, FormControl,Input} from "native-base";
import React, { useState } from "react";
import { Colors, date2str, str2date,inputs, labelToPlaceholder, testId,calculateAge } from "../../data/data";
import { auth, db, setUser, updateUser } from "../../../firebase";
import { useEffect } from "react";

const [bg,color,mt]=[Colors.black,Colors.white,5];
const [size1]=["lg"];
const [maxWidth2]=[350];
const [space3]=[10];
const [color4,fz4,mb4]=[Colors.black,14,8];
    
const UpdateProfile=({tempUserData,fetchData})=>{
    const[showModal,setShowModal]=useState(false);
    const[userData,setUserData]=useState({});
    
    useEffect(() => {
        setUserData(tempUserData);
    }, [tempUserData]);
    const locUpdateUser=()=>{
        const updateUser=async()=>{
            const res1=await updateUser(db,'test-users',auth.currentUser.uid,userData );
            const res2=await fetchData();
            return res1;
        }
        updateUser().catch((error) => {console.log("updateUser: ", error)});;
    }
    return(
        <Center>
            <Button
                onPress={()=>{
                    setShowModal(true)
                }}
                
                bg={Colors.main}
                color={color}
                mt={mt}
                w={"100%"}
                _pressed={{ bg: Colors.main }}
            >
                EDIT PROFILE
            </Button>
            <Modal
                isOpen={showModal}
                onClose={()=>setShowModal(false) }
                size={size1}
            >
                <Modal.Content 
                    maxWidth={maxWidth2}
                >
                    <Modal.CloseButton/>    
                    <Modal.Header>
                        PROFILE
                    </Modal.Header>
                    <Modal.Body>
                        <VStack
                            // space is not working
                            space={space3}
                            // style={{marginBottom:'10px'}}
                        >
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
                            {i.label}
                        </FormControl.Label>
                        {/* Text input */}
                        <Input
                            name={i.label}
                            value={!userData[i.label]&&i.label!=="age"?"":(i.label==="age"?calculateAge(userData.birthDate):userData[i.label] ) }
                            onChangeText={(text)=>{
                                if(i.label==="password") return;
                                if(i.label==="email") return;

                                setUserData({...userData, [i.label]:text } );
                            }}
                            isDisabled
                            borderWidth={0.2}
                            bg={Colors.subGreen}
                            borderColor= {Colors.main}
                            py={4}
                            type={i.type}
                            color={Colors.main}
                            fontSize={15}
                            _focus={{
                                bg:Colors.subGreen,
                                borderColor: Colors.main,
                                borderWidth: 1
                                }}
                        />
                        
                    </FormControl>
                        ))
                    }
                        
                        </VStack>
                    </Modal.Body>
                    <Modal.Footer
                    >
                            
                        <Button
                            flex={1}
                            bg={Colors.main}
                            onPress={()=>{
                                locUpdateUser();
                                setShowModal(false);
                            }}
                            h={45}
                            _text={{
                                color:Colors.white
                            }}
                            _pressed={{
                                bg:Colors.main
                            }}
                        >
                            UPDATE PROFILE
                        </Button>
                        
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
        </Center>
    )
}
export default UpdateProfile;