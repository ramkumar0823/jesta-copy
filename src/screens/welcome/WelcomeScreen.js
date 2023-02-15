import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {colours,style} from '../../constants';
import GroupDoctors from '../../assets/image/Groupdocs.png';
import WavingHand from '../../assets/image/WavingHand.png';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const WelcomeScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={style.mainContainer}>
      <View style={styles.doctorImage}>
        <Image
          style={styles.docsImage}
          resizeMode="contain"
          source={GroupDoctors}
        />
      </View>
      <View style={styles.welcome}>
        <Text style={styles.welcomeText}>
          Welcome to Jesta!   
          <Image resizeMode="contain" source={WavingHand} />
        </Text>

        <Text style={styles.welcomeText2}>
          The best online doctor appointment & consultation app of the century
          for your health and medical needs!
        </Text>
        {/* <TouchableOpacity onPress={()=>{navigation.navigate('BottomTabNavigator')}} ><Text>click</Text></TouchableOpacity> */}
      </View>
    </SafeAreaView>
  );
};
export default WelcomeScreen;

const styles = StyleSheet.create({
 
  welcome: {
    height: height * 0.25,
    width: width * 0.8,
    justifyContent: 'space-around',
    marginTop: 30,
  },
  welcomeText: {
    color: colours.DarkBlue,
    fontWeight: '700',
    fontSize: 40,
    textAlign: 'center',
    
  },
  welcomeText2: {
    color: colours.Black,
    fontSize: 17,
    textAlign: 'center',
    paddingLeft: 5,
    paddingRight: 5,
  },
  doctorImage: {
    height: height * 0.5,
    width: width * 0.8,
  },
  docsImage: {
    flex: 1,
    alignSelf: 'center',
  },
});
