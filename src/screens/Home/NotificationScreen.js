import React, {useState} from 'react';
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
import Notification from '../../components/homescreen/Notification';
import {useNavigation} from '@react-navigation/native';

const NotificationsScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.innerContainer}>
        <View style={{width: width * 0.92, alignSelf: 'center'}}>
          <View style={styles.categoriesView}>
            <ArrowBackButton />
            <View style={styles.DoctorView}>
              <Text style={style.header}>Notification</Text>
            </View>
          </View>
          <View>
            <Text style={{...style.alertText, fontSize: 17}}>TODAY</Text>
          </View>
        </View>
      </View>

      {/* <------------------------------------------Doctors List------------------------------------------------> */}

      <SafeAreaView style={styles.container3}>
        <FlatList
          nestedScrollEnabled={true}
          key="_"
          data={CategoryArray}
          renderItem={({item}) => (
            <Notification
              Reschedule={() => {
                navigation.navigate('Reschedule');
              }}
            />
          )}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </SafeAreaView>
  );
};
export default NotificationsScreen;

const styles = StyleSheet.create({
  categoriesView: {
    marginVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    height: width * 0.14,
  },

  container3: {
    height: height * 0.9,
    width: width * 0.93,
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
