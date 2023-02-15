import React, {useState} from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  View,
  StyleSheet,
  FlatList,
  ScrollView,
  Text,
} from 'react-native';
import {colours, style, height, width} from '../../constants';
import {RadioButton} from 'react-native-paper';
import ArrowBackButton from '../../components/button/ArrowBackButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Foundation from 'react-native-vector-icons/Foundation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Dropdown} from 'react-native-element-dropdown';

const ConsultingScreen = () => {
  const navigation = useNavigation();
  const appointmentData = useRoute().params.data;
  console.log('>>appointment', appointmentData);
  const [dropValue, setDropValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [radioValue, setRadioValue] = useState();
  const data = [
    {label: '10 Mins', value: '10:00'},
    // {label: '20 Mins', value: 'Item 2'},
    // {label: '30 Mins', value: 'Item 3'},
    // {label: '40 Mins', value: 'Item 4'},
    // {label: '50 Mins', value: 'Item 5'},
    // {label: '60 Mins', value: 'Item 6'},
    // {label: '10 Mins', value: 'Item 7'},
    // {label: '10 Mins', value: 'Item 8'},
  ];

  const onCheckStatus = radioID => {
    console.log('>>radioID', radioID);
  };
  const ConsultMode = {
    radioID: radioValue,
    consultTime: dropValue,
    date: appointmentData.date,
    time: appointmentData.time,
    doctorID: appointmentData.doctorID,
  };

  const RenderLabel = () => {
    if (dropValue || isFocus) {
      return (
        <Text style={[styles.label, isFocus && {color: 'blue'}]}>
          Select Duration
        </Text>
      );
    }
    return null;
  };

  return (
    <SafeAreaView style={style.mainContainer}>
      <View style={{width: width * 0.9}}>
        <View style={styles.categoriesView}>
          <View>
            <ArrowBackButton ArrowColour={colours.Black} />
          </View>
          <View style={styles.DoctorView}>
            <Text style={style.header}>Consulting</Text>
          </View>
        </View>

        {/* <-----------------------------------------Search Dropdown----------------------------------------------------> */}
        <View>
          <View>
            <Text style={style.subHeader}>Select Duration</Text>
          </View>

          <Dropdown
            style={styles.searchDropdown}
            placeholder={!isFocus ? 'Select Duration' : '...'}
            placeholderStyle={styles.placeholderText}
            selectedTextStyle={styles.selectedText}
            data={data}
            iconColor={colours.Black}
            iconStyle={styles.iconText}
            containerStyle={styles.dropdownContainer}
            showsVerticalScrollIndicator={false}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setDropValue(item.value);
              setIsFocus(false);
            }}
            value={dropValue}
            // search
            maxHeight={300}
            labelField="label"
            valueField="value"
            renderLeftIcon={() => (
              <MaterialCommunityIcons
                color={colours.DarkBlue}
                name="clock-time-four"
                size={25}
              />
            )}
          />
          {/* <TextInput style={styles.searchText} placeholder="Search"></TextInput> */}

          {/* <-----------------------------------------Radio1----------------------------------------------------> */}
          <View>
            <Text style={style.subHeader}>Mode Of Consulting</Text>
          </View>

          <RadioButton.Group
            value={radioValue}
            onValueChange={value => {
              onCheckStatus(value);
              setRadioValue(value);
            }}>
            <View style={styles.radioView}>
              <View style={styles.radioView2}>
                <View style={styles.vectorView}>
                  <TouchableOpacity style={styles.blueBackground}>
                    <AntDesign
                      name="message1"
                      size={25}
                      color={colours.DarkBlue}
                    />
                  </TouchableOpacity>
                </View>

                <View style={{marginLeft: 10}}>
                  <Text style={style.subHeader}>Messaging</Text>
                  <Text style={styles.chatText} numberOfLines={1}>
                    Chat with Doctor
                  </Text>
                  <View style={styles.chatView}>
                    <Text style={{...styles.chatText, color: '#35495be3'}}>
                      Consulting fees :{' '}
                    </Text>
                    <Text style={styles.amountText}>₹600</Text>
                    <Text style={styles.onlyText}> only</Text>
                  </View>
                </View>
              </View>

              <RadioButton
                value="CHAT"
                color={colours.DarkBlue}
                checkedColor={colours.DarkBlue}
                uncheckedColor={colours.DarkBlue}
              />
            </View>

            {/* <-----------------------------------------Radio2----------------------------------------------------> */}
            <View style={styles.radioView}>
              <View style={styles.radioView2}>
                <View style={styles.vectorView}>
                  <TouchableOpacity style={styles.blueBackground}>
                    <Foundation
                      name="telephone"
                      size={25}
                      color={colours.DarkBlue}
                    />
                  </TouchableOpacity>
                </View>

                <View style={{marginLeft: 10}}>
                  <Text style={style.subHeader}>Audio Call</Text>
                  <Text style={styles.chatText} numberOfLines={1}>
                    Call with Doctor
                  </Text>
                  <View style={styles.chatView}>
                    <Text style={{...styles.chatText, color: '#35495be3'}}>
                      Consulting fees :{' '}
                    </Text>
                    <Text style={styles.amountText}>₹800</Text>
                    <Text style={styles.onlyText}> only</Text>
                  </View>
                </View>
              </View>

              <RadioButton
                value="AUDIO"
                color={colours.DarkBlue}
                uncheckedColor={colours.DarkBlue}
              />
            </View>

            {/* <-----------------------------------------Radio3----------------------------------------------------> */}

            <View style={styles.radioView}>
              <View style={styles.radioView2}>
                <View style={styles.vectorView}>
                  <TouchableOpacity style={styles.blueBackground}>
                    <FontAwesome5
                      name="video"
                      size={20}
                      color={colours.DarkBlue}
                    />
                  </TouchableOpacity>
                </View>

                <View style={{marginLeft: 10}}>
                  <Text style={style.subHeader}>Video Call</Text>
                  <Text style={styles.chatText} numberOfLines={1}>
                    Video Call with Doctor
                  </Text>
                  <View style={styles.chatView}>
                    <Text style={{...styles.chatText, color: '#35495be3'}}>
                      Consulting fees :{' '}
                    </Text>
                    <Text style={styles.amountText}>₹1500</Text>
                    <Text style={styles.onlyText}> only</Text>
                  </View>
                </View>
              </View>

              <RadioButton
                value="VIDEO"
                color={colours.DarkBlue}
                uncheckedColor={colours.DarkBlue}
                onPress={() => {}}
              />
            </View>
          </RadioButton.Group>
        </View>

        {/* <-----------------------------------------Button----------------------------------------------------> */}

        <View style={styles.sizedBox} />
        <TouchableOpacity
          onPress={() => {
            if (radioValue && dropValue != '') {
              navigation.navigate('PatientDetails', {consultData: ConsultMode});
            } else {
              alert('please fill all details');
            }
          }}
          style={{...style.button}}>
          <Text style={style.buttonText}>Next</Text>
        </TouchableOpacity>

        {/* <-----------------------------------------Button----------------------------------------------------> */}
      </View>
    </SafeAreaView>
  );
};
export default ConsultingScreen;

