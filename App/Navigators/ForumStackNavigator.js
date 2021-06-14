import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {STACK_SCREEN_OPTIONS} from '../consts/consts';
import {ForumListScreen} from '../Screens/Forums/ForumListScreen';
import {ForumScreen} from '../Screens/Forums/ForumScreen';
import {StyleSheet} from 'react-native';

const Stack = createStackNavigator();

export const ForumStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={STACK_SCREEN_OPTIONS} mode="modal">
      <Stack.Screen
        name="ForumList"
        component={ForumListScreen}
        options={{
          title: "Forums' list",
          headerTintColor: '#8B5AB1',
          detachPreviousScreen: true,
        }}
      />

      <Stack.Screen
        name="Forum"
        component={ForumScreen}
        options={({route}) => ({
          headerTitle: route.params.forum.title,
          headerStyle: styles.forumHeader,
          headerBackImage: () => (
            <Icon type="ionicon" name="chevron-back" color="#8B5AB1" />
          ),
          headerTintColor: '#8B5AB1',
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
