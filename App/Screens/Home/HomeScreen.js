import React, {useEffect} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {useQueries, useQuery} from 'react-query';
import {useDispatch, useSelector} from 'react-redux';
import * as api from '../../api/moviesApi';
import {Loader} from '../../common/Loader';
import * as thunks from '../../store/auth/operations';
import * as selectors from '../../store/auth/selectors';
import {Genres} from './components/Genres';

export const HomeScreen = () => {
  const movies = useQuery('movies', () => api.getMovies('popular'));

  // const [genres, movies] = useQueries([
  //   {queryKey: ['genres', 1], queryFn: api.getGenres},
  //   {queryKey: ['movies', 2], queryFn: () => api.getMovies('popular')},
  // ]);
  // console.log(fullData);

  console.log(movies.data);

  return (
    <>
      {/* {isFetching && <Loader />} */}
      {/* {error && <Error />} */}

      <View style={styles.container}>
        <Genres />
        <Genres />
        <Genres />
        <Genres />
        <Text>Hello</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    zIndex: 0,
    backgroundColor: 'yellow',
  },
});

const genres = [
  {id: 28, name: 'Action'},
  {id: 12, name: 'Adventure'},
  {id: 16, name: 'Animation'},
  {id: 35, name: 'Comedy'},
  {id: 80, name: 'Crime'},
  {id: 99, name: 'Documentary'},
  {id: 18, name: 'Drama'},
  {id: 10751, name: 'Family'},
  {id: 14, name: 'Fantasy'},
  {id: 36, name: 'History'},
  {id: 27, name: 'Horror'},
  {id: 10402, name: 'Music'},
  {id: 9648, name: 'Mystery'},
  {id: 10749, name: 'Romance'},
  {id: 878, name: 'Science Fiction'},
  {id: 10770, name: 'TV Movie'},
  {id: 53, name: 'Thriller'},
  {id: 10752, name: 'War'},
  {id: 37, name: 'Western'},
];
