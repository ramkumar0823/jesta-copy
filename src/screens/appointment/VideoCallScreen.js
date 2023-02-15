import React from 'react';
import {
  SafeAreaView,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import {colours, style, height, width} from '../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import HeaderComp from '../../components/common/HeaderComp';
import Doctor from '../../assets/image/DoctorProfile.png';

import ButtonCommon from '../../components/button/ButtonCommon';

// const height = Dimensions.get('window').height;
// const width = Dimensions.get('window').width;

const VideoCallScreen = props => {
  const navigation = useNavigation();
  console.log('style', style);
  return (
    <SafeAreaView style={style.mainContainer}>
      <View style={styles.innerContainer}>
        <View>
          {/* <View>
            <Text style={styles.subHeader}> Messanging Ended </Text>
            <Text style={styles.header}>30:00 Minutes</Text>
          </View> */}

          <View style={styles.imageContainer}>
            <Image source={Doctor} style={styles.imageStyle} />
          </View>
          <View>
            <Text style={styles.header}> Dr.Tharani </Text>
            <Text style={styles.subHeader}> Connecting </Text>
          </View>
        </View>

        <View style={styles.callContainer}>
          <TouchableOpacity style={styles.blueBackground}>
            <Feather name="volume-2" size={25} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.blueBackground}>
            <MaterialIcons name="call-end" size={25} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.blueBackground}>
            <Feather name="mic-off" size={25} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginVertical: 20,
    alignSelf: 'center',
  },
  blueBackground: {
    backgroundColor: '#E4EBFF',
    height: width * 0.14,
    width: width * 0.14,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  callContainer: {
    flexDirection: 'row',
    width: width * 0.8,
    justifyContent: 'space-between',
    padding: 20,
    paddingBottom: 10,
  },
  innerContainer: {
    height: height * 0.9,
    justifyContent: 'space-between',
  },
  imageStyle: {
    height: width * 0.4,
    width: width * 0.4,
    resizeMode: 'center',
    borderRadius: 100,
    alignSelf: 'center',
  },
  imageContainer: {
    height: width * 0.5,
    width: width * 0.5,
    backgroundColor: 'transparent',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContainer: {
    height: height,
    width: width,
    borderWidth: 1,
    backgroundColor: colours.White,
  },
  header: {
    fontSize: 26,
    color: colours.Black,
    lineHeight: 30,
    fontFamily: 'Urbanist-SemiBold',
    textAlign: 'center',
    marginBottom: 10,
  },
  NameText: {
    ...style.header,
    textAlign: 'center',
    marginVertical: 10,
  },
  subHeader: {
    fontSize: 20,
    color: colours.Black,
    lineHeight: 24,
    fontFamily: 'Urbanist-Regular',
    textAlign: 'center',
  },
});
export default VideoCallScreen;
