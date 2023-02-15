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
  TextInput,
} from 'react-native';
import {colours, style, height, width} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import HeaderComp from '../../components/common/HeaderComp';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ChatScreen = () => {
  const navigation = useNavigation();
  const [sortModal, setSortModal] = useState(false);
  const [item, setItem] = useState(false);
  const [today, setToday] = useState(false);
  const [letter, setLetter] = useState(false);
  const [letter1, setLetter1] = useState(false);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <HeaderComp Header="Dr.Tharani" />
      </View>
      <View style={styles.innerContainer}>
        <View style={{width: width * 0.9}}>
          <View style={{height: width * 0.05}} />
          <View style={styles.chatContainer1}>
            <Text style={styles.chatText1}>
              Hi Abiola, any progress on the project? We need a link for
              standup.
            </Text>
          </View>

          <View style={styles.chatContainer2}>
            <Text style={{...styles.chatText1, color: '#595F69'}}>
              Hi Abiola, any progress on the project? We need a link for
              standup.
            </Text>
          </View>
        </View>

        <View style={styles.sendContainer}>
          <TextInput
            style={styles.textContainer}
            placeholder="Enter your Text"
          />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('CallEndScreen');
            }}>
            <FontAwesome name="send" size={25} color={colours.DarkBlue} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  chatContainer1: {
    height: width * 0.2,
    width: width * 0.7,
    backgroundColor: colours.DarkBlue,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginVertical: 10,
  },

  chatContainer2: {
    height: width * 0.2,
    width: width * 0.7,
    backgroundColor: colours.DarkBlue,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    alignSelf: 'flex-start',
    backgroundColor: colours.White,
    alignSelf: 'flex-end',
    borderWidth: 0.5,
    marginVertical: 10,
  },
  chatText1: {
    fontSize: 15,
    lineHeight: 20,
    fontFamily: 'Urbanist-Medium',
    color: colours.White,
  },
  headerContainer: {
    marginTop: width * 0.03,
    width: width * 0.9,
  },
  innerContainer: {
    // height: height,
    width: width * 0.9,
    height: height * 0.9,
    justifyContent: 'space-between',
  },
  itemsContainer: {
    height: height * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContainer: {
    backgroundColor: colours.White,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendContainer: {
    width: width * 0.9,
    flexDirection: 'row',
    height: width * 0.12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0,
  },
  textContainer: {
    width: width * 0.75,
    backgroundColor: colours.AliceBlue,
    color: colours.Black,
    lineHeight: 24,
    fontFamily: 'Urbanist-Medium',
    fontSize: 14,
    marginHorizontal: 5,
    height: width * 0.12,
  },
});
export default ChatScreen;
