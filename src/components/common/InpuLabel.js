import React from 'react';
import {
  SafeAreaView,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Text,
} from 'react-native';
import {colours, height, width, style} from '../../constants';

const InputLabel = props => {
  return (
    <View style={styles.fieldContainer}>
      <View>
        <Text style={styles.fieldText}>{props.Label}</Text>
      </View>
    </View>
  );
};
export default InputLabel;

const styles = StyleSheet.create({
  fieldContainer: {
    marginVertical: width * 0.0,
  },
  fieldText: {
    fontFamily: 'Urbanist-SemiBold',
    fontSize: 15,
    lineHeight: 23,
    color: colours.Black,
  },
});
