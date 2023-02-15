import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Image,
  TouchableOpacity,
  Button,
  FlatList,
  Animated,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { colours,style } from '../../constants';
import CarouselImage from '../../assets/carouselarray/CarouselImage';
import OnboardingItem from '../../components/onboarding/OnboardingItem';
import Paginator from '../../components/onboarding/Paginator';

    const height = Dimensions.get('window').height;
    const width = Dimensions.get('window').width;

const Onboarding = ()=>{
    const navigation = useNavigation();
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    const slidesRef = useRef(null);
    const viewableItemsChanged = useRef(({viewableItems}) => {
      setCurrentIndex(viewableItems[0].index);
    }).current;
  
    const scrollTo = () => {
      if (currentIndex < CarouselImage.length - 1) {
        slidesRef.current.scrollToIndex({index: currentIndex + 1});
      } else {
        navigation.navigate('LoginScreen')
        console.log('this is last slide');
      }
    };
  
    // const viewConfig = useRef({viewAreaCoveragePercentThreshold:50}).current
  
    return (
      <SafeAreaView style={style.mainContainer}>
        <View style={{flex: 3}}>
          <FlatList
            data={CarouselImage}
            renderItem={({item}) => (
              <OnboardingItem image={item.image} title={item.title} />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled={true}
            bounces={false}
            keyExtractor={item => item.id}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {useNativeDriver: false},
            )}
            scrollEventThrottle={32}
            onViewableItemsChanged={viewableItemsChanged}
            // viewabilityConfig = {viewConfig}
            ref={slidesRef}
  
         
          />
        </View>
        <View style={{height: height * 0.05}}>
          <Paginator data={CarouselImage} scrollX={scrollX} />
        </View>
        
        <TouchableOpacity
          style={{
            backgroundColor: colours.DarkBlue,
            width: width * 0.8,
            marginBottom: 20,
            borderRadius: 20,
            padding: 5,
          }} onPress={scrollTo} >
          <Text style={{color: colours.White, fontSize: 25, textAlign: 'center'}}>
            Next
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    )
}
export default Onboarding;
const styles= StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: colours.White,
        borderWidth: 0,
        alignItems: 'center',
        justifyContent: 'center',
      },
      welcome: {
        height: height * 0.25,
        width: width * 0.8,
        justifyContent: 'space-around',
        marginTop: 30,
      },
      welcomeText: {
        color: colours.DarkBlue,
        fontWeight: '700',
        fontSize: 40,
        textAlign: 'center',
      },
      welcomeText2: {
        color: colours.Black,
        fontSize: 17,
        textAlign: 'center',
        paddingLeft: 5,
        paddingRight: 5,
      },
      doctorImage: {
        height: height * 0.5,
        width: width * 0.8,
      },
      docsImage: {
        flex: 1,
        alignSelf: 'center',
      },

})