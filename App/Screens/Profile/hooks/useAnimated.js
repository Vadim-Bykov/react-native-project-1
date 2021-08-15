import React, {useRef} from 'react';
import {View, Text, Animated} from 'react-native';

export const useAnimated = () => {
  const scrollY = useRef(new Animated.Value(0)).current;

  const scale = scrollY.interpolate({
    inputRange: [0, 35],
    outputRange: [1.35, 1],
    // extrapolateLeft: 'extend',
    extrapolateRight: 'clamp',
  });

  const opacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
  });

  const rotate = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: ['0deg', '180deg'],
    extrapolateRight: 'clamp',
  });

  const arrowOpacity = scrollY.interpolate({
    inputRange: [30, 120],
    outputRange: [1, 0],
  });

  const nameOpacity = scrollY.interpolate({
    inputRange: [100, 160],
    outputRange: [0, 1],
  });

  const nameTranslateY = scrollY.interpolate({
    inputRange: [100, 160],
    outputRange: [30, 0],
    extrapolate: 'clamp',
  });

  const userImageScale = scrollY.interpolate({
    inputRange: [0, 120],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const topUserImageScale = scrollY.interpolate({
    inputRange: [100, 160],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const blurRadius = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 20],
  });
  return {
    scrollY,
    scale,
    opacity,
    rotate,
    arrowOpacity,
    nameOpacity,
    nameTranslateY,
    userImageScale,
    topUserImageScale,
    blurRadius,
  };
};
