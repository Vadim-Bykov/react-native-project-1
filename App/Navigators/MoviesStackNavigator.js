import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  COLOR_PURPLE,
  DEFAULT_BG_COLOR,
  STACK_SCREEN_OPTIONS,
} from '../consts/consts';
import {Icon} from 'react-native-elements';
import {HomeScreen} from '../Screens/Home/HomeScreen';
import {DetailsScreen} from '../Screens/Home/DetailsScreen';
import {TouchableOpacity, StyleSheet, View} from 'react-native';
import {showToast} from '../utils/utils';

const Stack = createStackNavigator();

export const MoviesStackNavigator = ({navigation}) => {
  return (
    <Stack.Navigator screenOptions={STACK_SCREEN_OPTIONS} mode="modal">
      <Stack.Screen
        name="Movies"
        component={HomeScreen}
        options={{
          headerBackground: () => <View style={styles.homeHeader} />,
          headerTitle: false,
          headerTransparent: true,
          headerLeftContainerStyle: {paddingLeft: 20},
          headerRightContainerStyle: {paddingRight: 20},
          headerLeft: () => (
            <TouchableOpacity onPress={navigation.openDrawer}>
              <Icon name="menu" color={COLOR_PURPLE} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <Icon
              type="antdesign"
              name="search1"
              color={COLOR_PURPLE}
              onPress={() => showToast("This feature hasn't implemented yet")}
            />
          ),
        }}
      />

      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{
          headerTitle: false,
          headerTransparent: true,
          headerBackImage: () => (
            <Icon type="ionicon" name="chevron-back" color={COLOR_PURPLE} />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  homeHeader: {
    flex: 1,
    backgroundColor: DEFAULT_BG_COLOR,
  },
});
