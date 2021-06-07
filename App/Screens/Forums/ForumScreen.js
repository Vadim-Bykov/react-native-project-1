import React, {useCallback, useEffect, useState, useRef} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {NewMessageInput} from './components/NewMessageInput';
import {useDispatch} from 'react-redux';
import * as actions from '../../store/auth/actions';
import {GuestMessage} from './components/GuestMessage';
import * as firebaseService from '../../api/firebaseService';
import {Keyboard} from 'react-native';
import {extractErrorMessage} from '../../utils/utils';

export const ForumScreen = React.memo(({route}) => {
  // console.log(route.params.forum.forumId);
  const {id, description, forumId} = route.params.forum;
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);

  const flatListRef = useRef(null);

  const observer = useCallback(forum => {
    if (forum.exists) {
      forum.data().messages
        ? setMessages(forum.data().messages)
        : setMessages([]);
    }
  }, []);

  const errorHandler = useCallback(error => {
    // if (error.code === 'firestore/permission-denied') return;
    console.error(error);
    dispatch(actions.setError(extractErrorMessage(error)));
  }, []);

  useEffect(() => {
    const unsubscribe = firebaseService.messagesSubscriber(
      observer,
      errorHandler,
      id,
    );

    return unsubscribe;
  }, []);

  const renderItem = useCallback(
    ({item, index}) => (
      <GuestMessage item={item} messages={messages} index={index} />
    ),
    [messages],
  );

  const scrollToEnd = useCallback(() => flatListRef.current.scrollToEnd(), [
    flatListRef,
  ]);

  // const res = () => c  // console.log(flatListRef);

  // useEffect(
  //   flatListRef => {
  //     flatListRef &&
  //       flatListRef.current &&
  //       Keyboard.addListener('keyboardDidShow', scrollToEnd);

  //     return Keyboard.addListener('keyboardDidShow', scrollToEnd);
  //   },
  //   [flatListRef.current],
  // );console.log('keyboardDidShow');

  return (
    <View style={styles.container}>
      <Text>{description}</Text>
      {messages.length ? (
        <FlatList
          data={messages}
          renderItem={renderItem}
          keyExtractor={(_, index) => index}
          ref={flatListRef}
          onContentSizeChange={scrollToEnd}
        />
      ) : (
        <View style={styles.emptyScreen}>
          <Text>There no messages. Please add the first one.</Text>
        </View>
      )}
      <NewMessageInput forumId={forumId} />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {flex: 1},
  emptyScreen: {flex: 1},
});
