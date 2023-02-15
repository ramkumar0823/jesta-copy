import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import {colours, height, width, style} from '../../constants';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {Dropdown} from 'react-native-element-dropdown';
import BackArrow from '../../assets/image/BackArrow.png';

const DropDown = props => {
  const [dropValue, setDropValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const navigation = useNavigation();

  const data = [
    {label: 'Male', value: 'Male'},
    {label: 'Female', value: 'Female'},
  ];
  return (
    <SafeAreaView>
      <View style={styles.fieldContainer}>
        <View>
          <Text style={styles.fieldText}>{props.SubHeader}</Text>
        </View>

        <Dropdown
          style={styles.inputContainer}
          placeholder={props.PlaceholderFocus}
          placeholderStyle={styles.placeholderText}
          selectedTextStyle={styles.selectedText}
          data={props.DropDownData}
          //   containerStyle={styles.dropdownContainer}
          showsVerticalScrollIndicator={false}
          onFocus={props.Focus}
          onBlur={props.Blur}
          onChange={props.Change}
          value={props.DropValue}
          // search
          maxHeight={300}
          labelField="label"
          valueField="value"
        />
      </View>
    </SafeAreaView>
  );
};
export default DropDown;

const styles = StyleSheet.create({
  fieldContainer: {
    marginVertical: width * 0.0001,
  },
  fieldText: {
    fontFamily: 'Urbanist-SemiBold',
    fontSize: 15,
    lineHeight: 23,
    color: colours.Black,
  },
  inputContainer: {
    backgroundColor: colours.inputbg2,
    borderRadius: 5,
    color: colours.Black,
    marginVertical: width * 0.02,
    paddingLeft: 13,
    paddingRight: 13,
    height: width * 0.13,
  },
  selectedText: {
    color: colours.Black,
  },
  placeholderText: {
    fontFamily: 'Urbanist-Medium',
    fontSize: 14,
    lineHeight: 20,
    color: colours.placeholdercolor2,
  },
});
