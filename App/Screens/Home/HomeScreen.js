import React, {createContext, useEffect, useState} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {useQueries, useQuery} from 'react-query';
import {useDispatch, useSelector} from 'react-redux';
import * as api from '../../api/moviesApi';
import {Loader} from '../../common/Loader';
import {setError} from '../../store/auth/actions';
import * as thunks from '../../store/auth/operations';
import * as selectors from '../../store/auth/selectors';
import {Genres} from './components/Genres/Genres';
import {Pager} from './components/Pager/Pager';
import {Sections} from './components/Sections/Sections';

export const MoviesContext = createContext();

export const HomeScreen = () => {
  const [currentSection, setCurrentSection] = useState('popular');
  const [shownMovies, setShownMovies] = useState(null);
  const [currentGenreID, setCurrentGenreID] = useState(0);
  const [genresApi, setGenresApi] = useState(null);

  const dispatch = useDispatch();
  const error = useSelector(selectors.getErrorMessage);

  const genres = useQuery('genres', api.getGenres);
  const movies = useQuery('movies', () => api.getMovies(currentSection));
  useEffect(() => movies.refetch(), [currentSection]);

  useEffect(
    () =>
      genres.data &&
      setGenresApi([{id: 0, name: 'All'}, ...genres.data.genres]),
    [genres.data],
  );

  useEffect(() => {
    if (movies.data) {
      setShownMovies(movies.data.results);
      onChangeGenre();
    }
  }, [movies.data]);

  useEffect(() => {
    if (movies.isError)
      dispatch(setError(movies.error.response.data.status_message));

    if (genres.isError)
      dispatch(setError(genres.error.response.data.status_message.toString()));
  }, [genres.isError, movies.isError]);

  const onChangeGenre = (genreId = currentGenreID) => {
    const shownMovies = movies.data.results.filter(movie =>
      genreId === 0 ? movie : movie.genre_ids.includes(genreId),
    );
    setShownMovies(shownMovies);
    setCurrentGenreID(genreId);
  };

  const onChangeSection = name => {
    setCurrentSection(name);
    // setCurrentGenreID(0);
  };

  return (
    <MoviesContext.Provider
      value={{
        currentSection,
        onChangeSection,
        genresApi,
        currentGenreID,
        onChangeGenre,
      }}>
      {/* {error && <Error />} */}
      {(genres.isLoading || movies.isLoading) && <Loader />}

      <View style={styles.container}>
        <Sections />
        <Genres apiGenres={genres} />
        {shownMovies && <Pager movies={shownMovies} />}
      </View>
    </MoviesContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    zIndex: 0,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
});
