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
          <Image source={props.Photo} style={styles.categoryImage} />
          <View>
            <View style={styles.upContainer}>
              <Text style={styles.loginWelcome}>{props.Header}</Text>
              <Text style={styles.timeText}>{props.Time}</Text>
            </View>
            <View style={styles.downContainer}>
              <Text style={styles.alertText}>{props.Message}</Text>
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
    // height: width * 0.25,
    width: width * 0.9,
    marginHorizontal: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
    marginVertical: width * 0.02,
    padding: 3,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },

  categoryImage: {
    height: width * 0.2,
    width: width * 0.2,
    resizeMode: 'center',
  },

  downContainer: {
    flexDirection: 'row',
    width: width * 0.65,
  },
  innerContainer: {
    flexDirection: 'row',
    width: width * 0.9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginWelcome: {
    fontFamily: 'Urbanist-Bold',
    fontSize: 16,
    color: colours.Black,
    width: width * 0.45,
    lineHeight: 24,
    flex: 1,
    marginVertical: 3,
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
    width: width * 0.65,

    // height:width*0.18
  },
});
