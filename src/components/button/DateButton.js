import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {colours, style, height, width} from '../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {useNavigation} from '@react-navigation/native';

const DateButton = props => {
  const navigation = useNavigation();
  // const [design, setDesign] = useState(true)
  const {design, ...attributes} = props.Load;
  return (
    <SafeAreaView>
      <TouchableOpacity
        //  style={design ? styles.backButton2 : styles.backButton1}
        style={{
          ...styles.backButton1,
          backgroundColor: props.Background,
        }}
        onPress={props.DayPress}>
        <Text style={{...styles.dateText, color: props.FontColor}}>
          {props.Day}
        </Text>
        <Text style={{...styles.dateText, color: props.FontColor2}}>
          {props.Date}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default DateButton;

const styles = StyleSheet.create({
  backButton1: {
    borderWidth: 1,
    borderColor: '#d8d9f3',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    marginHorizontal: 0,
    width: width * 0.118,
    height: width * 0.26,
    backgroundColor: colours.White,
  },
  backButton2: {
    borderWidth: 1,
    borderColor: '#d8d9f3',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    marginHorizontal: 0,
    width: width * 0.118,
    height: width * 0.26,
    backgroundColor: colours.DarkBlue,
  },
  dayText: {
    fontSize: 14,
    lineHeight: 30,
    color: '#5254c7',
    fontFamily: 'Urbanist-Regular',
  },

  dateText: {
    fontFamily: 'Urbanist-SemiBold',
    fontSize: 16,
    color: colours.Black,
    lineHeight: 24,
  },
});
