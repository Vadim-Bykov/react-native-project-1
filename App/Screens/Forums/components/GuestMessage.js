import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Avatar} from 'react-native-elements/dist/avatar/Avatar';
import {useSelector} from 'react-redux';
import {DEFAULT_AVATAR} from '../../../consts/consts';
import * as actions from '../../../store/auth/selectors';

export const GuestMessage = ({item, messages, index}) => {
  const today =
    new Date(item.timeMessage).toLocaleDateString() ===
    new Date().toLocaleDateString();

  //  const yesterday =
  //    +new Date().toLocaleDateString().slice(3, 5) -
  //    +new Date(item.timeMessage).toLocaleDateString().slice(3, 5);

  //   };

  const showPhoto =
    index === 0 || (index > 0 && item.user.id !== messages[index - 1].user.id);

  const dateMessage = new Date(item.timeMessage).toLocaleDateString();

  return (
    <View style={[styles.container, showPhoto && styles.extraMargin]}>
      <Text>{today ? 'Today' : dateMessage}</Text>
      {showPhoto && (
        <Avatar
          rounded
          source={{
            uri: item.user.photoURL ? item.user.photoURL : DEFAULT_AVATAR,
          }}
        />
      )}
      <View style={[styles.withPhoto, !showPhoto && styles.withoutPhoto]}>
        <Text>{item.message}</Text>
        {showPhoto && (
          <Text style={styles.time}>
            {new Date(item.timeMessage).toLocaleTimeString().slice(0, 5)}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 20,
    marginRight: 60,
    flexDirection: 'row',
    flexShrink: 1,
    marginTop: 2,
  },
  extraMargin: {marginTop: 10},
  withPhoto: {
    backgroundColor: '#EBEBEB',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    padding: 10,
    marginLeft: 5,
  },
  withoutPhoto: {
    borderTopLeftRadius: 10,
    marginLeft: 40,
  },
  time: {
    alignSelf: 'flex-end',
    fontSize: 10,
    color: '#696A6C',
  },
});
