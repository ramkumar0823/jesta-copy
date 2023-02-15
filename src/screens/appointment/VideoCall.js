import React, {useState} from 'react';
import AgoraUIKit from 'agora-rn-uikit';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const VideoCall = () => {
  const [videoCall, setVideoCall] = useState(false);
  const [contact, setContact] = useState(7708323589);
  //   7305360309
  const connectionData = {
    appId: '1dee02138d264b3ba214592b5bb97dcb',
    channel: 'techno',
    token:
      '007eJxTYGg/OqeqpbJkvamqsXunQ8DEb4areCP0fv4w+66z7rGhlawCg2FKaqqBkaGxRYqRmUmScVKikaGJqaVRkmlSkqV5SnJS7uzTyQ2BjAz99r7MjAwQCOKzMZSkJmfk5TMwAABMxB9r',
    rtcUid: 7305360309,
  };

  const callbacks = {
    EndCall: () => setVideoCall(false),
  };

  return (
    <>
      {videoCall ? (
        <AgoraUIKit connectionData={connectionData} rtcCallbacks={callbacks} />
      ) : (
        <>
          <View>
            <TextInput
              style={styles.input}
              onChangeText={setContact}
              value={contact}
              placeholder="Mobile number"
              keyboardType="numeric"
            />
          </View>

          <View style={{alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => setVideoCall(true)}
              style={{backgroundColor: 'blue', padding: 10}}>
              <Text style={{color: 'white'}}>Start Call</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default VideoCall;
