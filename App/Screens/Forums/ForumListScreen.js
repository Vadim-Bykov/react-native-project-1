import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import * as selectors from '../../store/auth/selectors';
import {NewForumModal} from './components/NewForumModal';
import {Forum} from './components/Forum';

export const ForumListScreen = () => {
  useEffect(() => {
    const subscriber = firestore()
      .collection('users')
      .doc('92uKtxsIdK7DdhH6i4UL')
      .onSnapshot(documentSnapshot => {
        documentSnapshot && console.log('User data: ', documentSnapshot.data());
      });

    return () => subscriber();
  }, []);

  const [loading, setLoading] = useState(true);
  const [forums, setForums] = useState([]);

  const renderItem = useCallback(({item}) => <Forum forum={item} />, []);

  useEffect(() => {
    const subscriber = firestore()
      .collection('forums')
      .onSnapshot(querySnapshot => {
        const forums = [];

        querySnapshot &&
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
      <FlatList
        data={forums}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
