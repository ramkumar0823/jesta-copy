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
import Nivetha from '../../assets/image/Nivetha.png';
import Line from '../../assets/image/Line2.png';

const AppointmentCard = props => {
  return (
    <SafeAreaView>
      <TouchableOpacity style={styles.category} onPress={props.onHandleSubmit}>
        <View style={styles.innerContainer}>
          <View style={styles.imageContainer}>
            <Image source={props.Photo} style={styles.categoryImage} />
          </View>
          <View style={styles.upContainer1}>
            <View style={styles.upContainer2}>
              <Text style={style.subHeader} numberOfLines={2}>
                {props.Name}
              </Text>
            </View>
            <View style={styles.borderContainer} />
            <View>
              <View style={styles.textContainer}>
                <Text style={styles.chatText}>message - </Text>
                <Text style={{...styles.chatText, color: colours.DarkBlue}}>
                  Scheduled
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.timeText}>
                  10.00 Am - 10.15 Am
                  {/* {props.Duration} */}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.callContainer}>
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
        <View style={styles.downContainer}>
          <View style={{...styles.borderContainer, width: width * 0.8}} />
          <TouchableOpacity
            onPress={() => {
              console.log('hi');
            }}
            style={styles.button}>
            <Text style={styles.buttonText}>Reschedule</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colours.DarkBlue,
    width: width * 0.8,
    borderRadius: 30,
    padding: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: width * 0.03,
  },
  buttonText: {
    color: colours.White,
    paddingBottom: 4,
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Urbanist-SemiBold',
  },
  borderContainer: {
    width: width * 0.4,
    borderWidth: 0.5,
    borderColor: '#E8E8E8',
    marginTop: 5,
  },
  category: {
    borderWidth: 2,
    borderColor: '#FCFBFB',
    borderRadius: 20,
    backgroundColor: colours.White,
    // height: width * 0.3,
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
  callContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: width * 0.28,
  },
  categoryImage: {
    height: width * 0.25,
    width: width * 0.25,
    resizeMode: 'center',
  },
  downContainer: {
    justifyContent: 'center',
    width: width * 0.9,
    alignItems: 'center',
    // marginVertical: width * 0.01,
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
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    height: width * 0.28,
    width: width * 0.28,
  },
  timeText: {
    fontSize: 16,
    fontFamily: 'Urbanist-Medium',
    color: '#414141',
    lineHeight: 20,
    marginVertical: 3,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  upContainer2: {
    paddingLeft: 5,
    paddingRight: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: width * 0.4,
  },
  upContainer1: {
    justifyContent: 'space-around',
    padding: 3,
    height: width * 0.28,
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
    fontSize: 13,
    fontFamily: 'Urbanist-SemiBold',
    color: colours.Black,
    lineHeight: 20,
    marginVertical: 3,
  },
});
export default AppointmentCard;
