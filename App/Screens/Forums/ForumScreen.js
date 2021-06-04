import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {NewMessageInput} from './components/NewMessageInput';
import {useSelector} from 'react-redux';
import * as actions from '../../store/auth/selectors';
import {GuestMessage} from './components/GuestMessage';

export const ForumScreen = ({route}) => {
  const {id, description} = route.params.forum;

  const [messages, setMessages] = useState([]);
  const user = useSelector(actions.getUser);

  // console.log(messages);

  useEffect(() => {
    const subscriber = firestore()
      .collection('forums')
      .doc(id)
      .onSnapshot(document => setMessages(document.data().messages));

    return () => subscriber();
  }, []);

  const renderItem = ({item, index}) => (
    <GuestMessage item={item} messages={messages} index={index} />
  );

  return (
    <View style={styles.container}>
      {/* <Text>{description}</Text> */}
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(_, index) => index}
      />
      <NewMessageInput forumId={id} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
});
