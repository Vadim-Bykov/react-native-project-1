import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {useQuery} from 'react-query';
import {useDispatch} from 'react-redux';
import * as api from '../../api/movieApiService';
import * as actions from '../../store/auth/actions';
import {HomeScreenComponent} from './HomeScreenComponent';

export const MoviesContext = createContext();

export const useMovieContext = () => useContext(MoviesContext);

export const HomeScreen = ({navigation}) => {
  const [currentSection, setCurrentSection] = useState('popular');
  const [shownMovies, setShownMovies] = useState(null);
  const [currentGenreID, setCurrentGenreID] = useState(0);
  const [genresApi, setGenresApi] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [pagerRef, setPagerRef] = useState(null);
  const [isBottomPart, setIsBottomPart] = useState(true);
  const [mode, setMode] = useState('section');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [inputText, setInputText] = useState(null);
  const [moviesInstance, setMoviesInstance] = useState(null);
  const dispatch = useDispatch();

  const genres = useQuery('genres', api.getGenres);
  const movies = useQuery(
    'movies',
    () => api.getMovies(currentSection, currentPage),
    {keepPreviousData: true},
  );

  useEffect(() => {
    if (movies.data) {
      setShownMovies(movies.data.results);
      setMoviesInstance(movies.data.results);
      setTotalPages(movies.data.total_pages);
    }
  }, [movies.data]);

  useEffect(
    () =>
      genres.data &&
      setGenresApi([{id: 0, name: 'All'}, ...genres.data.genres]),
    [genres.data],
  );

  useEffect(() => {
    mode === 'section' &&
      movies.refetch().then(movies => {
        if (movies.data) {
          setShownMovies(movies.data.results);
          setMoviesInstance(movies.data.results);
          setInputText('');
        }
        setActiveIndex(0);
        pagerRef?.current?.setPageWithoutAnimation(0);
      });
  }, [currentSection, mode, currentPage]);

  useEffect(() => {
    if (movies.isError)
      dispatch(actions.setError(movies.error.response.data.status_message));

    if (genres.isError)
      dispatch(
        actions.setError(genres.error.response.data.status_message.toString()),
      );
  }, [genres.isError, movies.isError]);

  useEffect(() => {
    mode === 'genre' && genreRequest(currentGenreID, currentPage);
  }, [mode, currentGenreID, currentPage]);

  const onChangeGenre = useCallback(
    (genreId = currentGenreID) => {
      if (mode === 'genre' && genreId === currentGenreID) return;

      setCurrentGenreID(genreId);
      setCurrentPage(1);
      setMode('genre');
      // setInputText('');
    },
    [currentGenreID, mode],
  );

  const genreRequest = useCallback(
    async (genreId = currentGenreID, page = 1) => {
      try {
        dispatch(actions.setIsFetching(true));

        const shownMovies =
          genreId === 0
            ? await api.getMovies(currentSection, page)
            : await api.getMoviesByGenre(genreId, page);

        if (shownMovies) {
          setShownMovies(shownMovies.results);
          setMoviesInstance(shownMovies.results);
          setTotalPages(shownMovies.total_pages);
          setActiveIndex(0);
          setInputText('');
        }

        if (pagerRef && pagerRef.current)
          pagerRef.current.setPageWithoutAnimation(0);

        dispatch(actions.setIsFetching(false));
      } catch (error) {
        dispatch(actions.setError(error.response.data.status_message));
        console.error(error);

        dispatch(actions.setIsFetching(false));
      }
    },
    [currentGenreID, pagerRef],
  );

  const onChangeSection = useCallback(
    name => {
      if (mode === 'section' && name === currentSection) return;

      setCurrentSection(name);
      setCurrentPage(1);
      setMode('section');
      setInputText('');
    },
    [currentSection, mode],
  );

  const goToMovieDetails = useCallback(
    movieId => navigation.navigate('Details', {movieId}),
    [navigation],
  );

  const onNextPage = useCallback(() => {
    currentPage === totalPages
      ? setCurrentPage(prev => prev)
      : setCurrentPage(prev => prev + 1);
  }, [currentPage, totalPages]);

  const onPrevPage = useCallback(() => {
    currentPage === 1
      ? setCurrentPage(prev => prev)
      : setCurrentPage(prev => prev - 1);
  }, [currentPage]);

  return (
    <MoviesContext.Provider
      value={{
        genres,
        movies,
        shownMovies,
        setShownMovies,
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
        currentPage,
        setCurrentPage,
        totalPages,
        onNextPage,
        onPrevPage,
        pagerRef,
        inputText,
        setInputText,
        moviesInstance,
      }}>
      <HomeScreenComponent />
    </MoviesContext.Provider>
  );
};
