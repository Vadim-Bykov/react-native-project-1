import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {useDispatch, useSelector} from 'react-redux';
import * as selectors from '../../../store/auth/selectors';
import * as actions from '../../../store/auth/actions';
import * as firebaseService from '../../../api/firebaseService';
import * as utils from '../../../utils/utils';

export const MessageInfo = ({creationTime, messageId, forumId, isOwner}) => {
  const {width} = useWindowDimensions();
  const [likes, setLikes] = useState(null);
  const [dislikes, setDislikes] = useState(null);
  const [isLikedMessage, setIsLikedMessage] = useState(false);
  const [isDisLikedMessage, setIsDisLikedMessage] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const {uid} = useSelector(selectors.getUser);
  const dispatch = useDispatch();

  const updateStateLikes = useCallback(
    async (
      collection,
      likesType,
      setLikesType,
      isLikedMessageType,
      messageId,
    ) => {
      try {
        setDisabled(true);

        const data = {
          collection,
          messageId,
          forumId,
          count: utils.getLikeCount(likesType, isLikedMessageType),
          userId: uid,
          action: isLikedMessageType ? 'remove' : 'add',
        };

        await firebaseService.updateLikeCount(data, dispatch);

        await firebaseService
          .getDocumentById(collection, messageId)
          .then(document => {
            if (document.exists) {
              setLikesType(document.data());
            }
          });

        setDisabled(false);
      } catch (error) {
        console.error(error);
        dispatch(actions.setError(extractErrorMessage(error)));
      }
    },
    [],
  );

  const showToastAndroid = useCallback(likeType => {
    utils.showToast(`You can't ${likeType} your own message`);
  }, []);

  const updateLike = useCallback(() => {
    if (isOwner) return showToastAndroid('like');

    if (isDisLikedMessage) updateDislike();

    updateStateLikes('likes', likes, setLikes, isLikedMessage, messageId);
  }, [likes, isLikedMessage, isDisLikedMessage, messageId]);

  const updateDislike = useCallback(() => {
    if (isOwner) return showToastAndroid('dislike');

    if (isLikedMessage) updateLike();

    updateStateLikes(
      'dislikes',
      dislikes,
      setDislikes,
      isDisLikedMessage,
      messageId,
    );
  }, [dislikes, isDisLikedMessage, isLikedMessage, messageId]);

  useEffect(() => {
    firebaseService
      .getDocumentById('likes', messageId)
      .then(document => {
        if (document.exists) setLikes(document.data());
      })
      .catch(error => {
        console.error(error);
        dispatch(actions.setError(extractErrorMessage(error)));
      });

    firebaseService
      .getDocumentById('dislikes', messageId)
      .then(document => {
        if (document.exists) setDislikes(document.data());
      })
      .catch(error => {
        console.error(error);
        dispatch(actions.setError(extractErrorMessage(error)));
      });
  }, [messageId]);

  useMemo(() => {
    if (likes) {
      const liked = likes.usersId.includes(uid);
      setIsLikedMessage(liked);
    }

    if (dislikes) {
      const disliked = dislikes.usersId.includes(uid);
      setIsDisLikedMessage(disliked);
    }
  }, [likes, dislikes]);

  return (
    <View style={[styles.container, {minWidth: width * 0.3}]}>
      <View style={styles.likeContainer}>
        <View style={styles.dislikeBlock}>
          <Icon
            type="antdesign"
            name={isDisLikedMessage ? 'dislike1' : 'dislike2'}
            color="red"
            disabled={disabled}
            disabledStyle={styles.disabledIcon}
            onPress={updateDislike}
          />
          <Text style={styles.countText}>{dislikes ? dislikes.count : 0}</Text>
        </View>

        <View style={styles.likeBlock}>
          <Icon
            type="antdesign"
            name={isLikedMessage ? 'like1' : 'like2'}
            color="gold"
            disabled={disabled}
            disabledStyle={styles.disabledIcon}
            onPress={updateLike}
          />
          <Text style={styles.countText}>{likes ? likes.count : 0}</Text>
        </View>
      </View>

      <Text style={styles.time}>
        {new Date(creationTime)
          .toLocaleTimeString()
          .split(':')
          .slice(0, 2)
          .join(':')}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  likeContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  likeBlock: {
    flexDirection: 'row',
    marginRight: 20,
    alignItems: 'flex-end',
  },
  dislikeBlock: {
    marginRight: 20,
    flexDirection: 'row',
    alignItems: 'center',
    alignItems: 'flex-end',
  },
  disabledIcon: {
    backgroundColor: 'transparent',
  },
  countText: {
    fontSize: 11,
    color: '#696A6C',
    marginLeft: 3,
  },
  time: {
    alignSelf: 'flex-end',
    fontSize: 10,
    color: '#696A6C',
  },
});
