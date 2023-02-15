import React, {useState, useEffect} from 'react';
import Store from '../redux/Store';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DoctorAppointments from '../screens/doctorlogin/DoctorAppointments';
import AppointmentCard from '../components/doctorflow/AppointmentCard';
import LoginScreen from '../screens/login/LoginScreen';
import HomeScreen1 from '../screens/HomeScreen1';
import HomeScreen2 from '../screens/HomeScreen2';

const NavigatorDoctor = () => {
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
          <Stack.Screen
            name="DoctorAppointments"
            component={DoctorAppointments}
          />
          <Stack.Screen name="AppointmentCard" component={AppointmentCard} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="HomeScreen1" component={HomeScreen1} />
          <Stack.Screen name="HomeScreen2" component={HomeScreen2} />
        </Stack.Navigator>
        {/* ) */}
        {/* }  */}
      </NavigationContainer>
    </Provider>
  );
};
export default NavigatorDoctor;
