import React from 'react';
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
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import Apollo from '../../assets/image/Apollo.png';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {createEntityAdapter} from '@reduxjs/toolkit';
const Hospitals = props => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <TouchableOpacity style={styles.category} onPress={props.HandlePress}>
        <Image source={{uri: props.Photo}} style={styles.categoryImage} />
        <View style={style.textView}>
          <View style={styles.hospitalText}>
            <Text style={styles.loginWelcome} numberOfLines={2}>
              {props.title}
            </Text>
          </View>
          <View style={styles.locationView}>
            <IonIcons
              name="location-sharp"
              size={20}
              color={colours.DarkBlue}
            />
            <Text style={styles.locationText}>{props.location}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default Hospitals;

const styles = StyleSheet.create({
  //   categoryOut: {
  //     width: width * 0.2,
  //     borderWidth: 0,
  //     marginHorizontal: 10,
  //     marginVertical: 10,

  //   },
  category: {
    borderWidth: 2,
    borderColor: '#FCFBFB',
    borderRadius: 20,
    backgroundColor: colours.White,
    height: width * 0.65,
    width: width * 0.4,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
    alignItems: 'center',
  },
  hospitalText: {
    // height: width * 0.17,
    marginVertical: width * 0.02,
    width: width * 0.3,
    justifyContent: 'center',

    paddingLeft: 2,
  },
  loginWelcome: {
    fontFamily: 'Urbanist-Bold',
    fontSize: 18,
    color: colours.EbonyClay,
    marginVertical: 10,
    lineHeight: 21,
    // padding: 4,
    textAlign: 'left',
    height: width * 0.11,
  },
  categoryImage: {
    // height: 125,
    // width: 125,
    height: width * 0.3,
    width: width * 0.3,
    resizeMode: 'center',
  },
  locationText: {
    fontFamily: 'Urbanist-Medium',
    fontSize: 14,
    color: '#333333',
    textAlign: 'left',
  },
  textView: {
    flex: 1,
    borderWidth: 0,
    alignItems: 'center',
  },
  locationView: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: width * 0.3,
    alignItems: 'center',
  },
});
