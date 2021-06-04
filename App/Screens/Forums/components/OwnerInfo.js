import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Avatar} from 'react-native-elements';
import {DEFAULT_AVATAR} from '../../../consts/consts';

export const OwnerInfo = React.memo(({forum}) => {
  return (
    <View style={styles.ownerInfo}>
      <Avatar
        rounded
        source={{
          uri: forum.user.photoURL ? forum.user.photoURL : DEFAULT_AVATAR,
        }}
      />

      <Text>{forum.user.name}</Text>
      <Text>{forum.date}</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  ownerInfo: {
    alignItems: 'flex-end',
  },
  badge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ownerName: {
    color: '#fff',
    fontSize: 20,
  },
});
