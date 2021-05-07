import React, {useEffect} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useQuery} from 'react-query';
import * as api from '../../../api/moviesApi';
import * as actionsMovie from '../../../store/movies/actions';
import {Genre} from './Genre';

export const Genres = () => {
  const {data, isLoading, isError, error} = useQuery('genres', api.getGenres);
  const dispatch = useDispatch();

  useEffect(() => data && dispatch(actionsMovie.setGenres(data.genres)), [
    data,
  ]);

  const genres =
    data && data.genres.map(genre => <Genre key={genre.id} genre={genre} />);

  return (
    <ScrollView contentContainerStyle={styles.container} horizontal={true}>
      {genres}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    //  height: 45,
    padding: 10,
    //  backgroundColor: 'blue',
  },
});
