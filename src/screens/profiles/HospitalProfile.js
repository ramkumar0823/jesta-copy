import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Linking,
  Platform,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colours, style, height, width} from '../../constants';
import {
  SALT,
  ALL_DETAILS_URL,
  HOSPITAL_PROFILE,
} from '../../httpsclient/APIConstants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useIsFocused} from '@react-navigation/native';
import {BlueBackButton} from '../../components/button/BackButton';
import WebView from 'react-native-webview';
import {AnimationType, LatLng, LeafletView} from 'react-native-leaflet-view';
import Foundation from 'react-native-vector-icons/Foundation';
import Location from '../../assets/image/Location.png';
import Apollo from '../../assets/image/Apollo.png';
import ReviewImage from '../../assets/image/ReviewImage.png';
import Cardiology from '../../assets/image/Cardiology.png';
import CategoryArray from '../../assets/flatlistarray/CategoryArray';
import Categories from '../../components/homescreen/Categories';
import {useDispatch, useSelector} from 'react-redux';
import md5 from 'md5';
import {POST_API} from '../../httpsclient/POST';
import LoaderModal from '../../components/common/LoaderModal';
import Reviews from '../../components/common/Reviews';

const HospitalProfile = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const locationID = useSelector(state => state.user.location);
  const userID = useSelector(state => state.user.loginUserId);
  const hospitalID = useRoute().params.data;
  const [categories, setCategories] = useState();
  const [loading, setLoading] = useState(false);
  const [hosptalDetail, setHospitalDetail] = useState();
  const [review, setReview] = useState();
  const [categories2, setCategories2] = useState();
  console.log('>>>>>>', hosptalDetail);
  console.log('<<<', categories2);
  const OpenMap = () => {
    var scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:';
    var url =
      scheme +
      `${hosptalDetail?.Hospital_details.latitude},${hosptalDetail?.Hospital_details.longitude}`;
    // var url = scheme + `${10.984382},${76.93783}`;
    Linking.openURL(url);
  };
  hosptalDetail?.Hospital_details.latitude;
  useEffect(() => {
    allDetails();
    onHospitalProfile();
  }, []);

  const allDetails = async () => {
    setLoading(true);
    const auth_token = md5(SALT + userID);
    const endpoint = ALL_DETAILS_URL;
    const data = {
      user_id: userID,
      auth_token: auth_token,
    };
    console.log('specialistall', data);
    await POST_API(endpoint, data)
      .then(Response => {
        if (Response.data.success) {
          console.log('alldetails', Response.data.parameters.categories);
          setCategories(Response.data.parameters.categories);
          setLoading(false);
        } else {
          setLoading(false);
          alert(Response.data.message);
        }
      })
      .catch(err => {
        alert('alldeterror', err);
        console.log('alldeterror', err);
        setLoading(false);
      });
  };

  const onHospitalProfile = async () => {
    setLoading(true);
    const auth_token = md5(SALT + userID);
    const endpoint = HOSPITAL_PROFILE;
    const data = {
      user_id: userID,
      hospital_id: hospitalID,
      auth_token: auth_token,
    };
    console.log('hospitalinput', data);
    await POST_API(endpoint, data)
      .then(Response => {
        if (Response.data.success) {
          console.log('HospitalOutput3', Response.data.parameters);
          setHospitalDetail(Response.data.parameters);
          setReview(Response.data.parameters.patient_review);
          setCategories2(Response.data.parameters.Categories_in_hospital);
          setLoading(false);
        } else {
          setLoading(false);
          alert(Response.data.message);
        }
      })
      .catch(err => {
        alert('alldeterror', err);
        console.log('alldeterror', err);
        setLoading(false);
      });
  };

  return (
    <SafeAreaView style={style.mainContainer}>
      <LoaderModal Load={loading} />
      <ScrollView
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}>
        <View style={{width: width * 0.9}}>
          {/* <----------------------------------------------------header----------------------------------------------------------> */}
          <View style={styles.headerView}>
            <BlueBackButton />
            <Text style={styles.header}>Hospital Detail</Text>
          </View>
          {/* <----------------------------------------------------Profil Pic----------------------------------------------------------> */}

          <View style={styles.viewPadding}>
            <View style={{flexDirection: 'row'}}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity style={styles.category}>
                  {hosptalDetail ? (
                    <Image
                      source={{
                        uri: hosptalDetail.Hospital_details.hospital_image,
                      }}
                      style={styles.hospitalImage}
                    />
                  ) : null}
                  {/* <Image source={Apollo} style={styles.hospitalImage} /> */}
                </TouchableOpacity>
              </View>

              <View style={styles.detailContainer}>
                {hosptalDetail ? (
                  <Text
                    style={{...styles.subHeader, width: width * 0.49}}
                    numberOfLines={2}>
                    {/* Apollo Hospital */}{' '}
                    {hosptalDetail.Hospital_details.hospital_name}
                  </Text>
                ) : null}
                {hosptalDetail ? (
                  <Text style={styles.generalText} numberOfLines={2}>
                    {/* General Hospital */}{' '}
                    {hosptalDetail.Hospital_details.hospital_type}
                  </Text>
                ) : null}
                {/* <----------------------------------------Location------------------------------------------------------------------> */}

                <View>
                  <View style={{flexDirection: 'row'}}>
                    <MaterialIcons
                      name="location-on"
                      size={20}
                      style={styles.imageStyle}
                    />
                    {hosptalDetail ? (
                      <Text style={styles.locationText} numberOfLines={2}>
                        {/* {' '}
                      Coimbatore{' '} */}
                        {hosptalDetail.Hospital_details.cityname}
                      </Text>
                    ) : null}
                  </View>
                </View>

                <Text style={styles.servicesText}>Services</Text>

                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity style={style.blueBackground}>
                    <Foundation
                      name="telephone"
                      size={20}
                      color={colours.DarkBlue}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{...style.blueBackground, marginHorizontal: 10}}>
                    <AntDesign
                      name="message1"
                      size={20}
                      color={colours.DarkBlue}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          {/* <--------------------------------------------------Patients container----------------------------------------------------------> */}

          <View style={styles.patientsContainer}>
            <View style={styles.experianceView}>
              <Text style={styles.experianceText}>Patients</Text>
              {hosptalDetail ? (
                <Text style={styles.experianceText2}>
                  {/* 700+ */}
                  {hosptalDetail.Hospital_details.total_patients}
                </Text>
              ) : null}
            </View>

            <View style={styles.borderView} />

            <View style={styles.experianceView}>
              <Text style={styles.experianceText}>Experiance </Text>
              {hosptalDetail ? (
                <Text style={styles.experianceText2}>
                  {' '}
                  {hosptalDetail.Hospital_details.total_experience}
                </Text>
              ) : null}
            </View>

            <View style={styles.borderView} />

            <View style={styles.experianceView}>
              <Text style={styles.experianceText}>Rate</Text>
              <View style={{flexDirection: 'row'}}>
                {hosptalDetail ? (
                  <Text style={styles.ratingText}>
                    {' '}
                    {hosptalDetail.Hospital_details.average_rating}
                  </Text>
                ) : null}
                <Text style={{...styles.ratingText, color: '#9CA4AB'}}>/5</Text>
              </View>
            </View>
          </View>

          {/* <--------------------------------------------------Description----------------------------------------------------------> */}

          <View>
            <View style={styles.viewVertical}>
              <Text style={styles.subHeader}>Description</Text>
            </View>
            <View>
              {hosptalDetail ? (
                <Text style={style.paragraphText}>
                  {hosptalDetail.Hospital_details.description}
                </Text>
              ) : null}
            </View>
          </View>

          {/* <--------------------------------------------------Location----------------------------------------------------------> */}

          <View style={{marginVertical: width * 0.05}}>
            <View style={styles.viewVertical}>
              <Text style={styles.subHeader}>Location</Text>
            </View>
            <View style={{height: width * 0.5}}>
              <LeafletView
                nestedScrollEnabled={true}
                // mapCenterPosition={{lat: 10.984382, lng: 76.93783}}
                mapCenterPosition={{
                  lat: hosptalDetail?.Hospital_details.latitude,
                  lng: hosptalDetail?.Hospital_details.longitude,
                  // lat: 11.0004,
                  // lng: 76.9715,
                }}
                // mapCenterPosition={
                //   hosptalDetail.Hospital_details.total_experience
                // }
                mapMarkers={[
                  {
                    icon: '📍',
                    animation: {type: AnimationType.JUMP},
                    height: 50,
                    width: 50,
                    position: {
                      lat: hosptalDetail
                        ? hosptalDetail.Hospital_details.latitude
                        : null,
                      lng: hosptalDetail
                        ? hosptalDetail.Hospital_details.longitude
                        : null,
                      // lat: 11.0004,
                      // lng: 76.9715,
                    },
                    // position: {lat: 10.984382, lng: 76.93783}
                  },
                ]}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  OpenMap();
                }}>
                <Text style={{...style.buttonText, color: colours.Black}}>
                  Open Map
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* <-----------------------------------------------Category ----------------------------------------------------------> */}

          <View>
            <View style={styles.categoryContainer}>
              <View style={{marginVertical: width * 0.04}}>
                <Text style={styles.subHeader}>Specialist Services</Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('SpecialistDoctorScreen');
                }}>
                <Text style={styles.categoryText}>See all</Text>
              </TouchableOpacity>
            </View>
            <ScrollView horizontal={true} style={{width: width * 0.9}}>
              <SafeAreaView>
                {/* <View style={{width: width * 0.9, height: width * 0.5}}> */}
                <View style={{width: width * 0.9}}>
                  <FlatList
                    numColumns={5}
                    nestedScrollEnabled={false}
                    // data={CategoryArray}
                    // renderItem={({item}) => (
                    //   <Categories
                    //     categoryPhoto={Cardiology}
                    //     Styles={styles.categorySpecialist}
                    //     OutStyle={styles.categoryOut}
                    //     ImageStyles={styles.imageStyle2}
                    //     title={item.title}
                    //   />
                    data={categories2}
                    renderItem={({item}) => (
                      <Categories
                        categoryPhoto={item.category_image}
                        title={item.category_name}
                        Styles={styles.categorySpecialist}
                        OutStyle={styles.categoryOut}
                        ImageStyles={styles.imageStyle2}
                        onHandlePress={() => {
                          navigation.navigate('CategoryDoctorsScreen', {
                            categoryData: item.category_id,
                          });
                        }}
                      />
                    )}
                    keyExtractor={item => item.id}
                  />
                </View>
              </SafeAreaView>
            </ScrollView>
          </View>

          {/* <-----------------------------------------------Review ----------------------------------------------------------> */}
          <FlatList
            nestedScrollEnabled={true}
            data={review}
            renderItem={({item}) => (
              <Reviews
                Name={item.name}
                Rating={item.review_star}
                Days={item.days_ago}
                Review={item.review_description}
              />
              // <View style={styles.viewPadding}>
              //   <View>
              //     <Text style={styles.subHeader}>Review</Text>
              //   </View>

              //   <View style={{flexDirection: 'row'}}>
              //     <View>
              //       <Image source={ReviewImage} style={styles.reviewImage} />
              //     </View>
              //     <View style={styles.reviewContainer}>
              //       <Text style={styles.reviewHeader}>Dhuruvan</Text>
              //       <View style={styles.ratingContainer}>
              //         <View
              //           style={{flexDirection: 'row', alignItems: 'center'}}>
              //           <AntDesign name="star" size={18} color="#FFB543" />
              //           <AntDesign name="star" size={18} color="#FFB543" />
              //           <AntDesign name="star" size={18} color="#FFB543" />
              //           <Text
              //             style={{
              //               ...styles.reviewHeader,
              //               width: width * 0.15,
              //               fontSize: 14,
              //             }}>
              //             5.0
              //           </Text>
              //         </View>
              //         <Text style={styles.dayText} numberOfLines={2}>
              //           {item.days_ago}
              //         </Text>
              //       </View>
              //     </View>
              //   </View>

              //   <View>
              //     <Text style={StyleSheet.ReviewText}>
              //       Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              //       Tortor ac leo lorem nisl. Viverra vulputate sodales quis et
              //       dui, lacus. Iaculis eu egestas leo egestas vel. Ultrices ut
              //       magna nulla facilisi commodo enim, orci feugiat pharetra. Id
              //       sagittis, ullamcorper turpis ultrices platea pharetra.
              //     </Text>
              //   </View>
              // </View>
            )}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HospitalProfile;

