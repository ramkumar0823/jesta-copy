import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  FlatList,
  LogBox,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import AgoraUIKit from 'agora-rn-uikit';
import {colours, style, height, width} from '../../constants';
import DoctorPic from '../../assets/image/DoctorProfile.png';
import ArrowBackButton from '../../components/button/ArrowBackButton';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ReviewImage from '../../assets/image/ReviewImage.png';
import BackgroundEclipse from '../../assets/image/BackgroundEclipse.png';
import {onTextLayout} from 'deprecated-react-native-prop-types/DeprecatedTextPropTypes';
import {onChangeText} from 'deprecated-react-native-prop-types/DeprecatedTextInputPropTypes';
import CategoryArray from '../../assets/flatlistarray/CategoryArray';
import Share from 'react-native-share';
import ButtonCommon from '../../components/button/ButtonCommon';
import Config from '../../constants/Config';

const CallInformation = ({route}) => {
  const navigation = useNavigation();
  // const {itemdet, data1} = route.params;
  const [textShown, setTextShown] = useState(false);
  const [lengthMore, setLengthMore] = useState(false);
  const [lineLength, setlineLength] = useState(6);
  const [videoCall, setVideoCall] = useState(false);
  const [voiceCall, setVoiceCall] = useState(false);
  const [chat, setChat] = useState(false);
  const [contact, setContact] = useState(7708323589);
  // const [phot, setPhoto] = useState;
  const [rtcUid, setRtcUid] = useState();
  // console.log('data1 is', data1);

  LogBox.ignoreAllLogs();
  const DayArray = [
    {
      id: 1,
      day: 'Sunday',
    },
    {
      id: 2,
      day: 'Monday',
    },
    {
      id: 3,
      day: 'Tuesday',
    },
    {
      id: 4,
      day: 'Wednesday',
    },
    {
      id: 5,
      day: 'Thursday',
    },
    {
      id: 6,
      day: 'Friday',
    },
    {
      id: 7,
      day: 'Saturday',
    },
  ];

  const connectionData = {
    appId: Config.appId,
    channel: Config.channelId,
    token: Config.token,
    rtcUid: rtcUid,

    isHost: true,
    channelName: Config.channelId,
    joinSucceed: false,
    rtcUid: parseInt((new Date().getTime() + '').slice(4, 13), 10),
    peerIds: [],
    myUsername: '',
    usernames: {},
  };

  useEffect(() => {
    // console.log('item phone :', itemdet.phoneNumber)
    // return () => {}
  }, []);

  const callbacks = {
    EndCall: () => setVideoCall(false),
    FullScreen: () => {
      /* Function Body */
    },
    SwitchCamera: () => {
      /* Function Body */
    },
    SwapVideo: () => {
      /* Function Body */
    },
    UserMuteRemoteAudio: () => {
      /* Function Body */
    },
    UserMuteRemoteVideo: () => {
      /* Function Body */
    },
    LocalMuteAudio: () => {
      /* Function Body */
    },
    LocalMuteVideo: () => {
      /* Function Body */
    },
  };
  const localButtonStyle = {
    backgroundColor: '#78b0ff',
    borderColor: '#78b0ff',
  };

  const styleProps = {
    localBtnStyles: {
      muteLocalAudio: localButtonStyle,
      muteLocalVideo: localButtonStyle,
      switchCamera: localButtonStyle,
      fullScreen: localButtonStyle,
    },
    // UIKitContainer: {height: '50%', width: '100%'},
    UIKitContainer: {
      flex: 1,
      height: '100%',
      width: '100%',
      backgroundColor: '#ff00ff',
    },
  };
  const trigchat = val => {
    console.log('val  : ', val);
    // setRtcUid(val)
    // setVideoCall(true)
  };
  const trigaudio = val => {
    console.log('val  : ', val);
    // setRtcUid(val)
    // setVideoCall(true)
  };
  const trigvideo = val => {
    console.log('val  : ', val);
    setRtcUid(val);
    setVideoCall(true);
  };

  const onText = useCallback(e => {
    setLengthMore(e.nativeEvent.lines.length >= 6); //to check the text is more than 4 lines or not
    // console.log(e.nativeEvent);
  }, []);

  const shareProfile = () => {
    let urlString = 'www.google.com';
    let options = {
      title: 'Share via',
      message: 'Doctor Profile',
      url: urlString,
      type: 'string',
      // type: 'image/jpeg',
    };
    Share.open(options)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        err && console.log(err);
      });
  };

  return (
    <>
      {videoCall ? (
        <AgoraUIKit connectionData={connectionData} rtcCallbacks={callbacks} />
      ) : (
        <SafeAreaView style={style.mainContainer}>
          <View style={{width: width}}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled={true}>
              {/* <----------------------------------------------------Headercontent--------------------------------------------------->        */}
              <View style={{backgroundColor: '#ECF2FE', width: width}}>
                {/* #F4F6F9 */}
                <View
                  style={{
                    width: width * 0.9,
                    borderWidth: 0,
                    backgroundColor: '#ECF2FE',
                    marginVertical: width * 0.03,
                    marginTop: width * 0.05,
                    alignSelf: 'center',
                  }}>
                  <ArrowBackButton ArrowColour={colours.DarkBlue} />
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    backgroundColor: '#ECF2FE',
                    width: width * 0.9,
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignSelf: 'center',
                  }}>
                  <View
                    style={{
                      width: width * 0.5,
                      height: width * 0.5,
                    }}>
                    <View
                      style={{
                        width: width * 0.55,
                        height: width * 0.45,
                        borderWidth: 0,
                      }}>
                      <View>
                        <Text
                          style={{...style.subHeader, marginTop: width * 0.05}}>
                          Dr.Tharani
                        </Text>

                        <View style={styles.specialistView}>
                          <Text style={styles.specialistText}>
                            Cardio Specialist
                          </Text>
                          <View style={styles.borderView} />
                          <Text style={styles.specialistText}>
                            Hts Hospital
                          </Text>
                        </View>

                        <View>
                          <Text
                            style={{
                              ...styles.moreText,
                              fontSize: 16,
                              color: colours.Chargoal,
                              marginBottom: width * 0.03,
                            }}>
                            10:00 to 10:30
                          </Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                          <TouchableOpacity
                            style={styles.blueBackground}
                            onPress={() => {
                              navigation.navigate('ChatScreen');
                              // trigchat(itemdet.phoneNumber)
                            }}
                            // onPress={() => {navigation.navigate('VideoCall');}}
                          >
                            <FontAwesome5
                              name="rocketchat"
                              size={20}
                              color={colours.DarkBlue}
                            />
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={styles.blueBackground}
                            onPress={() => trigaudio(itemdet.phoneNumber)}
                            // onPress={() => {navigation.navigate('VideoCall');}}
                          >
                            <FontAwesome5
                              name="phone"
                              size={20}
                              color={colours.DarkBlue}
                            />
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={styles.blueBackground}
                            onPress={() => trigvideo(itemdet.phoneNumber)}
                            // onPress={() => {navigation.navigate('VideoCall');}}
                          >
                            <FontAwesome5
                              name="video"
                              size={20}
                              color={colours.DarkBlue}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>

                      <View style={styles.ratingContainer}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}></View>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      width: width * 0.4,
                      height: width * 0.5,
                      alignItem: 'center',
                      justifyContent: 'center',
                    }}>
                    <Image
                      source={DoctorPic}
                      style={{
                        height: width * 0.5,
                        width: width * 0.4,
                        marginTop: 0,
                      }}
                    />
                    <View style={{backgroundColor: '#F4F6F9'}}></View>
                  </View>
                </View>
              </View>

              {/* <----------------------------------------------------PatientsContainer--------------------------------------------------->*/}
              <View style={{backgroundColor: '#ECF2FE'}}>
                <View
                  style={{
                    borderTopRightRadius: 30,
                    borderTopLeftRadius: 30,
                    backgroundColor: colours.White,
                  }}>
                  <View style={styles.patientsContainer}>
                    <View style={styles.experianceView}>
                      <TouchableOpacity style={style.blueBackground}>
                        <FontAwesome5
                          name="user-friends"
                          size={18}
                          color={colours.DarkBlue}
                        />
                      </TouchableOpacity>
                      <Text style={styles.experianceText2}>700+</Text>
                      <Text style={styles.experianceText}>Patients</Text>
                    </View>

                    <View style={styles.experianceView}>
                      <TouchableOpacity style={style.blueBackground}>
                        <MaterialCommunityIcons
                          name="briefcase"
                          size={20}
                          color={colours.DarkBlue}
                        />
                      </TouchableOpacity>
                      <Text style={styles.experianceText2}>3 Years</Text>
                      <Text style={styles.experianceText}>Experiance</Text>
                    </View>

                    <View style={styles.experianceView}>
                      <TouchableOpacity style={style.blueBackground}>
                        <MaterialCommunityIcons
                          name="message-text"
                          size={20}
                          color={colours.DarkBlue}
                        />
                      </TouchableOpacity>
                      <Text style={styles.experianceText2}>4,877</Text>
                      <Text style={styles.experianceText}>Reviews</Text>
                    </View>
                  </View>

                  {/* <----------------------------------------------------Description--------------------------------------------------->*/}

                  <View style={styles.viewVertical}>
                    <View style={{width: width * 0.9}}>
                      <Text style={styles.subHeader}>Description</Text>
                    </View>
                    <View>
                      <Text
                        style={{...style.paragraphText, color: '#55697B'}}
                        onTextLayout={onText}
                        numberOfLines={textShown ? undefined : 6}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Tortor ac leo lorem nisl. Viverra vulputate sodales quis
                        et dui, lacus. Iaculis eu egestas leo egestas vel.
                        Ultrices ut magna nulla facilisi commodo enim, orci
                        feugiat pharetra. Id sagittis, ullamcorper turpis
                        ultrices platea pharetra.
                      </Text>
                      {lengthMore ? (
                        <Text
                          onPress={() => {
                            setTextShown(!textShown);
                          }}
                          style={styles.moreText}>
                          {textShown ? ' View less' : ' View more'}
                        </Text>
                      ) : null}
                    </View>
                  </View>

                  {/* <----------------------------------------------------Appointment--------------------------------------------------->*/}

                  <View style={styles.viewVertical}>
                    <View>
                      <Text style={styles.subHeader}>Visit Time</Text>
                    </View>
                    <FlatList
                      nestedScrollEnabled={true}
                      key="_"
                      data={DayArray}
                      renderItem={({item}) => (
                        <View style={{flexDirection: 'row'}}>
                          <Text
                            style={{...styles.moreText, width: width * 0.35}}
                            numberOfLines={1}>
                            {item.day}
                          </Text>
                          <Text
                            style={{...styles.moreText, width: width * 0.4}}
                            numberOfLines={1}>
                            : 8 AM - 9 PM{' '}
                          </Text>
                        </View>
                      )}
                      keyExtractor={item => item.id}
                    />
                  </View>

                  {/* <-----------------------------------------------Review ----------------------------------------------------------> */}

                  <View style={styles.viewVertical}>
                    <View>
                      <Text style={styles.subHeader}>Fee Information</Text>
                    </View>

                    <View>
                      <Text style={styles.feesText}>₹400(paid)</Text>
                    </View>
                  </View>

                  {/* <-----------------------------------------------Button ----------------------------------------------------------> */}

                  <View style={styles.buttonContainer}>
                    <ButtonCommon
                      ButtonText="Message Start 10:00-10:30 AM"
                      HandlePress={() => {
                        console.log('hi');
                        // navigation.navigate('ChatHistory');
                        navigation.navigate('VideoCallScreen');
                      }}
                    />
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        </SafeAreaView>
      )}
    </>
  );
};

