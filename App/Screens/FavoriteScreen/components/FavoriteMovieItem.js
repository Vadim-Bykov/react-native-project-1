import React from 'react';
import {ImageBackground} from 'react-native';
import {StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import {BASE_IMAGE_URL} from '../../../consts/consts';

export const FavoriteMovieItem = ({movie}) => {
  const {width, height} = useWindowDimensions();

  return (
    <ImageBackground
      source={{uri: `${BASE_IMAGE_URL}w300${movie.poster_path}`}}
      style={{...styles.container, width: width * 0.8, height: width}}>
      <Text>{movie.title}</Text>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    alignSelf: 'center',
    //  borderColor: 'red',
    //  borderWidth: 5,
    resizeMode: 'contain',
    borderRadius: 20,
    elevation: 10,
  },
});
