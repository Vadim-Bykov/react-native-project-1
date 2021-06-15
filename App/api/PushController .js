import React, {useEffect} from 'react';
import {View, Button} from 'react-native';
import PushNotification from 'react-native-push-notification';

export const PushController = () => {
  const testPush = () => {
    PushNotification.localNotification({
      channelId: 'fcm_fallback_notification_channel', // (required) channelId, if the channel doesn't exist, notification will not trigger.
      title: 'My Notification Title', // (optional)
      message: 'My Notification Message', // (required)
      playSound: true, // (optional) default: true
      soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
    });
  };

  useEffect(() => {
    PushNotification.configure({
      onRegister: function (token) {
        console.log('TOKEN:', token);
      },

      // (required) Called when a remote or local notification is opened or received
      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);
        //   PushNotification.invokeApp(notification);
        // process the notification here
        //   testPush(notification);
      },
      // Android only
      senderID: '1090501687137',

      popInitialNotification: true,
      requestPermissions: true,
    });
  }, []);

  return (
    <View>
      <Button onPress={testPush} title="Push" />
    </View>
  );
};
