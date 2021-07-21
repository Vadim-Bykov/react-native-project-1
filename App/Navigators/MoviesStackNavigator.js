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
import {
  TouchableOpacity,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import {showToast} from '../utils/utils';
import {ErrorBoundary} from '../common/ErrorBoundary';

const Stack = createStackNavigator();

export const MoviesStackNavigator = ({navigation}) => {
  const {width, height} = useWindowDimensions();

  return (
    <ErrorBoundary width={width} height={height}>
      <Stack.Navigator screenOptions={STACK_SCREEN_OPTIONS} mode="modal">
        <Stack.Screen
          name="Movies"
          component={HomeScreen}
          options={{
            headerShown: false,
            // headerBackground: () => <View style={styles.homeHeader} />,
            // // headerTitle: false,
            // headerTransparent: true,
            // headerLeftContainerStyle: {paddingLeft: 20},
            // headerRightContainerStyle: {paddingRight: 20},
            // headerLeft: () => (
            //   <TouchableOpacity onPress={navigation.openDrawer}>
            //     <Icon name="menu" color={COLOR_PURPLE} />
            //   </TouchableOpacity>
            // ),
            // headerRight: () => (
            //   <Icon
            //     type="antdesign"
            //     name="search1"
            //     color={COLOR_PURPLE}
            //     onPress={() => showToast("This feature hasn't implemented yet")}
            //   />
            // ),
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
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  homeHeader: {
    flex: 1,
    backgroundColor: DEFAULT_BG_COLOR,
  },
});
