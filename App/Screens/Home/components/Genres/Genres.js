import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Genre} from './Genre';
import {useMovieContext} from '../../HomeScreenProvider';

export const Genres = () => {
  const {onChangeGenre, currentGenreID, genresApi} = useMovieContext();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.containerStyle}
      horizontal={true}
      showsHorizontalScrollIndicator={false}>
      {genresApi &&
        genresApi.map((genre, i) => (
          <Genre
            key={genre.id}
            genre={genre}
            currentGenreID={currentGenreID}
            onChangeGenre={onChangeGenre}
          />
        ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
  },
  containerStyle: {
    padding: 10,
    marginBottom: 20,
  },
});
