import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Dimensions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {colours, style, height, width} from '../../constants';
import LoaderModal from '../../components/common/LoaderModal';
import {BackButton} from '../../components/button/BackButton';
import {useNavigation} from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';
import EyeOff from '../../assets/image/EyeOff.png';
import md5 from 'md5';
import axios from 'axios';
import Eye from '../../assets/image/Eye.png';
import FormData from 'form-data';
import {getUniqueId} from 'react-native-device-info';

const RegisterScreen = () => {
  // const ip_address = DeviceInfo.getIpAddress().then(ipAddress => {
  //   console.log('device IPaddress>>>>', ipAddress);
  //   return ipAddress;
  // });
  // const unique_device_id = DeviceInfo.getUniqueId().then(uniqueID => {
  //   console.log('device info>>>>', uniqueID);
  //   return uniqueID;
  // });
  const uniqueId = getUniqueId()._j;
  const ipadd1 = DeviceInfo.getIpAddress();
  console.log('id&address', uniqueId, ipadd1);
  const navigation = useNavigation();
  const passRegex =
    /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/;
  const nameRegex = /^[a-zA-Z]+$/;
  const numberRegex = /^[6789]\d{9}$/;
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const [loading, SetLoading] = useState(false);

  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [number, setNumber] = useState();
  const [password, setPassword] = useState();
  const [confirmPass, setConfirmPass] = useState();
  const [maskPass, setMaskPass] = useState(true);
  const [maskPass2, setMaskPass2] = useState(true);
  console.log('username', username);
  const REGISTER_URL = 'https://www.jesta.clinic/admin/web/v1/users/register';
  const SALT = 'jesta@2022App@tt';

  const Register = async () => {
    SetLoading(true);
    console.log('datais');
    console.log('data is ', username, number, password, email);
    if (username === '' || email === '' || number === '' || password == '') {
      alert('please fill all fields');
    }
    // else if (
    //   username.match(nameRegex)  &&
    //   email.match(emailRegex) &&
    //   password.match(passRegex) &&
    //   number.match(numberRegex)
    // )
    // {
    if (password === confirmPass) {
      // const username = username;
      // const password = password;
      // const mobileNumber = number;
      // const email = email;
      // const uniqueId = DeviceInfo.getUniqueId()
      const ipaddress = DeviceInfo.getIpAddress();
      const auth_token = md5(SALT + number + password);

      const data = {
        user_name: username,
        mobile_number: number,
        password_hash: password,
        email_id: email,
        ip_address: ipaddress,
        unique_device_id: uniqueId,
        auth_token: auth_token,
      };
      console.log(' fixed data1 is', data);
      axios
        .post(REGISTER_URL, data)
        .then(Response => {
          if (Response.data.success) {
            Alert.alert('Success', 'Registered successfully ', [
              {
                text: 'OK',
                onPress: () => {
                  navigation.navigate('LoginScreen');
                },
              },
            ]);
            SetLoading(false);
          } else {
            alert(Response.data.message);
            console.log('message', Response.data);
            SetLoading(false);
          }
        })
        .catch(err => {
          console.log('>>>', err);
          SetLoading(false);
        });
    } else {
      alert('passwords should match');
      SetLoading(false);
    }
    // }
    // else {
    //   alert('please enter fields correctly');
    // }
  };

  return (
    <SafeAreaView style={style.mainContainer}>
      <View>
        <View style={style.innerContainer}>
          <BackButton />
          <View>
            <Text style={{...style.loginWelcome}}>
              Hello! Register to get started
            </Text>
          </View>
          <View style={styles.inputBox}>
            <View style={style.username2}>
              <TextInput
                style={style.placeholderText}
                placeholder="Username"
                value={username}
                placeholderTextColor={colours.LightGrey}
                onChangeText={value => {
                  setUsername(value);
                }}></TextInput>
            </View>

            <View style={style.username2}>
              <TextInput
                onChangeText={value => {
                  setEmail(value);
                }}
                style={style.placeholderText}
                placeholder="Email"
                keyboardType="email-address"
                value={email}
                placeholderTextColor={colours.LightGrey}></TextInput>
            </View>

            <View style={style.username2}>
              <TextInput
                onChangeText={value => {
                  setNumber(value);
                }}
                style={style.placeholderText}
                placeholder="Mobile Number"
                value={number}
                keyboardType={
                  Platform.OS === 'ios'
                    ? 'numbers-and-punctuation'
                    : 'number-pad'
                }
                placeholderTextColor={colours.LightGrey}></TextInput>
            </View>

            {/* <View style={style.username2}>
            <TextInput
              onChangeText={value => {
                setPassword(value);
              }}
              style={style.placeholderText}
              placeholder="Password"
              value={password}
              placeholderTextColor={colours.LightGrey}></TextInput>
          </View> */}

            <View style={styles.password}>
              <TextInput
                style={styles.placeholderText2}
                onChangeText={value => {
                  setPassword(value);
                }}
                secureTextEntry={maskPass}
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
                style={styles.placeholderText2}
                onChangeText={value => {
                  setConfirmPass(value);
                }}
                secureTextEntry={maskPass2}
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

            {/* <View style={style.username2}>
            <TextInput
              onChangeText={value => {
                setConfirmPass(value);
              }}
              style={style.placeholderText}
              placeholder="Confirm password"
              value={confirmPass}
              placeholderTextColor={colours.LightGrey}></TextInput>
          </View> */}

            <TouchableOpacity
              onPress={() => {
                Register();
              }}
              style={{...style.button, borderRadius: 8, marginTop: 30}}>
              <Text style={style.buttonText}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <View style={{...style.register, marginVertical: 10}}>
            <Text style={style.registerText}>Already have an account </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('LoginScreen');
              }}>
              <Text style={style.registerNow}>Login Now?</Text>
            </TouchableOpacity>
          </View>
          <View style={{...style.register, marginVertical: 0}}>
            <Text style={style.registerText}>I'm a Doctor </Text>
            <TouchableOpacity
              onPress={() => {
                Register();
              }}>
              <Text style={style.registerNow}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
        <LoaderModal Load={loading} />
      </View>
    </SafeAreaView>
  );
};
export default RegisterScreen;

const styles = StyleSheet.create({
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
  passwordMask: {
    resizeMode: 'center',
    height: 20,
    width: 20,
  },
  placeholderText2: {
    fontFamily: 'Urbanist-Medium',
    fontSize: 14,
    color: colours.Black,
    width: width * 0.7,
  },
});
