import {useNavigation} from '@react-navigation/core';
import React, {useCallback} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {OwnerInfo} from './OwnerInfo';

export const Forum = React.memo(({forum}) => {
  const navigation = useNavigation();

  const goToForum = useCallback(() => navigation.navigate('Forum', {forum}), [
    forum,
  ]);

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.6}
      onPress={goToForum}>
      <View style={styles.forumInfoBlock}>
        <Text style={styles.title}>{forum.title}</Text>
        <Text>{forum.description}</Text>
      </View>

      <OwnerInfo forum={forum} />
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: 'white',
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
    color: '#515CF0',
  },
});
