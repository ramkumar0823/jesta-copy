import React from 'react';
import {
  SafeAreaView,
  Text,
  FlatList,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import {colours, height, width, style} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import Tharani from '../../assets/image/Tharani.png';

const TopDoctor = props => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <TouchableOpacity style={styles.category} onPress={props.OnHandleSubmit}>
        <View style={styles.innerContainer}>
          <View>
            <Image
              source={{uri: props.Doctor}}
              style={{
                height: width * 0.35,
                width: width * 0.4,
                resizeMode: 'center',
              }}
            />
          </View>
          <View style={styles.nameContainer}>
            <View>
              <Text style={styles.subHeader} numberOfLines={2}>
                {props.DoctorName}
              </Text>
            </View>
            <View>
              <Text style={styles.specialistText}>{props.Specialisation}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default TopDoctor;

const styles = StyleSheet.create({
  category: {
    borderRadius: 20,
    backgroundColor: colours.White,
    height: width * 0.6,
    width: width * 0.4,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  nameContainer: {
    padding: 5,
    paddingTop: 5,
  },

  smallView: {
    height: width * 0.13,
    width: width * 0.13,
    borderRadius: 15,
    backgroundColor: colours.White,
  },
  specialistText: {
    fontSize: 13,
    color: colours.Black,
    lineHeight: 24,
    fontFamily: 'Urbanist-Medium',
    textAlign: 'center',
  },
  subHeader: {
    ...style.subHeader,
    textAlign: 'center',
    fontSize: 17,
  },

  specialists: {
    height: 50,
    width: 50,
    resizeMode: 'center',
  },
});
