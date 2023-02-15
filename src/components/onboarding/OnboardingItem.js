import React from 'react';
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import { colours } from '../../constants';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const OnboardingItem = props => {
  return (
    <SafeAreaView styles={styles.main}>
      <View
        style={styles.flatlistContainer}>
        <Image
          source={props.image}
          style={styles.image}
          
        />
        <View style={{flex: 0}}>
          {/* <Text>{props.title}</Text>
          <Text>{props.title}</Text> */}
        </View>
        {/* <View style={{overflow:'hidden',paddingTop:5, shadowColor: colours.DearkBlue,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity:  0.4,
        shadowRadius: 0,
        elevation: 5,}} > */}
       <View
          style={{
            height: height * 0.3,
            borderTopRightRadius: 25,
            borderTopLeftRadius: 25,
            width: width,
            borderWidth: 0,
            shadowColor:colours.DarkBlue,
          shadowOffset: {
	                  width:0,
	                  height: 4,
                          },
            shadowOpacity: 0.29,
            shadowRadius: 4.65,
              elevation:3,
              alignItems:'center',
              justifyContent:'center',
              borderBottomWidth:1,
              borderBottomColor:colours.White,
              
            
          }}><Text style={{  color: colours.DarkBlue,
            fontWeight: '700',
             fontSize:40,
             textAlign:'center',}} >{props.title}</Text></View>
      </View>
      {/* </View> */}
    </SafeAreaView>
  );
};
export default OnboardingItem;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#0000',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
  },
  flatlistContainer:{
    
        flex:1,
        width: width,
        alignItems: 'center',
        borderWidth: 0,
        justifyContent: 'center',
      
  },
  image:{
    
        width:width,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0,
      
  }
});
