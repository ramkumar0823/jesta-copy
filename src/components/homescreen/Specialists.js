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
import {useNavigation} from '@react-navigation/native';
import Heart from '../../assets/image/HeartRate.png';

const Specialists = props => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <TouchableOpacity
        style={{
          ...styles.category,
          backgroundColor: props.BackgroundColor
            ? props.BackgroundColor
            : '#FF3359',
        }}
        onPress={props.SpecialistDoctor}>
        <View style={styles.innerContainer}>
          <View style={styles.smallView}>
            <Image source={{uri: props.Photo}} style={styles.specialists} />
          </View>
          <View>
            <Text style={styles.loginWelcome}>{props.Specialists}</Text>
          </View>
          <View>
            <Text style={styles.locationText}>{props.Doctors}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default Specialists;

const styles = StyleSheet.create({
  category: {
    borderRadius: 20,
    backgroundColor: '#FF3359',
    height: width * 0.65,
    width: width * 0.4,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  innerContainer: {
    // paddingLeft: width * 0.04,
    padding: width * 0.02,
    justifyContent: 'space-evenly',
    height: width * 0.65,
  },

  smallView: {
    height: width * 0.13,
    width: width * 0.13,
    borderRadius: 15,
    backgroundColor: colours.White,
  },

  loginWelcome: {
    fontFamily: 'Urbanist-Bold',
    fontSize: 25,
    color: colours.White,
    marginVertical: width * 0.04,
    textTransform: 'capitalize',
    // textAlign: 'center',
  },

  locationText: {
    fontFamily: 'Urbanist-Medium',
    fontSize: 17,
    color: colours.White,
  },
  specialists: {
    height: 50,
    width: 50,
    resizeMode: 'center',
  },
});
