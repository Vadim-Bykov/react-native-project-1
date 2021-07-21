import {useNavigation} from '@react-navigation/core';
import React, {useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {ListItem} from 'react-native-elements';
import {COLOR_PURPLE} from '../../../consts/consts';
import {OwnerInfo} from './OwnerInfo';

export const ForumNativeElement = React.memo(({forum}) => {
  const navigation = useNavigation();

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
      underlayColor={'#E3E3E3'}
      containerStyle={{backgroundColor: 'transparent'}}>
      <OwnerInfo userRefPath={forum.userRef.path} />
      <ListItem.Content>
        <ListItem.Title>{forum.title}</ListItem.Title>
        <ListItem.Subtitle>{forum.description}</ListItem.Subtitle>
        <ListItem.Subtitle style={styles.creationTime}>
          {new Date(forum.creationTime).toDateString()}
        </ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron iconProps={{size: 32, color: COLOR_PURPLE}} />
    </ListItem>
  );
});

const styles = StyleSheet.create({
  creationTime: {
    fontSize: 11,
    fontStyle: 'italic',
  },
});
