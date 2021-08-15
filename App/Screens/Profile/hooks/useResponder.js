import React, {useRef} from 'react';
import {Animated, PanResponder} from 'react-native';

export const useResponder = () => {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,

      // onPanResponderGrant: (event, gestureState) => {
      //   pan.setOffset({x: pan.x._value, y: pan.y._value});
      // },

      onPanResponderMove: (event, gestureState) => {
        pan.setValue({x: gestureState.dx, y: gestureState.dy});
      },

      onPanResponderRelease: () => {
        // pan.flattenOffset();
        Animated.spring(pan, {
          toValue: {x: 0, y: 0},
          useNativeDriver: true,
        }).start();
      },
    }),
  ).current;

  return {pan, panResponder};
};
