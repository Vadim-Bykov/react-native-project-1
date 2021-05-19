import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import {FavoriteScreen} from '../../Screens/FavoriteScreen/FavoriteScreen';
import {MoviesStackNavigator} from '../MoviesStackNavigator';
import {Icon} from 'react-native-elements';
import {DrawerContent} from './components/DrawerContent';

const Drawer = createDrawerNavigator();

// const DrawerContent = props => {
//   const {state, navigation} = props;

//   return (
//     <DrawerContentScrollView {...props}>
//       <DrawerItemList {...props} />
//       <DrawerItem
//         label="Favorites"
//         focused={state.index === 1 ? true : false}
//         activeTintColor="#5535E5"
//         activeBackgroundColor="#E9DCFB"
//         icon={({focused}) => (
//           <Icon
//             type="antdesign"
//             name="heart"
//             color={focused ? '#5535E5' : '#6A6A6A'}
//           />
//         )}
//         labelStyle={{fontWeight: 'bold'}}
//         onPress={() => navigation.navigate('Favorite')}
//       />
//     </DrawerContentScrollView>
//   );
// };

export const DrawerNavigator = props => {
  return (
    <Drawer.Navigator
      drawerContentOptions={{
        activeTintColor: '#5535E5',
        activeBackgroundColor: '#E9DCFB',
      }}
      drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen
        name="Home"
        component={MoviesStackNavigator}
        options={
          {
            // headerShown: false,
          }
        }
      />
      <Drawer.Screen name="Favorite" component={FavoriteScreen} />
    </Drawer.Navigator>
  );
};
