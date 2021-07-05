import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {
  COLOR_PURPLE,
  DEFAULT_BG_COLOR,
  STACK_SCREEN_OPTIONS,
} from '../consts/consts';
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
          headerTintColor: COLOR_PURPLE,
          headerStyle: styles.forumListHeader,
        }}
      />

      <Stack.Screen
        name="Forum"
        component={ForumScreen}
        options={({route}) => ({
          headerTitle: route.params.forum.title,
          headerStyle: styles.forumHeader,
          headerBackImage: () => (
            <Icon type="ionicon" name="chevron-back" color={COLOR_PURPLE} />
          ),
          headerTintColor: COLOR_PURPLE,
        })}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  forumHeader: {
    backgroundColor: DEFAULT_BG_COLOR,
    elevation: 0,
  },
  forumListHeader: {
    backgroundColor: DEFAULT_BG_COLOR,
    borderBottomColor: 'gray',
    borderBottomWidth: StyleSheet.hairlineWidth,
    elevation: 0,
  },
});
