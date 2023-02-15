import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  Alert,
  Modal,
} from 'react-native';
import {colours, style, height, width} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {setLoginUserId, setRoleID} from '../../redux/slice/User';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IonIcons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ProfilePic from '../../assets/image/ProfilePic.png';
import ProfileHeart from '../../assets/image/ProfileHeart.png';
import ProfileMedical from '../../assets/image/ProfileMedical.png';
import HeaderComp from '../../components/common/HeaderComp';
import LogoutModal from '../../components/common/LogoutModal';
import LoaderModal from '../../components/common/LoaderModal';
import AuthStack from '../../navigation/AuthStack';

const PatientProfile = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [logModal, setLogModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [header, setHeader] = useState();

  const onLogout = async () => {
    try {
      console.log('hhi');
      setLoading(true);
      await AsyncStorage.removeItem('@store');
      dispatch(setLoginUserId(''));
      await AsyncStorage.removeItem('@role');
      dispatch(setRoleID(''));

      await AsyncStorage.removeItem('@location');
      await AsyncStorage.removeItem('@place');
      navigation.navigate('AuthStack');
      setLoading(false);
    } catch (e) {
      alert('cannot erase stored data');
    }
  };

  return (
    <SafeAreaView style={style.mainContainer}>
      <LoaderModal Load={loading} />
      <View style={styles.headerContainer}>
        <HeaderComp Header="Profile" />
      </View>
      <ScrollView
        style={styles.innerContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <View style={styles.imageBackGround}>
            <Image source={ProfilePic} style={styles.profileImage} />
          </View>
          <View style={styles.percentageContainer}>
            <Text style={styles.percentageText}>73%</Text>
          </View>
        </View>

        {/* <------------------------------------------------------button Container--------------------------------------------------> */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate('EditProfile');
          }}>
          <Text style={styles.buttonText}>Complete Your Profile</Text>
        </TouchableOpacity>

        {/* <------------------------------------------------------Information Container--------------------------------------------------> */}
        <View style={styles.detailsContainer}>
          <View style={styles.personalContainer}>
            <View style={styles.personalContainer2}>
              <View style={styles.heartContainer}>
                <Image source={ProfileHeart} style={styles.heartImage} />
                <Text style={styles.personalText} numberOfLines={1}>
                  Personal Information
                </Text>
              </View>
              <View style={styles.informationContainer}>
                <Text style={styles.informationText} numberOfLines={5}>
                  Lorem Ipsum is simply dummy text of the printing and Lorem
                  Ipsum is simply dummy text of the printing and
                </Text>
              </View>
            </View>
            <View style={styles.borderContainer} />
            {/* <------------------------------------------------------Information Container--------------------------------------------------> */}
            <View style={styles.personalContainer2}>
              <View style={styles.heartContainer}>
                <Image source={ProfileMedical} style={styles.heartImage} />
                <Text style={styles.personalText} numberOfLines={1}>
                  Medical Information
                </Text>
              </View>
              <View style={styles.informationContainer}>
                <Text style={styles.informationText} numberOfLines={5}>
                  Lorem Ipsum is simply dummy text of the printing and Lorem
                  Ipsum is simply dummy text of the printing and
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              borderBottomWidth: 1,
              width: width * 0.85,
              borderColor: 'rgba(0, 0, 0, 0.08)',
            }}
          />
          {/* <------------------------------------------------------Information Container--------------------------------------------------> */}
          <View style={styles.personalContainer}>
            <View style={styles.personalContainer2}>
              <View style={styles.heartContainer}>
                <Image source={ProfileHeart} style={styles.heartImage} />
                <Text style={styles.personalText} numberOfLines={1}>
                  Life Style
                </Text>
              </View>
              <View style={styles.informationContainer}>
                <Text style={styles.informationText} numberOfLines={5}>
                  Lorem Ipsum is simply dummy text of the printing and Lorem
                  Ipsum is simply dummy text of the printing and
                </Text>
              </View>
            </View>
            <View style={styles.borderContainer} />
            {/* <------------------------------------------------------Information Container--------------------------------------------------> */}
            <View style={styles.personalContainer2}>
              <View style={styles.heartContainer}>
                <Image source={ProfileMedical} style={styles.heartImage} />
                <Text style={styles.personalText} numberOfLines={1}>
                  Life Style
                </Text>
              </View>
              <View style={styles.informationContainer}>
                <Text style={styles.informationText} numberOfLines={5}>
                  Lorem Ipsum is simply dummy text of the printing and Lorem
                  Ipsum is simply dummy text of the printing and
                </Text>
              </View>
            </View>
          </View>
        </View>
        {/* <------------------------------------------------------Notification Container--------------------------------------------------> */}

        <View style={styles.notificationContainer}>
          <TouchableOpacity style={styles.notificationContainer2}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={styles.blueBackground}>
                <IonIcons
                  name="notifications"
                  size={20}
                  color={colours.DarkBlue}
                />
              </View>
              <Text style={styles.notificationText} numberOfLines={1}>
                Notification
              </Text>
            </View>

            <View>
              <AntDesign name="right" size={20} color={colours.DarkBlue} />
            </View>
          </TouchableOpacity>
          <View style={styles.borderContainer3} />
          {/* <------------------------------------------------------Securrity Container--------------------------------------------------> */}

          <TouchableOpacity style={styles.notificationContainer2}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={styles.blueBackground}>
                <IonIcons
                  name="notifications"
                  size={20}
                  color={colours.DarkBlue}
                />
              </View>
              <Text style={styles.notificationText} numberOfLines={1}>
                Security
              </Text>
            </View>

            <View>
              <AntDesign name="right" size={20} color={colours.DarkBlue} />
            </View>
          </TouchableOpacity>
          <View style={styles.borderContainer3} />
          {/* <------------------------------------------------------Help Container--------------------------------------------------> */}

          <TouchableOpacity style={styles.notificationContainer2}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={styles.blueBackground}>
                <FontAwesome
                  name="exclamation-circle"
                  size={20}
                  color={colours.DarkBlue}
                />
              </View>
              <Text style={styles.notificationText} numberOfLines={1}>
                Help
              </Text>
            </View>

            <View>
              <AntDesign name="right" size={20} color={colours.DarkBlue} />
            </View>
          </TouchableOpacity>
          <View style={styles.borderContainer3} />
          {/* <------------------------------------------------------Invite Container--------------------------------------------------> */}

          <TouchableOpacity
            style={styles.notificationContainer2}
            onPress={() => {
              navigation.navigate('InviteScreen');
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={styles.blueBackground}>
                <FontAwesome5
                  name="user-friends"
                  size={15}
                  color={colours.DarkBlue}
                />
              </View>
              <Text style={styles.notificationText} numberOfLines={1}>
                Invite Friends
              </Text>
            </View>

            <View>
              <AntDesign name="right" size={20} color={colours.DarkBlue} />
            </View>
          </TouchableOpacity>
          <View style={styles.borderContainer3} />
          {/* <------------------------------------------------------Logout Container--------------------------------------------------> */}

          <TouchableOpacity
            style={styles.notificationContainer2}
            onPress={() => {
              //   onShowAlert();
              setLogModal(true);
              setHeader(false);
              console.log('hi');
            }}>
            <View style={styles.backgroundContainer}>
              <View style={styles.blueBackground}>
                <MaterialIcons name="login" size={20} />
              </View>
              <Text style={styles.notificationText} numberOfLines={1}>
                Logout
              </Text>
            </View>

            <View>
              <AntDesign name="right" size={20} color={colours.DarkBlue} />
            </View>
          </TouchableOpacity>
          {/* <------------------------------------------------------LogoutModal Container--------------------------------------------------> */}
        </View>
        <LogoutModal
          ShowModal={logModal}
          headerShow={header}
          Question="Are sure want to logout"
          CancelText="Cancel"
          ApplyText="Logout"
          CancelPress={() => {
            setLogModal(false);
          }}
          ApplyPress={() => {
            onLogout();
            setLogModal(false);
          }}
        />

        {/* <------------------------------------------BottomModal Remove Doctor------------------------------------------------> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default PatientProfile;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colours.DarkBlue,
    width: width * 0.6,
    borderRadius: 5,
    padding: 11,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: width * 0.05,
  },
  buttonText: {
    color: colours.White,
    paddingBottom: 4,
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Urbanist-SemiBold',
  },
  blueBackground: {
    backgroundColor: '#E4EBFF',
    height: width * 0.1,
    width: width * 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  borderContainer: {
    borderRightWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.08)',
  },
  borderContainer3: {
    borderBottomWidth: 1,
    width: width * 0.85,
    borderBottomColor: 'rgba(0,0,0,0.1)',
    marginVertical: 5,
  },
  backgroundContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailsContainer: {
    borderWidth: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderColor: 'rgba(0, 0, 0, 0.08)',
    marginVertical: width * 0.05,
  },
  innerContainer: {
    width: width * 0.9,
  },
  imageContainer: {
    height: width * 0.5,
    width: width * 0.9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageBackGround: {
    height: width * 0.28,
    width: width * 0.28,
    backgroundColor: colours.SolitudeBorder,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 70,
  },
  informationContainer: {
    alignItems: 'center',
    justifyContent: 'center',

    padding: 5,
  },
  informationText: {
    fontFamily: 'Urbanist-Medium',
    fontSize: 11,
    lineHeight: 17,
    color: colours.Dimgray,
    marginLeft: 5,
  },
  headerContainer: {
    width: width * 0.9,
    marginVertical: 10,
  },
  heartImage: {
    height: width * 0.1,
    width: width * 0.1,
    resizeMode: 'center',
  },
  heartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  notificationContainer: {
    padding: 5,
    width: width * 0.9,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'rgba(0,0,0,0.08)',
    marginVertical: width * 0.05,
  },
  notificationContainer2: {
    width: width * 0.85,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
  },
  notificationText: {
    fontFamily: 'Urbanist-SemiBold',
    fontSize: 16,
    lineHeight: 24,
    color: colours.Black,
    marginHorizontal: 5,
  },
  personalText: {
    fontSize: 13,
    fontFamily: 'Urbanist-SemiBold',
    lineHeight: 20,
    color: colours.Black,
  },
  profileImage: {
    height: width * 0.25,
    width: width * 0.25,
    resizeMode: 'center',
  },
  personalContainer: {
    flexDirection: 'row',
    width: width * 0.85,
    borderWidth: 0,
  },
  personalContainer2: {
    width: width * 0.43,
  },
  percentageContainer: {
    padding: 3,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 30,
    backgroundColor: colours.White,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  percentageText: {
    fontFamily: 'Urbanist-SemiBold',
    fontSize: 11,
    lineHeight: 17,
    textAlign: 'center',
    color: colours.DarkBlue,
  },
});
