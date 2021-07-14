import React from 'react';
import {
  StyleSheet,
  Text,
  useWindowDimensions,
  TouchableOpacity,
  View,
} from 'react-native';
import {Card, Icon} from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import {
  BASE_IMAGE_URL,
  COLOR_DARK_YELLOW,
  COLOR_ROSE_RED,
  DEFAULT_MOVIE_IMAGE,
} from '../../../consts/consts';

export const SavedMovieItem = ({movie}) => {
  const {width} = useWindowDimensions();
  return (
    <Card>
      <Card.Title>{movie.title}</Card.Title>
      <Card.Divider />
      <FastImage
        source={{
          uri: movie.poster_path
            ? `${BASE_IMAGE_URL}w500${movie.poster_path}`
            : DEFAULT_MOVIE_IMAGE,
        }}
        style={[styles.image, {width: width * 0.8, height: width * 1.05}]}>
        <TouchableOpacity>
          <Text>More</Text>
        </TouchableOpacity>
        <Icon type="antdesign" name="infocirlceo" color={COLOR_DARK_YELLOW} />
        {/* <Icon
          type="antdesign"
          name="heart"
          color={COLOR_ROSE_RED}
          size={30}
          // onPress={removeMovieFromSaved}
        /> */}
      </FastImage>
    </Card>
  );
};

const styles = StyleSheet.create({
  image: {
    elevation: 15,
  },
});
