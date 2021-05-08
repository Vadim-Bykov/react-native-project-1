import React, {useEffect} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import * as api from '../../../api/moviesApi';
import * as actionsMovie from '../../../store/movies/actions';
import {Genre} from './Genre';
import {Loader} from '../../../common/Loader';
import {getGenres} from '../../../store/movies/selectors';

export const Genres = ({apiGenres}) => {
  const {data} = apiGenres;
  const dispatch = useDispatch();
  useEffect(
    () =>
      data &&
      dispatch(actionsMovie.setGenres([{id: 0, name: 'All'}, ...data.genres])),
    [data],
  );

  const genres = useSelector(getGenres);

  const onChangeGenre = id => {
    dispatch(actionsMovie.setActiveGenre(id));
  };

  return (
    <>
      <ScrollView
        style={styles.containerStyle}
        contentContainerStyle={styles.container}
        horizontal={true}>
        {genres &&
          genres.map((genre, i) => (
            <Genre key={genre.id} genre={genre} onChangeGenre={onChangeGenre} />
          ))}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    //  height: 45,
    padding: 10,
    //  backgroundColor: 'blue',
  },
  containerStyle: {
    flexGrow: 0,
  },
});
