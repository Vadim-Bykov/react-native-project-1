import axios from 'axios';
import * as actions from '../store/auth/actions';

const apiKey = 'a72c9cd11375413053bccd6b3e6aaefe';

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  params: {
    api_key: 'a72c9cd11375413053bccd6b3e6aaefe',
    language: 'en-US',
    page: 1,
  },
});

export const getMovies = movieType => {
  return instance.get(`movie/${movieType}`).then(res => res.data);
  // .catch(err => console.error(err));
};

export const getGenres = () =>
  instance.get(`genre/movie/list`).then(res => res.data);
// .catch(err => console.error(err));
