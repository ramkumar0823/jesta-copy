import React from 'react';
import {
  SafeAreaView,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import {colours, style} from '../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const SymptomsButton = props => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <TouchableOpacity style={styles.buttonStyle} onPress={props.Touch}>
        <Text style={styles.buttonTextStyle}>{props.symptoms}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default SymptomsButton;

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: colours.DarkBlue,
    borderRadius: 30,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 2,
  },
  buttonTextStyle: {
    color: colours.White,
    paddingBottom: 4,
    fontSize: 15,
    textAlign: 'center',
    fontFamily: 'Urbanist-Medium',
    marginVertical: 5,
    marginHorizontal: 20,
    textTransform: 'capitalize',
  },
});
