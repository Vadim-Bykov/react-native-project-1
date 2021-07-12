import axios from 'axios';

const authData = {
  access_token:
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNzJjOWNkMTEzNzU0MTMwNTNiY2NkNmIzZTZhYWVmZSIsImp0aSI6IjMyNTM4MjMiLCJzdWIiOiI2MDkyZjhjNGYzYjQ5YTAwMmExZTQxMjQiLCJ2ZXJzaW9uIjoxLCJzY29wZXMiOlsiYXBpX3JlYWQiLCJhcGlfd3JpdGUiXSwibmJmIjoxNjI2MTEyODg2fQ.9mVNz0IPt_kAL8rR0jk63h_uIfe6EM9bw1PdEce6ecc',
  account_id: '6092f8c4f3b49a002a1e4124',
  status_code: 1,
  status_message: 'Success.',
  success: true,
};

const listData = {
  id: 7101319,
  status_code: 1,
  status_message: 'The item/record was created successfully.',
  success: true,
  name: {
    name: 'My Cool List',
    iso_639_1: 'en',
  },
};

const itemBody = {
  items: [
    {
      media_type: 'movie',
      media_id: 550,
    },
    {
      media_type: 'movie',
      media_id: 244786,
    },
    {
      media_type: 'tv',
      media_id: 1396,
    },
  ],
};

const addItemURL = 'https://api.themoviedb.org/4/list/7101319/items';

const getListResponse = {
  average_rating: 8.50333,
  backdrop_path: null,
  comments: {
    'movie:244786': null,
    'movie:550': null,
    'tv:1396': null,
  },
  created_by: {
    gravatar_hash: 'e67e50969c199231a643c530e9980230',
    id: '6092f8c4f3b49a002a1e4124',
    name: '',
    username: 'bvntaev1981',
  },
  description: '',
  id: 7101319,
  iso_3166_1: 'US',
  iso_639_1: 'en',
  name: 'My Cool List',
  object_ids: {
    'movie:244786': '52b6df9e19c295223b045401',
    'movie:550': '4bc88fc1017a3c122d009254',
    'tv:1396': '52542271760ee31328000489',
  },
  page: 1,
  poster_path: null,
  public: true,
  results: [
    {
      adult: false,
      backdrop_path: '/rr7E0NoGKxvbkb89eR1GwfoYjpA.jpg',
      genre_ids: [18],
      id: 550,
      media_type: 'movie',
      original_language: 'en',
      original_title: 'Fight Club',
      overview:
        'A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground "fight clubs" forming in every town, until an eccentric gets in the way and ignites an out-of-control spiral toward oblivion.',
      popularity: 50.818,
      poster_path: '/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg',
      release_date: '1999-10-15',
      title: 'Fight Club',
      video: false,
      vote_average: 8.4,
      vote_count: 21991,
    },
    {
      adult: false,
      backdrop_path: '/fRGxZuo7jJUWQsVg9PREb98Aclp.jpg',
      genre_ids: [18, 10402],
      id: 244786,
      media_type: 'movie',
      original_language: 'en',
      original_title: 'Whiplash',
      overview:
        'Under the direction of a ruthless instructor, a talented young drummer begins to pursue perfection at any cost, even his humanity.',
      popularity: 38.655,
      poster_path: '/9E949mB5NEq3BZu9nHQgWF2uGGN.jpg',
      release_date: '2014-10-10',
      title: 'Whiplash',
      video: false,
      vote_average: 8.4,
      vote_count: 11194,
    },
    {
      backdrop_path: '/tsRy63Mu5cu8etL1X7ZLyf7UP1M.jpg',
      first_air_date: '2008-01-20',
      genre_ids: [18],
      id: 1396,
      media_type: 'tv',
      name: 'Breaking Bad',
      origin_country: ['US'],
      original_language: 'en',
      original_name: 'Breaking Bad',
      overview:
        "When Walter White, a New Mexico chemistry teacher, is diagnosed with Stage III cancer and given a prognosis of only two years left to live. He becomes filled with a sense of fearlessness and an unrelenting desire to secure his family's financial future at any cost as he enters the dangerous world of drugs and crime.",
      popularity: 264.932,
      poster_path: '/ggFHVNu6YYI5L9pCfOacjizRGt.jpg',
      vote_average: 8.7,
      vote_count: 7243,
    },
  ],
  revenue: 113945753,
  runtime: 291,
  sort_by: 'original_order.asc',
  total_pages: 1,
  total_results: 3,
};

const response = {
  results: [
    {
      media_id: 550,
      media_type: 'movie',
      sort_order: 1,
      success: true,
    },
    {
      media_id: 244786,
      media_type: 'movie',
      sort_order: 2,
      success: true,
    },
    {
      media_id: 1396,
      media_type: 'tv',
      sort_order: 3,
      success: true,
    },
  ],
  status_code: 1,
  status_message: 'Success.',
  success: true,
};

const listInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/4/list/7101319',
  params: {
    api_key: 'a72c9cd11375413053bccd6b3e6aaefe',
    access_token:
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNzJjOWNkMTEzNzU0MTMwNTNiY2NkNmIzZTZhYWVmZSIsImp0aSI6IjMyNTM4MjMiLCJzdWIiOiI2MDkyZjhjNGYzYjQ5YTAwMmExZTQxMjQiLCJ2ZXJzaW9uIjoxLCJzY29wZXMiOlsiYXBpX3JlYWQiLCJhcGlfd3JpdGUiXSwibmJmIjoxNjI2MTEyODg2fQ.9mVNz0IPt_kAL8rR0jk63h_uIfe6EM9bw1PdEce6ecc',
    language: 'en-US',
    page: 1,
  },
});

export const getList = (page = 1) => {
  listInstance.defaults.params.page = page;
  return listInstance.get().then(res => res.data);
};

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
