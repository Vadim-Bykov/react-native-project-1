import axios from 'axios';

const api_key = 'a72c9cd11375413053bccd6b3e6aaefe';

const listInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/4/list/7101319/',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    Authorization:
      'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNzJjOWNkMTEzNzU0MTMwNTNiY2NkNmIzZTZhYWVmZSIsImp0aSI6IjMyNTM4MjMiLCJzdWIiOiI2MDkyZjhjNGYzYjQ5YTAwMmExZTQxMjQiLCJ2ZXJzaW9uIjoxLCJzY29wZXMiOlsiYXBpX3JlYWQiLCJhcGlfd3JpdGUiXSwibmJmIjoxNjI2MTEyODg2fQ.9mVNz0IPt_kAL8rR0jk63h_uIfe6EM9bw1PdEce6ecc',
  },
});

const getDataObject = movieId => ({
  items: [
    {
      media_type: 'movie',
      media_id: movieId,
    },
  ],
});

export const getList = (page = 1) =>
  listInstance
    .get('', {params: {api_key, page, sort_by: 'original_order.desc'}})
    .then(res => res.data);

export const addMovie = movieId =>
  listInstance.post(`items`, getDataObject(movieId));

export const removeMovie = movieId =>
  listInstance.delete(`items`, {data: getDataObject(movieId)});
