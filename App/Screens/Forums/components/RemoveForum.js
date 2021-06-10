import React, {useCallback, useRef} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';
import {useDispatch} from 'react-redux';
import * as firebaseService from '../../../api/firebaseService';
import * as actions from '../../../store/auth/actions';

export const RemoveForum = ({forumId, goBack, userRef}) => {
  const menu = useRef();
  const hideMenu = () => menu.current.hide();
  const showMenu = () => menu.current.show();

  const dispatch = useDispatch();

  const removeForum = useCallback(() => {
    firebaseService
      .removeDocument('forums', forumId)
      .then(() =>
        firebaseService
          .massDeleteUsers(forumId, dispatch)
          .then(res => console.log(res))
          .catch(error => {
            console.error(error);
            dispatch(actions.setError(extractErrorMessage(error)));
          }),
      )
      .catch(error => {
        console.error(error);
        dispatch(actions.setError(extractErrorMessage(error)));
      });

    hideMenu();
    goBack();
  }, []);

  return (
    <Menu
      ref={menu}
      // style={styles.forumListIcon}
      button={
        <TouchableOpacity onPress={showMenu}>
          <Icon
            type="material-community"
            name="delete-sweep-outline"
            size={32}
            color="#8B5AB1"
            // containerStyle={styles.forumListIcon}
            onPress={showMenu}
          />
        </TouchableOpacity>
      }>
      <MenuItem>Delete forum ?</MenuItem>
      <MenuDivider />
      <MenuItem>
        <View style={styles.menuItem}>
          <Icon
            type="material-community"
            name="delete-off"
            color="green"
            onPress={hideMenu}
          />
          {/* <Text>No</Text> */}
          <Icon
            type="material-community"
            name="delete"
            color="red"
            // onPress={removeMessage}
            onPress={removeForum}
          />
          {/* <Text>Yes</Text> */}
        </View>
      </MenuItem>
    </Menu>
  );
};

const styles = StyleSheet.create({
  menuItem: {
    width: 110,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  forumListIcon: {
    marginRight: 15,
  },
});
