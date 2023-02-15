import React, {useState} from 'react';
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
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import Apollo from '../../assets/image/Apollo.png';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {createEntityAdapter} from '@reduxjs/toolkit';
import FilterDoc1 from '../../assets/image/FilterDoc1.png';
import Line from '../../assets/image/Line2.png';

const Searchfilter = props => {
  const navigation = useNavigation();
  const [heartModel, setHeartModel] = useState();
  // const [heart,setHeart] = useState(props.Heart)
  return (
    <SafeAreaView>
      <TouchableOpacity style={styles.category} onPress={props.OnHandleSubmit}>
        {/* <Image source={props.Hospital} style={styles.categoryImage} />
        <View style={style.textView}>
        <View><Text style={styles.loginWelcome}>{props.title}</Text></View>
              </View> */}
        <View style={styles.innerContainer}>
          {/* <Image source={props.Photo} style={styles.categoryImage} /> */}
          <Image source={{uri: props.Photo}} style={styles.categoryImage} />

          <View>
            <View style={styles.upContainer}>
              <Text style={styles.loginWelcome}>{props.Name}</Text>
              <TouchableOpacity onPress={props.onLikePress}>
                {props.HeartLiked ? (
                  <AntDesign name="heart" size={25} color={colours.DarkBlue} />
                ) : (
                  <AntDesign name="hearto" size={25} color={colours.DarkBlue} />
                )}
              </TouchableOpacity>
            </View>
            <View>
              <Image source={Line} style={styles.lineImage} />
            </View>
            <View style={styles.specialistView}>
              <View style={styles.specialistView2}>
                <Text style={styles.specialistText}>{props.Specialist}</Text>
              </View>
              <Text style={styles.lineText}>|</Text>
              <View style={styles.specialistView2}>
                <Text style={styles.specialistText}>{props.Hospital}</Text>
              </View>
            </View>
            <View style={styles.ratingContainer}>
              <AntDesign name="star" size={20} color="#FFB543" />
              <Text style={styles.registerText}>{props.Reviews}</Text>
              <Text style={styles.registerText}>
                {' '}
                ({props.TotalReviews} reviews)
              </Text>
            </View>
          </View>

          <View></View>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default Searchfilter;

const styles = StyleSheet.create({
  //   categoryOut: {
  //     width: width * 0.2,
  //     borderWidth: 0,
  //     marginHorizontal: 10,
  //     marginVertical: 10,

  //   },

  category: {
    borderWidth: 2,
    borderColor: '#FCFBFB',
    borderRadius: 20,
    backgroundColor: colours.White,
    height: width * 0.3,
    width: width * 0.9,
    marginHorizontal: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
    marginVertical: 5,
    padding: 3,
    alignSelf: 'center',
  },

  categoryImage: {
    height: width * 0.28,
    width: width * 0.28,
    resizeMode: 'center',
  },
  innerContainer: {
    flexDirection: 'row',
  },
  loginWelcome: {
    fontFamily: 'Urbanist-Bold',
    fontSize: 17,
    color: colours.Black,
    width: width * 0.45,
    lineHeight: 20,
  },

  lineImage: {
    height: width * 0.01,
    width: width * 0.55,
    margin: 3,
    alignSelf: 'center',
    resizeMode: 'center',
    tintColor: colours.SolitudeBorder,
  },
  locationView: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  lineText: {
    fontSize: 22,
    color: colours.Chargoal,
    margin: 2,
  },
  registerText: {
    fontFamily: 'Urbanist-Medium',
    color: colours.EbonyClay,
    fontSize: 16,
    color: colours.Chargoal,
  },
  ratingContainer: {
    flexDirection: 'row',
    padding: 4,
    width: width * 0.57,
  },
  specialistText: {
    fontFamily: 'Urbanist-Medium',
    fontSize: 13,
    color: '#333333',
    // width: width * 0.27,
  },
  specialistView: {
    paddingLeft: 2,
    paddingright: 2,
    flexDirection: 'row',
    width: width * 0.57,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  specialistView2: {
    maxWidth: width * 0.27,
  },

  textView: {
    flex: 1,
    alignItems: 'center',
  },
  upContainer: {
    paddingLeft: 5,
    paddingRight: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    width: width * 0.57,

    // height:width*0.18
  },
});