const styles = StyleSheet.create({
  borderView: {
    borderRightWidth: 1,
    marginVertical: 15,
    borderColor: '#D1D8DD',
  },
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

  category: {
    borderWidth: 1,
    borderColor: '#FCFBFB',
    borderRadius: 20,
    backgroundColor: colours.White,
    height: width * 0.4,
    width: width * 0.4,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  categoryOut: {
    width: width * 0.15,
    borderWidth: 0,
    marginHorizontal: 5,
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  categorySpecialist: {
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: colours.White,
    borderColor: colours.AliceBlue,
    padding: 5,
    height: width * 0.12,
    width: width * 0.12,
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
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoryText: {
    fontSize: 18,
    fontFamily: 'Urbanist-SemiBold',
    color: colours.DarkBlue,
  },

  imageStyle2: {
    height: 30,
    width: 30,
    resizeMode: 'center',
  },
  detailContainer: {
    // height: width * 0.4,
    alignContent: 'space-between',
    justifyContent: 'space-between',
    paddingLeft: width * 0.025,
  },
  dayText: {
    ...style.paragraphText,
    textAlign: 'right',
    width: width * 0.3,
    marginRight: 4,
  },
  experianceView: {
    width: width * 0.3,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: 10,
  },
  experianceText: {
    fontStyle: 'Urbanist-Medium',
    fontSize: 16,
    lineHeight: 20,
    color: '#9CA4AB',
    width: width * 0.28,
    textAlign: 'center',
  },
  experianceText2: {
    fontSize: 18,
    lineHeight: 25,
    width: width * 0.2,
    color: '#121942',
    fontFamily: 'Urbanist-Bold',
    textAlign: 'center',
  },
  ratingText: {
    fontSize: 18,
    lineHeight: 25,
    color: '#121942',
    fontFamily: 'Urbanist-Bold',
    textAlign: 'center',
  },

  hospitalImage: {
    height: width * 0.3,
    width: width * 0.3,
    resizeMode: 'center',
  },
  generalText: {
    fontSize: 14,
    color: '#78828A',
    lineHeight: 20,
    fontFamily: 'Urbanist-SemiBold',
    width: width * 0.49,
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
  imageStyle: {
    marginRight: 0,
    color: colours.DarkBlue,
    marginStart: -4,
    // transform:[{translateX:-4}]
  },
  locationText: {
    fontFamily: 'Urbanist-Medium',
    fontSize: 14,
    color: '#434E58', //EbonyCleay
    width: width * 0.43,
    lineHeight: 20,
  },
  patientsContainer: {
    flexDirection: 'row',
    marginTop: width * 0.05,
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
    // marginBottom: 10,
  },
  servicesText: {
    fontSize: 14,
    fontFamily: 'Urbanist-SemiBold',
    color: '#171725',
    lineHeight: 24,
    width: width * 0.49,
  },

  viewVertical: {
    marginVertical: width * 0.03,
  },

  viewPadding: {
    marginVertical: 10,
  },
});
