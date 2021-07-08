import {useNavigation} from '@react-navigation/core';
import React, {useCallback} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLOR_BLACK} from '../../../consts/consts';
import {OwnerInfo} from './OwnerInfo';

export const Forum = React.memo(({forum}) => {
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
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.6}
      onPress={goToForum}>
      <View style={styles.forumInfoBlock}>
        <Text style={styles.title}>{forum.title}</Text>
        <Text>{forum.description}</Text>
        <Text style={styles.creationTime}>
          {new Date(forum.creationTime).toDateString()}
        </Text>
      </View>

      <OwnerInfo userRefPath={forum.userRef.path} />
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomColor: 'gray',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  forumInfoBlock: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: COLOR_BLACK,
    fontStyle: 'italic',
  },
  creationTime: {
    fontSize: 11,
    color: '#696A6C',
    marginTop: 5,
  },
});
