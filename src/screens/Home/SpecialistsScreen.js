import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  FlatList,
  ScrollView,
  Text,
} from 'react-native';
import {colours, ALL_DETAILS_URL, style, height, width} from '../../constants';
import ArrowBackButton from '../../components/button/ArrowBackButton';
import HeaderComp from '../../components/common/HeaderComp';
import Specialists from '../../components/homescreen/Specialists';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import md5 from 'md5';
import {POST_API} from '../../httpsclient/POST';
import LoaderModal from '../../components/common/LoaderModal';

const SpecialistsScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const locationID = useSelector(state => state.user.location);
  const userID = useSelector(state => state.user.loginUserId);
  const [specialist, setSpecialist] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    onSpecialists();
  }, []);

  const onSpecialists = async () => {
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
          // setSpecialist(Response.data.parameters);
          // dispatch(setLocation(Response.data.parameters));
          console.log('alldetails', Response.data.parameters);
          setSpecialist(Response.data.parameters.specialists);
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
              <HeaderComp Header=" Specialists" />
            </View>
          </View>
        </View>

        <SafeAreaView style={styles.container3}>
          {/* <View style={{width: width}}> */}
          {/* <View style={{height: width * 0.7, width: width, borderWidth: 0}}> */}
          <FlatList
            nestedScrollEnabled={true}
            key="_"
            // data={CategoryArray}
            // numColumns={2}
            // renderItem={({item}) => (
            //   <View style={{marginVertical: 10, borderWidth: 0}}>
            //     <Specialists
            //       Specialists={item.specialists}
            //       Doctors={item.doctors}
            //     />
            // </View>
            data={specialist}
            numColumns={2}
            renderItem={({item}) => (
              <View style={{marginVertical: 10, borderWidth: 0}}>
                <Specialists
                  Specialists={item.specialist_at}
                  Doctors={item.doctors}
                  BackgroundColor={item.color}
                  Photo={item.image}
                  SpecialistDoctor={() => {
                    navigation.navigate('SpecialistsDoctors', {
                      data: item.specialist_id,
                    });
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
export default SpecialistsScreen;

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
