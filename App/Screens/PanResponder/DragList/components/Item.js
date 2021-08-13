import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import {BASE_IMAGE_URL, DEFAULT_MOVIE_IMAGE} from '../../../../consts/consts';
import {ITEM_HEIGHT} from './DragItem';

const IMAGE_HEIGHT = 60;

export const Item = ({movie, width}) => {
  const UIStyleContainer = useAnimatedStyle(() => ({width}), [width]);

  return (
    <Animated.View style={[styles.container, UIStyleContainer]}>
      <FastImage
        source={{
          uri: movie.poster_path
            ? `${BASE_IMAGE_URL}w500/${movie.poster_path}`
            : DEFAULT_MOVIE_IMAGE,
        }}
        style={styles.image}
      />
      <Text>{movie.title}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: ITEM_HEIGHT,
  },
  image: {
    width: IMAGE_HEIGHT,
    height: IMAGE_HEIGHT,
    marginRight: 10,
  },
});
