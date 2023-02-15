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
import {colours, style, height, width} from '../../constants';
import ArrowBackButton from '../../components/button/ArrowBackButton';
import Searchfilter from '../../components/homescreen/SearchFilter';
import CategoryArray from '../../assets/flatlistarray/CategoryArray';
import {useRoute, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import LoaderModal from '../../components/common/LoaderModal';
import HeaderComp from '../../components/common/HeaderComp';
import {
  DOCTOR_SPECIALIST_CATEGORY_URL,
  DOCTOR_LIKE,
  SALT,
} from '../../httpsclient/APIConstants';
import {POST_API} from '../../httpsclient/POST';
import md5 from 'md5';
import axios from 'axios';

const CategoryDoctorsScreen = () => {
  const navigation = useNavigation();
  const categoryID = useRoute().params.categoryData;

  const dispatch = useDispatch();
  const locationID = useSelector(state => state.user.location);
  const userID = useSelector(state => state.user.loginUserId);
  const [categoryDoctor, setCategoryDoctor] = useState();
  const [loading, setLoading] = useState(false);
  // console.log('CategoryID', locationID, userID, categoryID);
  const [like, setLike] = useState(true);
  const [unLike, setUnLike] = useState(false);
  const [status, setStatus] = useState(true);
  const [axiosTimer, setAxiosTimer] = useState('');
  console.log('response time', axiosTimer);

  console.log('>>>>sympdoc', categoryDoctor);

  useEffect(() => {
    onCategory();
  }, []);

  const instance = axios.create();

  const onCategory = async () => {
    let startTime = Date.now();
    setLoading(true);
    const auth_token = md5(SALT + userID + locationID);
    const data = {
      user_id: userID,
      location_id: locationID,
      category_id: categoryID,
      auth_token: auth_token,
    };
    const endpoint = DOCTOR_SPECIALIST_CATEGORY_URL;
    console.log('endData', data);

    // await POST_API(endpoint, data)
    //   .then(Response => {
    //     if (Response.data.success) {
    //       setCategoryDoctor(Response.data.parameters.data);
    //       console.log('>>category4', Response);
    //       setLoading(false);
    //     } else {
    //       alert(Response.data.message);
    //       console.log('>>>cataler', Response.data.message);
    //       setLoading(false);
    //     }
    //   })
    //   .catch(err => {
    //     alert(err);
    //     setLoading(false);
    //   });
    instance.interceptors.request.use(config => {
      config.headers['request-startTime'] = new Date().getTime();
      return config;
    });

    instance.interceptors.response.use(response => {
      const currentTime = new Date().getTime();
      const startTime = response.config.headers['request-startTime'];
      response.headers['request-duration'] = currentTime - startTime;
      return response;
    });
    instance
      .post(endpoint, data)
      // POST_API(endpoint, data)
      .then(response => {
        // console.log('>>>>>response time', response.headers['request-duration']);
        if (response.data.success) {
          axiosTimerFunc(startTime);
          console.log('input data', endpoint, data);
          setCategoryDoctor(response.data.parameters.data);
          console.log('>>category4', response);
          setLoading(false);
        } else {
          alert(response.data.message);
          console.log('>>>cataler', response.data.message);
          setLoading(false);
        }
      })
      .catch(error => {
        setLoading(false);
        console.error(`Error`, error);
      });
  };

  const axiosTimerFunc = startTime => {
    let now = Date.now();
    let seconds = Math.floor((now - startTime) / 1000);
    let milliseconds = Math.floor((now - startTime) % 1000);
    setAxiosTimer(`${seconds}.${milliseconds} seconds`);
  };

  const onHandleLike = async item => {
    setLoading(true);
    const auth_token = md5(SALT + userID);
    const isLike = item.is_doctor_fav === 1;

    const data = {
      user_id: userID,
      doctor_id: item.doctor_id,
      patient_id: userID,
      status: isLike,
      auth_token: auth_token,
    };
    const endpoint = DOCTOR_LIKE;
    console.log('<<<endData2', data, endpoint);

    await POST_API(endpoint, data)
      .then(Response => {
        if (Response.data.success) {
          // setCategoryDoctor(Response.data.parameters.data);
          console.log('>>category3', Response);
          onCategory();
          setLoading(false);
        } else {
          alert(Response.data.message);
          console.log('>>like', Response.data.message);
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
          <View style={{width: width * 0.9, alignSelf: 'center'}}>
            <View style={styles.categoriesView}>
              {/* <ArrowBackButton />
              <View style={styles.DoctorView}>
                <Text style={style.header}>Category</Text>
              </View> */}
              <HeaderComp Header="Category" />
            </View>
          </View>
        </View>

        {/* <------------------------------------------Doctors List------------------------------------------------> */}

        <SafeAreaView style={styles.container3}>
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
            //     Remove={() => {
            //       RemoveDoctor();
            //     }}

            data={categoryDoctor}
            renderItem={({item}) => (
              <Searchfilter
                Photo={item.doctor_image}
                Name={item.doctor_name}
                // Specialist={item.specialist_in}
                Specialist="Cardio specialist"
                Hospital="Apollo"
                Reviews={item.review_star}
                TotalReviews={item.total_ratings}
                onLikePress={() => {
                  onHandleLike(item);
                  console.log('hhf', item.is_doctor_fav === 1);
                  // console.log('>>item2', item);
                }}
                OnHandleSubmit={() => {
                  navigation.navigate('DoctorProfile');
                }}
                HeartLiked={item.is_doctor_fav === 1 ? like : unLike}
              />
            )}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
          />
        </SafeAreaView>
      </View>
      <LoaderModal Load={loading} />
    </SafeAreaView>
  );
};
export default CategoryDoctorsScreen;

const styles = StyleSheet.create({
  categoriesView: {
    marginVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    height: width * 0.14,
  },

  container3: {
    height: height * 0.9,
    width: width * 0.9,
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
    marginRight: width * 0.02,
  },

  mainContainer: {
    backgroundColor: colours.White,
    height: height,
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
