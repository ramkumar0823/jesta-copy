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
import CategoryArray from '../../assets/flatlistarray/CategoryArray';
import Notification from '../../components/homescreen/Notification';
import HeaderComp from '../../components/common/HeaderComp';
import {useNavigation} from '@react-navigation/native';

const NotificationsScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={style.mainContainer}>
      <View style={styles.hederContainer}>
        <HeaderComp Header="Notification" />
      </View>
      <View style={styles.innerContainer}>
        <Text style={styles.dayText}>TODAY</Text>

        {/* <------------------------------------------Doctors List------------------------------------------------> */}

        <SafeAreaView style={styles.container3}>
          <FlatList
            nestedScrollEnabled={true}
            data={CategoryArray}
            renderItem={({item}) => (
              <Notification
                Photo={item.notiimage}
                Header={item.notiHead}
                Time={item.notiTime}
                Message={item.notiText}
                Reschedule={() => {
                  navigation.navigate('Reschedule');
                }}
              />
            )}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={<View />}
            ListFooterComponentStyle={{height: width * 0.1}}
          />
        </SafeAreaView>
      </View>
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
  dayText: {
    ...style.alertText,
    fontSize: 17,
    marginVertical: width * 0.01,
  },
  DoctorView: {
    marginHorizontal: 10,
    padding: 0,
  },
  hederContainer: {
    width: width * 0.9,
    marginVertical: width * 0.01,
  },

  innerContainer: {
    backgroundColor: colours.White,
    width: width * 0.9,
    height: height * 0.9,
  },

  // mainContainer: {
  //   backgroundColor: colours.White,
  //   height: height,
  // },
  searchFilter: {
    height: width * 0.12,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 5,
  },
});
