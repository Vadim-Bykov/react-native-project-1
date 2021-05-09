export const BASE_IMAGE_URL = 'http://image.tmdb.org/t/p/';

import {CardStyleInterpolators} from '@react-navigation/stack';

export const STACK_CONFIG = {
  animation: 'timing',
  config: {
    duration: 200,
  },
};

export const STACK_SCREEN_OPTIONS = {
  transitionSpec: {open: STACK_CONFIG, close: STACK_CONFIG},
  cardStyle: {backgroundColor: 'transparent'},
  cardOverlayEnabled: true,
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  gestureEnabled: true,
  gestureDirection: 'horizontal',
};

export const movieSections = [
  {title: 'Popular', request: 'popular'},
  {title: 'Now Playing', request: 'now_playing'},
  {title: 'Coming soon', request: 'upcoming'},
];
