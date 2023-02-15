import React , {useState} from 'react';
import {View,StyleSheet,Text, Image, ScrollView}  from 'react-native';
import { colours,style,height,width } from '../../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import JestaSmall from '../../assets/image/JestaSmall.png'
import Signature from '../../assets/image/Signature.png'




const PrescriptionScreen =()=>{
    return(
    <SafeAreaView style = {style.mainContainer} >
        
        <View style={styles.innerContainer} >
            {/* <--------------------------------------------------Doctor Container-----------------------------------------------> */}
          <View>
            <View style={styles.doctorContainer} >
                <View>
            <Image source={JestaSmall}  style={styles.photo} />
            </View>
            <View>
                <View style={styles.doctorName}>
                <Text style={styles.doctorText} numberOfLines={1} >Dr.Vijay bhaskar</Text>
                </View>
                <View style={styles.specialistContainer}>
                <Text style={styles.specialisttText} numberOfLines={2} >Cardio Specialist
                </Text>
                <View style= {styles.borderContainer} />
                <Text style={styles.specialisttText} numberOfLines={2}>gknm hospital </Text>
                </View>
            </View>  
            </View>
{/* <--------------------------------------------------Patient Container-----------------------------------------------> */}
            <View  >
            <View style={styles.doctorContainer} >
                
                <View style={styles.commonContainer2} >
                <Text style={styles.patientText} >Nivetha </Text>
                </View>
                <View style={styles.commonContainer2} >
                <Text style={{...styles.patientText,textAlign:'right'}}  >Prescription ID: 7655786</Text>
                </View>

            </View>
    {/* <--------------------------------------------------Date Container-----------------------------------------------> */}

            <View style={styles.doctorContainer} >
                
                <View style={styles.commonContainer2} >
                <Text style={styles.dateText} >27 yrs,
                Female</Text>
                </View>
                <View style={styles.commonContainer2} >
                <Text style={{...styles.dateText,textAlign:'right'}}  >01/01/2023</Text>
                </View>

            </View>
            </View>
    {/* <--------------------------------------------------Date Container-----------------------------------------------> */}

        <View>
            
    <View style={styles.doctorContainer} >
                <Text style={styles.patientText} >Provisional Diagnosis </Text>
                </View>
                <View style={styles.doctorContainer} >
                <Text style={styles.dateText} >Headache</Text>
                </View>

                </View>


         {/* <--------------------------------------------------View Container-----------------------------------------------> */}           
        
        <View style ={styles.viewContainer} />
          {/* <-------------------------------------------------- medicines Container-----------------------------------------------> */}  
        <View style={styles.doctorContainer} >
                <Text style={styles.patientText} >Medicines </Text>
                </View>
                <ScrollView>
                <View style={{marginVertical:8}} >
                <View style={styles.doctorContainer} >
                <Text style={{...styles.dateText,fontFamily:'Urbanist-Bold'}} >paracitemol</Text>
                </View>
                <View style={styles.doctorContainer} >
                <Text style={styles.dateText} >Mor - 1, Aft-1, Nit-1</Text>
                </View>
                </View>

                <View style={{marginVertical:8}} >
                <View style={styles.doctorContainer} >
                <Text style={{...styles.dateText,fontFamily:'Urbanist-Bold'}} >Dolo</Text>
                </View>
                <View style={styles.doctorContainer} >
                <Text style={styles.dateText} >Mor - 1, Aft-1, Nit-1</Text>
                </View>
                </View>
                </ScrollView>
        
    
          {/* <-------------------------------------------------- signature Container-----------------------------------------------> */}  
           
           <View style={styles.signatureContainer} >
            <View>
                <Image source={Signature} style={styles.photo} />
            </View>
            <View>
                <Text style={styles.signatureText} numberOfLines={1} >
                    Doctor's Signature</Text>
                    <Text style={styles.signatureText} numberOfLines={1} >
                    01/01/2023</Text>
            </View>

           </View>
           </View>
        
     {/* <-------------------------------------------------- footer Container-----------------------------------------------> */}  
     <View style={styles.footerContainer} >
            <Image source={JestaSmall}  style={styles.photo} />
            
            <View>
<Text style={styles.footerText} numberOfLines={4}>
Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
</Text>
            </View>
            </View>
     {/* <-------------------------------------------------- footer Text Container-----------------------------------------------> */} 

            

</View>

        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    borderContainer:{
        borderWidth:0.8,
        borderColor:colours.Black,
        margin:width*0.01
    },
    commonContainer2:
    {
        width:width*0.45,
        
    },
    doctorName:
    {
        width:width*0.6,
        marginVertical:5
     },

    innerContainer:{
        height:height*0.9,
        width:width*0.9,
        
         justifyContent: 'space-between'
    },

doctorText:{
            fontFamily:'Urbanist-SemiBold',
            color:colours.Black,
            fontSize:22,
            lineHeight:25,
           
            // width:width*0.6,
            textAlign: 'right',
        },
doctorContainer:{
            flexDirection:'row', 
        borderWidth:0,
        width:width*0.9,
        justifyContent:'space-between',
        marginVertical:5,
         },
dateText:{
            textAlign:'left', 
            fontSize:14,
            fontFamily:'Urbanist-Medium',
            color:colours.Black,
            lineHeight:15,
         },
         footerContainer:{
            width:width*0.9,
            justifyContent:'center',
            alignItems:'center', 
            flexDirection:'column'
        },

footerText :{
    
    textAlign:'center', 
    fontSize:12,
    fontFamily:'Urbanist-Medium',
    color:colours.Black,
    lineHeight:15,


},
photo:{
             height:width*0.2,
             width:width*0.2,
             resizeMode:'center',
             
         },
     patientText:{
         textAlign:'left', 
     fontSize:16,
     fontFamily:'Urbanist-SemiBold',
     color:colours.Black,
     lineHeight:20,
 },
specialistContainer:{
            flexDirection:'row',
            width:width*0.6,
            justifyContent:'space-between',
            
         },
specialisttText:{
            color: colours.Black,
            fontSize:13,
            fontFamily:'Urbanist-SemiBold',
            lineHeight:21,
            bodrderWidth:1,
            textAlign:'right',
            flex:1,
            flexGrow: 1,
           },
signatureContainer :{
   
    
    width:width*0.9,
    marginVertical:5,
    alignItems:'flex-end'

},
signatureText:{
    textAlign:'center', 
    fontSize:12,
    fontFamily:'Urbanist-SemiBold',
    color:colours.Black,
    lineHeight:14,

},
viewContainer:{
        width:width*0.8,
        borderWidth:0.6,
        alignSelf:'center',
    borderColor:"rgba(0, 0, 0, 0.12)",
    marginVertical:10
}
    

})

export default PrescriptionScreen;
