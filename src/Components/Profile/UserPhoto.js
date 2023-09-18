import React, { useState, useEffect } from 'react';
import { Image, View, Platform, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { auth, db, isFile, storage, uploadImage } from '../../../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';

export default function UploadImage({userData, setLocalUserData}){
    console.log("rerender")
//   const [image, setImage] = useState(userData.avatarUrl);
  const [image, setImage] = useState(userData.avatarUrl);
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrl,setImageUrl]=useState(null);


  const asyncTakeImg=async()=>{
    try{
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
        });
        if(result.canceled) throw "canceled taking image";
        const response = await fetch(result.assets[0].uri);
        const blob = await response.blob();
        const storageRef = ref(storage, `user-images/${auth.currentUser.uid}`);
        const snapshot=await uploadBytes(storageRef,blob);
        const url=await getDownloadURL(snapshot.ref);
        return url;
    }
    catch(err){
        throw err;
    }
  }
  const asyncUpdateData=async()=>{
    const docRef=doc(db,'test-users',auth.currentUser.uid);
    try{
        const avatarUrl=await asyncTakeImg();
        const res=await updateDoc(docRef,{avatarUrl});
        return res;
    }
    catch(err){
        throw err;
    }
}
  const updateData=()=>{
    asyncUpdateData()
        .then((res)=>{
            console.log("succesfully set image");
            setLocalUserData();
        })
        .catch((err)=>{
            alert(err);
        })
  }
//   const addImage=()=>{
//     let result = await ImagePicker.launchCameraAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         allowsEditing: false,
//         aspect: [4, 3],
//         quality: 1,
//     });
//     if (!result.canceled) {
//         const response = await fetch(result.assets[0].uri);

//         const blob = await response.blob();
//         const storageRef = ref(storage, `user-images/${auth.currentUser.uid}`);

//         uploadBytes(storageRef, blob).then((snapshot) => {
//             getDownloadURL(snapshot.ref).then((url) => {
//               setImage(url);
//             });
//         });
//     }
//   };
//   useEffect(()=>{
//     const ff=async()=>{
//         getDownloadURL(ref(storage, `user-images/${auth.currentUser.uid}`) )
//         .then((url) => {
//             setImage(url);
//             return true;
//         })
//         .catch((error) => {
//             return false;
//         });
//     }
//     ff().catch((error) => {console.log("ff 1: ", error)});;
//   },[])
  useEffect(()=>{
    setImage(userData.avatarUrl);
  },[userData])
  return (
            <View style={imageUploaderStyles.container}>
                {
                    <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
                }
                    <View style={imageUploaderStyles.uploadBtnContainer}>
                        <TouchableOpacity onPress={updateData} style={imageUploaderStyles.uploadBtn} >
                            <Text>{image ? 'Edit' : 'Upload'} Image</Text>
                            <AntDesign name="camera" size={20} color="black" />
                        </TouchableOpacity>
                    </View>
            </View>
  );
}
const imageUploaderStyles=StyleSheet.create({
    container:{
        elevation:2,
        height:200,
        width:200,
        backgroundColor:'#efefef',
        position:'relative',
        borderRadius:999,
        overflow:'hidden',
    },
    uploadBtnContainer:{
        opacity:0.7,
        position:'absolute',
        right:0,
        bottom:0,
        backgroundColor:'lightgrey',
        width:'100%',
        height:'25%',
    },
    uploadBtn:{
        display:'flex',
        alignItems:"center",
        justifyContent:'center'
    }
})