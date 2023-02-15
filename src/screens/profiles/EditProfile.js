import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ScrollView,
  Image,
  Alert,
  Modal,
  Touchable,
} from 'react-native';
import {colours, style, height, width} from '../../constants';
import {setLoginUserId} from '../../redux/slice/User';
import ProfilePic from '../../assets/image/ProfilePic.png';
import HeaderComp from '../../components/common/HeaderComp';
import ButtonCommon from '../../components/button/ButtonCommon';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DropDown from '../../components/common/DropDown';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

const EditProfile = () => {
  const navigation = useNavigation();
  const [name, setName] = useState();
  const [dropValue, setDropValue] = useState('select Gender');
  const [isFocus, setIsFocus] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [birthDate, setBirthDate] = useState('Select');
  console.log(name);

  const data = [
    {label: 'Male', value: 'Male'},
    {label: 'Female', value: 'Female'},
  ];

  const onShowDatePicker = () => {};
  const handleConfirm = date => {
    setDatePickerVisibility(false);
    console.log(date);
    // const day = moment(date).format('YYYY-MM-DD');
    // setBirthDate(day);
    // hideDatePicker();
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  return (
    <SafeAreaView style={style.mainContainer}>
      <View style={styles.headerContainer}>
        <HeaderComp Header="Edit profile" />
      </View>
      <ScrollView
        style={styles.innerContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <View style={styles.imageBackGround}>
            <Image source={ProfilePic} style={styles.profileImage} />
          </View>

          {/* <------------------------------------------------------edit button Container--------------------------------------------------> */}
          <TouchableOpacity style={styles.percentageContainer}>
            <View style={styles.editContainer}>
              {/* <Text style={styles.percentageText}>73%</Text> */}
              <AntDesign
                name="edit"
                color={colours.Black}
                //   style={{backgroundColor: '#E4EBFF'}}
                size={20}
              />
            </View>
          </TouchableOpacity>
        </View>
        {/* <------------------------------------------------------Name Container--------------------------------------------------> */}
        <View style={styles.fieldContainer}>
          <View>
            <Text style={styles.fieldText}>Full Name</Text>
          </View>

          <View style={styles.username}>
            <TextInput
              style={style.placeholderText}
              placeholder="Enter your name"
              value={name}
              placeholderTextColor={colours.placeholdercolor2}
              onChangeText={value => {
                setName(value);
              }}></TextInput>
          </View>
        </View>

        {/* <------------------------------------------------------Email Container--------------------------------------------------> */}
        <View style={styles.fieldContainer}>
          <View>
            <Text style={styles.fieldText}>Email</Text>
          </View>

          <View style={styles.username}>
            <TextInput
              style={style.placeholderText}
              placeholder="Enter Your Email"
              value={name}
              placeholderTextColor={colours.placeholdercolor2}
              onChangeText={value => {
                setName(value);
              }}></TextInput>
          </View>
        </View>

        {/* <------------------------------------------------------phone Container--------------------------------------------------> */}
        <View style={styles.fieldContainer}>
          <View>
            <Text style={styles.fieldText}>Phone</Text>
          </View>

          <View style={styles.username}>
            <TextInput
              style={style.placeholderText}
              placeholder="Enter Your Phone Number"
              value={name}
              placeholderTextColor={colours.placeholdercolor2}
              onChangeText={value => {
                setName(value);
              }}></TextInput>
          </View>
        </View>

        {/* <------------------------------------------------------Gender Container--------------------------------------------------> */}
        {/* <View style={styles.fieldContainer}>
          <View>
            <Text style={styles.fieldText}>Gender</Text>
          </View>

          <View style={styles.username}>
            <TextInput
              style={style.placeholderText}
              placeholder="Select"
              value={name}
              placeholderTextColor={colours.placeholdercolor2}
              onChangeText={value => {
                setName(value);
              }}></TextInput>
          </View>
        </View> */}
        <DropDown
          SubHeader="Gender"
          PlaceholderFocus={!isFocus ? 'Select Gender' : '...'}
          DropDownData={data}
          Focus={() => {
            setIsFocus(true);
          }}
          Blur={() => {
            setIsFocus(false);
          }}
          Change={item => {
            setDropValue(item.value);
            setIsFocus(false);
          }}
          DropValue={dropValue}
        />

        {/* <------------------------------------------------------BirthContainer--------------------------------------------------> */}
        <View style={styles.fieldContainer}>
          <View>
            <Text style={styles.fieldText}>Date of birth</Text>
          </View>

          <TouchableOpacity
            style={{
              ...styles.username,
              height: width * 0.12,
              justifyContent: 'center',
              paddingLeft: 13,
            }}
            onPress={() => {
              onShowDatePicker();
              setDatePickerVisibility(true);
            }}>
            <Text
              style={{
                ...style.placeholderText,
                color: colours.placeholdercolor2,
                fontSize: 14,
              }}
              // placeholder="Select"
              // value={name}
              // placeholderTextColor={colours.placeholdercolor2}
              // onChangeText={value => {
              //   setName(value);
              // }}
            >
              {birthDate}
            </Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            minimumDate={new Date()}
          />
          <View style={styles.buttonContainer}>
            <ButtonCommon
              HandlePress={() => {
                navigation.navigate('PersonalInfo');
              }}
              ButtonText="Save Changes "
            />
          </View>
        </View>

        {/* <------------------------------------------------------Container--------------------------------------------------> */}
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: width * 0.1,
  },
  dropdownContainer: {
    backgroundColor: colours.inputbg2,
  },
  selectedText: {
    ...style.subHeader,
    fontFamily: 'Urbanist-Medium',
    marginHorizontal: 10,
  },
  placeholderText: {
    fontSize: 15,
    fontFamily: 'Urbanist-SemiBold',
    color: colours.placeholdercolor2,
    width: width * 0.8,
  },
  editContainer: {
    padding: 6,
    backgroundColor: colours.AliceBlue,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fieldContainer: {
    marginVertical: width * 0.01,
  },
  fieldText: {
    fontFamily: 'Urbanist-SemiBold',
    fontSize: 15,
    lineHeight: 23,
    color: colours.Black,
  },
  headerContainer: {
    width: width * 0.9,
    marginVertical: width * 0.02,
  },
  innerContainer: {
    width: width * 0.9,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  imageContainer: {
    height: width * 0.5,
    width: width * 0.9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageBackGround: {
    height: width * 0.28,
    width: width * 0.28,
    backgroundColor: colours.SolitudeBorder,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 70,
  },
  profileImage: {
    height: width * 0.25,
    width: width * 0.25,
    resizeMode: 'center',
  },
  personalContainer: {
    flexDirection: 'row',
    width: width * 0.85,
    borderWidth: 0,
  },
  personalContainer2: {
    width: width * 0.43,
  },
  percentageContainer: {
    width: width * 0.1,
    height: width * 0.1,
    padding: 3,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: width * 0.11,
    left: width * 0.5,
    backgroundColor: colours.White,
    borderRadius: 20,
  },
  percentageText: {
    fontFamily: 'Urbanist-SemiBold',
    fontSize: 11,
    lineHeight: 17,
    textAlign: 'center',
    color: colours.DarkBlue,
  },
  username: {
    paddingLeft: 10,
    backgroundColor: colours.inputbg2,
    borderRadius: 5,
    color: colours.Black,
    marginVertical: 5,
  },
});
export default EditProfile;
