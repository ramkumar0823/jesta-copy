import React from 'react';
import {
  SafeAreaView,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Text
} from 'react-native';
import { colours,style } from '../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;


const LoginButton = props => {
    const navigation = useNavigation();
  return (
    <SafeAreaView  >
      
        <TouchableOpacity
            style={styles.buttonStyle}
            >
            <Text
              style={styles.buttonTextStyle}>
              {props.all}
            </Text>
          </TouchableOpacity>
    </SafeAreaView>
  );
};
export default LoginButton;

const styles = StyleSheet.create({
    buttonStyle:{
        backgroundColor: colours.DarkBlue,
        borderRadius: 30,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
      },
      buttonTextStyle:{
        color: colours.White,
        paddingBottom: 2,
        fontSize: 14,
        textAlign: 'center',
        fontFamily :'Urbanist-Medium',
        marginVertical:4,
        marginHorizontal:20,
      },
     
  
});