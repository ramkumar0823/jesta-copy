import React from 'react';
import { SafeAreaView,View,Text,Dimensions,StyleSheet,TextInput,TouchableOpacity,Image } from 'react-native';
import { colours,style,height,width } from '../../constants';
import ArrowBackButton from '../../components/button/ArrowBackButton';

import RescheduleImage from '../../assets/image/RescheduleImage.png';
import { useNavigation } from '@react-navigation/native';




const Reschedule =()=>{
  const navigation = useNavigation();
    return(
        <SafeAreaView style={style.mainContainer} >
        <View style={styles.innerContainer}>
        <View style={{width:width*0.92,alignSelf:'center',}} >
          <View style={styles.categoriesView}>
            <ArrowBackButton />
            <View style={styles.DoctorView}>
              <Text style={style.header}>Reschedule Appointment</Text>
            </View>
          </View>
        </View>
      </View>
            <View style={styles.container3}>
    
    <View>
            <View>
                <Image source={RescheduleImage} resizeMode="center"  style={styles.lock} />
            </View>

            <View  >
          <Text
            style={{...style.loginWelcome,textAlign:'center'}}>
            Sorry for the trouble?
          </Text>
        </View>

        <View>
          <Text
            style={{...style.forgotText2,fontFamily:'Urbanist-SemiBold',fontSize:17}}>
            Doctor went on emergency , kindly reschedule the appointment
          </Text>
        </View>

      

          <TouchableOpacity  onPress={()=>{navigation.navigate('RescheduleAppointment')}}
            style={{...style.button,marginTop:width*0.1}}>
            <Text
              style={style.buttonText}>
              Reschedule
            </Text>
          </TouchableOpacity>
          
          </View>
          </View>
            

            
            
                
            
        </SafeAreaView>
    )
}
export default Reschedule;

const styles = StyleSheet.create({
    

    categoriesView: {
        marginVertical: 15,
        flexDirection: 'row',
        alignItems: 'center',
        height: width * 0.14,
       
      },
     
      container3: {
        height: height * 0.9,
        width: width * 0.93,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        
        
      },
      DoctorView: {
        marginHorizontal: 10,
        padding: 0,
    
      },
    
      innerContainer: {
        backgroundColor: colours.White,
        marginRight: width * 0.02,
     
      },
    lock:
    {
        height:100,
        width:100,
        alignSelf:'center',
    },
    
    backButton:{
        alignSelf:'flex-start',
    marginLeft:width*0.05
}

})