import {StyleSheet, Dimensions} from 'react-native';

export const height = Dimensions.get('window').height;
export const width = Dimensions.get('window').width;

export const colours = {
  White: '#ffffff',
  Black: '#000000',
  DarkBlue: '#2D2E8B',
  EbonyClay: '#1E232C',
  AliceBlue: '#F7F8F9',
  LightGrey: '#8391A1',
  SolitudeBorder: '#E8ECF4',
  Raven: '#6A707C',
  BlueReg: '#246BFD',
  KashmirBlue: '#56648D',
  Dimgray: '#6D6D6D',
  ShadBlue: '#232F55',
  Chargoal: '#333333',
  ButtonLight: '#E6EDFF',
  Red: '#FF3359',
  inputbg2: '#EEF4FF',
  placeholdercolor2: '#7D8BB7',
};
export const FontSize = {
  NormalFontsize: 14,
  MediumFontsize: 16,
  LargeFontsize: 18,
  HedingFontsize: 20,
};

export const style = StyleSheet.create({
  categoryText2: {
    fontSize: 16,
    fontFamily: 'Urbanist-SemiBold',
    color: colours.DarkBlue,
  },
  headerContainer: {
    width: width * 0.9,
    marginVertical: width * 0.02,
  },
  name: {
    fontFamily: 'Urbanist-Bold',
    fontSize: 17,
    color: colours.Black,
    width: width * 0.45,
    lineHeight: 20,
    marginVertical: 10,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: colours.White,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContainer2: {
    flex: 1,
    backgroundColor: colours.White,
  },
  innerContainer: {
    height: height * 0.85,
    width: width * 0.9,
  },
  loginWelcome: {
    fontFamily: 'Urbanist-Bold',
    fontSize: 30,
    color: colours.EbonyClay,
    marginVertical: 15,
  },
  backButton: {
    borderWidth: 1,
    borderColor: colours.SolitudeBorder,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginHorizontal: 0,
    width: width * 0.15,
    height: width * 0.15,
  },
  username: {
    paddingLeft: 10,
    backgroundColor: colours.AliceBlue,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E8ECF4',
    color: colours.Black,
    marginVertical: 15,
  },
  username2: {
    paddingLeft: 10,
    backgroundColor: colours.AliceBlue,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E8ECF4',
    color: colours.Black,
    marginVertical: 10,
  },
  button: {
    backgroundColor: colours.DarkBlue,
    width: width * 0.9,
    marginBottom: 20,
    borderRadius: 30,
    padding: 11,
    alignSelf: 'center',
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: colours.White,
    paddingBottom: 4,
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Urbanist-SemiBold',
  },
  register: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginVertical: 10,
  },
  registerText: {
    fontFamily: 'Urbanist-Medium',
    color: colours.EbonyClay,
    fontSize: 14,
  },
  registerNow: {
    fontFamily: 'Urbanist-Bold',
    fontSize: 14,
    color: colours.BlueReg,
  },
  placeholderText: {
    fontFamily: 'Urbanist-Medium',
    fontSize: 14,
    color: colours.Black,
    lineHeight: 20,
  },
  forgotText2: {
    fontFamily: 'Urbanist-Medium',
    fontSize: 16,
    color: colours.LightGrey,
    textAlign: 'center',
    lineHeight: 25,
    marginBottom: '7%',
  },
  header: {
    fontSize: 22,
    color: colours.Black,
    lineHeight: 30,
    fontFamily: 'Urbanist-Bold',
  },
  subHeader: {
    fontSize: 20,
    color: colours.Black,
    lineHeight: 24,
    fontFamily: 'Urbanist-Bold',
  },

  paragraphText: {
    fontSize: 15,
    lineHeight: 22,
    fontFamily: 'urbanist-Medium',
    color: '#72828a',
  },
  alertText: {
    fontSize: 13,
    color: '#9b9b9b',
    lineHeight: 18,
    fontFamily: 'Urbanist-SemiBold',
  },
  blueBackground: {
    backgroundColor: '#E4EBFF',
    // height: width * 0.11,
    // width: width * 0.11,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  categoryText: {
    fontSize: 20,
    fontFamily: 'Urbanist-SemiBold',
    color: colours.ShadBlue,
  },
});

export const baseUrl = 'https://www.jesta.clinic/admin/web/v1/';
export const SALT = 'jesta@2022App@tt';
export const FORGOT_URL = baseUrl + 'users/forgot';
export const OTP_URL = baseUrl + 'users/verify-otp';
export const RESET_PASSWORD_URL = baseUrl + 'users/set-password';
export const SOCIAL_MEDIA_LOGIN = baseUrl + 'users/social';
export const LOCATION_URL = baseUrl + 'lists/location';
export const CATEGORY_IMAGE_URL = baseUrl + 'lists/category';
export const SYMPTOMS_URL = baseUrl + 'lists/symptoms';
export const CATEGORY_DOCTOR_URL = baseUrl + 'lists/specialist';
export const ALL_DETAILS_URL = baseUrl + 'lists/my-type-list';
export const LOCATION_HOSPITAL_URL = baseUrl + 'lists/hospital-list';
