import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export const Genre = ({genre, onChangeGenre, currentGenreID, mode}) => {
  const isMarker = genre.id === currentGenreID && mode === 'genre';

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => onChangeGenre(genre.id)}
        style={[styles.touchArea, isMarker && styles.active]}>
        <Text style={[styles.title, isMarker && styles.activeTitle]}>
          {genre.name}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },

  touchArea: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: '#828282',
    borderWidth: 1.5,
    borderRadius: 20,
    height: 45,
  },
  title: {
    color: '#000',
  },
  activeTitle: {
    color: '#FC6283',
    fontWeight: 'bold',
  },

  active: {backgroundColor: '#E4EFF4'},
});
