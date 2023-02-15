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
import {DOCTOR_SPECIALIST_CATEGORY_URL} from '../../httpsclient/APIConstants';
import {POST_API} from '../../httpsclient/POST';
import md5 from 'md5';

const SymptomsScreen = () => {
  const navigation = useNavigation();
  const symptomsID = useRoute().params.data;

  const dispatch = useDispatch();
  const locationID = useSelector(state => state.user.location);
  const userID = useSelector(state => state.user.loginUserId);
  const [symptomsDoctor, setSymptomsDoctor] = useState();
  const [loading, setLoading] = useState(false);
  console.log('symptomsId', locationID, userID, symptomsID);
  const [like, setLike] = useState();
  console.log('>>>>sympdoc', symptomsDoctor);

  useEffect(() => {
    onSymptomsSelect();
  }, []);

  const onSymptomsSelect = async () => {
    setLoading(true);
    const auth_token = md5(SALT + userID + locationID);
    const data = {
      user_id: userID,
      location_id: locationID,
      symptoms_id: symptomsID,
      auth_token: auth_token,
    };
    const endpoint = DOCTOR_SPECIALIST_CATEGORY_URL;
    console.log('endData', data);

    await POST_API(endpoint, data)
      .then(Response => {
        if (Response.data.success) {
          setSymptomsDoctor(Response.data.parameters.data);
          console.log('>>category', Response.data.parameters);
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
          <View style={{width: width * 0.9, alignSelf: 'center'}}>
            <View style={styles.categoriesView}>
              <HeaderComp Header="Allergies" />
            </View>
          </View>
        </View>

        {/* <------------------------------------------Doctors List------------------------------------------------> */}

        <SafeAreaView style={styles.container3}>
          <FlatList
            nestedScrollEnabled={true}
            data={symptomsDoctor}
            renderItem={({item}) => (
              console.log('<<', item),
              (
                <Searchfilter
                  Photo={item.doctor_image}
                  Name={item.doctor_name}
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
          />
        </SafeAreaView>
      </View>
      <LoaderModal Load={loading} />
    </SafeAreaView>
  );
};
export default SymptomsScreen;

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
