import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  FlatList,
  ScrollView,
  Pressable,
  TouchableOpacity,
  Text,
  Modal,
} from 'react-native';
import {colours, style, height, SALT, width} from '../../constants';
import ArrowBackButton from '../../components/button/ArrowBackButton';
import Searchfilter from '../../components/homescreen/SearchFilter';
import LoginButton from '../../components/button/Loginbutton';
import FilterButton from '../../components/button/FilterButton';
import HeaderComp from '../../components/common/HeaderComp';
import CategoryArray from '../../assets/flatlistarray/CategoryArray';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {POST_API} from '../../httpsclient/POST';
import {DOCTOR_SPECIALIST_CATEGORY_URL} from '../../httpsclient/APIConstants';
import md5 from 'md5';
import Specialists from '../../components/homescreen/Specialists';
import LoaderModal from '../../components/common/LoaderModal';

const SpecialistsDoctors = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const locationID = useSelector(state => state.user.location);
  const userID = useSelector(state => state.user.loginUserId);
  const specialistID = useRoute().params.data; // category id or , specialist id
  const [sortModal, setSortModal] = useState(false);
  const [specialist, setSpecialist] = useState();
  const [like, setLike] = useState();
  const [loading, setLoading] = useState(false);
  console.log('homescreenID', specialistID, locationID, userID);

  useEffect(() => {
    onCategorySpecialist();
  }, []);

  const onCategorySpecialist = async () => {
    setLoading(true);
    const auth_token = md5(SALT + userID + locationID);
    const data = {
      user_id: userID,
      location_id: locationID,
      specialist_id: specialistID,
      auth_token: auth_token,
    };
    const endpoint = DOCTOR_SPECIALIST_CATEGORY_URL;
    console.log('endData', data);

    await POST_API(endpoint, data)
      .then(Response => {
        if (Response.data.success) {
          setSpecialist(Response.data.parameters.data);
          console.log('>>category', Response.data.parameters.data);
          setLoading(false);
        } else {
          alert(Response.data.message);
          setLoading(false);
        }
      })
      .catch(err => {
        alert(err);
        setLoading(false);
      });
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View>
        <View style={styles.innerContainer}>
          <View>
            <View style={styles.categoriesView}>
              <HeaderComp Header="Cardio Specialist" />
            </View>
          </View>
        </View>

        <View style={styles.searchView}>
          <Text style={styles.loginWelcome}>345 founds</Text>
          <TouchableOpacity
            style={styles.default}
            onPress={() => {
              setSortModal(true);
            }}>
            <Text style={styles.categoryText2}>Default</Text>
            {/* <Entypo name="arrow-long-up" size={20} color={colours.Black} style={{margin:0}}/>
                <Entypo name="arrow-long-down" size={20} /> */}
          </TouchableOpacity>
        </View>

        <SafeAreaView style={styles.container3}>
          {/* <View style={{height:width*0.6,borderWidth:1}}>  */}
          {/* <View style={{height: width * 0.7, width: width, borderWidth: 0}}> */}
          <FlatList
            nestedScrollEnabled={true}
            key="_"
            // data={CategoryArray}
            // renderItem={({item}) => (
            //   <Searchfilter
            //     Photo={item.image4}
            //     Name={item.name}
            //     Specialist={item.specialists}
            //     Hospital={item.title2}
            //   />
            data={specialist}
            renderItem={({item}) => (
              <Searchfilter
                Photo={item.doctor_image}
                Name={item.name}
                // Specialist={item.specialist_in}
                Specialist="Cardio specialist"
                Hospital="Apollo"
                Reviews={item.review_star}
                TotalReviews={item.total_ratings}
                onLikePress={() => {
                  setLike(!like);
                }}
                OnHandleSubmit={() => {
                  navigation.navigate('DoctorProfile');
                  console.log('hhf');
                }}
                HeartLiked={like}
              />
            )}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
          />
          {/* </View> */}
          {/* </View> */}
        </SafeAreaView>

        {/* <------------------------------------------BottomModal------------------------------------------------> */}

        <Modal
          transparent={true}
          visible={sortModal}
          // visible={true}
          animationType="fade"
          style={{backgroundColor: 'red', alignSelf: 'center'}}>
          <Pressable
            style={styles.modalView}
            onPress={() => {
              // setSortModal(false);
            }}>
            <View style={styles.modalSheet}>
              <View style={styles.filterBorder}>
                <Text style={styles.name}>Filter</Text>
              </View>

              {/* <View style={styles.optionView} /> */}
              <View style={styles.modalView2}>
                <View style={styles.categoriesView}>
                  <Text style={styles.categoryText3}>Rating</Text>
                </View>

                <View style={styles.searchFilter}>
                  <LoginButton all="All" />
                  <FlatList
                    nestedScrollEnabled={true}
                    key="_"
                    data={CategoryArray}
                    renderItem={({item}) => (
                      <View>
                        <FilterButton
                          symptoms={item.id}
                          Filter={() => {
                            navigation.navigate('TopDoctorsScreen');
                            setSortModal(false);
                          }}
                          Vector="star"
                        />
                      </View>
                    )}
                    keyExtractor={item => item.id}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                  />
                </View>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.buttonStyle}>
                    <Text style={styles.buttonTextStyle}>Reset</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      ...styles.buttonStyle,
                      backgroundColor: colours.DarkBlue,
                    }}
                    onPress={() => {
                      setSortModal(false);
                    }}>
                    <Text
                      style={{...styles.buttonTextStyle, color: colours.White}}>
                      Apply
                    </Text>
                  </TouchableOpacity>

                  {/* <LoginButton all="Apply" /> */}
                </View>
              </View>
            </View>
          </Pressable>
        </Modal>
      </View>
      <LoaderModal Load={loading} />
    </SafeAreaView>
  );
};
export default SpecialistsDoctors;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  buttonStyle: {
    backgroundColor: colours.ButtonLight,
    borderRadius: 30,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    padding: 0,
  },
  buttonTextStyle: {
    color: colours.DarkBlue,
    paddingBottom: 2,
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Urbanist-SemiBold',
    marginVertical: 5,
    marginHorizontal: 20,
  },

  categoriesView: {
    marginVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',

    height: width * 0.14,
  },
  categoryText2: {
    fontSize: 16,
    fontFamily: 'Urbanist-SemiBold',
    color: colours.DarkBlue,
  },
  categoryText3: {
    fontSize: 18,
    fontFamily: 'Urbanist-Bold',
    color: colours.DarkBlue,
  },
  container3: {
    height: height * 0.9,
    width: width,
    alignSelf: 'center',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  DoctorView: {
    marginHorizontal: 10,
    padding: 0,
  },

  innerContainer: {
    backgroundColor: colours.White,
    marginLeft: width * 0.04,
  },
  loginWelcome: {
    fontFamily: 'Urbanist-Bold',
    fontSize: 17,
    color: colours.Black,
    width: width * 0.45,
    lineHeight: 20,
    marginVertical: 10,
  },
  mainContainer: {
    backgroundColor: colours.White,
    height: height,
  },
  modalSheet: {
    backgroundColor: colours.White,
    justifyContent: 'flex-end',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  modalView: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    flex: 1,
    justifyContent: 'flex-end',
    //   alignItems: 'center',
    borderRadius: 0,
  },
  name: {
    fontFamily: 'Urbanist-Bold',
    fontSize: 20,
    color: colours.Black,
    lineHeight: 20,
    marginVertical: 10,
    textAlign: 'center',
  },
  modalView2: {
    paddingLeft: width * 0.05,
  },
  filterBorder: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
    height: width * 0.17,
    borderBottomWidth: 0.2,
    borderBottomColor: '#b3b3b3',
  },
  searchView: {
    flexDirection: 'row',
    width: width * 0.9,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  searchFilter: {
    height: width * 0.12,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 5,
  },
});
