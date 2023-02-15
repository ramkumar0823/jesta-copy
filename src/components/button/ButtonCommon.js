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

const ButtonCommon = props => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <TouchableOpacity onPress={props.HandlePress} style={{...styles.button}}>
        <Text style={style.buttonText}>{props.ButtonText}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default ButtonCommon;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colours.DarkBlue,
    width: width * 0.9,
    // marginBottom: 20,
    borderRadius: 30,
    padding: 11,
    alignSelf: 'center',
    // marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
