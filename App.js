import React, {useState, useEffect} from 'react';
import AgoraUIKit from 'agora-rn-uikit';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Config from './src/constants/Config';
import CategoryArray from './src/assets/flatlistarray/CategoryArray';
import AgoraRTC from 'react-native-agora';

const App = () => {
  const [list, setList] = useState(CategoryArray);
  const [videoCall, setVideoCall] = useState(false);
  const [contact, setContact] = useState(7708323589);
  const [rtcUid, setRtcUid] = useState();
  //   7305360309
  // const connectionData = {
  //   appId: Config.appId,
  //   channel: Config.channelId,
  //   token: Config.token,
  //   rtcUid: rtcUid,
  // };
  const connectionData = {
    appId: Config.appId,
    channel: Config.channelId,
    token: Config.token,
    rtcUid: rtcUid,

    isHost: true,
    channelName: Config.channelId,
    joinSucceed: false,
    rtcUid: parseInt((new Date().getTime() + '').slice(4, 13), 10),
    peerIds: [],
    myUsername: '',
    usernames: {},
  };
  const localButtonStyle = {
    backgroundColor: '#78b0ff',
    borderColor: '#78b0ff',
  };

  const styleProps = {
    localBtnStyles: {
      muteLocalAudio: localButtonStyle,
      muteLocalVideo: localButtonStyle,
      switchCamera: localButtonStyle,
      fullScreen: localButtonStyle,
    },
    // UIKitContainer: {height: '50%', width: '100%'},
    UIKitContainer: {
      flex: 1,
      height: '100%',
      width: '100%',
      backgroundColor: '#ff00ff',
    },
  };
  useEffect(() => {
    // return () => {
    //   second
    // }
  }, [videoCall]);

  const callbacks = {
    EndCall: () => setVideoCall(false),
    FullScreen: () => {
      /* Function Body */
    },
    SwitchCamera: () => {
      /* Function Body */
    },
    SwapVideo: () => {
      /* Function Body */
    },
    UserMuteRemoteAudio: () => {
      /* Function Body */
    },
    UserMuteRemoteVideo: () => {
      /* Function Body */
    },
    LocalMuteAudio: () => {
      /* Function Body */
    },
    LocalMuteVideo: () => {
      /* Function Body */
    },
  };

  const trig = val => {
    setRtcUid(val);
    setVideoCall(true);
  };

  const Item = ({itemdet}) => (
    <View style={styles.item}>
      <Text style={styles.title}>{itemdet.title}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => trig(itemdet.phoneNumber)}>
        <Text style={styles.title}>{itemdet.phoneNumber}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      {videoCall ? (
        <AgoraUIKit
          connectionData={connectionData}
          rtcCallbacks={callbacks}
          styleProps={styleProps}
        />
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

          <View>
            {/* <TouchableOpacity
              // onPress={() => setVideoCall(true)}
              style={{backgroundColor: 'blue', padding: 10}}>
              <Text style={{color: 'white'}}>Start Call</Text>
            </TouchableOpacity> */}

            <FlatList
              data={CategoryArray}
              renderItem={({item}) => <Item itemdet={item} />}
              keyExtractor={item => item.id}
            />
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
  item: {
    backgroundColor: '#f2f2f2',
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: 'lightgreen',
    padding: 5,
  },

  shareButton: {
    right: 0,
    width: 80,
    height: 40,
    margin: 25,
    borderRadius: 8,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#78b0ff',
  },
  shareButtonText: {
    fontSize: 16,
  },
});

export default App;
