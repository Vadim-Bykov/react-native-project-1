import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

export const Loader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#00ff00" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0, 0.4)',
    zIndex: 1000,
  },
});
