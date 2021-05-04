import React from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import {Loader} from '../../common/Loader';
import {START_IMAGE} from '../../consts/images';

const startImage = '../../assets/images/cityStart.jpg';

export const SplashScreen = () => {
  return (
    <ImageBackground style={styles.container} source={require(startImage)}>
      <Loader />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
  },
});
