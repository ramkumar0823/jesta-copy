import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Button,
  Image,
} from 'react-native';
import {colours, height, width, style} from '../../constants';
import ReviewImage from '../../assets/image/ReviewImage.png';
import AntDesign from 'react-native-vector-icons/AntDesign.js';
const Reviews = props => {
  return (
    <SafeAreaView>
      <View style={styles.viewPadding}>
        <View>
          <Text style={styles.subHeader}>Review</Text>
        </View>

        <View style={{flexDirection: 'row', marginVertical: width * 0.03}}>
          <View>
            <Image source={ReviewImage} style={styles.reviewImage} />
          </View>
          <View style={styles.reviewContainer}>
            <Text style={styles.reviewHeader}>{props.Name}</Text>
            <View style={styles.ratingContainer}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <AntDesign name="star" size={18} color="#FFB543" />
                <AntDesign name="star" size={18} color="#FFB543" />
                <AntDesign name="star" size={18} color="#FFB543" />
                <Text
                  style={{
                    ...styles.reviewHeader,
                    width: width * 0.15,
                    fontSize: 14,
                  }}>
                  {' '}
                  {props.Rating}
                </Text>
              </View>
              <Text style={styles.dayText} numberOfLines={2}>
                {props.Days} day ago
              </Text>
            </View>
          </View>
        </View>

        <View>
          <Text style={StyleSheet.ReviewText}> {props.Review}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#292D321F',
    width: width * 0.35,
    borderRadius: 30,
    padding: 11,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 2,
    right: 2,
  },

  dayText: {
    ...style.paragraphText,
    textAlign: 'right',
    width: width * 0.3,
    marginRight: 4,
  },

  headerView: {
    marginVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: width * 0.14,
  },
  header: {
    ...style.header,
    flex: 1,
    textAlign: 'center',
    marginRight: width * 0.12,
  },

  reviewImage: {
    height: width * 0.15,
    width: width * 0.15,
    resizeMode: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',

    width: width * 0.75,
    justifyContent: 'space-between',
    paddingRight: 4,
  },
  reviewContainer: {
    flex: 1,
    paddingLeft: 4,
    paddingRight: 4,
  },
  reviewText: {
    fontSize: 11,
    lineHeight: 17,
    fontFamily: 'Urbanist-Medium',
    color: '#55697B',
  },
  reviewHeader: {
    fontSize: 16,
    lineHeight: 25,
    width: width * 0.49,
    color: colours.Black,
    fontFamily: 'Urbanist-Bold',
  },
  subHeader: {
    fontSize: 18,
    color: colours.Black,
    lineHeight: 24,
    fontFamily: 'Urbanist-Bold',
    marginBottom: 10,
  },

  viewPadding: {
    marginVertical: 10,
    marginBottom: width * 0.05,
  },
});
export default Reviews;
