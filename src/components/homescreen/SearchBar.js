import React from 'react';
import {
  SafeAreaView,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {colours, height, width, style} from '../../constants';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';

const SearchBar = props => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchText}
          value={props.Value}
          onChangeText={props.ChangeText}
          placeholder="Search"></TextInput>
        <TouchableOpacity onPress={props.Search}>
          <Feather
            name="search"
            size={20}
            color={colours.Dimgray}
            style={styles.searchIcon}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default SearchBar;

const styles = StyleSheet.create({
  backButton: {
    borderWidth: 1,
    borderColor: colours.SolitudeBorder,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginHorizontal: 0,
    width: width * 0.12,
    height: width * 0.12,
  },

  searchBar: {
    paddingLeft: 10,
    backgroundColor: '#F4F6F9',
    borderRadius: 50,
    // borderWidth: 1,
    // borderColor: '#E8ECF4',
    color: colours.Black,
    marginVertical: 15,
    paddingRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // width:width*0.9
  },
  searchText: {
    fontFamily: 'Urbanist-SemiBold',
    fontSize: 15,
    color: colours.Black,
    flex: 1,
  },
});
