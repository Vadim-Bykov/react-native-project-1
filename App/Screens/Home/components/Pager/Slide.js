import React from 'react';
import {StyleSheet, TouchableOpacity, Image, View} from 'react-native';
import {BASE_IMAGE_URL} from '../../../../consts/consts';
import {useMovieContext} from '../../HomeScreenProvider';

export const Slide = ({movie, width, goToMovieDetails}) => {
  const {shownMovies, activeIndex} = useMovieContext();
  const focused = shownMovies[activeIndex].id === movie.id;

  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => goToMovieDetails(movie.id)}
        style={[
          {...styles.container, height: width * 0.9, width: width * 0.68},
          focused && {elevation: 20},
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    borderRadius: 20,
    // elevation: 20,
  },
  image: {
    borderRadius: 20,
    alignSelf: 'center',
  },
});
