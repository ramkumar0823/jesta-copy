import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  FlatList,
  ScrollView,
  Pressable,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Modal,
  Image,
} from 'react-native';
import {colours, style, height, width} from '../../constants';
import ArrowBackButton from '../../components/button/ArrowBackButton';
import RescheduleSuccess from '../../assets/image/RescheduleSuccess.png';
import CategoryArray from '../../assets/flatlistarray/CategoryArray';
import Notification from '../../components/homescreen/Notification';
import {useNavigation} from '@react-navigation/native';
import DateButton from '../../components/button/DateButton';
import FilterButton from '../../components/button/FilterButton';

const SuccessModal = props => {
  const navigation = useNavigation();

  const [success, setSuccess] = useState(false);
  const [fashion, setFashion] = useState(true);
  const [colour, setColour] = useState(props.Colours);

  return (
    <SafeAreaView style={style.mainContainer}>
      {/* <View style={styles.innerContainer}> */}
      {/* <------------------------------Modal---------------------------------------------------------------------------------> */}

      <Modal
        transparent={true}
        animationType={'none'}
        visible={props.ModalShow}
        onRequestClose={() => {
          console.log('close modal');
          setSuccess(false);
        }}>
        <View style={styles.modalBackground}>
          <View style={styles.activityIndicatorWrapper}>
            <View style={styles.modalContainer}>
              <View style={styles.imageContainer}>
                <Image source={props.Photo} style={{...styles.modalImage}} />
              </View>
              <View style={styles.DoctorView}>
                <Text style={{...styles.modalHead, color: props.Colours}}>
                  {props.HeaderText}
                </Text>
              </View>
              <View style={styles.DoctorView}>
                <Text style={{...styles.successText, color: props.Colours}}>
                  {props.ParagraphText}
                  {/* Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, */}
                </Text>
              </View>

              <TouchableOpacity
                onPress={props.onHandlePress}
                style={{
                  ...styles.modalButton,
                  backgroundColor: props.Background,
                }}>
                <Text style={style.buttonText}>{props.ButtonText}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {/* </View> */}
    </SafeAreaView>
  );
};
export default SuccessModal;

const styles = StyleSheet.create({
  DoctorView: {
    marginHorizontal: 10,
    padding: 0,
  },

  innerContainer: {
    backgroundColor: colours.White,
    marginRight: width * 0.02,
  },
  imageContainer: {
    alignSelf: 'center',
  },

  mainContainer: {
    backgroundColor: colours.White,
    height: height,
  },
  modalImage: {
    width: width * 0.5,
    height: width * 0.5,
    resizeMode: 'center',
  },
  modalContainer: {
    height: height * 0.6,
    width: width * 0.9,
    justifyContent: 'space-between',
  },
  modalHead: {
    ...style.header,
    textAlign: 'center',
    color: colours.BlueReg,
  },

  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalButton: {
    ...style.button,
    backgroundColor: colours.BlueReg,
    width: width * 0.85,
  },
  activityIndicatorWrapper: {
    backgroundColor: colours.White,
    height: height * 0.7,
    width: width * 0.95,
    borderRadius: 15,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  successText: {
    fontFamily: 'Urbanist-SemiBold',
    fontSize: 16,
    color: colours.Black,
    textAlign: 'center',
    lineHeight: 24,
  },
});
