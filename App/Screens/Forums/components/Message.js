import React, {useCallback, useEffect, useState, useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Avatar} from 'react-native-elements/dist/avatar/Avatar';
import {useDispatch} from 'react-redux';
import * as firebaseService from '../../../api/firebaseService';
import {DEFAULT_AVATAR} from '../../../consts/consts';
import * as actions from '../../../store/auth/actions';
import {MessageContent} from './MessageContetnt';

export const Message = React.memo(({item, messages, index, isOwner}) => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  const extractUser = useCallback(user => {
    if (user.exists) {
      setUser(user.data());
    } else dispatch(actions.setError(COMMON_ERROR_MESSAGE));
  }, []);

  useEffect(() => {
    firebaseService
      .getDataByRef(item.userRef.path)
      .then(extractUser)
      .catch(error => {
        console.error(error);
        dispatch(actions.setError(extractErrorMessage(error)));
      });
  }, []);

  const getLocalDate = useCallback(
    creationTime => new Date(creationTime).toLocaleDateString(),
    [],
  );

  const today =
    new Date(item.creationTime).toLocaleDateString() ===
    new Date().toLocaleDateString();

  const showPhoto =
    index === messages.length - 1 ||
    (index < messages.length - 1 &&
      item.userRef.path !== messages[index + 1].userRef.path);

  const dateMessage = getLocalDate(item.creationTime);
  const showDate =
    index === messages.length - 1 ||
    (index < messages.length - 1 &&
      dateMessage !== getLocalDate(messages[index + 1].creationTime));

  // const menu = useRef();
  // const hideMenu = () => menu.current.hide();
  // const showMenu = () => menu.current.show();

  return (
    <>
      <View
        style={[
          isOwner ? styles.ownerContainer : styles.container,
          showPhoto && styles.extraMargin,
        ]}>
        {showPhoto && (
          <Avatar
            rounded
            source={{
              uri: user && user.photoURL ? user.photoURL : DEFAULT_AVATAR,
            }}
          />
        )}

        <MessageContent item={item} isOwner={isOwner} showPhoto={showPhoto} />
        {/* <Menu
          ref={menu}
          button={
            <TouchableOpacity activeOpacity={0.6} onLongPress={showMenu}>
              <View
                style={[
                  isOwner ? styles.ownerWithPhoto : styles.withPhoto,
                  !showPhoto &&
                    (isOwner ? styles.ownerWithoutPhoto : styles.withoutPhoto),
                ]}>
                <Text>{item.message}</Text>
                <Text style={styles.time}>
                  {new Date(item.creationTime)
                    .toLocaleTimeString()
                    .split(':')
                    .slice(0, 2)
                    .join(':')}
                </Text>
              </View>
            </TouchableOpacity>
          }>
          <MenuItem onPress={hideMenu}>Menu item 1</MenuItem>
          <MenuDivider />
          <MenuItem onPress={hideMenu}>Menu item 4</MenuItem>
        </Menu> */}
      </View>

      {showDate && (
        <View style={styles.date}>
          <Text>{today ? 'Today' : dateMessage}</Text>
        </View>
      )}
    </>
  );
});

const styles = StyleSheet.create({
  date: {
    marginVertical: 10,
    alignSelf: 'center',
  },
  container: {
    marginLeft: 20,
    marginRight: 60,
    flexDirection: 'row',
    flexShrink: 1,
    marginTop: 2,
  },
  ownerContainer: {
    marginLeft: 20,
    marginRight: 60,
    flexDirection: 'row-reverse',
    flexShrink: 1,
    marginTop: 2,
  },

  extraMargin: {marginTop: 10},
  // withPhoto: {
  //   backgroundColor: '#EBEBEB',
  //   borderTopRightRadius: 10,
  //   borderBottomRightRadius: 10,
  //   borderBottomLeftRadius: 10,
  //   padding: 10,
  //   marginLeft: 5,
  // },
  // ownerWithPhoto: {
  //   backgroundColor: '#CDE6FF',
  //   borderTopLeftRadius: 10,
  //   borderBottomRightRadius: 10,
  //   borderBottomLeftRadius: 10,
  //   padding: 10,
  //   marginRight: 5,
  // },
  // withoutPhoto: {
  //   borderTopLeftRadius: 10,
  //   marginLeft: 40,
  // },
  // ownerWithoutPhoto: {
  //   borderTopRightRadius: 10,
  //   marginRight: 40,
  // },
  // time: {
  //   alignSelf: 'flex-end',
  //   fontSize: 10,
  //   color: '#696A6C',
  // },
});
