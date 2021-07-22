import React, {useCallback} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {Avatar} from 'react-native-elements/dist/avatar/Avatar';
import {BASE_IMAGE_URL, DEFAULT_AVATAR} from '../../../../consts/consts';

export const CastInfo = ({castInfo}) => {
  const renderCast = useCallback(
    ({item}) => (
      <View style={styles.profile}>
        <Avatar
          rounded
          source={{
            uri: item.profile_path
              ? `${BASE_IMAGE_URL}w185/${item.profile_path}`
              : DEFAULT_AVATAR,
          }}
          size={60}
          containerStyle={{marginBottom: 12}}
        />
        <Text>{item.name}</Text>
        <Text style={styles.character}>{item.character}</Text>
      </View>
    ),
    [castInfo.cast],
  );

  return (
    <View style={styles.castBlock}>
      <Text style={styles.castTitle}>Cast & Crew</Text>
      <FlatList
        data={castInfo.cast}
        renderItem={renderCast}
        keyExtractor={item => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  castBlock: {
    paddingHorizontal: 32,
    marginBottom: 24,
  },
  castTitle: {
    fontSize: 24,
    marginBottom: 14,
  },
  profile: {
    alignItems: 'center',
    marginRight: 16,
  },
  character: {
    color: '#9A9BB3',
  },
});
