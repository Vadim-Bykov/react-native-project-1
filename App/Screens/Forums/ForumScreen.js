import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {NewMessageInput} from './components/NewMessageInput';
import {useDispatch, useSelector} from 'react-redux';
import * as actions from '../../store/auth/actions';
import {GuestMessage} from './components/GuestMessage';
import {COMMON_ERROR_MESSAGE} from '../../consts/consts';
import {messagesSubscriber} from '../../api/firebaseService';

export const ForumScreen = React.memo(({route}) => {
  const {id, description} = route.params.forum;

  const [messages, setMessages] = useState([]);
  const dispatch = useDispatch();

  const observer = useCallback(forum => {
    if (forum.exists) {
      forum.data().messages
        ? setMessages(forum.data().messages)
        : dispatch(
            actions.setError(
              'There are no messages. Please, add the first one.',
            ),
          );
    } else dispatch(actions.setError(COMMON_ERROR_MESSAGE));
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

  const renderItem = ({item, index}) => (
    <GuestMessage item={item} messages={messages} index={index} />
  );

  return (
    <View style={styles.container}>
      <Text>{description}</Text>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(_, index) => index}
      />
      <NewMessageInput forumId={id} />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {flex: 1},
});
