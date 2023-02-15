import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import Store from '../redux/Store';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';
import Navigator from './Navigator';
import HomeScreen from '../screens/Home/HomeScreen';
import LoginScreen from '../screens/login/LoginScreen';
import AuthStack from './AuthStack';
import {setLoginUserId, setRoleID} from '../redux/slice/User';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {value} from 'deprecated-react-native-prop-types/DeprecatedTextInputPropTypes';
import NavigatorDoctor from './NavigatorDoctor';

const RootNavigation = () => {
  const dispatch = useDispatch();
  const LoginUserId = useSelector(state => state.user.loginUserId);
  const RoleID = useSelector(state => state.user.roleID);
  const [welcome, setWelcome] = useState(null);
  const [login, setLogin] = useState(null);
  // console.log('loginid', LoginUserId);
  console.log('>>roleid', typeof RoleID);

  // useEffect(() => {
  //   getData();
  // }, []);

  // const screen = async () => {
  //   setTimeout(() => {
  //     setWelcome(false);
  //   }, 3000);
  //   return () => {
  //     clearTimeout(screen);
  //   };
  // };

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

  const Stack = createNativeStackNavigator();
  return (
    <Provider store={Store}>
      <NavigationContainer independent={true}>
        {/* {loginloginID && <Navigator />}
        {!loginID && <AuthStack />} */}
        <Navigator />
      </NavigationContainer>
    </Provider>
  );
};
export default RootNavigation;

/* <NavigationContainer
independent={true}
ref={navRef}
onStateChange={state => {
  if (navRef.isReady()) {
    dispatch(setScreenName(navRef.getCurrentRoute()?.name));
    console.log('nav Ref', navRef.getCurrentRoute());
  }
}}>
{useSelector(state => state.user.user_id) ? (
  <Profileandothers />
) : (
  <AuthStack />
)}
</NavigationContainer>
); */

// return (
//     <Provider store={store}>
//       <NavigationContainer independent={true}>
//         {welcome ? (
//         <WelcomeScreen />) : (

//         )
//         }
//       </NavigationContainer>
//     </Provider>
//   );
// {LoginUserId && <Navigator />}
// {!LoginUserId && <AuthStack />}

// {login ? (
//   RoleID === '6' ? (
//      (<Navigator />))
//   ) : (
//     <NavigatorDoctor />
//   ))
// ) : (
//   <AuthStack />
// )}
