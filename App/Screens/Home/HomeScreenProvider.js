import React, {createContext, useContext, useEffect, useState} from 'react';
import {useQuery} from 'react-query';
import {useDispatch, useSelector} from 'react-redux';
import * as api from '../../api/moviesApi';
import * as actions from '../../store/auth/actions';
import {getIsFetching} from '../../store/auth/selectors';
import {HomeScreen} from './HomeScreen';

export const MoviesContext = createContext();

export const useMovieContext = () => useContext(MoviesContext);

export const HomeScreenProvider = ({navigation}) => {
  const [currentSection, setCurrentSection] = useState('popular');
  const [shownMovies, setShownMovies] = useState(null);
  const [currentGenreID, setCurrentGenreID] = useState(0);
  const [genresApi, setGenresApi] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [pagerRef, setPagerRef] = useState(null);
  const [isBottomPart, setIsBottomPart] = useState(true);
  const [mode, setMode] = useState('section');

  const dispatch = useDispatch();

  const genres = useQuery('genres', api.getGenres);
  const movies = useQuery('movies', () => api.getMovies(currentSection));

  const onChangeGenre = async (genreId = 14, page = 1) => {
    setMode('genre');
    try {
      // const shownMovies = await useQuery('moviesByGenre', () =>
      //   api.getMoviesByGenre(genreId, page),
      // );

      dispatch(actions.setIsFetching(true));

      const shownMovies =
        genreId === 0
          ? await api.getMovies(currentSection)
          : await api.getMoviesByGenre(genreId, page);

      console.log(shownMovies);

      if (shownMovies) {
        setShownMovies(shownMovies.results);
        setCurrentGenreID(genreId);
        setActiveIndex(0);
      }

      if (pagerRef && pagerRef.current)
        pagerRef.current.setPageWithoutAnimation(0);

      dispatch(actions.setIsFetching(false));
    } catch (error) {
      dispatch(actions.setError(error.response.data.status_message));
      console.error(error);

      dispatch(actions.setIsFetching(false));
    }
  };

  useEffect(() => {
    return movies.refetch().then(() => {
      setActiveIndex(0);
      pagerRef &&
        pagerRef.current &&
        pagerRef.current.setPageWithoutAnimation(0);
    });
  }, [currentSection]);

  useEffect(
    () =>
      genres.data &&
      setGenresApi([{id: 0, name: 'All'}, ...genres.data.genres]),
    [genres.data],
  );

  useEffect(() => {
    if (movies.data) {
      setShownMovies(movies.data.results);
      // onChangeGenre();
    }
  }, [movies.data]);

  useEffect(() => {
    if (movies.isError)
      dispatch(actions.setError(movies.error.response.data.status_message));

    if (genres.isError)
      dispatch(
        actions.setError(genres.error.response.data.status_message.toString()),
      );
  }, [genres.isError, movies.isError]);

  // const onChangeGenre = (genreId = currentGenreID) => {
  //   const shownMovies = movies.data.results.filter(movie =>
  //     genreId === 0 ? movie : movie.genre_ids.includes(genreId),
  //   );
  //   setShownMovies(shownMovies);
  //   setCurrentGenreID(genreId);
  //   setActiveIndex(0);

  //   if (pagerRef && pagerRef.current)
  //     pagerRef.current.setPageWithoutAnimation(0);
  // };

  const onChangeSection = name => {
    setCurrentSection(name);
    setMode('section');
    // setActiveIndex(0);

    // if (pagerRef && pagerRef.current)
    //   pagerRef.current.setPageWithoutAnimation(0);
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
        activeIndex,
        setActiveIndex,
        setPagerRef,
        isBottomPart,
        setIsBottomPart,
        mode,
        setMode,
      }}>
      <HomeScreen />
    </MoviesContext.Provider>
  );
};
