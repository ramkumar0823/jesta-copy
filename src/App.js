import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, StatusBar, LogBox} from 'react-native';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from './screens/welcome/SplashScreen';
import WelcomeScreen from './screens/welcome/WelcomeScreen';
import Store from './redux/Store';
import {colours} from './constants';
import {setLoginUserId} from './redux/slice/User';
import AuthStack from './navigation/AuthStack';
import RootNavigation from './navigation/RootNavigation';
import Navigator from './navigation/Navigator';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import NavigatorDoctor from './navigation/NavigatorDoctor';

const App = () => {
  const [splashScreen, setSplashScreen] = useState(true);

  LogBox.ignoreAllLogs();

  useEffect(() => {
    screen();
    // getData();
  }, []);
  const screen = () => {
    setTimeout(() => {
      setSplashScreen(false);
    }, 3000);
    return () => {
      clearTimeout(screen);
    };
  };

  const Stack = createNativeStackNavigator();

  return (
    <Provider store={Store}>
      <StatusBar backgroundColor={colours.White} barStyle={'dark-content'} />
      <NavigationContainer>
        <Stack.Navigator initialRouteName={'SplashScreen'} independent={true}>
          {/* SplashScreen which will come once for 2 Seconds */}
          <Stack.Screen
            name={'SplashScreen'}
            component={SplashScreen}
            // Hiding header for Splash Screen
            options={{headerShown: false}}
          />
          {/* Auth Navigator: Include Welcome, Login and Signup */}
          <Stack.Screen
            name={'AuthStack'}
            component={AuthStack}
            options={{headerShown: false}}
          />
          {/* Homepage as a landing page */}
          <Stack.Screen
            name={'BottomTabNavigator'}
            component={BottomTabNavigator}
            options={{headerShown: false}}
          />
          {/* Menu Screen contions Menu options */}
          <Stack.Screen
            name="Navigator"
            component={Navigator}
            options={{headerShown: false}}
          />
          {/* Edit Profile Screen */}
          <Stack.Screen
            name="RootNavigation"
            component={RootNavigation}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={'NavigatorDoctor'}
            component={NavigatorDoctor}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;

const styls = StyleSheet.create({});

// const App = () => {
//   const [splashScreen, setSplashScreen] = useState(true);

//   LogBox.ignoreAllLogs();

//   useEffect(() => {
//     screen();
//     // getData();
//   }, []);
//   const screen = () => {
//     setTimeout(() => {
//       setSplashScreen(false);
//     }, 3000);
//     return () => {
//       clearTimeout(screen);
//     };
//   };

//   return (
//     <Provider store={Store}>
//       <StatusBar backgroundColor={colours.White} barStyle={'dark-content'} />
//       <NavigationContainer independent={true}>
//         {splashScreen ? (
//           <SplashScreen />
//         ) : (
//           // <Navigator />
//           <RootNavigation />
//         )}
//       </NavigationContainer>
//     </Provider>
//   );
// };
