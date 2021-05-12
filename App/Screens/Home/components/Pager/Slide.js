import {useFocus} from '@crowdlinker/react-native-pager';
import React from 'react';
import {StyleSheet, TouchableOpacity, Image, Animated} from 'react-native';
import {BASE_IMAGE_URL} from '../../../../consts/consts';
import BottomPart from './BottomPart';

export const Slide = ({movie, width, goToMovieDetails, inlineCardsConfig}) => {
  const focused = useFocus();

  return (
    <Animated.View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => goToMovieDetails(movie.id)}
        style={[{...styles.container}, focused && {elevation: 15}]}>
        <Image
          source={{uri: `${BASE_IMAGE_URL}w300/${movie.poster_path}`}}
          style={{
            ...styles.image,
            height: width * 0.9,
            width: width * 0.68,
          }}
        />
      </TouchableOpacity>
      {focused && <BottomPart movie={movie} focused={focused} />}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    borderRadius: 20,
  },
  image: {
    borderRadius: 20,
  },
});
