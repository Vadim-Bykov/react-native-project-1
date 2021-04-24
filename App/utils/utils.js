import {Dimensions} from 'react-native';

export const getWidthWindow = () => {
  const dim = Dimensions.get('window');
  return dim.width;
};
