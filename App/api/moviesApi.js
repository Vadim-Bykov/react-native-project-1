import axios from 'axios';
import * as actions from '../store/auth/actions';

const apiKey = 'a72c9cd11375413053bccd6b3e6aaefe';

const instance = axios.create({baseURL: 'https://api.themoviedb.org/3/'});

export const getMovies = (movieType, pageNumber = 1) =>
  instance
    .get(
      `movie/${movieType}?api_key=${apiKey}&language=en-US&page=${pageNumber}`,
    )
    .then(res => res.data)
    .catch(err => console.error(err));

const genresApi =
  'api.themoviedb.org/3/genre/movie/list?api_key=a72c9cd11375413053bccd6b3e6aaefe&language=en-US';

export const getGenres = () =>
  instance
    .get(`${baseURL}genre/movie/list?api_key=${apiKey}&language=en-US`)
    .then(res => res.data)
    .catch(err => console.error(err));
