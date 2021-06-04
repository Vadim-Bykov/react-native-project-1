import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Avatar} from 'react-native-elements';
import {DEFAULT_AVATAR} from '../../../consts/consts';
import firestore from '@react-native-firebase/firestore';

export const OwnerInfo = React.memo(({userRefPath}) => {
  const [user, setUser] = useState(null);
  console.log(userRefPath);

  useEffect(() => {
    firestore()
      .doc(userRefPath)
      .onSnapshot(user => user && setUser(user.data()));
  }, []);

  console.log(user);

  if (!user) return null;

  return (
    <View style={styles.ownerInfo}>
      <Avatar
        rounded
        source={{
          uri: user.photoURL ? user.photoURL : DEFAULT_AVATAR,
        }}
      />

      <Text>{user.name}</Text>
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
