import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {colours, style} from '../../constants';
import {useDispatch, useSelector} from 'react-redux';
import {setLoginUserId, setRoleID} from '../../redux/slice/User';
import Splash from '../../assets/image/JestaSplash.png';
import AsyncStorage from '@react-native-async-storage/async-storage';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const SplashScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const LoginUserId = useSelector(state => state.user.loginUserId);
  const RoleID = useSelector(state => state.user.roleID);

  // useEffect(() => {
  //   getData();
  // });

  // let getData = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem('@store');
  //     dispatch(setLoginUserId(value));
  //     const role = await AsyncStorage.getItem('@role');
  //     dispatch(setRoleID(role));
  //     if (value !== null) {
  //       setLogin(true);
  //     }

  //     console.log('value', value);
  //   } catch (e) {
  //     alert(e);
  //   }
  // };
  setTimeout(() => {
    //Check if user_id is set or not
    //If not then send for Authentication
    //else send to Home Screen
    AsyncStorage.getItem('@store').then(value => {
      if (value === null) {
        navigation.navigate('AuthStack');
      } else {
        AsyncStorage.getItem('@role').then(res => {
          if (res === '6') {
            navigation.navigate('Navigator');
          } else {
            navigation.navigate('NavigatorDoctor');
          }
          dispatch(setRoleID(res));
        });
      }
      dispatch(setLoginUserId(value));
    });
  }, 2000);

  return (
    <SafeAreaView style={style.mainContainer}>
      <View>
        <Image source={Splash} />
      </View>
    </SafeAreaView>
  );
};
export default SplashScreen;

const styles = StyleSheet.create({});
