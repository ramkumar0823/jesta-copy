import React from 'react';
import {
  SafeAreaView,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import {colours, style} from '../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const FilterButton = props => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <TouchableOpacity
        style={{...styles.buttonStyle, backgroundColor: props.BackgroundColor}}
        onPress={props.Filter}>
        <View style={styles.vectorView}>
          <AntDesign
            name={props.Vector}
            size={13}
            style={styles.vector}
            color={props.VectorColor}
          />
          <Text style={{...styles.buttonTextStyle, color: props.TextColor}}>
            {props.symptoms}
          </Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default FilterButton;

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: colours.White,
    borderRadius: 30,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 2,
    borderWidth: 2,
    borderColor: colours.DarkBlue,
    flexDirection: 'row',
  },
  buttonTextStyle: {
    color: colours.DarkBlue,
    paddingBottom: 0,
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Urbanist-SemiBold',
    marginVertical: 4,
  },
  vectorView: {
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  vector: {
    marginVertical: 4,
    paddingBottom: 2,
  },
});
