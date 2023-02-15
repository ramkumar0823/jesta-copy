import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  Alert,
  Modal,
} from 'react-native';
import {colours, style, height, width} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {setLoginUserId} from '../../redux/slice/User';
import Share from 'react-native-share';
import HeaderComp from '../../components/common/HeaderComp';

const InviteScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onInviteFriend = () => {
    let urlString = 'www.google.com';
    let options = {
      title: 'Share via',
      message: 'Doctor Profile',
      url: urlString,
      type: 'string',
      // type: 'image/jpeg',
    };
    Share.open(options)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        err && console.log(err);
      });
  };

  return (
    <SafeAreaView style={style.mainContainer}>
      <View style={styles.headerContainer}>
        <HeaderComp Header="Invite Friends" />
      </View>
      <View style={styles.innerContainer}>
        <View style={styles.inviteContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.inviteText}>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
              erat volutpat. Ut wisi enim ad
            </Text>
          </View>

          {/* <------------------------------------------------------button Container--------------------------------------------------> */}

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              onInviteFriend();
            }}>
            <Text style={styles.buttonText}>Invite Friends</Text>
          </TouchableOpacity>
          {/* <------------------------------------------------------button Container--------------------------------------------------> */}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colours.DarkBlue,
    width: width * 0.5,
    borderRadius: 5,
    padding: 11,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: width * 0.07,
  },
  buttonText: {
    color: colours.White,
    paddingBottom: 4,
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Urbanist-SemiBold',
  },
  headerContainer: {
    width: width * 0.9,
  },
  innerContainer: {
    height: height * 0.9,
    width: width * 0.9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inviteContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inviteText: {
    textAlign: 'center',
    fontFamily: 'Urbanist-Medium',
    fontSize: 15,
    lineHeight: 23,
    color: colours.DarkBlue,
  },
  textContainer: {
    width: width * 0.8,
    padding: 5,
  },
});

export default InviteScreen;
