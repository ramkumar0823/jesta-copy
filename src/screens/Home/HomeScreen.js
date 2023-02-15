import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  FlatList,
  Image,
  Touchable,
  Alert,
  TouchableOpacity,
  TextInput,
  Modal,
  LogBox,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {
  style,
  height,
  width,
  colours,
  LOCATION_URL,
  CATEGORY_IMAGE_URL,
  CATEGORY_DOCTOR_URL,
  SYMPTOMS_URL,
  ALL_DETAILS_URL,
  LOCATION_HOSPITAL_URL,
  SALT,
} from '../../constants/index';
import {useNavigation} from '@react-navigation/native';
import SearchBar from '../../components/homescreen/SearchBar';
import HomeCarousel from '../../components/homescreen/HomeCarousel';
import SymptomsButton from '../../components/button/SymptomsButton';
import Jesta from '../../assets/image/JestaSmall.png';
import Location from '../../assets/image/Location.png';
import IonIcons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CategoryArray from '../../assets/flatlistarray/CategoryArray';
import Categories from '../../components/homescreen/Categories';
import Hospitals from '../../components/homescreen/Hospitals';
import Specialists from '../../components/homescreen/Specialists';
import PushNotification from 'react-native-push-notification';

import {SafeAreaView} from 'react-native-safe-area-context';
import TopDoctor from '../../components/homescreen/TopDoctor';
import HospitalProfile from '../profiles/HospitalProfile';
import NotificationController from '../../components/common/NotificationController.android';
import messaging from '@react-native-firebase/messaging';
import {useDispatch, useSelector} from 'react-redux';
import md5 from 'md5';
import axios from 'axios';
import {setDoctorID, setHospitalID, setLocation} from '../../redux/slice/User';
import LoaderModal from '../../components/common/LoaderModal';
import {Dropdown} from 'react-native-element-dropdown';
import Apollo from '../../assets/image/Apollo.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setLoginUserId} from '../../redux/slice/User';

