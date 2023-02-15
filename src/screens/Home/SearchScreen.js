import React, {useState} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  FlatList,
  Image,
  Button,
  Modal,
  TouchableOpacity,
  Pressable,
  ScrollView,
  LogBox,
} from 'react-native';
import {colours, style, height, width} from '../../constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import NoItem from '../../assets/image/NoItem.png';

import ArrowBackButton from '../../components/button/ArrowBackButton';
import SearchBar from '../../components/homescreen/SearchBar';
import FilterButton from '../../components/button/FilterButton';
import CategoryArray from '../../assets/flatlistarray/CategoryArray';
import LoginButton from '../../components/button/Loginbutton';
import RatingArray from '../../assets/flatlistarray/RatingArray';
import {
  SALT,
  SEARCH_FILTER_URL,
  RATING_URL,
} from '../../httpsclient/APIConstants';
import {useDispatch, useSelector} from 'react-redux';
import {POST_API} from '../../httpsclient/POST';
import md5 from 'md5';
import BottomModal from '../../components/common/BottomModal';
import LoaderModal from '../../components/common/LoaderModal';
import Searchfilter from '../../components/homescreen/SearchFilter';
import {useNavigation} from '@react-navigation/native';

const SearchScreen = () => {
  const [isItem, setItem] = useState(false);
  const [sortModal, setSortModal] = useState(false);
  const [doctors, setDoctors] = useState();
  const userID = useSelector(state => state.user.loginUserId);
  console.log('>>>', userID);
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState();
  const [totalSearches, setTotalSearches] = useState();
  const [rating, setRating] = useState();
  const [selectedIndex2, setSelectedIndex2] = useState([]);
  const navigation = useNavigation();
  LogBox.ignoreAllLogs();

  const onSearch = async searchText => {
    console.log(searchText);
    setLoading(true);
    if (searchInput != null && searchInput != '') {
      const auth_token = md5(SALT + userID);
      const data = {
        user_id: userID,
        search: searchInput,
        auth_token: auth_token,
      };
      const endpoint = SEARCH_FILTER_URL;
      console.log('endData', data);

      await POST_API(endpoint, data)
        .then(Response => {
          if (Response.data.success) {
            setItem(false);
            setDoctors(Response.data.parameters.doctorslist);
            setTotalSearches(Response.data.parameters.total_results_found);
            console.log('>>SearchFilter', Response.data.parameters);
            setLoading(false);
          } else {
            alert(Response.data.message);
            setItem(true);
            setLoading(false);
          }
        })
        .catch(err => {
          alert(err);
          setLoading(false);
        });
    }
  };

  const selectItem2 = index => {
    if (selectedIndex2.indexOf(index) > -1) {
      let newArray = selectedIndex2.filter(indexObject => {
        if (indexObject == index) {
          return false;
        }
        return true;
      });
      setSelectedIndex2(newArray);
    } else {
      setSelectedIndex2([index]);
    }
  };

  const onFilterSearch = async () => {
    console.log('hiiiii');
    setLoading(true);
    if (rating != null) {
      const auth_token = md5(SALT + userID);
      const data = {
        user_id: userID,
        review_star: rating,
        auth_token: auth_token,
      };
      const endpoint = RATING_URL;
      console.log('endData', data);

      await POST_API(endpoint, data)
        .then(Response => {
          if (Response.data.success) {
            setItem(false);
            console.log('>>Rating', Response.data.parameters);
            setDoctors(Response.data.parameters);
            setLoading(false);
          } else {
            alert(Response.data.message);
            setItem(true);
            setLoading(false);
          }
        })
        .catch(err => {
          alert(err);
          setLoading(false);
        });
    }
  };

  const Touch = () => {
    return (
      <Pressable
        style={styles.modalView}
        onPress={() => {
          setModal(false);
          setSortModal(false);
        }}></Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.main}>
      <LoaderModal Load={loading} />
      <View style={styles.innerContainer}>
        <View style={styles.searchView}>
          <View>
            <ArrowBackButton ArrowColour={colours.Black} />
          </View>
          <View style={{flex: 1}}>
            <SearchBar
              Value={searchInput}
              ChangeText={value => {
                setSearchInput(value);
              }}
              Search={() => {
                // setItem(!isItem);
                onSearch();
              }}
            />
          </View>
        </View>

        {/* <-----------------------------Categories------------------------------->  */}

        <View style={{...styles.searchFilter, paddingLeft: width * 0.05}}>
          <LoginButton all="All" />
          <FlatList
            nestedScrollEnabled={true}
            data={CategoryArray}
            renderItem={({item}) => (
              <View>
                <FilterButton
                  symptoms={item.symptom}
                  Filter={() => {
                    navigation.navigate('SymptomsScreen');
                  }}
                  TextColor={colours.DarkBlue}
                />
              </View>
            )}
            keyExtractor={item => item.id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        {/* <-----------------------------search result------------------------------->  */}

        {doctors ? (
          <View style={{...styles.searchView, justifyContent: 'space-between'}}>
            {totalSearches ? (
              <Text style={styles.loginWelcome}>{totalSearches} founds</Text>
            ) : (
              <Text style={styles.loginWelcome}>0 founds</Text>
            )}
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
        ) : null}

        {/* <-----------------------------DoctorsList------------------------------->  */}

        <SafeAreaView>
          {isItem ? (
            <View style={styles.container3}>
              <View style={styles.Items}>
                <View style={styles.noItems}>
                  <Image source={NoItem} style={styles.noItemImage} />
                </View>
                <Text style={style.categoryText}>Not Found</Text>
              </View>
            </View>
          ) : (
            <View style={{...styles.container3, justifyContent: 'flex-start'}}>
              <View style={{width: width}}>
                <FlatList
                  nestedScrollEnabled={true}
                  data={doctors}
                  renderItem={({item}) => (
                    <Searchfilter
                      Photo={item.doctor_image}
                      Name={item.doctor_name}
                      Specialist={item.specialist_at}
                      Hospital={item.hospital_name}
                      TotalReviews={item.review_star}
                    />
                  )}
                  keyExtractor={item => item.id}
                  showsHorizontalScrollIndicator={false}
                  ListFooterComponent={<View />}
                  ListFooterComponentStyle={{height: 10}}
                />
              </View>
            </View>
          )}
        </SafeAreaView>
      </View>
      {/* <View style={{height: height * 0.4, borderWidth: 1}}>
        {sortModal && <BottomModal pressable={Touch} />}
      </View> */}

      {/* <-----------------------------BottomSheet Modal------------------------------->  */}

      {sortModal ? (
        <Modal
          transparent={true}
          // visible={sortModal}
          visible={true}
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
                  <Text style={styles.categoryText3}>Specialists</Text>
                </View>

                <View style={styles.searchFilter}>
                  <LoginButton all="All" />
                  <FlatList
                    nestedScrollEnabled={true}
                    data={CategoryArray}
                    renderItem={({item}) => (
                      <View>
                        <FilterButton
                          symptoms={item.symptom}
                          TextColor={colours.DarkBlue}
                          Filter={() => {
                            navigation.navigate('SymptomsScreen');
                          }}
                        />
                      </View>
                    )}
                    keyExtractor={item => item.id}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                  />
                </View>

                <View style={styles.categoriesView}>
                  <Text style={styles.categoryText3}>Rating</Text>
                </View>

                <View style={styles.searchFilter}>
                  <LoginButton all="All" />
                  <FlatList
                    nestedScrollEnabled={true}
                    data={RatingArray}
                    extraData={selectedIndex2}
                    renderItem={({item, index}) => (
                      <View>
                        <FilterButton
                          symptoms={item.id}
                          Filter={() => {
                            // navigation.navigate('TopDoctorsScreen');
                            selectItem2(index);
                            setRating(item.id);
                          }}
                          BackgroundColor={
                            selectedIndex2.indexOf(index) > -1
                              ? colours.DarkBlue
                              : colours.White
                          }
                          TextColor={
                            selectedIndex2.indexOf(index) > -1
                              ? colours.White
                              : colours.DarkBlue
                          }
                          Vector="star"
                          VectorColor={
                            selectedIndex2.indexOf(index) > -1
                              ? colours.White
                              : colours.DarkBlue
                          }
                        />
                      </View>
                    )}
                    keyExtractor={item => item.id}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    ListFooterComponent={<View />}
                    ListFooterComponentStyle={{width: width * 0.1}}
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
                      onFilterSearch();
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
      ) : null}
    </SafeAreaView>
  );
};
export default SearchScreen;

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
  categoryText2: {
    fontSize: 16,
    fontFamily: 'Urbanist-SemiBold',
    color: colours.DarkBlue,
  },
  categoriesView: {
    marginVertical: 15,
    paddingRight: width * 0.05,
  },
  categoryText3: {
    fontSize: 18,
    fontFamily: 'Urbanist-Bold',
    color: colours.DarkBlue,
  },
  container3: {
    height: height * 0.77,
    width: width * 0.9,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  default: {
    flexDirection: 'row',
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
  innerContainer: {
    width: width,
    // paddingLeft: width * 0.01,
  },
  Items: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginWelcome: {
    fontFamily: 'Urbanist-Bold',
    fontSize: 17,
    color: colours.Black,
    width: width * 0.45,
    lineHeight: 20,
    marginVertical: 10,
  },

  main: {
    height: height,
    backgroundColor: colours.White,
    alignItems: 'center',
    // justifyContent:'center'
  },
  modalView: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    flex: 1,
    justifyContent: 'flex-end',
    //   alignItems: 'center',
    borderRadius: 0,
  },
  modalView2: {
    paddingLeft: width * 0.05,
  },
  modalSheet: {
    backgroundColor: colours.White,
    justifyContent: 'flex-end',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },

  name: {
    fontFamily: 'Urbanist-Bold',
    fontSize: 20,
    color: colours.Black,
    lineHeight: 20,
    marginVertical: 10,
    textAlign: 'center',
  },
  noItems: {
    height: width * 0.2,
    width: width * 0.2,
    backgroundColor: colours.ButtonLight,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  noItemImage: {
    height: width * 0.13,
    width: width * 0.13,
    resizeMode: 'center',
  },

  searchView: {
    flexDirection: 'row',
    width: width * 0.9,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },

  searchFilter: {
    height: width * 0.12,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 5,
  },

  //   noItemText:{
  //     marginVertical:width*0.2,
  //     color: colours.Black,
  //         paddingBottom: 4,
  //         fontSize: 16,
  //         textAlign: 'center',
  //         fontFamily :'Urbanist-SemiBold'

  //   },
});
