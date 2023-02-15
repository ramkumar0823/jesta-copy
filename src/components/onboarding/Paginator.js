import React from 'react';
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Animated,
} from 'react-native';
import { colours } from '../../constants';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const Paginator = ({data, scrollX}) => {
  return (
    <SafeAreaView>
      <View style={{flexDirection: 'row', height: 64}}>
        {data.map((_, i) => {
          const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [5, 15, 5],
            extrapolate: 'clamp',
            
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange :[0.3,1,.3],
            // outputRange: [10, 20, 10],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              style={[styles.dot, {width: dotWidth,opacity}]}
              key={i.toString()}
            />
          );
        })}
      </View>
    </SafeAreaView>
  );
};
export default Paginator;

const styles = StyleSheet.create({
  main: {
    flex: 0,
    backgroundColor: '#0000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    height: 5,
    borderRadius: 20,
    backgroundColor: colours.DarkBlue,
    width: 0,
    marginRight: 10,
  },
});
