import React, {useState, useCallback, useEffect} from 'react';
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
import {useNavigation, useRoute} from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import Share from 'react-native-share';
import {useSelector, useDispatch} from 'react-redux';
import md5 from 'md5';
import moment from 'moment';
import {colours, style, height, width} from '../../constants';
import DoctorPic from '../../assets/image/DoctorProfile.png';
import ArrowBackButton from '../../components/button/ArrowBackButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ReviewImage from '../../assets/image/ReviewImage.png';
import {DOCTOR_PROFILE_URL} from '../../httpsclient/APIConstants';
import {POST_API} from '../../httpsclient/POST';
import {SALT} from '../../constants';
import Reviews from '../../components/common/Reviews';
import LoaderModal from '../../components/common/LoaderModal';
import ButtonCommon from '../../components/button/ButtonCommon';

const DoctorProfile = () => {
  const userID = useSelector(state => state.user.loginUserId);
  const DoctorID = useSelector(state => state.user.doctorID);
  // const doctorID = useRoute().params.data;
  console.log('>>docId', DoctorID);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [textShown, setTextShown] = useState(false);
  const [lengthMore, setLengthMore] = useState(false);
  const [lineLength, setlineLength] = useState(6);
  const [doctor, setDoctor] = useState();
  const [workTime, setWorkTime] = useState();
  const [review, setReview] = useState();
  const [loading, setLoading] = useState(false);
  LogBox.ignoreAllLogs();

  useEffect(() => {
    onDoctorProfile();
  }, []);

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

  const onDoctorProfile = async () => {
    setLoading(true);
    const auth_token = md5(SALT + userID);
    const data = {
      user_id: userID,
      doctor_id: DoctorID,
      auth_token: auth_token,
    };
    const endpoint = DOCTOR_PROFILE_URL;
    console.log('endData', data);

    await POST_API(endpoint, data)
      .then(Response => {
        if (Response.data.success) {
          setDoctor(Response.data.parameters.doctor_profile);
          setWorkTime(Response.data.parameters.working_time);
          setReview(Response.data.parameters.patient_reviews);
          console.log('>>doctorprofile', Response.data.parameters);
          setLoading(false);
        } else {
          alert(Response.data.message);
          console.log('>>>cataler', Response.data.message);
          setLoading(false);
        }
      })
      .catch(err => {
        alert(err);
        setLoading(false);
      });
  };

  const onHandleLike = async item => {
    setLoading(true);
    const auth_token = md5(SALT + userID);
    const isLike = item.is_doctor_fav === 1;

    const data = {
      user_id: userID,
      doctor_id: item.doctor_id,
      patient_id: userID,
      status: isLike,
      auth_token: auth_token,
    };
    const endpoint = DOCTOR_LIKE;
    console.log('<<<endData2', data, endpoint);

    await POST_API(endpoint, data)
      .then(Response => {
        if (Response.data.success) {
          // setCategoryDoctor(Response.data.parameters.data);
          console.log('>>category3', Response);
          onCategory();
          setLoading(false);
        } else {
          alert(Response.data.message);
          console.log('>>like', Response.data.message);
          setLoading(false);
        }
      })
      .catch(err => {
        alert(err);
        setLoading(false);
      });
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
    <SafeAreaView style={style.mainContainer}>
      <View style={{width: width}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}>
          <LoaderModal Load={loading} />
          {/* <----------------------------------------------------Headercontent--------------------------------------------------->        */}
          <View style={{backgroundColor: '#ECF2FE', width: width}}>
            {/* #F4F6F9 */}
            <View style={styles.arrowContainer}>
              <ArrowBackButton ArrowColour={colours.DarkBlue} />
            </View>

            <View style={styles.headerContainer}>
              <View style={styles.headerLeft}>
                <View style={styles.headerLeft2}>
                  <View>
                    <View style={{width: width * 0.5}}>
                      {doctor ? (
                        <Text style={styles.subHeader2}>
                          {doctor.doctors_name}
                        </Text>
                      ) : (
                        <Text>--</Text>
                      )}
                    </View>
                    {/* <----------------------------------------------------------Specialist & hospital----------------------------------------------------> */}
                    <View style={styles.specialistView}>
                      <View style={{maxWidth: width * 0.225}}>
                        {doctor ? (
                          <Text
                            style={{
                              ...styles.specialistText,
                            }}
                            numberOfLines={4}>
                            {doctor.specialist_in}
                          </Text>
                        ) : (
                          <Text style={styles.specialistText}>--</Text>
                        )}
                      </View>
                      {/* <---------------------------------------------------------- hospital----------------------------------------------------> */}
                      <View style={styles.borderView} />
                      <View style={{maxWidth: width * 0.225}}>
                        {doctor ? (
                          <Text
                            style={{
                              ...styles.specialistText,
                            }}
                            numberOfLines={4}>
                            {doctor.hospital_name}
                          </Text>
                        ) : (
                          <Text style={styles.specialistText}>--</Text>
                        )}
                      </View>
                    </View>
                    {/* <------------------------------------------------regiter number---------------------------------------------------------->              */}
                    <View style={styles.registerContainer}>
                      {doctor ? (
                        <Text style={styles.regnoText}>
                          {doctor.register_number}
                        </Text>
                      ) : (
                        <Text style={styles.regnoText}>--</Text>
                      )}
                    </View>
                    {/* <---------------------------------------------- rating----------------------------------------------------------->  */}
                    <View style={styles.ratingContainer}>
                      <AntDesign name="star" size={17} color="#FFB543" />
                      {doctor ? (
                        <Text
                          style={{
                            ...styles.ratingText,
                            fontFamily: 'Urbanist-Medium',
                          }}>
                          {doctor.average_rating}
                        </Text>
                      ) : (
                        <Text
                          style={{
                            ...styles.ratingText,
                            fontFamily: 'Urbanist-Medium',
                          }}>
                          4.9{' '}
                        </Text>
                      )}
                      <Text style={styles.ratingText}>Rating</Text>
                    </View>
                  </View>
                  {/* <------------------------------------------------fee container---------------------------------------------------------->  */}

                  <View style={styles.ratingContainer}>
                    <View style={styles.feesContainer}>
                      <Text style={styles.priceText1}> ₹ </Text>
                      {doctor ? (
                        <Text style={styles.priceText2}>
                          {doctor.doctor_fee}
                        </Text>
                      ) : (
                        <Text style={styles.priceText2}>--</Text>
                      )}
                      {/* <------------------------------------------------share container---------------------------------------------------------->  */}
                      <TouchableOpacity
                        style={styles.shareButton}
                        onPress={() => {
                          shareProfile();
                        }}>
                        <Feather
                          name="share-2"
                          color={colours.DarkBlue}
                          size={20}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                {/* <------------------------------------------------Profile Pic---------------------------------------------------------->  */}
              </View>
              <View style={styles.profilePic}>
                {doctor ? (
                  <Image
                    source={{uri: doctor.doctor_image}}
                    style={styles.imageStyle}
                  />
                ) : (
                  <Image source={DoctorPic} style={styles.imageStyle} />
                )}

                <View style={{backgroundColor: '#F4F6F9'}}></View>
              </View>
            </View>
          </View>

          {/* <----------------------------------------------------PatientsContainer--------------------------------------------------->*/}
          <View style={{backgroundColor: '#ECF2FE'}}>
            <View style={styles.profileContainer}>
              <View style={styles.patientsContainer}>
                <View style={styles.experianceView}>
                  <TouchableOpacity style={style.blueBackground}>
                    <FontAwesome5
                      name="user-friends"
                      size={18}
                      color={colours.DarkBlue}
                    />
                  </TouchableOpacity>
                  {doctor ? (
                    <Text style={styles.experianceText2}>
                      {doctor.total_patients}
                    </Text>
                  ) : (
                    <Text style={styles.experianceText2}>--</Text>
                  )}
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
                  {doctor ? (
                    <Text style={styles.experianceText2}>
                      {doctor.total_experience} Years
                    </Text>
                  ) : (
                    <Text style={styles.experianceText2}>--</Text>
                  )}
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
                  {doctor ? (
                    <Text style={styles.experianceText2}>
                      {doctor.total_ratings}
                    </Text>
                  ) : (
                    <Text style={styles.experianceText2}>4,877</Text>
                  )}
                  <Text style={styles.experianceText}>Reviews</Text>
                </View>
              </View>

              {/* <----------------------------------------------------Description--------------------------------------------------->*/}

              <View style={styles.viewVertical}>
                <View style={{width: width * 0.9}}>
                  <Text style={styles.subHeader}>Description</Text>
                </View>
                <View>
                  {doctor ? (
                    <Text
                      style={{...style.paragraphText, color: '#55697B'}}
                      onTextLayout={onText}
                      numberOfLines={textShown ? undefined : 6}>
                      {doctor.description}
                    </Text>
                  ) : (
                    <Text
                      style={{...style.paragraphText, color: '#55697B'}}
                      onTextLayout={onText}
                      numberOfLines={textShown ? undefined : 6}></Text>
                  )}
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
                  <Text style={styles.subHeader}>Working Time</Text>
                </View>
                {workTime ? (
                  <FlatList
                    nestedScrollEnabled={true}
                    data={workTime}
                    renderItem={({item}) => (
                      <View style={{flexDirection: 'row'}}>
                        <Text
                          style={{...styles.moreText, width: width * 0.35}}
                          numberOfLines={1}>
                          {item.weekday}
                        </Text>
                        <Text
                          style={{...styles.moreText, width: width * 0.4}}
                          numberOfLines={1}>
                          :{'  '}
                          {moment(item.consulting_time, ['HH.mm a']).format(
                            'hh:mm a',
                          )}
                        </Text>
                      </View>
                    )}
                    keyExtractor={item => item.id}
                  />
                ) : (
                  <View style={{flexDirection: 'row'}}>
                    <Text
                      style={{...styles.moreText, width: width * 0.35}}
                      numberOfLines={1}>
                      No data available
                    </Text>
                  </View>
                )}
              </View>

              {/* <-----------------------------------------------Review ----------------------------------------------------------> */}

              <FlatList
                nestedScrollEnabled={true}
                data={review}
                renderItem={({item}) => (
                  <View style={styles.reviewContainer}>
                    <Reviews
                      Name={item.name}
                      Rating={item.review_star}
                      Days={item.days_ago}
                      Review={item.review_description}
                    />
                  </View>
                )}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
              />

              {/* <-----------------------------------------------Button ----------------------------------------------------------> */}

              <View style={styles.button}>
                <ButtonCommon
                  ButtonText="Book Appointment"
                  HandlePress={() => {
                    navigation.navigate('RescheduleAppointment', {
                      data: doctor.doctor_id,
                    });
                  }}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default DoctorProfile;

const styles = StyleSheet.create({
  arrowContainer: {
    width: width * 0.9,
    borderWidth: 0,
    backgroundColor: '#ECF2FE',
    marginVertical: width * 0.03,
    marginTop: width * 0.05,
    alignSelf: 'center',
  },
  button: {
    marginVertical: width * 0.07,
  },
  borderView: {
    borderRightWidth: 1,
    height: 20,
    borderColor: '#333333',
    margin: width * 0.02,
  },
  blueBackground: {
    backgroundColor: '#E4EBFF',
    height: width * 0.11,
    width: width * 0.11,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    padding: 11,
    justifyContent: 'center',
    alignItems: 'center',
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

  feesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width * 0.5,
  },
  headerContainer: {
    flexDirection: 'row',
    backgroundColor: '#ECF2FE',
    width: width * 0.9,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  headerLeft: {
    width: width * 0.5,
    height: width * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerLeft2: {
    width: width * 0.5,
    height: width * 0.45,

    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    height: width * 0.5,
    width: width * 0.4,
    marginTop: 0,
  },
  moreText: {
    ...style.paragraphText,
    fontSize: 15,
    color: colours.DarkBlue,
  },
  profileContainer: {
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    backgroundColor: colours.White,
  },
  patientsContainer: {
    flexDirection: 'row',
    marginVertical: width * 0.05,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colours.DarkBlue,
    width: width * 0.9,
    alignSelf: 'center',
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
  profilePic: {
    width: width * 0.4,
    height: width * 0.5,
    alignItem: 'center',
    justifyContent: 'center',
  },
  reviewImage: {
    height: width * 0.15,
    width: width * 0.15,
    resizeMode: 'center',
  },
  regnoText: {
    width: width * 0.5,
    marginVertical: 5,
    fontFamily: 'Urbanist-SemiBold',
    fontSize: 13,
    lineHeight: 15,
    alignSelf: 'center',

    color: '#333333',
  },

  ratingContainer2: {
    flexDirection: 'row',
    alignItems: 'center',

    width: width * 0.75,
    justifyContent: 'space-between',
    paddingRight: 4,
  },
  reviewContainer: {
    width: width * 0.9,
    alignSelf: 'center',
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
  subHeader2: {...style.subHeader, marginTop: 5},
  specialistText: {
    fontFamily: 'Urbanist-SemiBold',
    fontSize: 13,
    lineHeight: 15,
    borderWidth: 0,
    color: '#333333',
    textTransform: 'capitalize',
  },
  specialistView: {
    // justifyContent: 'space-around',
    alignSelf: 'center',
    flexDirection: 'row',
    width: width * 0.5,
    alignItems: 'center',
    marginVertical: 5,
  },
  specialistView2: {
    width: width * 0.24,
    // alignItems: 'center',
    justifyContent: 'center',
  },
  specialistView3: {},

  shareButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: width * 0.02,
    backgroundColor: colours.White,
    borderRadius: 5,
    padding: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    padding: 0,
    width: width * 0.5,

    marginVertical: 5,
    alignSelf: 'center',
    alignItems: 'center',
  },
  registerContainer: {
    width: width * 0.5,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
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
