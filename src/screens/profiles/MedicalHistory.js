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
import {useNavigation} from '@react-navigation/native';
import {colours, style, height, width} from '../../constants';
import {setLoginUserId} from '../../redux/slice/User';
import ProfilePic from '../../assets/image/ProfilePic.png';
import HeaderComp from '../../components/common/HeaderComp';
import InputField from '../../components/common/InputField';
import InputLabel from '../../components/common/InpuLabel';
import DropDown from '../../components/common/DropDown';
import ButtonCommon from '../../components/button/ButtonCommon';

const MedicalHistory = () => {
  const [height, setHeight] = useState();
  const [weight, setWeight] = useState();
  const [dropValue, setDropValue] = useState('Select');
  const [isFocus, setIsFocus] = useState(false);
  const navigation = useNavigation();

  const data = [
    {label: 'Yes', value: 'Yes'},
    {label: 'No', value: 'No'},
  ];
  console.log(height);
  return (
    <SafeAreaView style={style.mainContainer}>
      <View style={style.headerContainer}>
        <HeaderComp Header="Medical History" />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.innerContainer}>
          {/* <----------------------------------------------------------------Height---------------------------------------------------> */}
          <View>
            <InputLabel Label="Allergies" />
            <InputField
              PlaceholderText="Enter your allergies"
              NameState={height}
              ChangeText={value => {
                setHeight(value);
              }}
            />

            {/* <----------------------------------------------------------------Height---------------------------------------------------> */}
            <InputLabel Label="Medical condition" />
            <InputField
              PlaceholderText="Enter your medical condition "
              NameState={weight}
              ChangeText={value => {
                setWeight(value);
              }}
            />

            {/* <----------------------------------------------------------------Height---------------------------------------------------> */}
            <View style={{marginTop: width * 0.01}}>
              <DropDown
                SubHeader="Surgeries"
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

            {/* <----------------------------------------------------------------Height---------------------------------------------------> */}
            <InputLabel Label="Surgeries type" />
            <InputField
              PlaceholderText="Enter surgeries"
              NameState={weight}
              ChangeText={value => {
                setWeight(value);
              }}
            />
          </View>

          {/* <----------------------------------------------------------------Button--------------------------------------------------> */}

          <ButtonCommon
            ButtonText="Save Changes"
            HandlePress={() => {
              navigation.navigate('LifeStyle');
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

export default MedicalHistory;
