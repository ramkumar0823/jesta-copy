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
import {colours, style, width, height} from '../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
// import HeaderComp from '../common/HeaderComp';
import Doctor from '../../assets/image/DoctorProfile.png';
// import LoginButton from '../button/Loginbutton';
import ButtonCommon from '../../components/button/ButtonCommon';

// const height = Dimensions.get('window').height;
// const width = Dimensions.get('window').width;

const CallEndScreen = props => {
  const navigation = useNavigation();
  console.log('style', style);
  return (
    <SafeAreaView style={style.mainContainer}>
      <View style={styles.innerContainer}>
        <View style={{height: width * 0.2}} />
        <View>
          <View>
            <Text style={styles.subHeader}> Messanging Ended </Text>
            <Text style={styles.header}>30:00 Minutes</Text>
          </View>

          <View style={styles.imageContainer}>
            <Image source={Doctor} style={styles.imageStyle} />
          </View>
          <View>
            <Text style={styles.NameText}> Dr.Tharani </Text>
          </View>
        </View>

        <View>
          <View style={styles.buttonContainer}>
            <ButtonCommon
              ButtonText=" Write a Review"
              HandlePress={() => {
                navigation.navigate('ReviewScreen');
              }}
            />
          </View>
          <View style={{marginBottom: 20}}>
            <ButtonCommon
              ButtonText="Go To DashBoard"
              HandlePress={() => {
                navigation.navigate('ChatHistory');
              }}
            />
          </View>
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
  innerContainer: {
    height: height,
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
    fontSize: 20,
    color: colours.DarkBlue,
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
    fontSize: 14,
    color: colours.Black,
    lineHeight: 24,
    fontFamily: 'Urbanist-SemiBold',
    textAlign: 'center',
  },
});
export default CallEndScreen;
