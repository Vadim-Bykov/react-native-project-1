import React, {useRef, useCallback} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';
import * as firebaseService from '../../../api/firebaseService';
import * as actions from '../../../store/auth/actions';
import {MessageInfo} from './MessageInfo';

export const MessageContent = ({item, isOwner, showPhoto}) => {
  const menu = useRef();
  const hideMenu = () => menu.current.hide();
  const showMenu = () => menu.current.show();

  const {documentId, message, creationTime} = item;

  const removeMessage = useCallback(() => {
    firebaseService.removeDocument('messages', documentId).catch(error => {
      console.error(error);
      dispatch(actions.setError(extractErrorMessage(error)));
    });

    hideMenu();
  }, []);

  return (
    <Menu
      ref={menu}
      button={
        <TouchableOpacity activeOpacity={0.6} onLongPress={showMenu}>
          <View
            style={[
              isOwner ? styles.ownerWithPhoto : styles.withPhoto,
              !showPhoto &&
                (isOwner ? styles.ownerWithoutPhoto : styles.withoutPhoto),
            ]}>
            <Text>{message}</Text>
            <MessageInfo creationTime={creationTime} messageId={documentId} />
            {/* <Text style={styles.time}>
              {new Date(creationTime)
                .toLocaleTimeString()
                .split(':')
                .slice(0, 2)
                .join(':')}
            </Text> */}
          </View>
        </TouchableOpacity>
      }>
      <MenuItem>Delete message ?</MenuItem>
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
            color={isOwner ? 'red' : 'gray'}
            onPress={isOwner ? removeMessage : null}
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
  withPhoto: {
    backgroundColor: '#EBEBEB',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    padding: 10,
    marginLeft: 5,
  },
  ownerWithPhoto: {
    backgroundColor: '#CDE6FF',
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    padding: 10,
    marginRight: 5,
  },
  withoutPhoto: {
    borderTopLeftRadius: 10,
    marginLeft: 40,
  },
  ownerWithoutPhoto: {
    borderTopRightRadius: 10,
    marginRight: 40,
  },
  // time: {
  //   alignSelf: 'flex-end',
  //   fontSize: 10,
  //   color: '#696A6C',
  // },
});
