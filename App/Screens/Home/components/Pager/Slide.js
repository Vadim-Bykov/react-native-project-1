import React from 'react';
import {StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {BASE_IMAGE_URL} from '../../../../consts/consts';
import {useMovieContext} from '../../HomeScreenProvider';

export const Slide = ({movie, width, goToMovieDetails, index, lastIndex}) => {
  const {
    shownMovies,
    activeIndex,
    currentPage,
    totalPages,
    onNextPage,
    onPrevPage,
  } = useMovieContext();

  const focused = shownMovies[activeIndex].id === movie.id;

  return (
    <>
      {index === 0 && (
        <Icon
          type="ionicon"
          name={currentPage === 1 ? 'ios-arrow-undo-outline' : 'ios-arrow-undo'}
          size={40}
          color="#FF6666"
          onPress={onPrevPage}
          containerStyle={[styles.arrowPrev, {top: width * 0.35}]}
        />
      )}

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => goToMovieDetails(movie.id)}
        style={[
          {...styles.container, height: width * 0.9, width: width * 0.68},
          focused && {elevation: 20},
        ]}>
        <Image
          source={{
            uri: movie.poster_path
              ? `${BASE_IMAGE_URL}w300/${movie.poster_path}`
              : 'https://target.scene7.com/is/image/Target/GUEST_e684225b-5a68-49b2-8fc3-493e515ef4ca?wid=488&hei=488&fmt=pjpeg',
          }}
          style={{
            ...styles.image,
            height: width * 0.9,
            width: width * 0.68,
          }}
        />
      </TouchableOpacity>

      {lastIndex === index && (
        <Icon
          type="ionicon"
          name={
            currentPage === totalPages
              ? 'ios-arrow-redo-outline'
              : 'ios-arrow-redo'
          }
          size={40}
          color="#FF6666"
          onPress={onNextPage}
          containerStyle={[styles.arrowNext, {top: width * 0.35}]}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    borderRadius: 20,
  },
  image: {
    borderRadius: 20,
    alignSelf: 'center',
  },
  arrowPrev: {
    position: 'absolute',
    left: 0,
  },
  arrowNext: {
    position: 'absolute',
    right: 0,
  },
});
