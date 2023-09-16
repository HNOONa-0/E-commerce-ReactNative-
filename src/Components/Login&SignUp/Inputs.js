import React from "react";
import { Colors } from '../../data/data';
import { View,Text,StyleSheet,TextInput } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';
const Inputs =({label , iconName, password ,error, onFocus = () =>{}, ...props }) => {
    const[hidenPassword , setHidenPassword] = React.useState(password);
    const[isFocused , setisFocused] = React.useState(false);
    return(
    <View style={style.container}>
        <Text style={style.label}
        > {label} </Text>
        <View style={[style.Input, {borderColor: isFocused ? "white" : "black"}]}>
          <Icon name={iconName} style={style.icon} />
            <TextInput
            onFocus={() => {
                onFocus();
                setisFocused(true);
            }}
            onBlur = {()=> setisFocused (false)}
            style={style.textInput} secureTextEntry ={hidenPassword}
            {... props}
            />
           {password && <Icon onPress={()=> setHidenPassword (!hidenPassword)} name={hidenPassword ? "eye" : "eye-slash"} style={style.iconEye} />}
        </View>
        {error && <Text style={style.textError}>{error}</Text>}
    </View>
    ) ;
  };
  const style = StyleSheet.create({
    container:{
        marginBottom:10,
    },
    Input:{
        backgroundColor:"lightslategrey",
        height:50,
        flexDirection:"row",
        paddingHorizontal:8,
        borderEndWidth:10,
        alignItems:"center",
        borderBottomColor:"white"
    },
    icon:{
        fontSize:25 ,
        color: "white"
    },
    iconEye:{
        fontSize:20 ,
        color: "white"
    },
    textInput:{
        color:"white",
        flex:1,
        marginLeft:10,
    },
    textError : {
        marginTop :5 ,
        color : "red",
        fontSize : 15,
    },
    label:{
        fontSize:14,
        color :"white",
    }
  
  });
  export default Inputs;