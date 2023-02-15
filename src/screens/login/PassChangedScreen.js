import React from 'react';
import { SafeAreaView,View,Text,Dimensions,StyleSheet,TextInput,TouchableOpacity,Image } from 'react-native';
import { colours,style,height,width } from '../../constants';
import { useNavigation } from '@react-navigation/native';

import RoundTick from '../../assets/image/RoundTick.png';



const PassChangedScreen =()=>{

  const navigation = useNavigation();

    return(
        <SafeAreaView style={style.mainContainer} >
            

            <View style={styles.innerContainer}>
    
    <View >
            <View>
                <Image source={RoundTick} resizeMode="center"  style={styles.lock} />
            </View>

            <View  >
          <Text
            style={{...style.loginWelcome,textAlign:'center'}}>
            Password Changed!
          </Text>
        </View>

        <View>
          <Text
            style={styles.forgotText2}>
            Your password has been changed successfully.
          </Text>
        </View>

        

          <TouchableOpacity
            style={{...style.button,borderRadius:8,marginTop:width*0.1}}
            onPress={()=>{navigation.navigate('LoginScreen')}}>
            <Text
              style={style.buttonText}>
              Back to Login
            </Text>
          </TouchableOpacity>
          
          </View>
            </View>  

            
            
                
            
        </SafeAreaView>
    )
}
export default PassChangedScreen;

const styles = StyleSheet.create({
    
    lock:
    {
        height:width*0.4,
        width:width*0.4,
        alignSelf:'center',
    },
    backButton:{
        alignSelf:'flex-start',
    marginLeft:width*0.05
},
forgotText2:{
    paddingLeft:width*0.04,
    paddingRight:width*0.04,
    fontFamily :'Urbanist-Medium',
    fontSize:16,
    color:colours.LightGrey, 
    textAlign:'center',
    lineHeight:25,
    },
    innerContainer:{
        height: height * 0.85, 
        width: width * 0.9,
            alignItems:'center',
        justifyContent:'center',
        
    }

})