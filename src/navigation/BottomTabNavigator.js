import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import HomeScreen from '../screens/Home/HomeScreen';
import HistoryScreen from '../screens/history/HistoryScreen';
import MyAppointment from '../screens/appointment/MyAppointments';
import PatientProfile from '../screens/profiles/PatientProfile';
import ReviewScreen from '../screens/history/ReviewScreen';

import Cart from 'react-native-vector-icons/AntDesign';
import ChatHistory from '../screens/history/ChatHistory';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="home" color={color} size={22} />
          ),
        }}
      />
      <Tab.Screen
        name="MyAppointment"
        component={MyAppointment}
        // component={ReviewScreen}
        options={{
          tabBarLabel: 'Appointments',
          tabBarIcon: ({color, size}) => (
            <Cart name="profile" color={color} size={20} />
          ),
        }}
      />

      <Tab.Screen
        name="HistoryScreen"
        component={HistoryScreen}
        options={{
          tabBarLabel: 'History',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="history" size={23} color={color} />
            // <MaterialCommunityIcons
            //   name="crop-square"
            //   color={color}
            //   size={21}
            // />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={PatientProfile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size}) => (
            <SimpleLineIcons name="user" color={color} size={20} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({});
