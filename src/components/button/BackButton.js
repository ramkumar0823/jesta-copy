import React from 'react';
import {
  SafeAreaView,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { colours } from '../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;


export const BackButton = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <TouchableOpacity style={styles.backButton} onPress={() => { navigation.goBack() }} >
        <Ionicons name='chevron-back' size={23} style={{ borderWidth: 0, color: colours.Black }} />
      </TouchableOpacity>

    </SafeAreaView>
  );
};


export const BlueBackButton = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <TouchableOpacity style={styles.blueButton} onPress={() => { navigation.goBack() }} >
        <Ionicons name='arrow-back' size={30} color={colours.Black} />
      </TouchableOpacity>

    </SafeAreaView>
  );
};








const styles = StyleSheet.create({

  blueButton: {
    backgroundColor: colours.AliceBlue,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginHorizontal: 0,
    width: width * 0.12,
    height: width * 0.12

  }

});