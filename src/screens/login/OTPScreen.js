import React, { useRef, useState, props } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Dimensions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import {
  CodeField, Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import { colours, style, height, width, OTP_URL, SALT } from '../../constants';
import { BackButton } from '../../components/button/BackButton';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { setOtpResponse } from '../../redux/slice/User';
import LoaderModal from '../../components/common/LoaderModal';
import md5 from 'md5';
import axios from 'axios';



const OTPScreen = () => {

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState('');
  const mobNumber2 = useSelector(state => state.user.mobNumber);
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  console.log('setpass', value)
  const CELL_COUNT = 4;
  const otp = 1234;
  const number = mobNumber2.parameters.mobile_number;
  console.log('mobnumber2', mobNumber2.parameters.forgetpass_id, mobNumber2.parameters.mobile_number)




  const VerifyOTP = () => {

    setLoading(true)
    console.log('value', value, SALT);
    if (value !== '' || value !== null) {

      const auth_token = md5(SALT + number + value)

      const data = {
        mobile_number: mobNumber2.parameters.mobile_number,
        forgetpass_id: mobNumber2.parameters.forgetpass_id,
        ip_address: "JOIEIXONCJE",
        unique_device_id: "EJCC87C6C",
        otp: value,
        auth_token: auth_token
      }

      console.log(' fixed data1 is', data);
      axios
        .post(OTP_URL, data)
        .then(Response => {
          if (Response.data.success) {
            console.log('otp_response', Response.data);
            dispatch(setOtpResponse(Response.data.parameters))
            setLoading(false)
            setValue('')
            navigation.navigate('ResetPassScreen')


          } else {
            setLoading(false)
            alert(Response.data.message);
            setValue('')
            console.log('message', Response.data.message);


          }
        })
        .catch(err => {
          console.log(">>>", err);
          setLoading(false)
        });

    }
    else {
      alert('please enter valid OTP')
      setLoading(false)

    }


  }






  return (
    <SafeAreaView style={style.mainContainer}>
      <View>
        <View style={styles.backButton}>
          <BackButton />
        </View>
        <View style={style.innerContainer}>
          <View>
            <View>
              <Text style={{ ...style.loginWelcome }}>OTP Verification</Text>
            </View>

            <View>
              <Text style={{ ...style.forgotText2, textAlign: 'left' }}>
                Enter the verification code we just sent on your mobile number.
              </Text>
            </View>

            {/* {<---------------------------------------------------OTP Package------------------------------------------------------------>} */}
            <View>

              <CodeField
                ref={ref}
                {...props}
                // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                value={value}
                onChangeText={setValue}
                cellCount={CELL_COUNT}
                rootStyle={styles.otpView}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({ index, symbol, isFocused }) => (
                  <Text
                    key={index}
                    style={[styles.numberInput,
                    isFocused && {
                      ...styles.numberInput,
                      backgroundColor: colours.White,
                      borderColor: colours.DarkBlue
                    }]}
                    onLayout={getCellOnLayoutHandler(index)}>
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </Text>
                )}
              />

            </View>

            <TouchableOpacity
              style={{ ...style.button, borderRadius: 8, marginTop: 80 }} onPress={() => {
                VerifyOTP()

              }}>
              <Text style={style.buttonText}>Verify</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ ...style.register, marginVertical: 10 }}>
          <Text style={style.registerText}>Didn't received code? </Text>
          <TouchableOpacity>
            <Text style={style.registerNow}>Resend</Text>
          </TouchableOpacity>
        </View>
        <LoaderModal Load={loading} />
      </View>

    </SafeAreaView>
  );
};
export default OTPScreen;

const styles = StyleSheet.create({
  lock: {
    height: 100,
    width: 100,
    alignSelf: 'center',
  },
  backButton: {
    alignSelf: 'flex-start',
    marginLeft: width * 0.05,
  },
  numberInput: {
    backgroundColor: colours.AliceBlue,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colours.SolitudeBorder,
    marginVertical: 15,
    marginHorizontal: 10,
    height: width * 0.2,
    width: width * 0.2,
    lineHeight: width * 0.19,
    fontSize: 35,
    color: colours.Black,
    textAlign: 'center',


  },

  numberInput2: {
    backgroundColor: colours.White,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colours.DarkBlue,
    color: colours.Black,
    marginVertical: 15,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: width * 0.2,
    width: width * 0.2,

  },
  otpNumber: {
    color: colours.Black,
    fontSize: 26,
    fontFamily: 'Urbanist-Bold',
    textAlign: 'center',

  },
  otpView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});
