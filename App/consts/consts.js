import {CardStyleInterpolators} from '@react-navigation/stack';

export const BASE_IMAGE_URL = 'http://image.tmdb.org/t/p/';

export const DEFAULT_AVATAR =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROZzxwSXuX4cnu0J_5Rry0_Al5RqAafnKT3A&usqp=CAU';

export const DEFAULT_MOVIE_IMAGE =
  'https://target.scene7.com/is/image/Target/GUEST_e684225b-5a68-49b2-8fc3-493e515ef4ca?wid=488&hei=488&fmt=pjpeg';

export const STACK_CONFIG = {
  animation: 'timing',
  config: {
    duration: 200,
  },
};

export const STACK_SCREEN_OPTIONS = {
  transitionSpec: {open: STACK_CONFIG, close: STACK_CONFIG},
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

export const COLOR_WHITE = '#fff';
export const COLOR_BLACK = '#000';
export const COLOR_DARK_YELLOW = '#DDBA33';
export const COLOR_PURPLE = '#8B5AB1';
export const COLOR_BLUE = '#5535E5';
export const COLOR_GRAY = '#6A6A6A';
export const COLOR_TRANSLUCENT_PURPLE = '#E9DCFB';
export const COLOR_ROSE_RED = '#FF005F';
export const DEFAULT_BG_COLOR = '#F1F1F1';
