import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Button,
  Image,
} from 'react-native';
import {colours, height, width, style} from '../../constants';
import ReviewImage from '../../assets/image/ReviewImage.png';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons.js';
const LogoutModal = props => {
  return (
    <SafeAreaView>
      <Modal
        transparent={true}
        visible={props.ShowModal}
        animationType="fade"
        style={{backgroundColor: 'red', alignSelf: 'center'}}>
        <Pressable
          style={styles.modalView}
          onPress={() => {
            console.log('hi');
          }}>
          <View style={styles.modalSheet}>
            <View style={styles.innerContainer2}>
              {props.HeaderShow ? (
                <View style={styles.filterBorder}>
                  <Text style={styles.name}>Remove Doctor</Text>
                </View>
              ) : (
                <View style={styles.logoutButton}>
                  <MaterialIcons name="login" size={30} />
                </View>
              )}

              <View style={styles.categoriesView2}>
                <Text style={styles.questionText}>{props.Question}</Text>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.buttonStyle}
                  onPress={props.CancelPress}>
                  <Text style={styles.buttonTextStyle} numberOfLines={2}>
                    {props.CancelText}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    ...styles.buttonStyle,
                    backgroundColor: colours.DarkBlue,
                  }}
                  onPress={props.ApplyPress}>
                  <Text
                    style={{...styles.buttonTextStyle, color: colours.White}}
                    numberOfLines={2}>
                    {props.ApplyText}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  buttonStyle: {
    backgroundColor: colours.ButtonLight,
    borderRadius: 30,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    width: width * 0.35,
    padding: 10,
  },
  buttonTextStyle: {
    color: colours.DarkBlue,
    paddingBottom: 2,
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Urbanist-SemiBold',
    lineHeight: 20,
    // marginVertical: 5,
    // marginHorizontal: 20,
  },
  questionText: {
    fontFamily: 'Urbanist-Medium',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 25,
    color: colours.Chargoal,
  },
  innerContainer2: {
    width: width * 0.9,
    height: height * 0.35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesView: {
    marginVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    height: width * 0.14,
  },
  categoriesView2: {
    marginTop: width * 0.1,
    alignItems: 'center',
    width: width,
    height: width * 0.14,
  },
  categoryText2: {
    fontSize: 16,
    fontFamily: 'Urbanist-SemiBold',
    color: colours.DarkBlue,
  },
  categoryText3: {
    fontSize: 18,
    fontFamily: 'Urbanist-Bold',
    color: colours.DarkBlue,
  },
  container3: {
    height: height * 0.9,
    width: width * 0.9,
    alignSelf: 'center',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  DoctorView: {
    marginHorizontal: 10,
    padding: 0,
  },

  innerContainer: {
    backgroundColor: colours.White,
    marginRight: width * 0.02,
  },
  loginWelcome: {
    fontFamily: 'Urbanist-Bold',
    fontSize: 17,
    color: colours.Black,
    width: width * 0.45,
    lineHeight: 20,
    marginVertical: 10,
  },
  mainContainer: {
    backgroundColor: colours.White,
    height: height,
  },
  modalSheet: {
    backgroundColor: colours.White,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    width: width,
    height: height * 0.4,
  },
  modalView: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    flex: 1,
    justifyContent: 'flex-end',
    borderRadius: 0,
  },
  name: {
    fontFamily: 'Urbanist-Bold',
    fontSize: 20,
    color: colours.Black,
    lineHeight: 20,
    marginVertical: 10,
    textAlign: 'center',
  },
  notification: {
    height: width * 0.13,
    backgroundColor: '#E4EBFF',
    borderRadius: 10,
    padding: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView2: {
    paddingLeft: width * 0.05,
  },
  filterBorder: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
    height: width * 0.17,
    borderBottomWidth: 0.2,
    borderBottomColor: '#b3b3b3',
  },
  logoutButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.9,
  },
  searchView: {
    flexDirection: 'row',
    width: width * 0.9,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  searchFilter: {
    height: width * 0.12,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 5,
  },
});
export default LogoutModal;
