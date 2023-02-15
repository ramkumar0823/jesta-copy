# Jesta-mobile-application
Jesta Mobile App - React Native


Pull down app and run 'npm i' in root folder.

For Android, please have android studio set up and ADB set up as well.

 after install npm , install
  # npm i deprecated-react-native-prop-types
  Then go to node_modules
Then to react-native-snap-carousel library
Then to the src folder inside react-native-snap-carousel
Then to Carousel.js  in Carousel file, and  pagination.js,paginationDot.js in pagination file,   and to ParallaxImage.js in parallax image file
There  delete ViewPropTypes imported from 'react-native' and in a new line write:
import { ViewPropTypes } from 'deprecated-react-native-prop-types';



