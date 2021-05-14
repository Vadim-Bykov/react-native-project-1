import {
  useAnimatedIndex,
  useFocus,
  useIndex,
  usePager,
} from '@crowdlinker/react-native-pager';
import React, {useEffect} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  View,
  Animated,
} from 'react-native';
import {BASE_IMAGE_URL} from '../../../../consts/consts';
import {useMovieContext} from '../../HomeScreenProvider';
import BottomPart from './BottomPart';

export const Slide = ({movie, width, goToMovieDetails}) => {
  const focused = useFocus();
  const {setFocus} = useMovieContext();

  useEffect(() => {
    if (focused) {
      setFocus(focused);
    }
  }, [focused]);

  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => goToMovieDetails(movie.id)}
        style={[
          {...styles.container, height: width * 0.9, width: width * 0.68},
          focused && {elevation: 15},
        ]}>
        <Image
          source={{uri: `${BASE_IMAGE_URL}w300/${movie.poster_path}`}}
          style={{
            ...styles.image,
            height: width * 0.9,
            width: width * 0.68,
          }}
        />
      </TouchableOpacity>
      {/* {focused && <BottomPart movie={movie} focused={focused} />} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    borderRadius: 20,
    elevation: 20,
  },
  image: {
    borderRadius: 20,
    alignSelf: 'center',
  },
});
