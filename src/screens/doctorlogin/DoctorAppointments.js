import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  SafeAreaView,
} from 'react-native';
import {colours, style, height, width} from '../../constants';
import Jesta from '../../assets/image/JestaSmall.png';
import Nivetha from '../../assets/image/Nivetha.png';
import AppointmentCard from '../../components/doctorflow/AppointmentCard';
import AppointmentDoctorList from '../../components/appointments/AppointmentDoctorList';
import IonIcons from 'react-native-vector-icons/Ionicons';
import CategoryArray2 from '../../assets/flatlistarray/CategoryArray2';
import CategoryArray from '../../assets/flatlistarray/CategoryArray';
import DateButton from '../../components/button/DateButton';
import {setLoginUserId, setRoleID} from '../../redux/slice/User';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';

const DoctorAppointments = () => {
  const navigation = useNavigation();
  const [fashion, setFashion] = useState(true);
  const dispatch = useDispatch();

  const onLogout = async () => {
    try {
      console.log('hhi');
      await AsyncStorage.removeItem('@store');
      await AsyncStorage.removeItem('@role');
      dispatch(setLoginUserId(''));
      dispatch(setRoleID(''));
      navigation.navigate('LoginScreen');
    } catch (e) {
      alert(e, 'cannot erase stored data');
    }
  };

  return (
    <SafeAreaView style={style.mainContainer}>
      <View style={styles.innerContainer}>
        <View style={styles.headerContainer}>
          <View style={styles.jestaContainer}>
            <Image source={Jesta} style={styles.jesta} />
            <Text style={styles.jestaTxt}>Jesta</Text>
          </View>
          <TouchableOpacity
            style={styles.notification}
            onPress={() => {
              // navigation.navigate('NotificationsScreen');
              onLogout();
            }}>
            <IonIcons name="notifications" size={20} color={colours.DarkBlue} />
          </TouchableOpacity>
        </View>
        {/* <------------------------------------------------------Today container-----------------------------------------------------> */}
        <ScrollView
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}>
          <View style={styles.categoriesView}>
            <Text style={styles.categoryText}>Today Consulting</Text>
            <TouchableOpacity>
              <Text style={styles.categoryText2}>See all</Text>
            </TouchableOpacity>
          </View>
          <View>
            <FlatList
              nestedScrollEnabled={true}
              data={CategoryArray2}
              renderItem={({item}) => (
                <View>
                  <AppointmentCard Photo={item.image5} Name={item.patient} />
                </View>
              )}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
            />
          </View>

          {/* <------------------------------------------------------schedule container-----------------------------------------------------> */}

          <View style={styles.categoriesView}>
            <Text style={styles.categoryText}>Week schedule</Text>
          </View>

          <SafeAreaView style={styles.container3}>
            <FlatList
              nestedScrollEnabled={true}
              data={CategoryArray}
              renderItem={({item, index}) => (
                // console.log('>>itemDate', moment(item.date).format('d')),
                <View style={{marginHorizontal: 3}}>
                  <DateButton
                    DayPress={() => {
                      setFashion(!fashion);
                    }}
                    Load={fashion}
                    Date={item.id}
                    FontColor={colours.Black}
                    FontColor2="#5254c7"
                    Day="Mon"
                  />
                </View>
              )}
              keyExtractor={item => item.date}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          </SafeAreaView>

          {/* <------------------------------------------------------patient history-----------------------------------------------------> */}
          <View style={styles.categoriesView}>
            <Text style={styles.categoryText}>Patient History</Text>
          </View>

          <FlatList
            nestedScrollEnabled={true}
            data={CategoryArray}
            renderItem={({item}) => (
              <View style={{marginVertical: width * 0.01}}>
                <AppointmentDoctorList
                  // Photo={item.image4}
                  Name={item.name}
                  Calls={item.vector}
                  Remove={() => {
                    RemoveDoctor();
                  }}
                  onHandleSubmit={() => {
                    onHandlePress(item);
                    // navigation.navigate('ChatHistory', {itemdet: item});
                  }}
                />
              </View>
            )}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  categoryImage: {
    height: width * 0.25,
    width: width * 0.25,
    resizeMode: 'center',
  },
  container3: {
    width: width * 0.93,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: width * 0.01,
  },

  categoryText: {
    fontSize: 20,
    fontFamily: 'Urbanist-SemiBold',
    color: colours.DarkBlue,
    lineHeight: 21,
  },
  categoriesView: {
    marginVertical: width * 0.03,
    width: width * 0.9,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  categoryText2: {
    fontSize: 16,
    lineHeight: 21,
    fontFamily: 'Urbanist-Bold',
    color: colours.DarkBlue,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width * 0.9,
    justifyContent: 'space-between',
  },
  innerContainer: {
    width: width * 0.92,
    height: height * 0.95,
  },
  jesta: {
    resizeMode: 'center',
    height: width * 0.12,
    width: width * 0.12,
    // paddingLeft: 0,
    // marginLeft: 0,
    // top: 10,
  },
  jestaTxt: {
    color: colours.Black,
    fontSize: 31,
    fontFamily: 'Urbanist-Bold',
    lineHeight: 45,
  },
  jestaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notification: {
    backgroundColor: '#E4EBFF',
    borderRadius: 10,
    padding: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DoctorAppointments;
