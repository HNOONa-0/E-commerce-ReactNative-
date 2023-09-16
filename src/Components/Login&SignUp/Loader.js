import { View, Text, StyleSheet } from "react-native";
import { useWindowDimensions } from 'react-native';
import {
    PacmanIndicator,
} from 'react-native-indicators';
const Loader = ({ visible = false }) => {
    const {width , height} = useWindowDimensions 
    ();
    return (
        visible && (
            <View style={[styles.container , {width , height}]}>
                <View style={styles.lottie}>
                    <PacmanIndicator color= "white" count={5} />
                    <Text style={styles.tt}>Please Wait....</Text>
                </View>
            </View>

        )

    )


};
const styles = StyleSheet.create({
    lottie: {
        height: 100,
        backgroundColor:"black",
        marginHorizontal : 20,
        borderRadius:20,
        paddingHorizontal:1,
        alignItems : "center",
    },
    container :{
        position:"absolute",
        zIndex :50,
        backgroundColor : "rgba (0,0,0,.5)",
        justifyContent : "space-evenly",
    },
    text : {
        marginBottom :10 , 
        fontSize :16,
        Color:"white",
    },
    tt : {
        fontSize : 26,
        color :"white",
        marginTop : 10,
        fontWeight :"bold"
    }
});

export default Loader;