export default CallInformation;

const styles = StyleSheet.create({
  borderView: {
    borderRightWidth: 1,
    height: 20,
    borderColor: '#333333',
  },
  //   blueBackground: {
  //     backgroundColor: '#E4EBFF',
  //     height: width * 0.11,
  //     width: width * 0.11,
  //     alignItems: 'center',
  //     justifyContent: 'center',
  //     borderRadius: 30,
  //     padding: 11,
  //     justifyContent: 'center',
  //     alignItems: 'center',
  //   },
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
    marginHorizontal: 3,
  },
  buttonContainer: {
    marginTop: width * 0.04,
    marginBottom: width * 0.06,
  },

  dayText: {
    ...style.paragraphText,
    textAlign: 'right',
    width: width * 0.3,
    marginRight: 4,
  },

  experianceView: {
    borderWidth: 0,
    width: width * 0.3,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: 10,
  },
  experianceText: {
    fontStyle: 'Urbanist-SemiBold',
    fontSize: 14,
    lineHeight: 20,
    color: '#55697B',
    width: width * 0.28,
    textAlign: 'center',
  },
  experianceText2: {
    fontSize: 18,
    lineHeight: 25,
    width: width * 0.2,
    color: colours.DarkBlue,
    fontFamily: 'Urbanist-SemiBold',
    textAlign: 'center',
  },
  feesText: {
    fontSize: 14,
    color: colours.DarkBlue,
    lineHeight: 20,
    fontFamily: 'Urbanist-Bold',
    marginBottom: 10,
  },
  moreText: {
    ...style.paragraphText,
    fontSize: 14,
    color: colours.DarkBlue,
  },
  patientsContainer: {
    flexDirection: 'row',
    marginVertical: width * 0.05,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colours.DarkBlue,
    width: width * 0.9,
    alignSelf: 'center',
    padding: 5,
  },
  priceText: {
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
    padding: 5,
  },
  priceText1: {
    fontFamily: 'Urbanist-Bold',
    fontSize: 13,
    color: colours.Chargoal,
    borderWidth: 1,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 7,
    padding: 5,
  },
  priceText2: {
    fontFamily: 'Urbanist-Bold',
    fontSize: 13,
    color: colours.Chargoal,

    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 7,
    padding: 5,
  },
  reviewImage: {
    height: width * 0.15,
    width: width * 0.15,
    resizeMode: 'center',
  },

  ratingContainer2: {
    flexDirection: 'row',
    alignItems: 'center',

    width: width * 0.75,
    justifyContent: 'space-between',
    paddingRight: 4,
  },
  reviewContainer: {
    flex: 1,
    paddingLeft: 4,
    paddingRight: 4,
  },
  reviewText: {
    fontSize: 11,
    lineHeight: 17,
    fontFamily: 'Urbanist-Medium',
    color: '#55697B',
  },
  reviewHeader: {
    fontSize: 16,
    lineHeight: 25,
    width: width * 0.49,
    color: colours.Black,
    fontFamily: 'Urbanist-Bold',
  },

  subHeader: {
    fontSize: 18,
    color: colours.Black,
    lineHeight: 24,
    fontFamily: 'Urbanist-Bold',
    marginBottom: 10,
  },
  specialistText: {
    fontFamily: 'Urbanist-SemiBold',
    fontSize: 13,
    lineHeight: 15,
    width: width * 0.26,
    borderWidth: 0,
    color: '#333333',
  },
  specialistView: {
    justifyContent: 'space-evenly',
    alignSelf: 'center',
    flexDirection: 'row',
    width: width * 0.55,
    alignItems: 'center',
    marginVertical: 5,
  },
  shareButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    backgroundColor: colours.White,
    borderRadius: 5,
    padding: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    padding: 0,
    width: width * 0.55,
    borderWidth: 0,
    marginVertical: 5,
  },
  ratingText: {
    fontFamily: 'Urbanist-Bold',
    fontSize: 13,
    color: colours.Chargoal,
    padding: 2,
  },
  viewVertical: {
    marginVertical: 5,
    width: width * 0.9,
    alignSelf: 'center',
    borderWidth: 0,
  },
});