const HomeScreen = () => {
  LogBox.ignoreAllLogs();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userID2 = useSelector(state => state.user.loginUserId);
  const [loading, setLoading] = useState(false);
  // const [userID, setUserID] = useState();
  const [locationDetails, setLocationDetails] = useState();
  const [locationText, setLocationText] = useState('Location');
  const [imageDetails, setImageDetails] = useState();
  const [dropValue, setDropValue] = useState('');
  const [success, setSuccess] = useState('false');
  const [isFocus, setIsFocus] = useState(false);
  const [symptoms, setSymptoms] = useState([]);
  const [specialist, setSpecialist] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [topDoctors, setTopDoctors] = useState([]);
  const [bannerImage, setBannerImage] = useState();
  console.log('>>Imagedetails', specialist);

  const data = [
    {label: 'Male', value: 'Male'},
    {label: 'Female', value: 'Female'},
  ];

  useEffect(() => {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('message handled in background', remoteMessage);
    });
    const unSubscribe = messaging().onMessage(async remoteMessage => {
      console.log(remoteMessage);
    });
    return unSubscribe;
  }, []);

  useEffect(() => {
    getData();
    // locationData();
    // allDetails();
  }, []);

  // <----------------------------------------------------Get data------------------------------------------------------------>

  let getData = async () => {
    setLoading(true);
    try {
      const value = await AsyncStorage.getItem('@store');
      // setUserID(value);
      await allDetails(value);
      await onLocation(value);
      // await onLocation(value)
      dispatch(setLoginUserId(value));
      setLoading(false);
      console.log('getstore value', value);
      console.log('value', value);
    } catch (e) {
      alert(e);
    }
  };
  const allDetails = async userID => {
    setLoading(true);
    const auth_token = md5(SALT + userID);
    const data = {
      user_id: userID,
      auth_token: auth_token,
    };
    console.log('specialistall', data);
    await axios
      .post(ALL_DETAILS_URL, data)
      .then(Response => {
        if (Response.data.success) {
          console.log('alldetails', Response.data.parameters);
          setImageDetails(Response.data.parameters.categories);
          setSymptoms(Response.data.parameters.symptoms);
          setSpecialist(Response.data.parameters.specialists);
          // setSuccess(true);
          setLoading(false);
        } else {
          setLoading(false);
          alert(Response.data.message);
        }
      })
      .catch(err => {
        alert('alldeterror', err);
        console.log('alldeterror', err);
        setLoading(false);
      });
  };

  // <----------------------------------------------------getting location ID------------------------------------------------------------>
  const onLocation = async userData => {
    setLoading(true);
    const value = await AsyncStorage.getItem('@location');

    console.log('>>>@location', value);
    if (value === null) {
      locationData(userData);
      setSuccess(true);
      setLoading(false);
    } else {
      nearbyHospitals(value);
      locationData(userData);
      setLocationText(await AsyncStorage.getItem('@place'));
      setLoading(false);
    }
    dispatch(setLocation(value));
  };

  const locationData = async userID => {
    console.log('>>>loc', userID);
    setLoading(true);

    const auth_token = md5(SALT + userID);
    const data = {
      user_id: userID,
      auth_token: auth_token,
    };

    await axios
      .post(LOCATION_URL, data)
      .then(Response => {
        if (Response.data.success) {
          setLoading(false);
          setLocationDetails(Response.data.parameters);
          // setSuccess(true);
          console.log('responseData', Response.data.parameters);
        } else {
          setLoading(false);
          alert(Response.data.message);
        }
      })
      .catch(err => {
        alert('locationerror', err);
        setLoading(false);
      });
  };
  // <----------------------------------------------------nearby hospitals------------------------------------------------------------>

  const nearbyHospitals = async locationID => {
    setLoading(true);

    //  if(locationID){ try {
    //     const value = await AsyncStorage.getItem('@location');
    //     setLoading(false);
    //     console.log('getstore value', value);
    //     console.log(' location value', value);
    //   } catch (e) {
    //     alert(e);
    //   }}
    const auth_token = md5(SALT + userID2 + locationID);
    const data = {
      user_id: userID2,
      location_id: locationID,
      auth_token: auth_token,
    };

    await axios
      .post(LOCATION_HOSPITAL_URL, data)
      .then(Response => {
        if (Response.data.success) {
          setLoading(false);
          setHospitals(Response.data.parameters.hospital_list);
          setTopDoctors(Response.data.parameters.top_doctors_list);
          setBannerImage(Response.data.parameters.banner_show);
          console.log('>>location', Response.data.parameters.top_doctors_list);
        } else {
          setLoading(false);
          alert('>>>', Response.data.message);
        }
      })
      .catch(err => {
        alert(err);
        setLoading(false);
      });
  };

  const onSaveLocation = async value => {
    console.log('<<<', value);
    try {
      await AsyncStorage.setItem('@location', value.location_id.toString());
      await AsyncStorage.setItem('@place', value.cityname.toString());
      console.log('>>>location', value);
      dispatch(setLocation(value.location_id));
    } catch (e) {
      console.log('>>>>>>', e);
      alert(e, 'failed to save data');
    }
  };

  PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function (token) {
      console.log('TOKEN:', token);
    },

    // (required) Called when a remote is received or opened, or local notification is opened
    onNotification: function (notification) {
      console.log('NOTIFICATION:', notification);

      // process the notification

      // (required) Called when a remote is received or opened, or local notification is opened
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },

    // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
    onAction: function (notification) {
      console.log('ACTION:', notification.action);
      console.log('NOTIFICATION:', notification);

      // process the action
    },

    // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
    onRegistrationError: function (err) {
      console.error(err.message, err);
    },
  });

  // <----------------------------------------------------categoryspecilaist------------------------------------------------------------>

  const showAlert = () => {
    Alert.alert('Alert', 'Do you want to logout', [
      {
        text: 'Yes',
        onPress: () => {
          logout();
        },
        style: 'cancel',
      },
      {
        text: 'No',
        style: 'cancel',
      },
    ]);
  };

  return (
    <SafeAreaView
      style={{
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colours.White,
      }}>
      {/* <NotificationController /> */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{marginVertical: 10}}>
        <View style={{...styles.backButton}}>
          <View style={{flexDirection: 'row'}}>
            <View>
              <Image source={Jesta} style={styles.jesta} />
            </View>
            <View style={styles.location}>
              <View>
                <Text style={styles.currentLocation}> Select Location</Text>
                <TouchableOpacity
                  style={{flexDirection: 'row', alignItems: 'center'}}
                  onPress={() => {
                    setSuccess(true);
                  }}>
                  <Image
                    source={Location}
                    style={{
                      resizeMode: 'center',
                      height: width * 0.05,
                      width: width * 0.05,
                      padding: 0,
                    }}
                  />
                  <Text style={styles.locationText}>{locationText}</Text>
                </TouchableOpacity>
                {/* <View>
                    <Dropdown
                      style={styles.searchDropdown}
                      placeholder={!isFocus ? 'Location' : '...'}
                      placeholderStyle={{
                        ...styles.locationText,
                      }}
                      selectedTextStyle={styles.locationText}
                      data={
                        locationDetails &&
                        locationDetails.map(
                          item => (
                            console.log('>>>>', item),
                            {
                              label: item.location_id,
                              value: item.cityname,
                            }
                          ),
                        )
                      }
                      iconColor={colours.Black}
                      iconStyle={styles.iconText}
                      containerStyle={styles.dropdownContainer}
                      showsVerticalScrollIndicator={false}
                      onFocus={() => setIsFocus(true)}
                      onBlur={() => setIsFocus(false)}
                      onChange={item => {
                        console.log('item>>>>', item);
                        setDropValue(item.value);
                        setIsFocus(false);
                      }}
                      // search
                      value={dropValue}
                      maxHeight={200}
                      labelField="value"
                      valueField="value"
                    />
                  </View> */}
              </View>
            </View>
          </View>
          {/* <------------------------------Modal---------------------------------------------------------------------------------> */}

          <Modal
            transparent={true}
            animationType={'none'}
            visible={success}
            onRequestClose={() => {
              setSuccess(false);
            }}>
            <View style={styles.modalBackground}>
              <View style={styles.activityIndicatorWrapper}>
                <ScrollView>
                  <View style={styles.modalContainer}>
                    <FlatList
                      nestedScrollEnabled={true}
                      data={locationDetails}
                      renderItem={({item}) => (
                        <TouchableOpacity
                          style={{
                            width: width * 0.68,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            padding: width * 0.02,
                          }}
                          onPress={() => {
                            nearbyHospitals(item.location_id);
                            onSaveLocation(item);
                            dispatch(setLocation(item.location_id));
                            setLocationText(item.cityname);
                            setSuccess(false);
                          }}>
                          <Text style={styles.successText}>
                            {item.cityname}
                          </Text>
                          <Image
                            source={Location}
                            style={{
                              resizeMode: 'center',
                              height: width * 0.05,
                              width: width * 0.05,
                              padding: 0,
                            }}
                          />
                        </TouchableOpacity>
                      )}
                      keyExtractor={item => item.id}
                      showsVerticalScrollIndicator={false}
                    />
                  </View>
                </ScrollView>
              </View>
            </View>
          </Modal>

          {/* <----------------------------------------------Notification & favourite-----------------------------------------------------------> */}

          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={{...styles.notification, marginRight: 10}}
              onPress={() => {
                navigation.navigate('NotificationsScreen');
              }}>
              <IonIcons
                name="notifications"
                size={20}
                color={colours.DarkBlue}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.notification}
              onPress={() => {
                navigation.navigate('FavouriteDoctor');
                // showAlert();
              }}>
              <AntDesign name="heart" size={19} color={colours.DarkBlue} />
            </TouchableOpacity>
          </View>
        </View>
        {/* <----------------------------------------------Search screen-----------------------------------------------------------> */}
        <View style={styles.searchbar}>
          <TouchableOpacity
            style={styles.searchbar2}
            onPress={() => {
              navigation.navigate('SearchScreen');
            }}>
            <TextInput
              style={styles.searchText}
              placeholder="Search"></TextInput>

            <Feather
              name="search"
              size={20}
              color={colours.Dimgray}
              style={styles.searchIcon}
            />
          </TouchableOpacity>

          <HomeCarousel Banner={bannerImage} />

          {/* <------------------------------------------Categories-----------------------------------------------------> */}

          <View style={styles.categoriesView}>
            <Text style={style.categoryText}>Categories</Text>
          </View>
          <View style={{height: width * 0.3, width: width}}>
            <FlatList
              ListFooterComponent={<View />}
              ListFooterComponentStyle={{width: 30}}
              nestedScrollEnabled={true}
              key="_"
              // data={CategoryArray}
              data={imageDetails}
              renderItem={({item}) => (
                <Categories
                  categoryPhoto={item.image}
                  title={item.category_name}
                  Styles={styles.categoryStyles}
                  OutStyle={styles.categoryOut}
                  ImageStyles={styles.categoryImage}
                  onHandlePress={() => {
                    navigation.navigate('CategoryDoctorsScreen', {
                      categoryData: item.category_id,
                    });
                  }}
                />
              )}
              keyExtractor={item => item.category_id}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          </View>

          {/* <------------------------------------------symptoms-----------------------------------------------------> */}

          <View style={styles.categoriesView}>
            <Text style={style.categoryText}>Symptoms</Text>
          </View>

          <View style={{height: width * 0.12, width: width}}>
            <FlatList
              nestedScrollEnabled={true}
              ListFooterComponent={<View />}
              ListFooterComponentStyle={{width: 30}}
              key="_"
              data={symptoms}
              renderItem={({item}) => (
                <SymptomsButton
                  symptoms={item.symptoms}
                  Touch={() => {
                    navigation.navigate('SymptomsScreen', {
                      data: item.symptoms_id,
                    });
                  }}
                />
              )}
              keyExtractor={item => item.id}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          </View>

          {/* <------------------------------------------Best Hospitals-----------------------------------------------------> */}
          <View style={styles.categoriesView}>
            <Text style={style.categoryText}>Nearby Hospitals</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('HospitalsList');
              }}>
              <Text style={styles.categoryText2}>See all</Text>
            </TouchableOpacity>
          </View>

          <View style={{height: width * 0.7, width: width, borderWidth: 0}}>
            <FlatList
              ListFooterComponent={<View />}
              ListFooterComponentStyle={{width: 30}}
              nestedScrollEnabled={true}
              key="_"
              data={hospitals}
              renderItem={({item}) => (
                <Hospitals
                  Photo={item.hospital_image}
                  title={item.hospital_name}
                  location={item.cityname}
                  HandlePress={() => {
                    navigation.navigate('HospitalProfile', {
                      data: item.hospitals_id,
                    });
                  }}
                  // data={CategoryArray}
                  // renderItem={({item}) => (
                  //   <Hospitals
                  //     Hospital={Apollo}
                  //     title={item.title2}
                  //     location={item.location2}
                  //     HandlePress={() => {
                  //       HospitalsList();
                  //     }}
                />
              )}
              keyExtractor={item => item.hospital_name}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          </View>

          {/* <------------------------------------------Specialist dcotor-----------------------------------------------------> */}

          <View style={styles.categoriesView}>
            <Text style={style.categoryText}>Specialist Doctor</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('SpecialistsScreen');
              }}>
              <Text style={styles.categoryText2}>See all</Text>
            </TouchableOpacity>
          </View>

          <View style={{height: width * 0.7, width: width, borderWidth: 0}}>
            <FlatList
              ListFooterComponent={<View />}
              ListFooterComponentStyle={{width: 30}}
              nestedScrollEnabled={true}
              key="_"
              data={specialist}
              renderItem={({item}) => (
                <Specialists
                  Specialists={item.specialist_at}
                  Doctors={item.doctors}
                  BackgroundColor={item.color}
                  Photo={item.image}
                  SpecialistDoctor={() => {
                    navigation.navigate('SpecialistsDoctors', {
                      data: item.specialist_id,
                    });
                  }}
                />
              )}
              keyExtractor={item => item.id}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          </View>

          {/* <------------------------------------------Top Doctor-----------------------------------------------------> */}

          <View style={styles.categoriesView}>
            <Text style={style.categoryText}>Top Doctor</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('TopDoctorsScreen');
              }}>
              <Text style={styles.categoryText2}>See all</Text>
            </TouchableOpacity>
          </View>
          <View style={{height: width * 0.7, width: width, borderWidth: 0}}>
            <FlatList
              ListFooterComponent={<View />}
              ListFooterComponentStyle={{width: 30}}
              nestedScrollEnabled={true}
              // data={topDoctors}
              // renderItem={({item}) => (
              //   console.log('>>>top', topDoctors),
              //   (
              //     <TopDoctor
              //       Specialisation={item.specialists}
              //       Doctor={item.image3}
              //       DoctorName={item.name}
              //       OnHandleSubmit={() => {
              //         navigation.navigate('TopDoctorsScreen');
              //       }}
              //     />
              data={topDoctors}
              renderItem={({item}) => (
                console.log('>>>top', topDoctors),
                (
                  <TopDoctor
                    Specialisation={item.specialist_at}
                    Doctor={item.doctor_image}
                    DoctorName={item.name}
                    OnHandleSubmit={() => {
                      navigation.navigate('DoctorProfile', {
                        data: item.doctor_id,
                      });
                      dispatch(setDoctorID(item.doctor_id));
                    }}
                  />
                )
              )}
              keyExtractor={item => item.id}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>
      </ScrollView>
      <LoaderModal Load={loading} />
    </SafeAreaView>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  activityIndicatorWrapper: {
    backgroundColor: colours.White,
    height: height * 0.4,
    width: width * 0.8,
    borderRadius: 15,
    display: 'flex',

    borderWidth: 1,
  },
  modalContainer: {
    height: height * 0.4,
    width: width * 0.8,
    alignItems: 'center',
    borderWidth: 1,
  },
  DoctorView: {
    marginHorizontal: 10,
    padding: 0,
  },
  successText: {
    fontFamily: 'Urbanist-SemiBold',
    fontSize: 16,
    color: colours.DarkBlue,
    lineHeight: 24,
    borderWidth: 0,
    width: width * 0.5,
    // marginTop: 5,
  },
  modalHead: {
    ...style.header,
    textAlign: 'center',
    color: colours.BlueReg,
  },

  searchDropdown: {
    backgroundColor: colours.White,
    borderRadius: 5,
    // borderColor: '#E8ECF4',
    color: colours.Black,
    width: width * 0.3,
    height: width * 0.07,
    paddingLeft: 3,
  },
  selectedText: {
    ...style.subHeader,
    fontFamily: 'Urbanist-Medium',
    marginHorizontal: 10,
  },
  dropdownContainer: {
    // backgroundColor: '#F4F6F9',
    width: width * 0.5,
    backgroundColor: colours.White,
  },
  iconText: {
    width: 0,
    height: 0,
  },
  backButton: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    borderWidth: 0,
    width: width * 0.9,
    alignSelf: 'center',
    borderWidth: 0,
    justifyContent: 'space-between',
  },
  categoryOut: {
    width: width * 0.15,
    borderWidth: 0,
    marginHorizontal: 15,
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryStyles: {
    borderWidth: 2,
    borderRadius: 20,
    backgroundColor: colours.White,
    borderColor: colours.AliceBlue,
    padding: 10,
    height: width * 0.2,
    width: width * 0.2,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  categoryImage: {
    height: 100,
    width: 100,
    resizeMode: 'center',
  },
  jesta: {
    resizeMode: 'center',
    height: width * 0.13,
    width: width * 0.13,
    paddingLeft: 0,
    marginLeft: 0,
  },
  location: {
    borderWidth: 0,
    justifyContent: 'flex-end',
  },
  currentLocation: {
    paddingLeft: width * 0.007,
    paddingBottom: width * 0.01,
    fontFamily: 'Urbanist-Regular',
    color: colours.KashmirBlue,
  },
  locationText: {
    fontFamily: 'Urbanist-Bold',
    fontSize: 14,
    color: colours.DarkBlue,
  },
  notification: {
    backgroundColor: '#E4EBFF',
    borderRadius: 10,
    padding: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesView: {
    marginVertical: 15,
    paddingRight: width * 0.05,
    justifyContent: 'space-between',
    borderWidth: 0,
    flexDirection: 'row',
  },
  searchbar: {
    width: width,
    paddingLeft: width * 0.05,
    borderWidth: 0,
    // alignItems: 'center',
    // justifyContent: 'center',
  },

  categoryText2: {
    fontSize: 20,
    fontFamily: 'Urbanist-SemiBold',
    color: colours.DarkBlue,
  },
  searchbar2: {
    paddingLeft: 10,
    backgroundColor: '#F4F6F9',
    borderRadius: 50,
    // borderWidth: 1,
    // borderColor: '#E8ECF4',
    color: colours.Black,
    marginVertical: 15,
    paddingRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: width * 0.9,
  },
  searchText: {
    fontFamily: 'Urbanist-SemiBold',
    fontSize: 15,
    color: colours.Dimgray,
    // flex:1,
    borderWidth: 0,
  },
});
