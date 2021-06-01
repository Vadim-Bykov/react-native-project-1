import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import * as selectors from '../../store/auth/selectors';

export const ForumListScreen = () => {
  // const user = useSelector(selectors.getUser);
  // useEffect(() => getUser(), []);

  const getUser = async () => {
    try {
      // await firestore().collection('users').add({name: 'Ada', age: 30});
      // await firestore()
      //   .collection('users')
      //   .doc('92uKtxsIdK7DdhH6i4UL')
      //   .update({
      //     users: firestore.FieldValue.arrayUnion({
      //       name: user.displayName,
      //       email: user.email,
      //       id: user.uid,
      //     }),
      //   });

      // .update({messages: firestore.FieldValue.delete()});

      // await firestore().collection('users').add({
      //   email: 'test@.gmail.com',
      //   id: '1',
      //   name: 'Vadim',
      // });

      await firestore()
        .collection('users')
        .get()
        .then(querySnapshot => {
          console.log('Total users: ', querySnapshot.docs);

          querySnapshot.forEach(documentSnapshot => {
            console.log(
              'User ID: ',
              documentSnapshot.id,
              documentSnapshot.data(),
            );
          });
        });
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect(() => {
  //   const subscriber = firestore()
  //     .collection('users')
  //     .doc('1')
  //     .onSnapshot(documentSnapshot => {
  //       console.log('User data: ', documentSnapshot.data());
  //     });

  //   // Stop listening for updates when no longer required
  //   return () => subscriber();
  // }, []);
  return (
    <View>
      <Text>ChatListScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({});
