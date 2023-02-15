import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Button,
} from 'react-native';
import {colours, height, width, style} from '../../constants';
import LoginButton from '../button/Loginbutton';
import FilterButton from '../button/FilterButton';
import CategoryArray from '../../assets/flatlistarray/CategoryArray';

const BottomModal = props => {
  const [sortModal, setSortModal] = useState(true);

  return (
    <SafeAreaView>
      <View style={{marginTop: 200}}>
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
                setSortModal(false);
              }}>
              <View style={styles.modalSheet}>
                <Text style={styles.name}>Filter</Text>
                {/* <View style={styles.optionView} /> */}
                <View style={styles.categoriesView}>
                  <Text style={styles.categoryText2}>Specialists</Text>
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

                <View style={styles.categoriesView}>
                  <Text style={styles.categoryText2}>Rating</Text>
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
                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.buttonStyle}>
                    <Text style={styles.buttonTextStyle}>Reset</Text>
                  </TouchableOpacity>

                  <LoginButton all="Apply" />
                </View>
              </View>
            </Pressable>
          </Modal>
        ) : null}
      </View>
      {/* <Button title="Click"   onPress={()=>{setModal(!modal)}}/> */}
    </SafeAreaView>
  );
};

export default BottomModal;

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
  },
  buttonTextStyle: {
    color: colours.DarkBlue,
    paddingBottom: 4,
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Urbanist-Medium',
    marginVertical: 5,
    marginHorizontal: 20,
  },
  categoriesView: {
    marginVertical: 15,
    paddingRight: width * 0.05,
  },
  categoryText2: {
    fontSize: 18,
    fontFamily: 'Urbanist-Bold',
    color: colours.DarkBlue,
  },
  modalSheet: {
    backgroundColor: colours.White,
    justifyContent: 'flex-end',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  optionView: {
    height: 3,
    width: 100,
    backgroundColor: colours.DarkBlue,
    borderRadius: 2,
    alignSelf: 'center',
  },
  modalView: {
    // backgroundColor: 'blue',
    // height:height*0.8,
    // width: width,
    // justifyContent: 'flex-end',
    //   alignItems: 'center',
    // borderRadius: 5,
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
  searchFilter: {
    height: width * 0.12,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    // marginLeft:width*0.1,
    marginVertical: 5,
  },
});
