import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {COLOR_GRAY, COLOR_PURPLE, STACK_SCREEN_OPTIONS} from '../consts/consts';
import {ForumListScreen} from '../Screens/Forums/ForumListScreen';
import {ForumScreen} from '../Screens/Forums/ForumScreen';
import {StyleSheet, useWindowDimensions} from 'react-native';
import {ErrorBoundary} from '../common/ErrorBoundary';
import {useTheme} from '@react-navigation/native';

const Stack = createStackNavigator();

export const ForumStackNavigator = () => {
  const {width, height} = useWindowDimensions();
  const {colors} = useTheme();

  return (
    <ErrorBoundary width={width} height={height}>
      <Stack.Navigator screenOptions={STACK_SCREEN_OPTIONS} mode="modal">
        <Stack.Screen
          name="ForumList"
          component={ForumListScreen}
          options={{
            title: "Forums' list",
            headerTintColor: COLOR_PURPLE,
            headerStyle: styles(colors.background).forumListHeader,
          }}
        />

        <Stack.Screen
          name="Forum"
          component={ForumScreen}
          options={({route}) => ({
            headerTitle: route.params.forum.title,
            headerStyle: styles(colors.background).forumHeader,
            headerBackImage: () => (
              <Icon type="ionicon" name="chevron-back" color={COLOR_PURPLE} />
            ),
            headerTintColor: COLOR_PURPLE,
          })}
        />
      </Stack.Navigator>
    </ErrorBoundary>
  );
};

const styles = backgroundColor =>
  StyleSheet.create({
    forumHeader: {
      backgroundColor,
      elevation: 0,
    },
    forumListHeader: {
      backgroundColor,
      borderBottomColor: COLOR_GRAY,
      borderBottomWidth: StyleSheet.hairlineWidth,
      elevation: 0,
    },
  });
