import React, {createContext, useContext, useEffect, useState} from 'react';
import {useQuery} from 'react-query';
import {useDispatch} from 'react-redux';
import * as api from '../../api/moviesApi';
import {setError} from '../../store/auth/actions';
import {HomeScreen} from './HomeScreen';

export const MoviesContext = createContext();

export const useMovieContext = () => useContext(MoviesContext);

export const HomeScreenProvider = ({navigation}) => {
  const [currentSection, setCurrentSection] = useState('popular');
  const [shownMovies, setShownMovies] = useState(null);
  const [currentGenreID, setCurrentGenreID] = useState(0);
  const [genresApi, setGenresApi] = useState(null);
  const [focus, setFocus] = useState(false);
  const [movieData, setMovieData] = useState(null);
  const [activeIndex, setActiveIndex] = useState(1);

  const dispatch = useDispatch();

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
    setActiveIndex(1);
  };

  const onChangeSection = name => {
    setCurrentSection(name);
    // setCurrentGenreID(0);
    setActiveIndex(1);
  };

  const goToMovieDetails = movieId => navigation.navigate('Details', {movieId});

  return (
    <MoviesContext.Provider
      value={{
        genres,
        movies,
        shownMovies,
        currentSection,
        onChangeSection,
        genresApi,
        currentGenreID,
        onChangeGenre,
        goToMovieDetails,
        focus,
        setFocus,
        movieData,
        setMovieData,
        activeIndex,
        setActiveIndex,
      }}>
      <HomeScreen />
    </MoviesContext.Provider>
  );
};
