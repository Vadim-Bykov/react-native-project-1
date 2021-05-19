import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import {Icon} from 'react-native-elements';
import {Text} from 'react-native';

export const DrawerContent = props => {
  const {state, navigation} = props;

  return (
    <DrawerContentScrollView {...props}>
      <Text>Header</Text>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Favorites"
        focused={state.index === 1 ? true : false}
        activeTintColor="#5535E5"
        activeBackgroundColor="#E9DCFB"
        icon={({focused}) => (
          <Icon
            type="antdesign"
            name="heart"
            color={focused ? '#5535E5' : '#6A6A6A'}
          />
        )}
        labelStyle={{fontWeight: 'bold'}}
        onPress={() => navigation.navigate('Favorite')}
      />
    </DrawerContentScrollView>
  );
};
