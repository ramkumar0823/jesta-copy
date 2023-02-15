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
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';

const Categories = props => {
  const navigation = useNavigation();
  // console.log('propsis', props)
  return (
    <SafeAreaView>
      <View style={props.OutStyle}>
        <TouchableOpacity style={props.Styles} onPress={props.onHandlePress}>
          <Image
            source={{uri: props.categoryPhoto}}
            // source={props.categoryPhoto}
            style={props.ImageStyles}
          />
        </TouchableOpacity>
        <View>
          <Text style={styles.categoryText}>{props.title}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Categories;

const styles = StyleSheet.create({
  categoryOut: {
    width: width * 0.15,
    borderWidth: 0,
    marginHorizontal: 15,
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  category: {
    borderWidth: 2,
    borderRadius: 20,
    backgroundColor: colours.White,
    borderColor: colours.AliceBlue,
    padding: 10,
    height: width * 0.2,
    width: width * 0.2,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  categoryText: {
    textAlign: 'center',
    marginVertical: 10,
    fontFamily: 'Urbanist-SemiBold',
    color: '#7D8BB7',
    fontSize: 12,
  },
  categoryImage: {
    height: 100,
    width: 100,
    resizeMode: 'center',
  },
});
