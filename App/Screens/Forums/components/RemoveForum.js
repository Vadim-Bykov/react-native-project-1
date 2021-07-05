import React, {useCallback, useRef} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';
import {useDispatch} from 'react-redux';
import * as firebaseService from '../../../api/firebaseService';
import {COLOR_PURPLE} from '../../../consts/consts';
import * as actions from '../../../store/auth/actions';

export const RemoveForum = ({forumId, goBack}) => {
  const menu = useRef();
  const hideMenu = () => menu.current.hide();
  const showMenu = () => menu.current.show();

  const dispatch = useDispatch();

  const removeForum = useCallback(() => {
    firebaseService
      .removeDocument('forums', forumId)
      .then(() => {
        firebaseService.massDeleteDocs('messages', forumId, 'forumId');
        firebaseService.massDeleteDocs('likes', forumId, 'forumId');
        firebaseService.massDeleteDocs('dislikes', forumId, 'forumId');
      })
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
      button={
        <TouchableOpacity onPress={showMenu}>
          <Icon
            type="material-community"
            name="delete-sweep-outline"
            size={32}
            color={COLOR_PURPLE}
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
          <Icon
            type="material-community"
            name="delete"
            color="red"
            onPress={removeForum}
          />
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
});
