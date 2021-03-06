import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  params: {
    api_key: 'a72c9cd11375413053bccd6b3e6aaefe',
    language: 'en-US',
    page: 1,
  },
});

export const getMovies = (movieType, page = 1) => {
  instance.defaults.params.page = page;
  return instance.get(`movie/${movieType}`).then(res => res.data);
};

export const getGenres = () =>
  instance.get(`genre/movie/list`).then(res => res.data);

export const getDetails = movieId =>
  instance.get(`movie/${movieId}`).then(res => res.data);

export const getCastInfo = movieId =>
  instance.get(`movie/${movieId}/credits`).then(res => res.data);

export const getMoviesByGenre = (genreId, page = 1) => {
  instance.defaults.params.page = page;
  return instance
    .get(
      `discover/movie?&include_adult=false&include_video=false&with_genres=${genreId}`,
    )
    .then(res => res.data);
};
