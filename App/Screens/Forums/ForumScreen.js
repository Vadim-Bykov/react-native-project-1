import React, {useCallback, useEffect, useState, useRef} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {NewMessageInput} from './components/NewMessageInput';
import {useDispatch, useSelector} from 'react-redux';
import * as actions from '../../store/auth/actions';
import {OwnerMessage} from './components/OwnerMessage';
import {GuestMessage} from './components/GuestMessage';
import * as firebaseService from '../../api/firebaseService';
import {Keyboard} from 'react-native';
import {extractErrorMessage, sortByCreationTime} from '../../utils/utils';
import * as selectors from '../../store/auth/selectors';
import {Loader} from '../../common/Loader';

export const ForumScreen = ({route}) => {
  const {description, documentId} = route.params.forum;
  const isFetching = useSelector(selectors.getIsFetching);

  const ownerData = useSelector(selectors.getUser);
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

  useEffect(() => {
    dispatch(actions.setIsFetching(true));

    const unsubscribe = firebaseService.messagesSubscriber(
      observer,
      errorHandler,
      documentId,
    );

    return unsubscribe;
  }, []);

  const renderItem = useCallback(
    ({item, index}) => {
      const isOwner = item.userRef.id === ownerData._user.uid;
      return (
        // <>
        //   {item.userRef.id === ownerData._user.uid ? (
        //     <OwnerMessage item={item} messages={messages} index={index} />
        //   ) : (
        <GuestMessage
          item={item}
          messages={messages}
          index={index}
          isOwner={isOwner}
        />
        //   )}
        // </>
      );
    },
    [messages],
  );

  const scrollToEnd = useCallback(
    () => flatListRef.current && flatListRef.current.scrollToEnd(),
    [flatListRef.current],
  );

  // const res = useCallback(() => {
  //   console.log(flatListRef);
  //   setTimeout(() => {
  //     console.log('scrollToEnd');
  //     scrollToEnd();
  //   }, 2000);
  // }, [flatListRef.current]);

  // const [isListener, setIsListener] = useState(false);

  // useEffect(() => {
  //   console.log(isListener);
  //   if (flatListRef.current && !isListener) {
  //     console.log('isListener');
  //     setIsListener(prev => !prev);
  //     Keyboard.addListener('keyboardDidShow', res);
  //   }

  //   return Keyboard.removeListener('keyboardDidShow', res);
  // }, [flatListRef.current]);

  return (
    <View style={styles.container}>
      <Text style={styles.description}>{description}</Text>
      {messages.length || isFetching ? (
        <FlatList
          data={messages}
          renderItem={renderItem}
          keyExtractor={item => item.documentId}
          ref={flatListRef}
          // initialScrollIndex={messages.length - 1}
          onContentSizeChange={scrollToEnd}
          onEndReached={() => console.log('Ok')}
        />
      ) : (
        <View style={styles.emptyScreen}>
          <Text>There no messages. Please add the first one.</Text>
        </View>
      )}
      <NewMessageInput forumId={documentId} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  description: {
    paddingHorizontal: 20,
    fontStyle: 'italic',
    fontSize: 16,
  },
  emptyScreen: {
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',
  },
});
