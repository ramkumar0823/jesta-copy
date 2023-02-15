import React from 'react';
import {
  SafeAreaView,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import {colours, height, width, style} from '../../constants';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {Carousel, Pagination} from 'react-native-snap-carousel-v4';
// import Carousel from '../carousel/src/';
import BannerCarousel from '../../assets/carouselarray/BannerCarousel';
// import Pagination from '../carousel/src/pagination/Pagination';
// import { Pagination } from 'react-native-snap-carousel';

const HomeCarousel = props => {
  const navigation = useNavigation();
  const isCarousel = React.useRef(null);
  const [index, setIndex] = React.useState(0);

  const CarouselImage = ({item, index}) => {
    return (
      <View style={styles.carousel}>
        {/* <Image source={item.image} style={styles.carouselImage} /> */}
        <Image source={{uri: item.banner}} style={styles.carouselImage} />
      </View>
    );
  };
  return (
    <SafeAreaView>
      <View style={styles.carouselView}>
        <Carousel
          //   ref={(c) => { this._carousel = c; }}

          // data={BannerCarousel}
          // renderItem={CarouselImage}
          data={props.Banner}
          renderItem={CarouselImage}
          // layout={"default"}
          //   layoutCardOffset={9}
          ref={isCarousel}
          sliderWidth={350}
          itemWidth={350}
          autoplay={true}
          loop={true}
          autoplayInterval={2000}
          onSnapToItem={index => setIndex(index)}
        />
      </View>
      <Pagination
        dotsLength={BannerCarousel.length}
        activeDotIndex={index}
        carouselRef={isCarousel}
        dotStyle={styles.carouselDot}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        tappableDots={true}
      />
    </SafeAreaView>
  );
};
export default HomeCarousel;

const styles = StyleSheet.create({
  carousel: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0,
    alignSelf: 'center',
    height: height * 0.2,
  },
  carouselImage: {
    height: 350,
    width: 350,
    resizeMode: 'center',
  },
  carouselView: {
    height: height * 0.2,
    width: width * 0.9,
    borderWidth: 0,
  },
  carouselDot: {
    width: 10,
    height: 10,
    borderRadius: 10,
    marginHorizontal: -3,
    backgroundColor: colours.DarkBlue,
  },
});
