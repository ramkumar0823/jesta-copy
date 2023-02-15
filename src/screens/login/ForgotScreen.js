import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Dimensions,
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
  Image,
} from 'react-native';
import {colours, style, height, width, FORGOT_URL, SALT} from '../../constants';
import {BackButton} from '../../components/button/BackButton';
import {setMobNumber} from '../../redux/slice/User';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Lock from '../../assets/image/Lock.png';
import {useNavigation} from '@react-navigation/native';
import PassChangedScreen from './PassChangedScreen';
import {useDispatch} from 'react-redux';
import md5 from 'md5';
import axios from 'axios';
import LoaderModal from '../../components/common/LoaderModal';

const ForgotScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const numberRegex = /^[6789]\d{9}$/;
  const [number, setNumber] = useState('');

  const SendCode = () => {
    setLoading(true);
    console.log('number', number, SALT);
    if (number === '' || number === null) {
      alert('please enter mobile number');
      setLoading(false);
    } else if (number.match(numberRegex)) {
      const auth_token = md5(SALT + number);

      const data = {
        mobile_number: number,
        auth_token: auth_token,
      };

      console.log(' fixed data1 is', data);
      axios
        .post(FORGOT_URL, data)
        .then(Response => {
          if (Response.data.success) {
            console.log('forgot done', Response.data);
            dispatch(setMobNumber(Response.data));
            setNumber('');
            setLoading(false);
            navigation.navigate('OTPScreen');
          } else {
            setLoading(false);
            alert(Response.data.message);
            console.log('message', Response.data.message);
            setNumber('');
          }
        })
        .catch(err => {
          console.log('>>>', err);
          setLoading(false);
        });
    } else {
      alert('Please enter valid mobile number');
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={style.mainContainer}>
      <View>
        <View style={styles.backButton}>
          <BackButton />
        </View>
        <View
          style={{
            ...style.innerContainer,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View>
            <View>
              <Image source={Lock} resizeMode="center" style={styles.lock} />
            </View>
            <View>
              <Text style={{...style.loginWelcome, textAlign: 'center'}}>
                Forgot password ?
              </Text>
            </View>

            <View>
              <Text style={style.forgotText2}>
                Don't worry! It occurs. Please enter the mobile number linked
                with your account.
              </Text>
            </View>
            <View style={{...style.username, marginVertical: 45}}>
              <TextInput
                style={{...style.placeholderText, color: colours.Black}}
                maxLength={10}
                placeholder="Enter mobile number"
                //   placeholderStyle={{...styles.forgotText2,color:'black'}}
                onChangeText={value => {
                  setNumber(value);
                }}
                value={number}
                placeholderTextColor={colours.LightGrey}
                keyboardType={
                  Platform.OS === 'ios'
                    ? 'numbers-and-punctuation'
                    : 'number-pad'
                }></TextInput>
            </View>

            <TouchableOpacity
              style={{...style.button, borderRadius: 8, marginTop: width * 0.1}}
              onPress={value => {
                SendCode();

                // navigation.navigate('OTPScreen')
              }}>
              <Text style={style.buttonText}>Send Code</Text>
            </TouchableOpacity>
          </View>
        </View>
        <LoaderModal Load={loading} />
      </View>
    </SafeAreaView>
  );
};
export default ForgotScreen;

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
});
