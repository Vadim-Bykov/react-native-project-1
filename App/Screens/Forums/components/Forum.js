import {useNavigation} from '@react-navigation/core';
import React, {useCallback} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
// import {Icon} from 'react-native-elements';
import {Avatar} from 'react-native-elements';

export const Forum = React.memo(({forum}) => {
  const navigation = useNavigation();

  const goToForum = useCallback(
    () => navigation.navigate('Forum', {id: forum.id}),
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
      </View>

      <View style={styles.ownerInfo}>
        {forum.user.photoURL ? (
          <Avatar rounded source={{uri: forum.user.photoURL}} />
        ) : (
          <View style={styles.badge}>
            <Text style={styles.ownerName}>{forum.user.name.slice(0, 1)}</Text>
          </View>
        )}

        <Text>{forum.user.name}</Text>
        <Text>{forum.date}</Text>
      </View>
    </TouchableOpacity>
  );
});
const BADGE_COLORS = [
  '#FF00AE',
  '#7CFC00',
  '#3AE2CE',
  '#FFDD00',
  '#8A2BE2',
  '#D2691E',
  '#6495ED',
  '#DC143C',
  '#FF8C00',
  '#F4A460',
];

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
  ownerInfo: {
    alignItems: 'flex-end',
  },
  badge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: BADGE_COLORS[Math.round(Math.random() * 10)],
    justifyContent: 'center',
    alignItems: 'center',
  },
  ownerName: {
    color: '#fff',
    fontSize: 20,
    // fontWeight: 'bold',
  },
  // icon: {
  //   top: 5,
  //   right: 5,
  //   // zIndex: 10,
  // },
});
