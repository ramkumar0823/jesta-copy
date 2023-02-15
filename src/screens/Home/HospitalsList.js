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
import Hospitals from '../../components/homescreen/Hospitals';
import CategoryArray from '../../assets/flatlistarray/CategoryArray';
import HospitalProfile from '../profiles/HospitalProfile';
import HeaderComp from '../../components/common/HeaderComp';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {POST_API} from '../../httpsclient/POST';
import LoaderModal from '../../components/common/LoaderModal';
import md5 from 'md5';

const HospitalsList = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const locationID = useSelector(state => state.user.location);
  const userID = useSelector(state => state.user.loginUserId);
  const [hospitals, setHospitals] = useState();
  const [loading, setLoading] = useState(false);
  console.log('>>>>>', hospitals);

  useEffect(() => {
    onHospitals();
  }, []);

  const onHospitals = async () => {
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
          console.log('alldetails', Response.data.parameters);
          setHospitals(Response.data.parameters.hospital_list);
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

  const Profile = () => {
    navigation.navigate('HospitalProfile');
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View>
        <View style={styles.innerContainer}>
          <View>
            <View style={styles.categoriesView}>
              <HeaderComp Header="Hospitals List" />
            </View>
          </View>
        </View>

        <SafeAreaView style={styles.container3}>
          {/* <View style={{height:width*0.6,borderWidth:1}}>  */}
          {/* <View style={{height: width * 0.7, width: width, borderWidth: 0}}> */}
          <FlatList
            nestedScrollEnabled={true}
            key="_"
            // data={CategoryArray}
            // numColumns={2}
            // renderItem={({item}) => (
            //   <View style={{marginVertical: 10, borderWidth: 0}}>
            //     <Hospitals
            //       Hospital={item.image2}
            //       title={item.title2}
            //       location={item.location2}
            //       HandlePress={() => {
            //         Profile();
            //       }}
            //     />
            //   </View>
            // )}

            data={hospitals}
            numColumns={2}
            renderItem={({item}) => (
              <View style={{marginVertical: 10, borderWidth: 0}}>
                <Hospitals
                  Photo={item.hospital_image}
                  title={item.hospital_name}
                  location={item.cityname}
                  HandlePress={() => {
                    navigation.navigate('HospitalProfile');
                  }}
                />
              </View>
            )}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
          />
          {/* </View> */}
          {/* </View> */}
        </SafeAreaView>
      </View>
      <LoaderModal Load={loading} />
    </SafeAreaView>
  );
};
export default HospitalsList;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colours.White,
    height: height,
  },
  categoriesView: {
    marginVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  DoctorView: {
    marginHorizontal: 10,
  },
  container3: {
    height: height * 0.9,
    width: width,
    alignSelf: 'center',
    // justifyContent: 'center',
    alignItems: 'center',
  },

  innerContainer: {
    backgroundColor: colours.White,
    marginLeft: width * 0.06,
  },
});
