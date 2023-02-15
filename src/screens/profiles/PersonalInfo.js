import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ScrollView,
  Image,
  Alert,
  Modal,
  Touchable,
} from 'react-native';
import {colours, style, height, width} from '../../constants';
import {setLoginUserId} from '../../redux/slice/User';
import {useNavigation} from '@react-navigation/native';
import ProfilePic from '../../assets/image/ProfilePic.png';
import HeaderComp from '../../components/common/HeaderComp';
import InputField from '../../components/common/InputField';
import InputLabel from '../../components/common/InpuLabel';
import DropDown from '../../components/common/DropDown';
import ButtonCommon from '../../components/button/ButtonCommon';

const PersonalInfo = () => {
  const navigation = useNavigation();
  const [height, setHeight] = useState();
  const [weight, setWeight] = useState();
  const [dropValue, setDropValue] = useState('Select');
  const [isFocus, setIsFocus] = useState(false);

  const data = [
    {label: 'Head ache', value: 'Head ache'},
    {label: 'Low Bp', value: 'Low Bp'},
  ];
  console.log(height);
  return (
    <SafeAreaView style={style.mainContainer}>
      <View style={style.headerContainer}>
        <HeaderComp Header="Personal info" />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.innerContainer}>
          {/* <----------------------------------------------------------------Height---------------------------------------------------> */}
          <View>
            <InputLabel Label="Height" />
            {/* <View style={styles.fieldContainer}>
              <View>
                <Text style={styles.fieldText}>Date of birth</Text>
              </View> */}
            <InputField
              PlaceholderText="Enter your Height"
              NameState={height}
              ChangeText={value => {
                setHeight(value);
              }}
            />
            {/* </View> */}

            {/* <----------------------------------------------------------------Height---------------------------------------------------> */}
            <InputLabel Label="Weight" />
            <InputField
              PlaceholderText="Enter your weight"
              NameState={weight}
              ChangeText={value => {
                setWeight(value);
              }}
            />

            {/* <----------------------------------------------------------------Height---------------------------------------------------> */}
            <View style={{marginTop: width * 0.01}}>
              <DropDown
                SubHeader="Marital status"
                PlaceholderFocus={!isFocus ? 'Select ' : '...'}
                DropDownData={data}
                Focus={() => {
                  setIsFocus(true);
                }}
                Blur={() => {
                  setIsFocus(false);
                }}
                Change={item => {
                  setDropValue(item.value);
                  setIsFocus(false);
                }}
                DropValue={dropValue}
              />
            </View>
          </View>
          {/* <----------------------------------------------------------------Button--------------------------------------------------> */}

          <ButtonCommon
            ButtonText="Save Changes"
            HandlePress={() => {
              navigation.navigate('MedicalHistory');
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  innerContainer: {
    height: height * 0.9,
    width: width * 0.9,
    justifyContent: 'space-between',
  },
  fieldContainer: {
    marginVertical: width * 0.01,
  },
  fieldText: {
    fontFamily: 'Urbanist-SemiBold',
    fontSize: 15,
    lineHeight: 23,
    color: colours.Black,
  },
});

export default PersonalInfo;
