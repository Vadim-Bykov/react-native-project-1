import React from 'react';
import {ImageBackground, StyleSheet} from 'react-native';
import {Loader} from '../../common/Loader';

export const SplashScreen = () => {
  return (
    <ImageBackground
      style={styles.container}
      source={require('../../assets/images/cityStart.jpg')}>
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
