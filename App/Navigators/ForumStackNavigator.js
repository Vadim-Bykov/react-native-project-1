import firestore from '@react-native-firebase/firestore';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {STACK_SCREEN_OPTIONS} from '../consts/consts';
import {ForumListScreen} from '../Screens/Forums/ForumListScreen';
import {ForumScreen} from '../Screens/Forums/ForumScreen';
import {StyleSheet} from 'react-native';

const Stack = createStackNavigator();

export const ForumStackNavigator = () => {
  const dispatch = useDispatch();

  return (
    <Stack.Navigator screenOptions={STACK_SCREEN_OPTIONS} mode="modal">
      <Stack.Screen
        name="ForumList"
        component={ForumListScreen}
        options={{
          title: "Forums' list",
        }}
      />

      <Stack.Screen
        name="Forum"
        component={ForumScreen}
        options={({route}) => ({
          headerTitle: route.params.forum.title,
          headerStyle: styles.forumHeader,
          headerBackImage: () => (
            <Icon type="ionicon" name="chevron-back" color="#000" />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  forumHeader: {
    backgroundColor: '#F1F1F1',
    elevation: 0,
  },
});

// new Date().toDateString()
// new Date().toGMTString();
// Date.now();
