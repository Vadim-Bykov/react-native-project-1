import React, {useCallback, useEffect, useState, useRef} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {NewMessageInput} from './components/NewMessageInput';
import {useDispatch, useSelector} from 'react-redux';
import * as actions from '../../store/auth/actions';
import {GuestMessage} from './components/GuestMessage';
import {messagesSubscriber} from '../../api/firebaseService';
// import {messagesSubscriber} from '../../store/forums/operations';
import * as selectors from '../../store/forums/selectors';
import {Keyboard} from 'react-native';

export const ForumScreen = React.memo(({route}) => {
  const {id, description} = route.params.forum;
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);
  console.log(messages);
  const flatListRef = useRef(null);

  // const messages = useSelector(selectors.getMessages);

  // useEffect(() => {
  //   dispatch(messagesSubscriber(id));
  // }, []);

  const observer = useCallback(forum => {
    if (forum.exists) {
      forum.data().messages
        ? setMessages(forum.data().messages)
        : setMessages([]);
    }
  }, []);

  useEffect(() => {
    messagesSubscriber(observer, dispatch, id);

    return () => messagesSubscriber(observer, dispatch)();
  }, []);

  // useEffect(() => {
  //   const subscriber = firestore()
  //     .collection('forums')
  //     .doc(id)
  //     .onSnapshot(document => setMessages(document.data().messages));

  //   return () => subscriber();
  // }, []);

  const renderItem = useCallback(
    ({item, index}) => (
      <GuestMessage item={item} messages={messages} index={index} />
    ),
    [],
  );

  const scrollToEnd = useCallback(() => flatListRef.current.scrollToEnd(), []);

  // useEffect(() => {
  //   Keyboard.addListener('keyboardDidShow', scrollToEnd);

  //   return Keyboard.addListener('keyboardDidShow', scrollToEnd);
  // }, []);

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
      <NewMessageInput forumId={id} />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {flex: 1},
  emptyScreen: {flex: 1},
});
