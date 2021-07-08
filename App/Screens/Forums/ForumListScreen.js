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
import {extractErrorMessage, sortByCreationTime} from '../../utils/utils';
import * as firebaseService from '../../api/firebaseService';
import {COLOR_PURPLE} from '../../consts/consts';
import {EmptyList} from '../../common/EmptyList';

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
              type="feather"
              name="plus"
              size={32}
              color={COLOR_PURPLE}
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
      querySnapshot.forEach(documentSnapshot => {
        forums.push(documentSnapshot.data());
      });
    }

    setForums(sortByCreationTime(forums));
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

  const renderItem = useCallback(({item}) => <Forum forum={item} />, []);

  const forumIdFromNotification = useSelector(
    selectors.getForumIdFromNotification,
  );

  const forumFromNotification = useMemo(
    () => forums.find(forum => forum.documentId === forumIdFromNotification),
    [forumIdFromNotification, forums.length],
  );

  useEffect(() => {
    forumIdFromNotification &&
      forumFromNotification &&
      navigation.navigate('Forum', {
        forum: {
          forumId: forumFromNotification.documentId,
          title: forumFromNotification.title,
        },
      });
    dispatch(actions.setForumIdFromNotification(null));
  }, [forumIdFromNotification]);

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
        data={forums}
        renderItem={renderItem}
        keyExtractor={item => item.creationTime}
        ListEmptyComponent={
          <EmptyList text="No forums. Please add the first one." />
        }
        contentContainerStyle={styles.flatListContainer}
      />
    </>
  );
};

const styles = StyleSheet.create({
  forumListIcon: {
    marginRight: 15,
  },

  flatListContainer: {
    flexGrow: 1,
  },
});
