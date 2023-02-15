import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {colours, style, SOCIAL_MEDIA_LOGIN} from '../../constants';
import Jesta3 from '../../assets/image/Jesta3.png';
import Eye from '../../assets/image/Eye.png';
import EyeOff from '../../assets/image/EyeOff.png';
import Line from '../../assets/image/Line.png';
import Facebook from '../../assets/image/Facebook.png';
import Google from '../../assets/image/Google.png';
import {useNavigation} from '@react-navigation/native';
import {getUniqueId} from 'react-native-device-info';
import LoaderModal from '../../components/common/LoaderModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import md5 from 'md5';
import axios from 'axios';
import crashlytics from '@react-native-firebase/crashlytics';
import {useDispatch} from 'react-redux';
import {setLoginUserId, setRoleID} from '../../redux/slice/User';
import BottomTabNavigator from '../../navigation/BottomTabNavigator';
import Navigator from '../../navigation/Navigator';
import NavigatorDoctor from '../../navigation/NavigatorDoctor';
import RootNavigation from '../../navigation/RootNavigation';
import {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  Settings,
  LoginManager,
  AuthenticationToken,
  Profile,
} from 'react-native-fbsdk-next';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

// async function onSignIn(user) {
//   crashlytics().log('User signed in.');
//   await Promise.all([
//     crashlytics().setUserId(user.uid),
//     crashlytics().setAttribute('credits', String(user.credits)),
//     crashlytics().setAttributes({
//       role: 'admin',
//       followers: '13',
//       email: user.email,
//       username: user.username,
//     }),
//   ]);
// }

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [googleID, setGoogleID] = useState();
  const [loggedIn, setloggedIn] = useState(false);
  const [userInfo, setuserInfo] = useState([]);
  const [media1, setMedia1] = useState('');
  // useEffect(() => {
  //   crashlytics().log('App mounted.');
  // }, []);

  const LOGIN_URL = 'https://www.jesta.clinic/admin/web/v1/users/login';
  SALT = 'jesta@2022App@tt';
  const numberRegex = /^[6789]\d{9}$/;

  const [number, setNumber] = useState();
  const [password, setPassword] = useState();
  const [mask, setMask] = useState(true);
  const [media, setMedia] = useState(' ');
  const [loading, SetLoading] = useState(false);
  const TEST_URL = 'https://www.jesta.clinic/admin/web/v1/lists/banner';

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '400299565881-1tsp8fa7okqeqq8rkrikqmm2mtpbtcib.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      forceCodeForRefreshToken: true,
    });
  }, []);

  const onGoogleButtonPress = async () => {
    try {
      await GoogleSignin.hasPlayServices();

      GoogleSignin.signIn().then(async res => {
        console.log('google', res);
        console.log('googleID', res.user);
        await socialLogin(res.user, 'google');
      });
    } catch (error) {
      console.log('err of google', error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow

        Alert.alert('User Cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already

        Alert.alert('Already in Progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated

        Alert.alert('Play services not available');
      } else {
        // some other error happened
        console.log('error', error);
        Alert.alert(error.message);
      }
    }
  };

  const onFacebookButtonPress = () => {
    setMedia('facebook');
    if (Platform.OS === 'ios') {
      AuthenticationToken.getAuthenticationTokenIOS().then(data => {
        console.log(data?.authenticationToken);
        console.log('ios');
      });
    } else if (Platform.OS === 'android') {
      LoginManager.logInWithPermissions(['public_profile']).then(function (
        result,
      ) {
        if (result.isCancelled) {
          alert('Login cancelled');
        } else {
          // alert(
          //   'Login success with permissions: ' +
          //     result.grantedPermissions.toString(),
          // );
          console.log(
            'Login success with permissions: ' +
              result.grantedPermissions.toString(),
          );

          console.log('>>', result.toString());
          console.log('>>>', JSON.stringify(result));
          console.log('android');
          AccessToken.getCurrentAccessToken().then(data => {
            console.log(data.accessToken);
            getUserProfile(data.accessToken);
          });
        }
      });
    }
  };

  const getUserProfile = accessToken => {
    fetch(
      'https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' +
        accessToken,
    )
      .then(response => response.json())
      .then(facebookUser => {
        // Some user object has been set up somewhere, build that user here
        // user.name = json.name
        // user.id = json.id
        // user.user_friends = json.friends
        // user.email = json.email
        // user.username = json.name
        // user.loading = false
        // user.loggedIn = true
        // user.avatar = setAvatar(json.id)
        console.log('jsonis', facebookUser);
        socialLogin(facebookUser, 'facebook');
      })
      .catch(() => {
        reject('ERROR GETTING DATA FROM FACEBOOK');
      });
  };

  const socialLogin = async (user, type) => {
    console.log('useris', user, type);
    if (user) {
      SetLoading(true);

      const auth_token = md5(SALT + user.id);
      const data = {
        social_login_id: user.id,
        name: user.name,
        email_id: user.email,
        type: type,
        auth_token: auth_token,
      };

      console.log(' googledata2', data);
      await axios
        .post(SOCIAL_MEDIA_LOGIN, data)
        .then(Response => {
          if (Response.data.success) {
            console.log('responseis', Response.data.parameters);
            SetLoading(false);
            navigation.navigate('HomeScreen');
          } else {
            SetLoading(false);
            alert(Response.data.message);
            console.log('message', Response.data.message);
          }
        })
        .catch(err => {
          console.log('catcherror', err);
          alert(err);
          SetLoading(false);
        });
    } else {
      alert(' cannot login with google , please login using google again');
    }
  };

  const onLogin = async () => {
    if (number == '' || password == '') {
      alert('please enter mobile number and password');
    } else if (numberRegex.test(number)) {
      SetLoading(true);
      console.log('data is ', number, password);
      const auth_token = md5(SALT + number + password);

      const data = {
        mobile_number: number,
        password_hash: password,
        ip_address: '1234',
        unique_device_id: 'trufvvv',
        auth_token: auth_token,
      };
      console.log(' fixed data1 is', data);
      axios
        .post(LOGIN_URL, data)
        .then(async Response => {
          if (Response.data.success) {
            console.log('>>>>', Response.data.parameters.user_data);
            await storeData(Response.data.parameters.user_data);
            setNumber('');
            setPassword('');
            SetLoading(false);
          } else {
            alert(Response.data.message);
            setPassword('');
            console.log('message', Response.data.message);
          }
        })
        .catch(err => {
          console.log('>>>', err);
          setPassword('');
          SetLoading(false);
        });
    } else {
      alert('mobile number should be valid');
    }

    // }
    // else {
    //   alert('please enter fields correctly');
    // }
  };
  const storeData = async value => {
    console.log('>>>store value is', value.user_id, value.role_id);
    try {
      await AsyncStorage.setItem('@store', value.user_id.toString());
      await AsyncStorage.setItem('@role', value.role_id.toString());
      console.log('store value is', value);
      dispatch(setLoginUserId(value.user_id));
      dispatch(setRoleID(value.role_id));
      SetLoading(false);
    } catch (e) {
      SetLoading(false);
      console.log('>>>>>>', e);
      alert(e, 'failed to save data');
    }
  };

  // const storeRole = async roleID  => {
  //   console.log('>>>store role is', roleID);
  //   try {
  //     await AsyncStorage.setItem('@role', roleID.toString());
  //     console.log('<<<<stored role is', roleID);
  //     dispatch(setRoleID(roleID));
  //   } catch (e) {
  //     console.log('>>>>>>', e);
  //     alert('failed to save roleId data');
  //   }
  // };

  return (
    <SafeAreaView style={style.mainContainer}>
      <View>
        <View style={style.innerContainer}>
          <View>
            <Image source={Jesta3} style={styles.jesta} />
          </View>
          <View>
            <Text style={style.loginWelcome}>
              Welcome back! Glad to see you, Again!
            </Text>
          </View>

          {/* <----------------------------------------------Username & Password-----------------------------------------------------------> */}

          <View style={styles.inputBox}>
            <View style={style.username}>
              <TextInput
                style={style.placeholderText}
                placeholder="Enter your whatsapp number"
                maxLength={10}
                onChangeText={value => {
                  setNumber(value);
                }}
                keyboardType={
                  Platform.OS === 'ios'
                    ? 'numbers-and-punctuation'
                    : 'number-pad'
                }
                value={number}
                placeholderTextColor={colours.LightGrey}></TextInput>
            </View>
            <View style={styles.password}>
              <TextInput
                style={styles.placeholderText2}
                secureTextEntry={mask}
                placeholder="Enter your password"
                onChangeText={value => {
                  setPassword(value);
                }}
                value={password}
                placeholderTextColor={colours.LightGrey}></TextInput>
              <TouchableOpacity
                onPress={() => {
                  setMask(!mask);
                }}>
                <Image
                  source={mask ? EyeOff : Eye}
                  style={styles.passwordMask}
                />
              </TouchableOpacity>
            </View>

            {/* <----------------------------------------------Forgot-----------------------------------------------------------> */}
            <TouchableOpacity
              style={{alignSelf: 'flex-end'}}
              onPress={() => {
                navigation.navigate('ForgotScreen');
              }}>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>

            {/* <----------------------------------------------Login-----------------------------------------------------------> */}

            <TouchableOpacity
              onPress={() => {
                onLogin();
                // navigation.navigate('CallEnd');
                // navigation.navigate('DoctorProfileCall');
              }}
              style={style.button}>
              <Text style={style.buttonText}>Login</Text>
            </TouchableOpacity>

            {/* <----------------------------------------------Social media-----------------------------------------------------------> */}
            <View style={{...styles.loginWith, marginBottom: 20}}>
              <Image source={Line} style={{color: colours.SolitudeBorder}} />
              <Text style={styles.forgotText}> Or Login with </Text>
              <Image
                source={Line}
                style={{backgroundColor: colours.SolitudeBorder}}
              />
            </View>
            <View style={styles.socialView}>
              <TouchableOpacity
                onPress={() => {
                  onFacebookButtonPress();
                }}
                style={styles.socialMedia}>
                <Image source={Facebook} style={styles.facebook} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  onGoogleButtonPress();
                  setMedia1('google');
                }}
                style={styles.socialMedia}>
                <Image source={Google} style={styles.facebook} />
              </TouchableOpacity>
            </View>
          </View>

          {/* <----------------------------------------------Register now-----------------------------------------------------------> */}
        </View>
        <View style={styles.register}>
          <Text style={style.registerText}>Don't have an account </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('RegisterScreen');
              // navigation.navigate('AppointmentDoctorList');
            }}>
            <Text style={style.registerNow}>Register Now?</Text>
          </TouchableOpacity>
        </View>
        <LoaderModal Load={loading} />
      </View>
    </SafeAreaView>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  jesta: {
    height: 150,
    width: 150,
    resizeMode: 'center',
  },

  placeholderText2: {
    fontFamily: 'Urbanist-Medium',
    fontSize: 14,
    color: colours.Black,
    width: width * 0.7,
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
  passwordMask: {
    resizeMode: 'center',
    height: 20,
    width: 20,
  },
  forgotText: {
    fontFamily: 'Urbanist-SemiBold',
    fontSize: 14,
    fontWeight: '600',
    color: colours.Raven,
  },

  facebook: {
    marginHorizontal: 50,
    marginVertical: 15,
    resizeMode: 'center',
    height: 30,
    width: 30,
  },
  register: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginVertical: 10,
  },
  registerText: {
    fontFamily: 'Urbanist',
    fontWeight: '700',
    color: colours.EbonyClay,
  },
  button: {
    backgroundColor: colours.DarkBlue,
    width: width * 0.9,
    marginBottom: 20,
    borderRadius: 30,
    padding: 10,
    alignSelf: 'center',
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialMedia: {
    borderWidth: 1,
    borderColor: colours.SolitudeBorder,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginHorizontal: 20,
  },
  socialView: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginVertical: 15,
  },

  loginWith: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
});
