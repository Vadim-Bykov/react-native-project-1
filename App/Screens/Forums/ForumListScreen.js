import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import {FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import * as selectors from '../../store/auth/selectors';
import * as actions from '../../store/auth/actions';
import {NewForumModal} from './components/NewForumModal';
import {Forum} from './components/Forum';
import {Loader} from '../../common/Loader';
import {Icon} from 'react-native-elements';
import {extractErrorMessage} from '../../utils/utils';
import * as firebaseService from '../../api/firebaseService';

export const ForumListScreen = ({navigation}) => {
  const user = useSelector(selectors.getUser);
  const isFetching = useSelector(selectors.getIsFetching);
  const dispatch = useDispatch();
  const [forums, setForums] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useLayoutEffect(
    () =>
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Icon
              type="antdesign"
              name="plus"
              color="#000"
              containerStyle={styles.forumListIcon}
            />
          </TouchableOpacity>
        ),
      }),
    [navigation],
  );

  const observer = useCallback(querySnapshot => {
    const forums = [];

    if (querySnapshot) {
      querySnapshot.empty &&
        dispatch(
          actions.setError('The resource is empty. Please add a new forum'),
        );
      querySnapshot.forEach(documentSnapshot => {
        forums.push({
          ...documentSnapshot.data(),
          // id: documentSnapshot.id,
          date: new Date(documentSnapshot.data().time).toLocaleDateString(),
        });
      });
    }

    setForums(forums);
    dispatch(actions.setIsFetching(false));
  }, []);

  const errorHandler = useCallback(error => {
    console.error(error);
    dispatch(actions.setError(extractErrorMessage(error)));
  }, []);

  useEffect(() => {
    dispatch(actions.setIsFetching(true));

    const unsubscribe = firebaseService.forumsSubscriber(
      observer,
      errorHandler,
    );

    return unsubscribe;
  }, []);

  const sortedForums = useMemo(
    () =>
      forums
        .sort((prev, next) => prev.creationTime - next.creationTime)
        .reverse(),
    [forums],
  );

  const renderItem = useCallback(({item}) => <Forum forum={item} />, []);

  return (
    <>
      {isFetching && <Loader />}
      {user && (
        <NewForumModal
          userId={user.uid}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      )}
      <FlatList
        data={sortedForums}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </>
  );
};

const styles = StyleSheet.create({
  forumListIcon: {
    marginRight: 15,
  },
});
