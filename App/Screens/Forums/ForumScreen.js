import React, {
  useCallback,
  useEffect,
  useState,
  useRef,
  useLayoutEffect,
} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {NewMessageInput} from './components/NewMessageInput';
import {useDispatch, useSelector} from 'react-redux';
import * as actions from '../../store/auth/actions';
import {Message} from './components/Message';
import * as firebaseService from '../../api/firebaseService';
import {extractErrorMessage, sortByCreationTime} from '../../utils/utils';
import * as selectors from '../../store/auth/selectors';
import {Loader} from '../../common/Loader';

export const ForumScreen = ({route}) => {
  const {description, documentId} = route.params.forum;
  const isFetching = useSelector(selectors.getIsFetching);

  const user = useSelector(selectors.getUser);
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);

  const flatListRef = useRef(null);

  const observer = useCallback(querySnapshot => {
    const messages = [];

    if (querySnapshot) {
      // if(querySnapshot.empty)
      querySnapshot.forEach(documentSnapshot => {
        messages.push({
          ...documentSnapshot.data(),
        });
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
        isOwner={item.userRef.id === user._user.uid}
      />
    ),
    [messages],
  );

  // const scrollToEnd = useCallback(
  //   () => flatListRef.current && flatListRef.current.scrollToEnd(),
  //   [flatListRef.current],
  // );

  return (
    <>
      {isFetching && <Loader />}

      <View style={styles.container}>
        <Text style={styles.description}>{description}</Text>

        {messages.length || isFetching ? (
          <FlatList
            data={messages}
            renderItem={renderItem}
            keyExtractor={item => item.documentId}
            ref={flatListRef}
            inverted
            contentContainerStyle={styles.flatListContainer}
            // onContentSizeChange={}
          />
        ) : (
          <View style={styles.emptyScreen}>
            <Text>No messages. Please add the first one.</Text>
          </View>
        )}
        <NewMessageInput forumId={documentId} />
      </View>
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
  emptyScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