const styles = StyleSheet.create({
  amountText: {
    fontSize: 14,
    fontFamily: 'Urbanist-SemiBold',
    color: '#55697B',
    lineHeight: 20,
    marginVertical: 3,
    color: colours.DarkBlue,
    fontFamily: 'Urbanist-Bold',
  },
  blueBackground: {
    backgroundColor: '#E4EBFF',
    height: width * 0.13,
    width: width * 0.13,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  chatView: {
    flexDirection: 'row',
  },
  chatText: {
    fontSize: 14,
    fontFamily: 'Urbanist-SemiBold',
    color: '#55697B',
    lineHeight: 20,
    marginVertical: 3,
  },

  categoriesView: {
    marginVertical: 15,
    flexDirection: 'row',

    alignItems: 'center',
    width: width * 0.95,
  },
  dropdownContainer: {
    backgroundColor: '#F4F6F9',
  },
  DoctorView: {
    marginHorizontal: 10,
  },
  iconText: {
    width: 30,
    height: 30,
  },
  // mainContainer: {
  //     height: height,
  //     width: width,
  //     backgroundColor: colours.White,

  // },
  onlyText: {
    fontSize: 12,
    fontFamily: 'Urbanist-Medium',
    color: '#7D8BB7',
    lineHeight: 20,
    marginVertical: 3,
  },
  placeholderText: {
    fontSize: 15,
    fontFamily: 'Urbanist-SemiBold',
    lineHeight: 20,
    color: '#7D8BB7',
    marginLeft: 10,
  },
  radioView: {
    borderWidth: 0.06,
    borderRadius: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: colours.Black,
    paddingTop: 10,
    paddingBottom: 10,
    marginVertical: 8,
  },
  sizedBox: {
    width: width * 0.95,
    height: width * 0.35,
  },
  selectedText: {
    ...style.subHeader,
    fontFamily: 'Urbanist-Medium',
    marginHorizontal: 10,
  },
  radioView2: {
    flexDirection: 'row',
  },
  searchDropdown: {
    backgroundColor: '#F4F6F9',
    borderRadius: 50,
    // borderColor: '#E8ECF4',
    color: colours.Black,
    marginVertical: 15,
    padding: 5,
    width: width * 0.9,
  },
  vectorView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
