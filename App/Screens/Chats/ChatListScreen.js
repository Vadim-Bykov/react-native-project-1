import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';

export const ChatListScreen = () => {
  useEffect(() => getUser(), []);

  const getUser = async () => {
    try {
      // await firestore().collection('users').add({name: 'Ada', age: 30});
      await firestore()
        // .collection('users')
        .doc('users/x27dGJOEllQv8hTPMNku')
        .update({
          messages: firestore.FieldValue.arrayUnion({
            message: 'Ok',
            time: new Date().toGMTString(),
          }),
        });
      // .update({messages: firestore.FieldValue.delete()});

      await firestore()
        .collection('users')
        .get()
        .then(querySnapshot => {
          console.log('Total users: ', querySnapshot.docs);

          // querySnapshot.forEach(documentSnapshot => {
          //   console.log(
          //     'User ID: ',
          //     documentSnapshot.id,
          //     documentSnapshot.data(),
          //   );
          // });
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
