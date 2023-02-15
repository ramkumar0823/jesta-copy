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

const InputField = props => {
  return (
    <SafeAreaView>
      <View style={styles.username}>
        <TextInput
          style={style.placeholderText}
          placeholder={props.PlaceholderText}
          value={props.NameState}
          placeholderTextColor={colours.placeholdercolor2}
          onChangeText={props.ChangeText}></TextInput>
      </View>
    </SafeAreaView>
  );
};
export default InputField;

const styles = StyleSheet.create({
  username: {
    paddingLeft: 10,
    backgroundColor: colours.inputbg2,
    borderRadius: 5,
    color: colours.Black,
    marginVertical: width * 0.02,
  },
});
