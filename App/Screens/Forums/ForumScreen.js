import React, {useCallback, useEffect, useState, useRef} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {NewMessageInput} from './components/NewMessageInput';
import {useDispatch} from 'react-redux';
import * as actions from '../../store/auth/actions';
import {GuestMessage} from './components/GuestMessage';
import * as firebaseService from '../../api/firebaseService';
import {Keyboard} from 'react-native';
import {extractErrorMessage, sortByCreationTime} from '../../utils/utils';

export const ForumScreen = ({route}) => {
  const {description, documentId} = route.params.forum;
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
  }, []);

  const errorHandler = useCallback(error => {
    console.error(error);
    dispatch(actions.setError(extractErrorMessage(error)));
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
      <GuestMessage item={item} messages={messages} index={index} />
    ),
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
      <Text>{description}</Text>
      {messages.length ? (
        <FlatList
          data={messages}
          renderItem={renderItem}
          keyExtractor={item => item.documentId}
          ref={flatListRef}
          onContentSizeChange={scrollToEnd}
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
  emptyScreen: {flex: 1},
});
