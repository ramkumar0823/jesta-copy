import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Dimensions,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {
  colours,
  style,
  height,
  width,
  RESET_PASSWORD_URL,
  SALT,
} from '../../constants';
import {BackButton} from '../../components/button/BackButton';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import LoaderModal from '../../components/common/LoaderModal';
import EyeOff from '../../assets/image/EyeOff.png';
import Eye from '../../assets/image/Eye.png';
import md5 from 'md5';
import axios from 'axios';

const ResetPassScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const OTPDetails = useSelector(state => state.user.otpresponse);
  const [password, setPassword] = useState();
  const [confirmPass, setConfirmPass] = useState();
  const [maskPass, setMaskPass] = useState(true);
  const [maskPass2, setMaskPass2] = useState(true);
  console.log('passis', password, confirmPass);
  console.log('otpis', OTPDetails.user_data.user_id);

  const ResetPassword = () => {
    if (password !== '' && confirmPass !== '') {
      if (password === confirmPass) {
        setLoading(true);
        console.log('value', password, SALT);

        const auth_token = md5(SALT + password);

        const data = {
          user_id: OTPDetails.user_data.user_id,
          new_password: password,
          auth_token: auth_token,
        };

        console.log(' fixed data1 is', data);
        axios
          .post(RESET_PASSWORD_URL, data)
          .then(Response => {
            if (Response.data.success) {
              console.log('Reset_response', Response.data);
              setLoading(false);
              setPassword('');
              setConfirmPass('');
              navigation.navigate('PassChangedScreen');
            } else {
              setPassword('');
              setConfirmPass('');
              alert(Response.data.message);
              setLoading(false);
              console.log('message', Response.data.message);
            }
          })
          .catch(err => {
            console.log('>>>', err);
            setLoading(false);
          });
      } else {
        alert('passwords should Match');
        setLoading(false);
      }
    } else {
      alert('please enter Password & confirm Password');
      setLoading(false);
    }
  };
  return (
    <SafeAreaView style={style.mainContainer}>
      <View>
        <View style={styles.backButton}>
          <BackButton />
        </View>
        <View style={style.innerContainer}>
          <View>
            <Text style={{...style.loginWelcome}}>Create new password</Text>
          </View>

          <View>
            <Text style={{...style.forgotText2, textAlign: 'left'}}>
              Your new password must be unique from those previously used.
            </Text>
          </View>
          <View style={styles.inputBox}>
            <View style={styles.password}>
              <TextInput
                onChangeText={value => {
                  setPassword(value);
                }}
                secureTextEntry={maskPass}
                style={styles.placeholderText2}
                placeholder="Password"
                placeholderTextColor={colours.LightGrey}></TextInput>
              <TouchableOpacity
                onPress={() => {
                  setMaskPass(!maskPass);
                }}>
                <Image
                  source={maskPass ? EyeOff : Eye}
                  style={styles.passwordMask}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.password}>
              <TextInput
                onChangeText={value => {
                  setConfirmPass(value);
                }}
                secureTextEntry={maskPass2}
                style={styles.placeholderText2}
                placeholder="Confirm password"
                placeholderTextColor={colours.LightGrey}></TextInput>
              <TouchableOpacity
                onPress={() => {
                  setMaskPass2(!maskPass2);
                }}>
                <Image
                  source={maskPass2 ? EyeOff : Eye}
                  style={styles.passwordMask}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => {
                ResetPassword();
                // navigation.navigate('PassChangedScreen');
              }}
              style={{
                ...style.button,
                borderRadius: 8,
                marginTop: width * 0.13,
              }}>
              <Text style={style.buttonText}>Reset Password</Text>
            </TouchableOpacity>
          </View>
        </View>
        <LoaderModal Load={loading} />
      </View>
    </SafeAreaView>
  );
};
export default ResetPassScreen;

const styles = StyleSheet.create({
  backButton: {
    alignSelf: 'flex-start',
    marginLeft: width * 0.05,
  },
  placeholderText2: {
    fontFamily: 'Urbanist-Medium',
    fontSize: 14,
    color: colours.Black,
    width: width * 0.7,
  },
  passwordMask: {
    resizeMode: 'center',
    height: 20,
    width: 20,
  },
  password: {
    paddingLeft: 10,
    backgroundColor: colours.AliceBlue,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E8ECF4',
    color: colours.Black,
    marginVertical: 15,
    paddingRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
