import firestore from '@react-native-firebase/firestore';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {STACK_SCREEN_OPTIONS} from '../consts/consts';
import {ForumListScreen} from '../Screens/Forums/ForumListScreen';

const Stack = createStackNavigator();

export const ForumStackNavigator = ({navigation}) => {
  const goToForum = () => navigation.navigate('Home');

  return (
    <Stack.Navigator screenOptions={STACK_SCREEN_OPTIONS} mode="modal">
      <Stack.Screen
        name="ChatList"
        component={ForumListScreen}
        options={{
          headerRight: () => (
            <Icon
              type="antdesign"
              name="plus"
              color="#000"
              containerStyle={{marginRight: 15}}
              onPress={goToForum}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

// new Date().toDateString()
// new Date().toGMTString();
// Date.now();
