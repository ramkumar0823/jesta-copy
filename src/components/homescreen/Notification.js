import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  FlatList,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import {colours, height, width, style} from '../../constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import Apollo from '../../assets/image/Apollo.png';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {createEntityAdapter} from '@reduxjs/toolkit';
import NotifyAlert from '../../assets/image/NotifyAlert.png';
import Line from '../../assets/image/Line2.png';

const Notification = props => {
  const navigation = useNavigation();
  const [heartModel, setHeartModel] = useState();
  // const [heart,setHeart] = useState(props.Heart)
  return (
    <SafeAreaView>
      <TouchableOpacity style={styles.category} onPress={props.Reschedule}>
        {/* <Image source={props.Hospital} style={styles.categoryImage} />
        <View style={style.textView}>
        <View><Text style={styles.loginWelcome}>{props.title}</Text></View>
              </View> */}
        <View style={styles.innerContainer}>
          <Image source={NotifyAlert} style={styles.categoryImage} />
          <View>
            <View style={styles.upContainer}>
              <Text style={styles.loginWelcome}>Reschedule Appointment</Text>
              <Text style={styles.timeText}>15:36 PM</Text>
            </View>
            <View style={styles.downContainer}>
              <Text style={styles.alertText}>
                {' '}
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorndard dummy text ever{' '}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default Notification;

const styles = StyleSheet.create({
  alertText: {
    fontSize: 13,
    color: '#9b9b9b',
    lineHeight: 18,
    fontFamily: 'Urbanist-SemiBold',
  },
  category: {
    borderWidth: 2,
    borderColor: '#FCFBFB',
    borderRadius: 10,
    backgroundColor: colours.White,
    height: width * 0.27,
    width: width * 0.93,
    marginHorizontal: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
    marginVertical: 5,
    padding: 3,
    alignSelf: 'center',
  },

  categoryImage: {
    height: width * 0.25,
    width: width * 0.25,
    resizeMode: 'center',
  },

  downContainer: {
    flexDirection: 'row',
    width: width * 0.65,
  },
  innerContainer: {
    flexDirection: 'row',
  },
  loginWelcome: {
    fontFamily: 'Urbanist-Bold',
    fontSize: 16,
    color: colours.Black,
    width: width * 0.45,
    lineHeight: 24,

    flex: 1,
  },

  timeText: {
    color: '#a6a6a6',
    fontSize: 13,
    fontFamily: 'Urbanist-SemiBold',
    lineHeight: 23,
  },
  textView: {
    flex: 1,
    alignItems: 'center',
  },
  upContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,

    width: width * 0.65,

    // height:width*0.18
  },
});
