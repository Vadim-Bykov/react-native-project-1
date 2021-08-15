import React from 'react';
import {View, Text} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedProps,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

export const useReanimated = () => {
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });

  const scale = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(
            scrollY.value,
            [0, 35],
            [1.35, 1],
            Extrapolate.CLAMP,
          ),
        },
      ],
    };
  });

  const opacity = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, [0, 100], [0, 1]),
  }));

  const arrowAnimatedStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      scrollY.value,
      [0, 50],
      [0, 180],
      Extrapolate.CLAMP,
    );

    const opacity = interpolate(scrollY.value, [30, 120], [1, 0]);

    return {
      opacity,
      transform: [
        {
          rotate: `${rotate}deg`,
        },
      ],
    };
  });

  const nameOpacityTranslateY = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, [100, 160], [0, 1]),
    transform: [
      {
        translateY: interpolate(
          scrollY.value,
          [100, 160],
          [30, 0],
          Extrapolate.CLAMP,
        ),
      },
    ],
  }));

  const userImageScale = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(
            scrollY.value,
            [0, 120],
            [1, 0],
            Extrapolate.CLAMP,
          ),
        },
      ],
    };
  });

  const topUserImageScale = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(
            scrollY.value,
            [100, 160],
            [0, 1],
            Extrapolate.CLAMP,
          ),
        },
      ],
    };
  });

  // const blur = useDerivedValue(() => {
  //   const blurRadius = interpolate(
  //     scrollY.value,
  //     [0, 50],
  //     [0, 20],
  //     Extrapolate.CLAMP,
  //   );

  //   return blurRadius;
  // }, [scrollY]);

  // const animatedProps = useAnimatedProps(() => {
  //   return {blurRadius: blur.value};
  // }, [blur.value]);

  const panX = useSharedValue(0);
  const panY = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {},
    onActive: (event, ctx) => {
      panX.value = event.translationX;
      panY.value = event.translationY;
    },
    onEnd: () => {
      panX.value = withSpring(0);
      panY.value = withSpring(0);
    },
  });

  const panStyle = useAnimatedStyle(() => ({
    transform: [{translateX: panX.value}, {translateY: panY.value}],
  }));

  return {
    scrollHandler,
    scale,
    opacity,
    arrowAnimatedStyle,
    nameOpacityTranslateY,
    userImageScale,
    topUserImageScale,
    gestureHandler,
    panStyle,
  };
};
