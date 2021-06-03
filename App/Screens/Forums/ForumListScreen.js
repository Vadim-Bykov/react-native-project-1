import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {FlatList} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import * as selectors from '../../store/auth/selectors';
import * as actions from '../../store/auth/actions';
import {NewForumModal} from './components/NewForumModal';
import {Forum} from './components/Forum';
import {Loader} from '../../common/Loader';

export const ForumListScreen = () => {
  const user = useSelector(selectors.getUser);
  const isFetching = useSelector(selectors.getIsFetching);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const subscriber = firestore()
  //     .collection('users')
  //     .doc('92uKtxsIdK7DdhH6i4UL')
  //     .onSnapshot(documentSnapshot => {
  //       documentSnapshot && console.log('User data: ', documentSnapshot.data());
  //     });

  //   return () => subscriber();
  // }, []);

  const [forums, setForums] = useState([]);

  useEffect(() => {
    dispatch(actions.setIsFetching(true));

    const subscriber = firestore()
      .collection('forums')
      .onSnapshot(querySnapshot => {
        const forums = [];

        querySnapshot &&
          querySnapshot.forEach(documentSnapshot => {
            forums.push({
              ...documentSnapshot.data(),
              id: documentSnapshot.id,
              date: new Date(documentSnapshot.data().time).toLocaleDateString(),
            });
          });

        setForums(forums);
        dispatch(actions.setIsFetching(false));
      });

    return () => subscriber();
  }, []);
  // console.log(forums);

  const sortedForums = useMemo(
    () => forums.sort((prev, next) => prev.time - next.time).reverse(),
    [forums],
  );

  const renderItem = useCallback(({item}) => <Forum forum={item} />, []);

  return (
    <>
      {isFetching && <Loader />}
      {user && <NewForumModal user={user} />}
      <FlatList
        data={sortedForums}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </>
  );
};
