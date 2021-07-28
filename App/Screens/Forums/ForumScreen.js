import React, {
  useCallback,
  useEffect,
  useState,
  useLayoutEffect,
  useMemo,
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
import {RemoveForum} from './components/RemoveForum';
import {EmptyList} from '../../common/EmptyList';
import {useTheme} from '@react-navigation/native';

export const ForumScreen = ({navigation, route}) => {
  const {description, forumId} = route.params.forum;

  const isFetching = useSelector(selectors.getIsFetching);
  const user = useSelector(selectors.getUser);

  const {colors, isFullScreen} = useTheme();

  const dispatch = useDispatch();

  const [userRef, setUserRef] = useState(null);
  const [messages, setMessages] = useState([]);

  const goBack = useCallback(() => navigation.goBack(), []);

  useLayoutEffect(() => {
    dispatch(actions.setIsFetching(true));
  }, []);

  const isForumOwner = useMemo(() => userRef && userRef.id === user.uid, [
    userRef,
  ]);

  useEffect(() => {
    firebaseService.getDocumentById('forums', forumId).then(document => {
      if (document.exists) setUserRef(document.data().userRef);
    });
  }, []);

  useEffect(() => {
    userRef &&
      navigation.setOptions({
        headerRight: isForumOwner
          ? () => (
              <RemoveForum
                forumId={forumId}
                goBack={goBack}
                userRef={userRef}
              />
            )
          : null,
        headerRightContainerStyle: styles.forumListIcon,
      });
  }, [isForumOwner, userRef]);

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

  useEffect(() => {
    const unsubscribe = firebaseService.messagesSubscriber(
      observer,
      errorHandler,
      forumId,
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
        colors={colors}
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

          <NewMessageInput
            colorText={colors.text}
            colorTextGray={colors.textGray}
            forumId={forumId}
            isFullScreen={isFullScreen}
          />
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
