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

export const COLOR_WHITE = '#ffffff';
export const COLOR_BLACK = '#000000';
export const COLOR_DARK_YELLOW = '#DDBA33';
export const COLOR_PURPLE = '#8B5AB1';
export const COLOR_BLUE = '#5535E5';
export const COLOR_GRAY = '#6A6A6A';
export const COLOR_TRANSLUCENT_PURPLE = '#E9DCFB';
export const COLOR_ROSE_RED = '#FF005F';
export const COLOR_GREEN = '#3AD900';
export const DEFAULT_BG_COLOR = '#F1F1F1';
export const BG_COLOR_TRANSPARENT_GRAY = 'rgba(0,0,0, 0.4)';

export const COLORS_LIGHT_THEME = {
  background: 'rgb(242, 242, 242)',
  backgroundBlue: '#CDE6FF',
  backgroundGray: '#EBEBEB',
  border: 'rgb(216, 216, 216)',
  card: 'rgb(255, 255, 255)',
  notification: 'rgb(255, 59, 48)',
  primary: 'rgb(0, 122, 255)',
  text: 'rgb(28, 28, 30)',
  textGray: '#6A6A6A',
};

export const COLORS_DARK_THEME = {
  background: 'rgb(1, 1, 1)',
  backgroundBlue: '#ABD2FF',
  backgroundGray: '#BFBFBF',
  border: 'rgb(39, 39, 41)',
  card: 'rgb(18, 18, 18)',
  notification: 'rgb(255, 69, 58)',
  primary: 'rgb(10, 132, 255)',
  text: 'rgb(229, 229, 231)',
  textGray: '#A1A1A1',
};
