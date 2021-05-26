import {CardStyleInterpolators} from '@react-navigation/stack';

export const BASE_IMAGE_URL = 'http://image.tmdb.org/t/p/';

export const STACK_CONFIG = {
  animation: 'timing',
  config: {
    duration: 200,
  },
};

export const STACK_SCREEN_OPTIONS = {
  transitionSpec: {open: STACK_CONFIG, close: STACK_CONFIG},
  cardOverlayEnabled: true,
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  gestureEnabled: true,
  gestureDirection: 'horizontal',
};

export const MOVIE_SECTIONS = [
  {title: 'Popular', request: 'popular'},
  {title: 'Now Playing', request: 'now_playing'},
  {title: 'Coming soon', request: 'upcoming'},
];

export const COMMON_ERROR_MESSAGE =
  'An error occurred, please try again later!';
