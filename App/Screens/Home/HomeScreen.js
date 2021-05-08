import React, {useEffect} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {useQueries, useQuery} from 'react-query';
import {useDispatch, useSelector} from 'react-redux';
import * as api from '../../api/moviesApi';
import {Loader} from '../../common/Loader';
import {setError} from '../../store/auth/actions';
import * as thunks from '../../store/auth/operations';
import * as selectors from '../../store/auth/selectors';
import {Genres} from './components/Genres';

export const HomeScreen = () => {
  // const {data, isLoading, isError, error} = useQuery('genres', api.getGenres);
  // const movies = useQuery('movies', () => api.getMovies('popular'));
  const error = useSelector(selectors.getErrorMessage);
  const dispatch = useDispatch();

  const [genres, movies] = useQueries([
    {queryKey: ['genres', 1], queryFn: api.getGenres},
    {queryKey: ['movies', 2], queryFn: () => api.getMovies('popular')},
  ]);

  useEffect(() => {
    if (genres.isError)
      dispatch(setError(genres.error.response.data.status_message.toString()));
    if (movies.isError)
      dispatch(setError(movies.error.response.data.status_message));
  }, [genres.isError, movies.isError]);

  // console.log(error);

  return (
    <>
      {error && <Error />}
      {(genres.isLoading || movies.isLoading) && <Loader />}
      <View style={styles.container}>
        <Genres apiGenres={genres} />
        <Text>Hello</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    zIndex: 0,
    backgroundColor: 'yellow',
    paddingTop: 50,
  },
});
