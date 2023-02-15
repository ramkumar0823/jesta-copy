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


const ArrowBackButton = props => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <TouchableOpacity style={styles.backButton} onPress={() => { navigation.goBack() }} >
        <Ionicons name='arrow-back' color={props.ArrowColour} size={29} style={{ ...styles.leftArrow }} />
      </TouchableOpacity>

    </SafeAreaView>
  );
};
export default ArrowBackButton;






const styles = StyleSheet.create({
  backButton: {

    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 0,
    backgroundColor: colours.White,
    borderRadius: 8,
    height: width * 0.08,
    width: width * 0.08,


  },



});