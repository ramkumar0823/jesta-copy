import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  FlatList,
  ScrollView,
  Pressable,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Modal,
  Image,
} from 'react-native';
import {colours, style, height, width} from '../../constants';
import ArrowBackButton from '../../components/button/ArrowBackButton';
import RescheduleSuccess from '../../assets/image/RescheduleSuccess.png';
import CategoryArray from '../../assets/flatlistarray/CategoryArray';
import Notification from '../../components/homescreen/Notification';
import DateButton from '../../components/button/DateButton';
import FilterButton from '../../components/button/FilterButton';
import LoaderModal from '../../components/common/LoaderModal';
import {POST_API} from '../../httpsclient/POST';
import {DATE_URL, TIME_URL, SALT} from '../../httpsclient/APIConstants';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import md5 from 'md5';
import moment from 'moment';
import ButtonCommon from '../../components/button/ButtonCommon';
import HeaderComp from '../../components/common/HeaderComp';

const RescheduleAppointment = () => {
  const navigation = useNavigation();
  const doctorID = useRoute().params.data;
  const userID = useSelector(state => state.user.loginUserId);
  const [success, setSuccess] = useState(false);
  const [fashion, setFashion] = useState(true);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [date1, setDate1] = useState();
  const [time1, setTime1] = useState();
  const [bgcolour, setBgcolour] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState([]);
  const [selectedIndex2, setSelectedIndex2] = useState([]);

  console.log('>>time1', time1);

  const AppointmentDate = {
    date: date1,
    time: time1,
    doctorID: doctorID,
  };

  useEffect(() => {
    onDate();
  }, []);

  const onDate = async () => {
    setLoading(true);
    const auth_token = md5(SALT + doctorID);
    const data = {
      doctor_id: doctorID,
      auth_token: auth_token,
    };
    const endpoint = DATE_URL;
    console.log('endData', data);

    await POST_API(endpoint, data)
      .then(Response => {
        if (Response.data.success) {
          setDate(Response.data.parameters);
          console.log('>>DateTime', Response.data.parameters);
          setLoading(false);
        } else {
          alert(Response.data.message);
          console.log('>>>DateTime', Response.data.message);
          setLoading(false);
        }
      })
      .catch(err => {
        alert(err);
        setLoading(false);
      });
  };

  const onTime = async days => {
    setLoading(true);
    const auth_token = md5(SALT + doctorID);
    const data = {
      doctor_id: doctorID,
      date: days,
      auth_token: auth_token,
    };
    const endpoint = TIME_URL;
    console.log('endData', data);

    await POST_API(endpoint, data)
      .then(Response => {
        if (Response.data.success) {
          setTime(Response.data.parameters);
          console.log('>>Time', Response.data.parameters);
          setLoading(false);
        } else {
          alert(Response.data.message);
          console.log('>>Time', Response.data.message);
          setLoading(false);
        }
      })
      .catch(err => {
        alert(err);
        setLoading(false);
      });
  };

  const selectItem = index => {
    if (selectedIndex.indexOf(index) > -1) {
      let newArray = selectedIndex.filter(indexObject => {
        if (indexObject == index) {
          return false;
        }
        return true;
      });
      setSelectedIndex(newArray);
    } else {
      setSelectedIndex([...selectedIndex, index]);
    }
  };
  const selectItem2 = index => {
    if (selectedIndex2.indexOf(index) > -1) {
      let newArray = selectedIndex2.filter(indexObject => {
        if (indexObject == index) {
          return false;
        }
        return true;
      });
      setSelectedIndex2(newArray);
    } else {
      setSelectedIndex2([...selectedIndex2, index]);
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <LoaderModal Load={loading} />
      <View style={styles.headerContainer}>
        <HeaderComp Header="Book Appointment" />
      </View>
      <View style={styles.innerContainer}>
        <View>
          <View style={styles.subheadView}>
            <View>
              <Text style={styles.subheadText}>Select Date</Text>
            </View>

            <SafeAreaView style={styles.container3}>
              <FlatList
                nestedScrollEnabled={true}
                // data={CategoryArray}
                extraData={selectedIndex}
                data={date}
                renderItem={({item, index}) => (
                  console.log('>>itemDate', moment(item.date).format('d')),
                  (
                    <View style={{marginHorizontal: 3}}>
                      {/* <DateButton
                    DayPress={() => {
                      setFashion(!fashion);
                    }}
                    Load={fashion}
                    Date={item.id}
                    Day="Mon"
                  /> */}
                      <DateButton
                        DayPress={() => {
                          setFashion(false);
                          onTime(moment(item.date).format('YYYY-MM-DD'));
                          setDate1(moment(item.date).format('YYYY-MM-DD'));
                          console.log(
                            '>>da',
                            moment(item.date).format('YYYY-MM-DD'),
                            setBgcolour(!bgcolour),
                            selectItem(index),
                          );
                        }}
                        Load={fashion}
                        Date={moment(item.date).format('DD')}
                        Day={moment(item.date).format('ddd')}
                        // Background={bgcolour ? colours.White : colours.DarkBlue}
                        Background={
                          selectedIndex.indexOf(index) > -1
                            ? colours.DarkBlue
                            : colours.White
                        }
                        FontColor={
                          selectedIndex.indexOf(index) > -1
                            ? colours.White
                            : colours.Black
                        }
                        FontColor2={
                          selectedIndex.indexOf(index) > -1
                            ? colours.White
                            : '#5254c7'
                        }
                      />
                    </View>
                  )
                )}
                keyExtractor={item => item.date}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              />
            </SafeAreaView>
          </View>

          <View style={styles.subheadView}>
            {fashion ? null : (
              <View>
                <View>
                  <Text style={styles.subheadText}>Select Time</Text>
                </View>
                <SafeAreaView style={styles.container3}>
                  <FlatList
                    nestedScrollEnabled={true}
                    extraData={selectedIndex2}
                    numColumns={3}
                    data={time}
                    renderItem={({item, index}) => (
                      console.log(
                        '>>Ti',
                        moment(item.time_slot, ['HH.mm a']).format('hh:mm a'),
                      ),
                      (
                        <View style={styles.time}>
                          <FilterButton
                            symptoms={moment(item.time_slot, [
                              'HH.mm a',
                            ]).format('hh:mm a')}
                            Filter={() => {
                              selectItem2(index),
                                console.log(
                                  '>>>t2',
                                  moment(item.time_slot, ['HH.mm a']).format(
                                    'hh:mm a',
                                  ),
                                );
                              setTime1(
                                moment(item.time_slot, ['HH.mm a']).format(
                                  'hh:mm:ss',
                                ),
                              );
                            }}
                            BackgroundColor={
                              selectedIndex2.indexOf(index) > -1
                                ? colours.DarkBlue
                                : colours.White
                            }
                            TextColor={
                              selectedIndex2.indexOf(index) > -1
                                ? colours.White
                                : colours.DarkBlue
                            }
                          />
                        </View>
                      )
                    )}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                  />
                </SafeAreaView>
              </View>
            )}
          </View>
        </View>

        <ButtonCommon
          ButtonText="Next"
          HandlePress={() => {
            if (date1 && time1) {
              navigation.navigate('ConsultingScreen', {data: AppointmentDate});
            } else alert('Please select date and time');
          }}
        />
      </View>

      {/* <------------------------------Modal---------------------------------------------------------------------------------> */}

      <Modal
        transparent={true}
        animationType={'none'}
        visible={success}
        onRequestClose={() => {
          console.log('close modal');
          setSuccess(false);
        }}>
        <View style={styles.modalBackground}>
          <View style={styles.activityIndicatorWrapper}>
            <View style={styles.modalContainer}>
              <View style={styles.imageContainer}>
                <Image source={RescheduleSuccess} style={styles.modalImage} />
              </View>
              <View style={styles.DoctorView}>
                <Text style={styles.modalHead}>Successfully Rescheduled</Text>
              </View>
              <View style={styles.DoctorView}>
                <Text style={styles.successText}>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s,
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('HomeScreen');
                  setSuccess(false);
                }}
                style={styles.modalButton}>
                <Text style={style.buttonText}>NEXT</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};
