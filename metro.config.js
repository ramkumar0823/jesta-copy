/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
// import test from './src/assets/fonts/'


module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
    project: {
      ios:{},
      android:{}
  },
  assets:['./src/assets/fonts/'],
  },
};
