import React from 'react';
import {
  SafeAreaView,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import {colours, height, width, style} from '../../constants';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import BackArrow from '../../assets/image/BackArrow.png';

const HeaderComp = props => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <View style={styles.mainContainer}>
        <TouchableOpacity
          style={styles.backButtonView}
          onPress={() => {
            navigation.goBack();
          }}>
          <Image source={BackArrow} style={styles.backButton} />
          {/* <Feather name="arrow-left" size={25} color={colours.Black} /> */}
        </TouchableOpacity>
        <View style={styles.headerView}>
          <Text style={styles.header}>{props.Header}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default HeaderComp;

const styles = StyleSheet.create({
  backButton: {
    backgroundColor: colours.White,
    height: width * 0.048,
    width: width * 0.048,
    resizeMode: 'center',
  },
  backButtonView: {
    height: width * 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 2,
  },
  headerView: {
    height: width * 0.1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 22,
    color: colours.Black,
    lineHeight: 33,
    fontFamily: 'Urbanist-Bold',
    marginHorizontal: 15,
  },
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginTop: width * 0.04,
    backgroundColor: colours.White,
  },
});
