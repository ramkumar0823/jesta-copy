import React, {useState, useEffect} from 'react';
import Store from '../redux/Store';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ForgotScreen from '../screens/login/ForgotScreen';
import LoginScreen from '../screens/login/LoginScreen';
import OTPScreen from '../screens/login/OTPScreen';
import Onboarding from '../screens/welcome/Onboarding';
import PassChangedScreen from '../screens/login/PassChangedScreen';
import RegisterScreen from '../screens/login/RegisterScreen';
import ResetPassScreen from '../screens/login/ResetPassScreen';
import CallEnd from '../components/appointments/CallEnd';
import DoctorProfileCall from '../components/appointments/DoctorProfileCall';
import Navigator from './Navigator';

const AuthStack = () => {
  const [welcome, setWelcome] = useState(true);

  useEffect(() => {
    screen();
  }, []);
  const screen = () => {
    setTimeout(() => {
      setWelcome(false);
    }, 3000);
    return () => {
      clearTimeout(screen);
    };
  };

  const Stack = createNativeStackNavigator();
  return (
    <Provider store={Store}>
      <NavigationContainer independent={true}>
        {/* {welcome ? ( 
        <WelcomeScreen />) : ( */}
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="CallEnd" component={CallEnd} />
          <Stack.Screen name="Onboarding" component={Onboarding} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="ForgotScreen" component={ForgotScreen} />
          <Stack.Screen name="OTPScreen" component={OTPScreen} />
          <Stack.Screen name="ResetPassScreen" component={ResetPassScreen} />
          <Stack.Screen
            name="DoctorProfileCall"
            component={DoctorProfileCall}
          />
          <Stack.Screen
            name="PassChangedScreen"
            component={PassChangedScreen}
          />
          <Stack.Screen name="Navigator" component={Navigator} />
        </Stack.Navigator>
        {/* ) */}
        {/* }  */}
      </NavigationContainer>
    </Provider>
  );
};
export default AuthStack;
