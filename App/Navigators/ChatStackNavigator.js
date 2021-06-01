import firestore from '@react-native-firebase/firestore';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import {STACK_SCREEN_OPTIONS} from '../consts/consts';
import {ChatListScreen} from '../Screens/Chats/ChatListScreen';

const Stack = createStackNavigator();

export const ChatStackNavigator = () => {
  //   useEffect(() => getUser(), []);

  //    const getUser = async () => {
  //       try {
  //          const userDocument = await firestore().collection('users');
  //          console.log(userDocument);

  //       } catch (error) {
  //          console.error(error)
  //       }
  //    }
  return (
    <Stack.Navigator screenOptions={STACK_SCREEN_OPTIONS} mode="modal">
      <Stack.Screen name="ChatList" component={ChatListScreen} />
    </Stack.Navigator>
  );
};

// new Date().toDateString()
// new Date().toGMTString();
// Date.now();
