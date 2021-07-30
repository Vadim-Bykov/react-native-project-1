import React, {useCallback, useRef, useState} from 'react';
import {Animated, Easing} from 'react-native';
import {COLORS_DARK_THEME, COLORS_LIGHT_THEME} from '../../consts/consts';

export const useAnimateStyle = dark => {
  // const [isActive, setIsActive] = useState(false);

  const animateState = {
    start: 0,
    end: 100,
  };

  const colorsValue = useRef(new Animated.Value(animateState.start)).current;
  const scaleValue = useRef(new Animated.Value(animateState.start)).current;

  const onAnimateColors = useCallback(isActive => {
    Animated.timing(colorsValue, {
      toValue: isActive ? animateState.end : animateState.start,
      useNativeDriver: false,
      easing: Easing.exp,
      duration: 500,
    }).start();

    // setIsActive(!isActive);
  }, []);

  const onAnimateScale = useCallback(isActive => {
    Animated.timing(scaleValue, {
      toValue: isActive ? animateState.end : animateState.start,
      useNativeDriver: true,
      easing: Easing.bounce,
      duration: 500,
    }).start();
  }, []);

  const inputRange = Object.values(animateState); //[animateState.start, animateState.end] or [0, 100]
  const backgroundColor = colorsValue.interpolate({
    inputRange,
    outputRange: [
      dark ? COLORS_DARK_THEME.card : COLORS_LIGHT_THEME.card,
      dark ? COLORS_LIGHT_THEME.card : COLORS_DARK_THEME.card,
    ],
  });

  const borderColor = colorsValue.interpolate({
    inputRange,
    outputRange: [
      dark ? COLORS_DARK_THEME.border : COLORS_LIGHT_THEME.border,
      dark ? COLORS_LIGHT_THEME.border : COLORS_DARK_THEME.border,
    ],
  });

  const textColor = colorsValue.interpolate({
    inputRange,
    outputRange: [
      dark ? COLORS_DARK_THEME.text : COLORS_LIGHT_THEME.text,
      dark ? COLORS_LIGHT_THEME.text : COLORS_DARK_THEME.text,
    ],
  });

  const scale = scaleValue.interpolate({inputRange, outputRange: [1, 1.05]});

  return {
    backgroundColor,
    borderColor,
    textColor,
    scale,
    onAnimateColors,
    onAnimateScale,
  };
};

// const styles = StyleSheet.create({})