export default RescheduleAppointment;

const styles = StyleSheet.create({
  buttonView: {
    flex: 1,
    bordeWidth: 1,
    justifyContent: 'flex-end',
  },
  categoriesView: {
    marginVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    height: width * 0.14,
  },

  container3: {
    width: width * 0.93,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: width * 0.05,
  },
  DoctorView: {
    marginHorizontal: 10,
    padding: 0,
  },
  headerContainer: {
    width: width * 0.9,
    marginVertical: width * 0.02,
  },

  innerContainer: {
    backgroundColor: colours.White,
    width: width * 0.9,
    justifyContent: 'space-between',
    height: height * 0.9,
  },
  imageContainer: {
    alignSelf: 'center',
  },

  mainContainer: {
    backgroundColor: colours.White,
    height: height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalImage: {
    width: width * 0.5,
    height: width * 0.5,
    resizeMode: 'center',
  },
  modalContainer: {
    height: height * 0.6,
    width: width * 0.9,
    justifyContent: 'space-between',
  },
  modalHead: {
    ...style.header,
    textAlign: 'center',
    color: colours.BlueReg,
  },
  searchFilter: {
    height: width * 0.12,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 5,
  },
  subheadText: {
    fontFamily: 'Urbanist-SemiBold',
    fontSize: 19,
    color: colours.Black,
  },
  subheadView: {
    width: width * 0.9,
    alignSelf: 'center',
    marginVertical: width * 0.03,
  },
  time: {
    marginHorizontal: 5,
    marginVertical: width * 0.02,
  },
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalButton: {
    ...style.button,
    backgroundColor: colours.BlueReg,
    width: width * 0.85,
  },
  activityIndicatorWrapper: {
    backgroundColor: colours.White,
    height: height * 0.7,
    width: width * 0.95,
    borderRadius: 15,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
  successText: {
    fontFamily: 'Urbanist-SemiBold',
    fontSize: 16,
    color: colours.Black,
    textAlign: 'center',
    lineHeight: 24,
  },
});
