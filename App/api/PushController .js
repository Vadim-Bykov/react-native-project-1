import React, {useEffect} from 'react';
import {View, Button} from 'react-native';
import PushNotification from 'react-native-push-notification';
import {useNavigation} from '@react-navigation/core';

export const PushController = () => {
  const navigation = useNavigation();

  const testPush = async () => {
    PushNotification.localNotification({
      channelId: 'fcm_fallback_notification_channel',
      title: 'My Notification Title', // (optional)
      message: 'My Notification Message', // (required)
      playSound: true,
      soundName: 'default',

      userInteraction: true,
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
        navigation.navigate('Forum');
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
