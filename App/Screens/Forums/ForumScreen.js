import React, {useCallback, useEffect, useState, useLayoutEffect} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {NewMessageInput} from './components/NewMessageInput';
import {useDispatch, useSelector} from 'react-redux';
import * as actions from '../../store/auth/actions';
import {Message} from './components/Message';
import * as firebaseService from '../../api/firebaseService';
import {extractErrorMessage, sortByCreationTime} from '../../utils/utils';
import * as selectors from '../../store/auth/selectors';
import {Loader} from '../../common/Loader';
import {RemoveForum} from './components/RemoveForum';
import {EmptyList} from '../../common/EmptyList';

export const ForumScreen = ({navigation, route}) => {
  const {description, documentId, userRef} = route.params.forum;
  const isFetching = useSelector(selectors.getIsFetching);

  const user = useSelector(selectors.getUser);
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);

  const goBack = useCallback(() => navigation.goBack(), []);

  const isForumOwner = userRef.id === user.uid;

  useEffect(() => {
    navigation.setOptions({
      headerRight: isForumOwner
        ? () => (
            <RemoveForum
              forumId={documentId}
              goBack={goBack}
              userRef={userRef}
            />
          )
        : null,
      headerRightContainerStyle: styles.forumListIcon,
    });
  }, [navigation]);

  const observer = useCallback(querySnapshot => {
    const messages = [];

    if (querySnapshot) {
      querySnapshot.forEach(documentSnapshot => {
        messages.push(documentSnapshot.data());
      });
    }

    setMessages(sortByCreationTime(messages));
    dispatch(actions.setIsFetching(false));
  }, []);

  const errorHandler = useCallback(error => {
    console.error(error);
    dispatch(actions.setError(extractErrorMessage(error)));
  }, []);

  useLayoutEffect(() => {
    dispatch(actions.setIsFetching(true));
  }, []);

  useEffect(() => {
    const unsubscribe = firebaseService.messagesSubscriber(
      observer,
      errorHandler,
      documentId,
    );

    return unsubscribe;
  }, []);

  const renderItem = useCallback(
    ({item, index}) => (
      <Message
        item={item}
        messages={messages}
        index={index}
        isOwner={item.userRef.id === user.uid}
      />
    ),
    [messages],
  );

  return (
    <>
      {isFetching ? (
        <Loader />
      ) : (
        <View style={styles.container}>
          <Text style={styles.description}>{description}</Text>

          <FlatList
            data={messages}
            renderItem={renderItem}
            keyExtractor={item => item.creationTime}
            ListEmptyComponent={
              <EmptyList text="No messages. Please add the first one." />
            }
            inverted={messages.length ? true : false}
            contentContainerStyle={styles.flatListContainer}
          />

          <NewMessageInput forumId={documentId} />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  description: {
    paddingHorizontal: 20,
    fontStyle: 'italic',
    fontSize: 16,
  },
  flatListContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  forumListIcon: {
    marginRight: 15,
  },
});
