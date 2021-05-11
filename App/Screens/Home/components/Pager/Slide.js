import {
  useAnimatedIndex,
  useFocus,
  useInterpolation,
  usePager,
} from '@crowdlinker/react-native-pager';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, Image, View} from 'react-native';
import Animated from 'react-native-reanimated';
import {BASE_IMAGE_URL} from '../../../../consts/consts';

export const Slide = ({movie, width, goToMovieDetails, inlineCardsConfig}) => {
  const focused = useFocus();
  const [activeIndex, onChange] = usePager();
  //   const animatedIndex = useAnimatedIndex();
  //   const interpolation = useInterpolation(inlineCardsConfig);
  const {
    cond,
    eq,
    set,
    neq,
    and,
    Value,
    event,
    Clock,
    startClock,
    stopClock,
    timing,
    block,
    interpolate,
    Extrapolate,
  } = Animated;
  //   console.log(event);
  //   console.log(Clock);
  console.log();
  console.log(stopClock);

  //   console.log(interpolation);
  return (
    <Animated.View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => goToMovieDetails(movie.id)}
        style={[
          {...styles.container, height: width * 1, width: width * 0.68},
          focused && {elevation: 15},
        ]}>
        <Image
          source={{uri: `${BASE_IMAGE_URL}w300/${movie.poster_path}`}}
          style={{
            ...styles.image,
            height: width * 1,
            width: width * 0.68,
          }}
        />
      </TouchableOpacity>
      <Text>{`Focused: ${focused}`}</Text>
      <Text>{`ActiveIndex: ${activeIndex}`}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    borderRadius: 20,
  },
  image: {
    borderRadius: 20,
  },
});
