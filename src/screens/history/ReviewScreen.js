import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import {colours, style, height, width} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import HeaderComp from '../../components/common/HeaderComp';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FilterDoc1 from '../../assets/image/FilterDoc1.png';
import DoctorReview from '../../assets/image/DoctorReview.png';
import ButtonCommon from '../../components/button/ButtonCommon';
import {RadioButton} from 'react-native-paper';

const ReviewScreen = () => {
  const [radioValue, setRadioValue] = useState();
  const [defaultRating, setDefaultRating] = useState(0);
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
  const [review, setReview] = useState();
  console.log(defaultRating);

  const onCheckStatus = radioID => {
    console.log('>>radioID', radioID);
  };

  const RatingBar = () => {
    return (
      <View style={styles.starContainer}>
        {maxRating.map((item, key) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              key={item}
              onPress={() => {
                setDefaultRating(item);
              }}>
              {item <= defaultRating ? (
                <AntDesign
                  name="star"
                  size={20}
                  style={styles.starIcon}
                  color={colours.DarkBlue}
                />
              ) : (
                <AntDesign
                  name="staro"
                  size={20}
                  style={styles.starIcon}
                  color={colours.DarkBlue}
                />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <SafeAreaView style={style.mainContainer}>
      <View style={styles.headerContainer}>
        <HeaderComp Header="Write a review" />
      </View>
      <View style={styles.innerContainer}>
        <View>
          <View style={styles.imageContainer}>
            <View>
              <Image source={DoctorReview} style={styles.photo} />
            </View>

            <View>
              <Text style={{...style.header, marginVertical: width * 0.02}}>
                Dr.Tharani
              </Text>
            </View>
          </View>
          {/* <View style={{height: width * 0.05}} /> */}
          {/* <View style={styles.starContainer}>
            <AntDesign
              name="star"
              size={20}
              style={styles.starIcon}
              color={colours.DarkBlue}
            />
            <AntDesign
              name="star"
              size={17}
              style={styles.starIcon}
              color={colours.DarkBlue}
            />
            <AntDesign
              name="star"
              size={17}
              style={styles.starIcon}
              color={colours.DarkBlue}
            />
            <AntDesign
              name="staro"
              size={17}
              style={styles.starIcon}
              color={colours.DarkBlue}
            />
            <AntDesign
              name="staro"
              size={17}
              style={styles.starIcon}
              color={colours.DarkBlue}
            /> */}
          {/* </View> */}
          <RatingBar />

          <View style={styles.borderContainer} />

          {/* <---------------------------------------------------comment container---------------------------------------------------> */}
          <View>
            <View>
              <Text style={styles.paraHeader}>Write a comment</Text>
            </View>
            <View style={styles.searchBar}>
              <TextInput
                placeholder="Type your review"
                placeholderTextColor="#B5BBC0"
                style={styles.placeholderText}
                onChangeText={value => {
                  setReview(value);
                }}
                value={review}
                multiline={true}></TextInput>
            </View>
          </View>

          {/* <---------------------------------------------------comment container---------------------------------------------------> */}

          <View>
            <View>
              <Text style={styles.paraHeader}>
                Would you recommend Dr. Tharani{' '}
              </Text>
            </View>

            <RadioButton.Group
              value={radioValue}
              onValueChange={value => {
                onCheckStatus(value);
                setRadioValue(value);
              }}>
              <View style={styles.radioContainer}>
                <RadioButton
                  value="YES"
                  color={colours.DarkBlue}
                  uncheckedColor={colours.DarkBlue}
                  // onPress={() => {}}
                />
                <Text style={styles.radioText}>Yes</Text>

                <RadioButton
                  value="NO"
                  color={colours.DarkBlue}
                  uncheckedColor={colours.DarkBlue}
                  // onPress={() => {}}
                />
                <Text style={styles.radioText}>No</Text>
              </View>
            </RadioButton.Group>
          </View>
        </View>
        {/* <---------------------------------------------------Button container---------------------------------------------------> */}

        <ButtonCommon ButtonText="Submit Review" />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  borderContainer: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.12)',
  },

  headerContainer: {
    width: width * 0.9,
  },
  imageContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    padding: width * 0.05,
  },
  innerContainer: {
    height: height * 0.9,
    width: width * 0.9,
    justifyContent: 'space-between',
  },
  photo: {
    width: width * 0.3,
    height: width * 0.3,
    resizeMode: 'center',
    overflow: 'hidden',
    borderRadius: width * 0.15,
  },
  placeholderText: {
    fontSize: 14,
    fontFamily: 'Urbanist-SemiBold',
    marginLeft: 10,
    lineHeight: 21,
    width: width * 0.8,
  },
  paraHeader: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: 'urbanist-SemiBold',
    color: colours.Black,
    marginVertical: width * 0.03,
  },
  radioContainer: {
    flexDirection: 'row',

    alignItems: 'center',
    height: width * 0.1,
  },
  radioText: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: 'Urbanist-Bold',
    color: colours.DarkBlue,
  },
  starContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: width * 0.05,
  },
  starIcon: {
    marginHorizontal: width * 0.02,
  },
  searchBar: {
    paddingLeft: 0,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.13)',
    borderRadius: 50,
    color: colours.Black,
    marginVertical: 15,
    height: width * 0.4,
    borderRadius: 10,
  },
});

export default ReviewScreen;
