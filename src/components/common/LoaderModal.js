import React from 'react';
import {StyleSheet, View, Modal, ActivityIndicator} from 'react-native';

const LoaderModal = props => {
  const {loading, ...attributes} = props.Load;
  // const {loading, ...attributes} = ;

  return (
    <Modal
      transparent={true}
      animationType={'fade'}
      visible={props.Load}
      onRequestClose={() => {
        console.log('close modal');
      }}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator
            animating={true}
            color="#1681FF"
            size="large"
            style={styles.activityIndicator}
          />
        </View>
      </View>
    </Modal>
  );
};

export default LoaderModal;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    // backgroundColor: '#00000040',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});
