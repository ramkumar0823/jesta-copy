import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {
  FirebaseMessagingTypes,
  messaging,
} from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import Store from '../redux/Store';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomModal from '../components/common/BottomModal';
import ChatScreen from '../screens/appointment/ChatScreen';
import ChatHistory from '../screens/history/ChatHistory';
import ConsultingScreen from '../screens/appointment/ConsultingScreen';
import SpecialistsDoctors from '../screens/Home/SpecialistsDoctors';
import CategoryDoctorsScreen from '../screens/Home/CategoryDoctorsScreen';
import DoctorProfile from '../screens/appointment/DoctorProfile';
import EditProfile from '../screens/profiles/EditProfile';
import FavouriteDoctor from '../screens/Home/FavouriteDoctor';
import ForgotScreen from '../screens/login/ForgotScreen';
import HomeScreen from '../screens/Home/HomeScreen';
import HeaderComp from '../components/common/HeaderComp';
import HospitalsList from '../screens/Home/HospitalsList';
import HospitalProfile from '../screens/profiles/HospitalProfile';
import InviteScreen from '../screens/profiles/InviteScreen';
import LifeStyle from '../screens/profiles/LifeStyle';
import WelcomeScreen from '../screens/welcome/WelcomeScreen';

import MedicalHistory from '../screens/profiles/MedicalHistory';
import MyAppointments from '../screens/appointment/MyAppointments';
import NotificationsScreen from '../screens/Home/NotificationScreen';
import PersonalInfo from '../screens/profiles/PersonalInfo';
import PatientDetails from '../screens/appointment/PatientDetails';
import PatientInformation from '../screens/appointment/PatientInformation';
import PrescriptionScreen from '../screens/history/PrescriptionScreen';
import Reschedule from '../screens/Home/Reschedule';
import RescheduleAppointment from '../screens/Home/RescheduleAppointment';
import SpecialistsScreen from '../screens/Home/SpecialistsScreen';
import SearchScreen from '../screens/Home/SearchScreen';
import SymptomsScreen from '../screens/Home/SymptomsScreen';
import TopDoctorsScreen from '../screens/Home/TopDoctorsScreen';
import TopDoctor from '../components/homescreen/TopDoctor';
import AppointmentDoctorList from '../components/appointments/AppointmentDoctorList';
import BottomTabNavigator from './BottomTabNavigator';
import CallInformation from '../screens/appointment/CallInformation';
import VideoCall from '../screens/appointment/VideoCall';
import VideoCallScreen from '../screens/appointment/VideoCallScreen';
import VoiceCallHistory from '../screens/history/VoiceCallHistory';
import CallEndScreen from '../screens/appointment/CallEndScreen';
import ReviewScreen from '../screens/history/ReviewScreen';

import DateButton from '../components/button/DateButton';

import HomeScreen1 from '../screens/HomeScreen1';
import HomeScreen2 from '../screens/HomeScreen2';
import LoginScreen from '../screens/login/LoginScreen';

const Navigator = () => {
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
            options={{headerShown: false}}
            name="BottomTabNavigator"
            component={BottomTabNavigator}
          />
          <Stack.Screen name="SearchScreen" component={SearchScreen} />
          <Stack.Screen
            name="SpecialistsDoctors"
            component={SpecialistsDoctors}
          />
          <Stack.Screen
            name="SpecialistsScreen"
            component={SpecialistsScreen}
          />
          <Stack.Screen name="HospitalsList" component={HospitalsList} />
          <Stack.Screen name="FavouriteDoctor" component={FavouriteDoctor} />
          <Stack.Screen name="SymptomsScreen" component={SymptomsScreen} />
          <Stack.Screen name="TopDoctorsScreen" component={TopDoctorsScreen} />
          <Stack.Screen
            name="CategoryDoctorsScreen"
            component={CategoryDoctorsScreen}
          />
          <Stack.Screen
            name="NotificationsScreen"
            component={NotificationsScreen}
          />
          <Stack.Screen name="Reschedule" component={Reschedule} />
          <Stack.Screen
            name="RescheduleAppointment"
            component={RescheduleAppointment}
          />
          <Stack.Screen name="HospitalProfile" component={HospitalProfile} />
          <Stack.Screen name="DoctorProfile" component={DoctorProfile} />
          <Stack.Screen name="ConsultingScreen" component={ConsultingScreen} />
          <Stack.Screen name="PatientDetails" component={PatientDetails} />
          <Stack.Screen
            name="PatientInformation"
            component={PatientInformation}
          />

          <Stack.Screen name="DateButton" component={DateButton} />

          <Stack.Screen name="BottomModal" component={BottomModal} />

          <Stack.Screen name="TopDoctor" component={TopDoctor} />

          <Stack.Screen name="MyAppointments" component={MyAppointments} />
          <Stack.Screen
            name="AppointmentDoctorList"
            component={AppointmentDoctorList}
          />
          <Stack.Screen name="CallInformation" component={CallInformation} />
          <Stack.Screen name="VideoCall" component={VideoCall} />
          <Stack.Screen name="VideoCallScreen" component={VideoCallScreen} />
          <Stack.Screen name="ChatScreen" component={ChatScreen} />
          <Stack.Screen name="ChatHistory" component={ChatHistory} />
          <Stack.Screen name="CallEndScreen" component={CallEndScreen} />
          <Stack.Screen name="VoiceCallHistory" component={VoiceCallHistory} />
          <Stack.Screen
            name="PrescriptionScreen"
            component={PrescriptionScreen}
          />
          <Stack.Screen name="InviteScreen" component={InviteScreen} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
          <Stack.Screen name="PersonalInfo" component={PersonalInfo} />
          <Stack.Screen name="MedicalHistory" component={MedicalHistory} />
          <Stack.Screen name="LifeStyle" component={LifeStyle} />
          <Stack.Screen name="ReviewScreen" component={ReviewScreen} />

          <Stack.Screen name="HomeScreen1" component={HomeScreen1} />
          <Stack.Screen name="HomeScreen2" component={HomeScreen2} />
          <Stack.Screen name="HeaderComp" component={HeaderComp} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
        </Stack.Navigator>
        {/* ) */}
        {/* }  */}
      </NavigationContainer>
    </Provider>
  );
};
export default Navigator;
