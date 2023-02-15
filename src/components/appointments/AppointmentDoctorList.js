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
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import Apollo from '../../assets/image/Apollo.png';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {createEntityAdapter} from '@reduxjs/toolkit';
import FilterDoc1 from '../../assets/image/FilterDoc1.png';
import Line from '../../assets/image/Line2.png';

const AppointmentDoctorList = props => {
  const navigation = useNavigation();
  const [heartModel, setHeartModel] = useState();
  // const [heart,setHeart] = useState(props.Heart)
  return (
    <SafeAreaView>
      <TouchableOpacity style={styles.category} onPress={props.onHandleSubmit}>
        <View style={styles.innerContainer}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',

              alignSelf: 'center',
              height: width * 0.28,
              width: width * 0.28,
            }}>
            <Image source={{uri: props.Photo}} style={styles.categoryImage} />
          </View>
          <View
            style={{
              justifyContent: 'space-around',
              padding: 3,
              height: width * 0.28,
            }}>
            <View style={styles.upContainer}>
              <Text style={style.subHeader} numberOfLines={2}>
                {props.Name}
              </Text>
            </View>
            <View
              style={{
                width: width * 0.4,
                borderWidth: 0.5,
                borderColor: '#E8E8E8',
                marginTop: 5,
              }}
            />
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text style={styles.chatText}>message - </Text>
                <Text style={{...styles.chatText, color: colours.DarkBlue}}>
                  Completed
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.timeText}>{props.Duration}</Text>
              </View>
            </View>
          </View>

          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: width * 0.28,
            }}>
            <TouchableOpacity style={styles.blueBackground}>
              {/* <FontAwesome5
                name={props.Calls}
                size={20}
                color={colours.DarkBlue}
              /> */}
              <AntDesign name="message1" size={20} color={colours.DarkBlue} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default AppointmentDoctorList;

const styles = StyleSheet.create({
  category: {
    borderWidth: 2,
    borderColor: '#FCFBFB',
    borderRadius: 20,
    backgroundColor: colours.White,
    height: width * 0.3,
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
    marginVertical: 5,
    padding: 3,
    alignSelf: 'center',
  },

  categoryImage: {
    height: width * 0.25,
    width: width * 0.25,
    resizeMode: 'center',
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginWelcome: {
    fontFamily: 'Urbanist-Bold',
    fontSize: 17,
    color: colours.Black,
    width: width * 0.4,
    lineHeight: 20,
  },
  timeText: {
    fontSize: 16,
    fontFamily: 'Urbanist-Medium',
    color: '#414141',
    lineHeight: 20,
    marginVertical: 3,
  },
  upContainer: {
    paddingLeft: 5,
    paddingRight: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: width * 0.4,
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
  chatText: {
    fontSize: 14,
    fontFamily: 'Urbanist-SemiBold',
    color: colours.Black,
    lineHeight: 20,
    marginVertical: 3,
  },
});
