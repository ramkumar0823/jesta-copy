import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
} from 'react-native';
import {colours, style, height, width} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import HeaderComp from '../../components/common/HeaderComp';
import SearchBar from '../../components/homescreen/SearchBar';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome';
import CategoryArray from '../../assets/flatlistarray/CategoryArray';
import ButtonCommon from '../../components/button/ButtonCommon';
import SuccessModal from '../../components/common/SuccessModal';
import RescheduleSuccess from '../../assets/image/RescheduleSuccess.png';
import ScheduleFailed from '../../assets/image/ScheduleFailed.png';
import AppointmentDoctorList from '../../components/appointments/AppointmentDoctorList';
import NoItem from '../../assets/image/NoItem.png';
import {POST_API} from '../../httpsclient/POST';
import {SALT, MY_APPOINTMENTS_URL} from '../../httpsclient/APIConstants';
import md5 from 'md5';
import {useSelector, useDispatch} from 'react-redux';
import moment from 'moment';
import LoaderModal from '../../components/common/LoaderModal';

const MyAppointment = () => {
  const navigation = useNavigation();
  const userID = useSelector(state => state.user.loginUserId);
  const [sortModal, setSortModal] = useState(false);
  const [item, setItem] = useState(false);
  const [today, setToday] = useState(false);
  const [letter, setLetter] = useState(false);
  const [letter1, setLetter1] = useState(false);
  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState();
  console.log('>>app', appointments);

  useEffect(() => {
    onMyAppointments();
  }, []);

  const onMyAppointments = async () => {
    setLoading(true);
    const auth_token = md5(SALT + userID);
    const data = {
      user_id: userID,
      auth_token: auth_token,
    };
    const endpoint = MY_APPOINTMENTS_URL;
    console.log('endData', data);

    await POST_API(endpoint, data)
      .then(Response => {
        if (Response.data.success) {
          setAppointments(Response.data.parameters.data);
          console.log('>>myappointments', Response.data.parameters.data);
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

  const onHandlePress = value => {
    console.log(value.id);
    if (value.id === 1) {
      navigation.navigate('CallInformation', {itemdet: item, data1: true});
    } else if (value.id === 2) {
      navigation.navigate('ChatScreen', {data2: true});
    } else {
      console.log('hi');
    }
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <LoaderModal Load={loading} />
      <View style={styles.innerContainer}>
        <View style={{marginTop: width * 0.03}}>
          <HeaderComp Header="My Appointments" />
        </View>

        {/* <------------------------------------------------SearchBar------------------------------------------------------->    */}
        {item ? (
          <View>
            <View>
              <View style={styles.itemsContainer}>
                <View style={styles.noItems}>
                  <Image source={NoItem} style={styles.noItemImage} />
                </View>
                <Text style={style.subHeader}>
                  {' '}
                  You don't have an appointment
                </Text>
              </View>
            </View>
            <View>
              <ButtonCommon
                HandlePress={() => {
                  setItem(false);
                  console.log('hi');
                }}
                ButtonText="Book AppointMent"
              />
            </View>
          </View>
        ) : (
          <View>
            <View style={styles.searchContainer}>
              <View style={{width: width * 0.75}}>
                <SearchBar
                  Search={() => {
                    setItem(true);
                  }}
                />
              </View>
              <TouchableOpacity
                style={styles.notification}
                onPress={() => {
                  setSortModal(true);
                }}>
                <FontAwesome5
                  name="filter"
                  size={22}
                  color={colours.DarkBlue}
                />
              </TouchableOpacity>
            </View>

            {/* <------------------------------------------------Today------------------------------------------------------->    */}

            <View style={styles.dayContainer}>
              <TouchableOpacity
                onPress={() => {
                  setToday(false);
                  setLetter(true);
                  setLetter1(false);
                }}>
                <Text
                  style={{
                    ...styles.dayText,
                    color: letter ? colours.Black : null,
                  }}>
                  {''}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setToday(true);
                  setLetter1(true);
                  setLetter(false);
                }}>
                <Text
                  style={{
                    ...styles.dayText,
                    color: letter1 ? colours.Black : null,
                  }}>
                  Today
                </Text>
              </TouchableOpacity>
            </View>
            {/* <------------------------------------------------appointments------------------------------------------------------->    */}

            {/* <FlatList
                nestedScrollEnabled={true}
                data={CategoryArray}
                renderItem={({item}) => (
                  <AppointmentDoctorList
                    Photo={item.image4}
                    Name={item.name}
                    Remove={() => {
                      RemoveDoctor();
                    }}
                  /> */}
            <ScrollView
              showsVerticalScrollIndicator={true}
              style={{height: height * 0.68}}>
              <FlatList
                nestedScrollEnabled={true}
                data={appointments}
                renderItem={({item}) => (
                  <AppointmentDoctorList
                    Photo={item.doctor_image}
                    Name={item.doctor_name}
                    Duration={moment(item.consulting_timing, [
                      'HH.mm a',
                    ]).format('hh:mm a')}
                    Remove={() => {
                      RemoveDoctor();
                    }}
                    onHandleSubmit={() => {
                      navigation.navigate('CallInformation');
                    }}
                  />
                )}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
              />
            </ScrollView>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};
export default MyAppointment;

const styles = StyleSheet.create({
  mainContainer: {
    height: height,
    width: width,
    backgroundColor: colours.White,
    alignItems: 'center',
  },
  dayText: {
    ...style.alertText,
    fontSize: 17,
    marginVertical: 10,
    marginRight: 10,
  },
  dayContainer: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  innerContainer: {
    // height: height,
    width: width * 0.9,
    borderWidth: 0,
  },
  itemsContainer: {
    height: height * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  notification: {
    height: width * 0.13,
    backgroundColor: '#E4EBFF',
    borderRadius: 10,
    padding: 11,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: width * 0.02,
  },
  noItems: {
    height: width * 0.17,
    width: width * 0.17,
    backgroundColor: colours.ButtonLight,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  noItemImage: {
    height: width * 0.1,
    width: width * 0.1,
    resizeMode: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
});
