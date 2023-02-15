import React, {useState} from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  View,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
  Text,
  Permission,
  PermissionsAndroid,
} from 'react-native';
import {colours, style, height, width} from '../../constants';
import ArrowBackButton from '../../components/button/ArrowBackButton';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Dropdown} from 'react-native-element-dropdown';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
const PatientDetails = () => {
  const navigation = useNavigation();
  const consult = useRoute().params.consultData;
  const [name, setName] = useState();
  const [age, setAge] = useState();
  const [comments, setComments] = useState();
  const [dropValue, setDropValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [imagePath, setImagePath] = useState();
  const [image, setImage] = useState();
  const [upload, setUpload] = useState();
  // console.log('imagepath', imagePath.uri);
  console.log('>>>', consult);

  const Patient = {
    name: name,
    age: age,
    gender: dropValue,
    comments: comments,
    duration: consult.consultTime,
    mode: consult.radioID,
    doctorID: consult.doctorID,
    date: consult.date,
    time: consult.time,
  };
  const data = [
    {label: 'Male', value: 'Male'},
    {label: 'Female', value: 'Female'},
  ];
  const data2 = [
    {label: '1-10', value: '1-10'},
    {label: '11-20', value: '11-20'},
    {label: '21-30', value: '21-30'},
    {label: '31-40', value: '31-40'},
    {label: '41-50', value: '41-50'},
  ];

  const onLaunchCamera = () => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
      title: 'Camer Permission',
      message: 'App needs access to your camera',
      buttonNeutral: 'Ask Me Later',
      buttonNegative: 'Cancel',
      buttonPositive: 'OK',
    })
      .then(() => {
        let optoins = {
          mediaType: 'photo',
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
        launchCamera(optoins, res => {
          console.log('res of camer', res);
          if (res.didCancel) {
            console.log('User cancelled image picker');
          } else if (res.errorCode) {
            console.log('ImagePicker Error: ', res.errorCode);
          } else if (res.customButton) {
            console.log('User tapped custom button: ', res.customButton);
          } else if (res.errorMessage) {
            console.log('ImagePicker Error: ', res.errorMessage);
          } else {
            setImagePath({
              uri: res.assets[0]?.uri ?? res.assets[0]?.image_url,
              type: res.assets[0]?.type,
              name: res.assets[0]?.image_url
                ? res.assets[0]?.image_url
                : res.assets[0]?.fileName ?? res.assets[0]?.name,
            });

            // setImagePath(res.assets[0]);
            setImage([res.assets[0]]);
          }
        });
      })
      .catch(error => {
        console.log(error);
      });
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
      <View style={styles.categoriesView}>
        <View>
          <ArrowBackButton ArrowColour={colours.Black} />
        </View>
        <View style={styles.DoctorView}>
          <Text style={style.header}>PatientDetails</Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{width: width * 0.9}}>
          {/* <-----------------------------------------Name----------------------------------------------------> */}
          <View>
            <View>
              <Text style={style.subHeader}>Patient Name</Text>
            </View>

            <View style={styles.searchBar}>
              <TextInput
                placeholder="Name"
                placeholderTextColor="#7D8BB7"
                value={name}
                onChangeText={value => {
                  setName(value);
                }}
                style={styles.placeholderText}></TextInput>
            </View>

            {/* <-----------------------------------------Gender----------------------------------------------------> */}
            <View>
              <View>
                <Text style={style.subHeader}>Gender</Text>
              </View>

              <Dropdown
                style={styles.searchDropdown}
                placeholder={!isFocus ? 'Select Gender' : '...'}
                placeholderStyle={{...styles.placeholderText, color: '#7D8BB7'}}
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
              />
            </View>
            {/* <-----------------------------------------Age----------------------------------------------------> */}

            <View>
              <View>
                <Text style={style.subHeader}>Age</Text>
              </View>
              <View style={styles.searchBar}>
                <TextInput
                  placeholder="Age"
                  placeholderTextColor="#7D8BB7"
                  value={age}
                  onChangeText={value => {
                    setAge(value);
                  }}
                  keyboardType={
                    Platform.OS === 'ios'
                      ? 'numbers-and-punctuation'
                      : 'number-pad'
                  }
                  maxLength={2}
                  style={styles.placeholderText}></TextInput>
              </View>
              {/* 
                            <Dropdown style={styles.searchDropdown}
                                placeholder={!isFocus ? 'Select Age' : '...'}
                                placeholderStyle={{ ...styles.placeholderText, color: "#7D8BB7" }}
                                selectedTextStyle={styles.selectedText}
                                data={data2}
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

                            /> */}
            </View>

            {/* <-----------------------------------------Comments ----------------------------------------------------> */}

            <View>
              <Text style={style.subHeader}>Write Your Health issues</Text>
            </View>

            <View
              style={{
                ...styles.searchBar,
                height: width * 0.4,
                borderRadius: 10,
              }}>
              <TextInput
                placeholder="Enter Your Health issues"
                placeholderTextColor="#7D8BB7"
                style={styles.placeholderText}
                onChangeText={value => {
                  setComments(value);
                }}
                value={comments}
                multiline={true}></TextInput>
            </View>
          </View>

          {/* <-----------------------------------------Camera---------------------------------------------------> */}

          <View>
            <Text style={style.subHeader}>Upload Report</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => {
                onLaunchCamera();
              }}
              style={styles.sizedBox}>
              <Text style={style.header}>+</Text>
            </TouchableOpacity>

            {imagePath ? (
              <View style={styles.sizedBox}>
                <Image
                  source={{uri: imagePath.uri}}
                  style={{height: width * 0.2, width: width * 0.2}}
                />
              </View>
            ) : null}
          </View>
          {/* <-----------------------------------------Button----------------------------------------------------> */}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('PatientInformation', {data: Patient});
            }}
            style={{...style.button, marginTop: 25}}>
            <Text style={style.buttonText}>Next</Text>
          </TouchableOpacity>

          {/* <-----------------------------------------Button----------------------------------------------------> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default PatientDetails;

const styles = StyleSheet.create({
  searchText: {
    fontFamily: 'Urbanist-SemiBold',
    fontSize: 15,
    color: colours.Dimgray,
    flex: 1,
  },

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
    width: width * 0.93,
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
    color: colours.Black,
    marginLeft: 10,
    width: width * 0.8,
  },
  commentsText: {
    fontSize: 15,
    fontFamily: 'Urbanist-SemiBold',
    color: colours.Black,
    marginLeft: 10,
    width: width * 0.8,
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
    width: width * 0.25,
    height: width * 0.25,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
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
  searchBar: {
    paddingLeft: 0,
    backgroundColor: '#F4F6F9',
    borderRadius: 50,
    color: colours.Black,
    marginVertical: 15,
  },
  vectorView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
