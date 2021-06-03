import firestore from '@react-native-firebase/firestore';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {STACK_SCREEN_OPTIONS} from '../consts/consts';
import {ForumListScreen} from '../Screens/Forums/ForumListScreen';
import * as actions from '../store/common/actions';
import {TouchableOpacity} from 'react-native';
import ForumScreen from '../Screens/Forums/ForumScreen';

const Stack = createStackNavigator();

export const ForumStackNavigator = () => {
  const dispatch = useDispatch();

  const showNewForumModal = () => dispatch(actions.setModalVisible(true));

  return (
    <Stack.Navigator screenOptions={STACK_SCREEN_OPTIONS} mode="modal">
      <Stack.Screen
        name="ForumList"
        component={ForumListScreen}
        options={{
          title: "Forums' list",
          headerRight: () => (
            <TouchableOpacity onPress={showNewForumModal}>
              <Icon
                type="antdesign"
                name="plus"
                color="#000"
                containerStyle={{marginRight: 15}}
              />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen name="Forum" component={ForumScreen} />
    </Stack.Navigator>
  );
};

// new Date().toDateString()
// new Date().toGMTString();
// Date.now();
