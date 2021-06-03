import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Avatar} from 'react-native-elements';

export const OwnerInfo = React.memo(({forum}) => {
  return (
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
  },
});
