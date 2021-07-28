import {useNavigation} from '@react-navigation/core';
import {useTheme} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {ListItem} from 'react-native-elements';
import {COLOR_PURPLE} from '../../../consts/consts';
import {OwnerInfo} from './OwnerInfo';

export const ForumNativeElement = React.memo(({forum}) => {
  const navigation = useNavigation();
  const {colors} = useTheme();

  const goToForum = useCallback(
    () =>
      navigation.navigate('Forum', {
        forum: {
          forumId: forum.documentId,
          title: forum.title,
        },
      }),
    [forum],
  );

  return (
    <ListItem
      bottomDivider
      onPress={goToForum}
      activeOpacity={1}
      underlayColor={colors.border}
      containerStyle={styles(colors.textGray).container}>
      <OwnerInfo userRefPath={forum.userRef.path} />
      <ListItem.Content>
        <ListItem.Title style={styles(colors.text).text}>
          {forum.title}
        </ListItem.Title>
        <ListItem.Subtitle style={styles(colors.textGray).text}>
          {forum.description}
        </ListItem.Subtitle>
        <ListItem.Subtitle
          style={[styles().creationTime, styles(colors.textGray).text]}>
          {new Date(forum.creationTime).toDateString()}
        </ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron iconProps={{size: 32, color: COLOR_PURPLE}} />
    </ListItem>
  );
});

const styles = color =>
  StyleSheet.create({
    container: {
      backgroundColor: 'transparent',
      borderColor: color,
    },

    creationTime: {
      fontSize: 11,
      fontStyle: 'italic',
    },

    text: {
      color,
    },
  });
