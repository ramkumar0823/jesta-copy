import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';

const HomeScreen1 = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <Text>hi</Text>

      {/* <AntDesign name ="stepforward" size={25}  color ="#000000"/>
      <Text style = {{fontFamily:'Urbanist-Thin',fontSize:30,alignSelf:'center'}} >1111111</Text></View>
      <TouchableOpacity onPress={()=>{navigation.navigate('HomeScreen2')}} ><Text>click here</Text></TouchableOpacity> */}
    </SafeAreaView>
  );
};

export default HomeScreen1;

const styls = StyleSheet.create({});
