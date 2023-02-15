import React, {useState} from 'react';
import {SafeAreaView, View, StyleSheet, Alert, Text} from 'react-native';
import {colours, style, height, width} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import md5 from 'md5';
import {useDispatch, useSelector} from 'react-redux';
import {useRoute} from '@react-navigation/native';
import HeaderComp from '../../components/common/HeaderComp';
import ButtonCommon from '../../components/button/ButtonCommon';
import SuccessModal from '../../components/common/SuccessModal';
import RescheduleSuccess from '../../assets/image/RescheduleSuccess.png';
import ScheduleFailed from '../../assets/image/ScheduleFailed.png';
import {APPOINTMENT_BOOKING_URL, SALT} from '../../httpsclient/APIConstants';
import {POST_API} from '../../httpsclient/POST';
import LoaderModal from '../../components/common/LoaderModal';

const PatientInformation = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userID = useSelector(state => state.user.loginUserId);
  const [modalVisiblity, setModalVisiblity] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(true);
  console.log(showModal2);
  const datas = useRoute().params.data;

  console.log('>>>data', datas);

  const onAppointmentBook = async () => {
    setLoading(true);
    const auth_token = md5(SALT + userID);
    const data = {
      user_id: userID,
      doctor_id: datas.doctorID,
      auth_token: auth_token,
      date: datas.date,
      time_duration: datas.duration,
      consulting_timing: datas.time,
      mode_of_consulting: datas.mode,
      patient_name: datas.name,
      age: datas.age,
      gender: datas.gender,
      report_file: '54dc98.doc',
      health_issues_description: datas.comments,
      amount: 100,
    };
    const endpoint = APPOINTMENT_BOOKING_URL;
    console.log('endData', data);

    await POST_API(endpoint, data)
      .then(Response => {
        if (Response.data.success) {
          console.log('>>appointmentDetails', Response.data.parameters);
          setShowModal2(false);
          setModalVisiblity(true);

          setLoading(false);
        } else {
          showAlert(Response.data.message);
          console.log('>>>cataler', Response.data.message);
          setLoading(false);
        }
      })
      .catch(err => {
        alert(err);
        setLoading(false);
      });
  };

  const showAlert = alert => {
    Alert.alert('Alert', alert, [
      {
        text: 'OK',
        onPress: () => {
          navigation.navigate('HomeScreen');
        },
        style: 'cancel',
      },
    ]);
  };

  return (
    <SafeAreaView style={style.mainContainer}>
      <LoaderModal Load={loading} />
      <View style={styles.innerContainer}>
        <View>
          <View>
            <HeaderComp Header="Patient Details" />
          </View>
          <View style={{height: width * 0.1}} />

          <View style={styles.detailContainer}>
            <Text style={styles.name}>Name</Text>
            <Text style={styles.character}>:</Text>
            {datas ? (
              <Text style={styles.details}> {datas.name}</Text>
            ) : (
              <Text style={styles.details}>--</Text>
            )}
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.name}>Gender</Text>
            <Text style={styles.character}>:</Text>
            {datas ? (
              <Text style={styles.details}> {datas.gender}</Text>
            ) : (
              <Text style={styles.details}> --</Text>
            )}
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.name}>Age</Text>
            <Text style={styles.character}>:</Text>
            {datas ? (
              <Text style={styles.details}> {datas.age}</Text>
            ) : (
              <Text style={styles.details}> --</Text>
            )}
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.name}>Health Issues</Text>
            <Text style={styles.character}>:</Text>
            {datas ? (
              <Text style={styles.details}>
                {/* Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, */}
                {datas.comments}
              </Text>
            ) : (
              <Text style={styles.details}>--</Text>
            )}
          </View>
        </View>
        {/* <View style={{height: width * 0.75}}></View> */}
        {/* <----------------------------------------Button----------------------------------------------------->     */}
        <View>
          <ButtonCommon
            HandlePress={() => {
              // setShowModal1(true);
              // setShowModal2(!showModal2);

              onAppointmentBook();
            }}
            ButtonText="Pay"
          />
        </View>
      </View>
      {/* <----------------------------------------modal component----------------------------------------------------->     */}

      <SuccessModal
        ModalShow={modalVisiblity}
        ParagraphText="Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s"
        Colours={showModal2 ? colours.Red : colours.BlueReg}
        HeaderText={showModal2 ? 'Oops!, Failed' : 'Successfully Booked'}
        ButtonText="Next"
        Background={showModal2 ? colours.Red : colours.BlueReg}
        Photo={showModal2 ? ScheduleFailed : RescheduleSuccess}
        onHandlePress={() => {
          setModalVisiblity(false);
          // setShowModal2(!showModal2);
          // navigation.navigate('MyAppointments');
          navigation.navigate('HomeScreen');
        }}
      />
    </SafeAreaView>
  );
};
export default PatientInformation;

const styles = StyleSheet.create({
  name: {
    ...style.subHeader,
    width: width * 0.3,
  },
  character: {
    ...style.subHeader,
  },
  details: {
    ...style.subHeader,
    borderWidth: 0,
    width: width * 0.55,
    marginHorizontal: 10,
    fontSize: 17,
    fontFamily: 'Urbanist-Medium',
  },
  detailContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  innerContainer: {
    justifyContent: 'space-between',
    height: height,
    width: width * 0.9,
    alignItems: 'center',
  },
});
