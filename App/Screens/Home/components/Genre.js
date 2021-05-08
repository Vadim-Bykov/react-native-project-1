import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setGenres} from '../../../store/movies/actions';
import * as selectors from '../../../store/movies/selectors';

export const Genre = ({genre, onChangeGenre}) => {
  const activeGenreId = useSelector(selectors.getActiveGenre);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => onChangeGenre(genre.id)}
        style={[styles.touchArea, genre.id === activeGenreId && styles.active]}>
        <Text>{genre.name}</Text>
      </TouchableOpacity>
      {genre.id === activeGenreId && <View style={styles.dash} />}
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
    borderWidth: 1,
    borderRadius: 20,
    height: 45,
    marginBottom: 10,
  },
  dash: {
    width: '50%',
    borderWidth: 2,
    borderColor: '#7FFFD4',
  },
  active: {backgroundColor: '#7FFFD4'},
});
