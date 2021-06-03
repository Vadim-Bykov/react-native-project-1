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
    width: '90%',
    backgroundColor: 'white',
    alignSelf: 'center',
    padding: 10,
    marginTop: 20,
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
