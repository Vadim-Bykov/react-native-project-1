import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import * as selectors from '../../store/auth/selectors';
import * as actions from '../../store/auth/actions';
import {NewForumModal} from './components/NewForumModal';
import {Forum} from './components/Forum';
import {Loader} from '../../common/Loader';
import {Icon} from 'react-native-elements';
import {extractErrorMessage, sortByCreationTime} from '../../utils/utils';
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
              type="feather"
              name="plus"
              size={32}
              color="#8B5AB1"
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

  const isOnPressedNotification = useSelector(
    selectors.getIsOnPressedNotification,
  );

  useEffect(() => {
    isOnPressedNotification && navigation.navigate('Forum', {forum: forums[0]});
    dispatch(actions.setIsOnPressedNotification(false));
  }, [isOnPressedNotification, forums.length]);

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
      {forums.length || isFetching ? (
        <FlatList
          data={forums}
          renderItem={renderItem}
          keyExtractor={item => item.creationTime}
        />
      ) : (
        <View style={styles.emptyScreen}>
          <Text>No forums. Please add the first one.</Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  forumListIcon: {
    marginRight: 15,
  },
  emptyScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
