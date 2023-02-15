import React, { useEffect } from "react";
import { Alert } from "react-native";
import { messaging } from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';

PushNotification.createChannel({
    channelId: "channel-id",
    channelName: "My Channel",
    channelDescription: "a channel to categories your notification",
    // playSound: 'false',
    // soundName: 'default',
    importance: 4,
    // vibrate: 'true',


}, (created) => console.log(`createChannel returned '${created}'`));
const NotificationController = (props) => {
    useEffect(() => {
        PushNotification.getChannels(function (channel_ids) {
            console.log(channel_ids);
        });
        const useSubscribe = messaging().onMessage(async (remoteMessage) => {
            PushNotification.localNotification({
                message: remoteMessage.notification.body,
                title: remoteMessage.notification.title,
                bigPictureUrl: remoteMessage.notification.android.imageUrl,
                smallIcon: remoteMessage.notification.android.imageUrl,
                channelId: true,
                // vibrate: true,

            })
        })
        return unSubscribe;
    }, []);
    return null;
}
export default NotificationController