import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import {colours, style, height, width} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import HeaderComp from '../../components/common/HeaderComp';
import SearchBar from '../../components/homescreen/SearchBar';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FilterDoc1 from '../../assets/image/FilterDoc1.png';
import ButtonCommon from '../../components/button/ButtonCommon';

const VoiceCallHistory = () => {
  const navigation = useNavigation();
  const [sortModal, setSortModal] = useState(false);
  const [item, setItem] = useState(false);
  const [today, setToday] = useState(false);
  const [letter, setLetter] = useState(false);
  const [letter1, setLetter1] = useState(false);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.innerContainer}>
        <View style={{marginVertical: width * 0.03}}>
          <HeaderComp Header="Chat" />
        </View>
        <TouchableOpacity style={styles.category}>
          <View style={styles.categoryContainer}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',

                alignSelf: 'center',
                height: width * 0.28,
                width: width * 0.28,
              }}>
              <Image source={FilterDoc1} style={styles.categoryImage} />
            </View>
            <View
              style={{
                justifyContent: 'space-around',
                padding: 3,
                height: width * 0.28,
              }}>
              <View style={styles.upContainer}>
                <Text style={style.subHeader} numberOfLines={2}>
                  Dr.Tharani
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
                  <Text style={styles.chatText}>Call Completed </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.timeText}>10:00 - 10:30</Text>
                </View>
              </View>
            </View>

            <View style={styles.vectorContainer}>
              <TouchableOpacity style={styles.blueBackground}>
                {/* <FontAwesome5 name="video" size={20} color={colours.DarkBlue} /> */}
                <AntDesign name="message1" size={20} color={colours.DarkBlue} />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>

        <View>
          <TouchableOpacity
            style={styles.downloadContainer}
            onPress={() => {
              navigation.navigate('PrescriptionScreen'), console.log('hi');
            }}>
            <View style={{flexDirection: 'row'}}>
              <AntDesign name="filetext1" size={20} />
              <Text style={styles.buttonText}>Prescription</Text>
            </View>
            <Feather name="download" size={20} color={colours.Black} />
          </TouchableOpacity>
        </View>

        <View>
          <Text style={styles.subHeader}>
            15 minutes of voice calls have been recorded
          </Text>
        </View>

        <ButtonCommon
          ButtonText="View Chat"
          HandlePress={() => {
            navigation.navigate('ChatScreen');
          }}
        />
      </View>
    </SafeAreaView>
  );
};
export default VoiceCallHistory;

const styles = StyleSheet.create({
  buttonText: {
    fontFamily: 'Urbanist-SemiBold',
    lineHeight: 20,
    fontSize: 15,
    color: colours.Black,
    marginHorizontal: 10,
  },
  downloadContainer: {
    backgroundColor: colours.White,
    width: width * 0.9,
    borderRadius: 30,
    padding: 11,
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 0.1,
    flexDirection: 'row',
  },
  mainContainer: {
    height: height,
    width: width,
    backgroundColor: colours.White,
    alignItems: 'center',
  },

  innerContainer: {
    // height: height,
    width: width * 0.9,
    justifyContent: 'space-between',
    height: height * 0.5,
    borderWidth: 0,
  },
  subHeader: {
    fontSize: 14,
    color: colours.Black,
    lineHeight: 24,
    fontFamily: 'Urbanist-SemiBold',
  },
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
  categoryContainer: {
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
  vectorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: width * 0.28,
  },
});
