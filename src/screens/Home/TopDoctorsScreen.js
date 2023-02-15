import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  FlatList,
  ScrollView,
  Text,
} from 'react-native';
import {
  colours,
  LOCATION_HOSPITAL_URL,
  style,
  height,
  width,
} from '../../constants';
import ArrowBackButton from '../../components/button/ArrowBackButton';
import LoginButton from '../../components/button/Loginbutton';
import FilterButton from '../../components/button/FilterButton';
import CategoryArray from '../../assets/flatlistarray/CategoryArray';
import Searchfilter from '../../components/homescreen/SearchFilter';
import {useNavigation} from '@react-navigation/native';
import md5 from 'md5';
import {POST_API} from '../../httpsclient/POST';
import {useDispatch, useSelector} from 'react-redux';
import LoaderModal from '../../components/common/LoaderModal';
import HospitalsList from './HospitalsList';
import HeaderComp from '../../components/common/HeaderComp';

const TopDoctorsScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [like, setLike] = useState(false);
  const [topDoctors, setTopDoctors] = useState();
  const dispatch = useDispatch();
  const locationID = useSelector(state => state.user.location);
  const userID = useSelector(state => state.user.loginUserId);

  useEffect(() => {
    onTopDoctors();
  }, []);

  const onTopDoctors = async () => {
    setLoading(true);
    const endpoint = LOCATION_HOSPITAL_URL;
    const auth_token = md5(SALT + userID + locationID);
    const data = {
      user_id: userID,
      location_id: locationID,
      auth_token: auth_token,
    };
    console.log('specialistall', data);
    await POST_API(endpoint, data)
      .then(Response => {
        if (Response.data.success) {
          console.log('alldetails', Response.data.parameters.top_doctors_list);
          setTopDoctors(Response.data.parameters.top_doctors_list);
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
    <SafeAreaView style={styles.mainContainer}>
      <View>
        <View style={styles.innerContainer}>
          <View>
            <View style={styles.categoriesView}>
              <HeaderComp Header="Top Doctors" />
            </View>

            <View style={styles.searchFilter}>
              <LoginButton all="All" />
              <FlatList
                nestedScrollEnabled={true}
                key="_"
                data={CategoryArray}
                renderItem={({item}) => (
                  <View>
                    <FilterButton symptoms={item.symptom} />
                  </View>
                )}
                keyExtractor={item => item.id}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </View>
        </View>

        <SafeAreaView style={styles.container3}>
          <View style={{width: width}}>
            <FlatList
              nestedScrollEnabled={true}
              key="_"
              data={topDoctors}
              renderItem={({item}) => (
                console.log('>>>gh', item),
                (
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
                )
              )}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              ListFooterComponent={<View />}
              ListFooterComponentStyle={{height: 10}}
            />
          </View>
        </SafeAreaView>
      </View>
      <LoaderModal Load={loading} />
    </SafeAreaView>
  );
};
export default TopDoctorsScreen;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colours.White,
  },
  categoriesView: {
    marginVertical: 15,
    flexDirection: 'row',
    borderWidth: 0,
  },
  DoctorView: {
    marginHorizontal: 10,
  },
  container3: {
    height: height * 0.85,
    width: width * 0.9,
    alignSelf: 'center',
    // justifyContent: 'center',
    alignItems: 'center',
  },

  innerContainer: {
    backgroundColor: colours.White,
    marginLeft: width * 0.05,
  },
  searchFilter: {
    height: width * 0.12,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    marginLeft: width * 0.06,
    marginVertical: 5,
    borderWidth: 0,
  },
});
