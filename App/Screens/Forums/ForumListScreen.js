import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import * as selectors from '../../store/auth/selectors';
import {NewForumModal} from './components/NewForumModal';


export const ForumListScreen = () => {
  useEffect(() => {
    const subscriber = firestore()
      .collection('users')
      .doc('92uKtxsIdK7DdhH6i4UL')
      .onSnapshot(documentSnapshot => {
        console.log('User data: ', documentSnapshot.data());
      });

    return () => subscriber();
  }, []);

  const [loading, setLoading] = useState(true);
  const [forums, setForums] = useState([]);

  useEffect(() => {
    const subscriber = firestore()
      .collection('forums')
      .onSnapshot(querySnapshot => {
        const forums = [];

        querySnapshot.forEach(documentSnapshot => {
          forums.push({
            ...documentSnapshot.data(),
            id: documentSnapshot.id,
          });
        });

        setForums(forums);
        setLoading(false);
      });

    return () => subscriber();
  }, []);
  console.log(forums);

  return (
    <View>
    <NewForumModal />
      <Text>ChatListScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({});
