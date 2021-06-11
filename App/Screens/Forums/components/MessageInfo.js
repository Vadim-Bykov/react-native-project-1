import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {useSelector} from 'react-redux';
import * as selectors from '../../../store/auth/selectors';

export const MessageInfo = ({creationTime, messageId}) => {
  const {width} = useWindowDimensions();
  const [likes, setLikes] = useState(null);
  const [dislikes, setDislikes] = useState(null);
  const [likedMessage, setLikedMessage] = useState(false);
  const [dislikedMessage, setDislikedMessage] = useState(false);
  const {
    _user: {uid},
  } = useSelector(selectors.getUser);

  const mesLikes = {
    forumId: 1111,
    likesCount: 2,
    messageId: 12345,
    usersId: ['U7wxAYR27aaWqU1PrPyjqeXaH2B2'],
  };
  const mesDislikes = {
    forumId: 1111,
    dislikesCount: 1,
    messageId: 12345,
    usersId: ['U7wxAYR27aaWqU1PrPyjqeXaH2B2!'],
  };

  useEffect(() => {
    setLikes(mesLikes);
    setDislikes(mesDislikes);
  }, []);

  useEffect(() => {
    if (likes) {
      const liked = likes.usersId.includes(uid);
      setLikedMessage(liked);
      console.log(liked);
    }

    if (dislikes) {
      const disliked = dislikes.usersId.includes(uid);
      setDislikedMessage(disliked);
      console.log(disliked);
    }
  }, [likes, dislikes]);

  return (
    <View style={[styles.container, {minWidth: width * 0.3}]}>
      <View style={styles.likeContainer}>
        {dislikes && (
          <View style={styles.dislikeBlock}>
            <Icon
              type="antdesign"
              name={dislikedMessage ? 'dislike1' : 'dislike2'}
              color="red"
              onPress={!dislikedMessage ? () => console.log('Dislike') : null}
            />
            <Text>{dislikes.dislikesCount}</Text>
          </View>
        )}

        {likes && (
          <View style={styles.likeBlock}>
            <Icon
              type="antdesign"
              name={likedMessage ? 'like1' : 'like2'}
              color="gold"
              onPress={!likedMessage ? () => console.log('Like') : null}
            />
            <Text>{likes.likesCount}</Text>
          </View>
        )}
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
    //  backgroundColor: 'blue',
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
  time: {
    alignSelf: 'flex-end',
    fontSize: 10,
    color: '#696A6C',
  },
});
