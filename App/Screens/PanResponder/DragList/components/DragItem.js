import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  cancelAnimation,
  Easing,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Item} from './Item';

export const ITEM_HEIGHT = 70;
const SCROLL_HEIGHT_THRESHOLD = ITEM_HEIGHT;

const clamp = (value, lowerBound, upperBound) => {
  'worklet';
  return Math.max(lowerBound, Math.min(value, upperBound));
};

const objectMove = (object, from, to) => {
  'worklet';
  const newObject = JSON.parse(JSON.stringify(object));

  for (const id in object) {
    if (object[id] === from) {
      newObject[id] = to;
    }

    if (object[id] === to) {
      newObject[id] = from;
    }
  }

  return newObject;
};

export const DragItem = ({
  movie,
  width,
  height,
  positions,
  scrollY,
  moviesCount,
}) => {
  const [moving, setMoving] = useState(false);
  const top = useSharedValue(positions.value[movie.id] * ITEM_HEIGHT);
  const insets = useSafeAreaInsets();

  // const top = useDerivedValue(() => {
  //   return positions.value[movie.id] * ITEM_HEIGHT;
  // }, [positions.value[movie.id]]);

  useAnimatedReaction(
    () => positions.value[movie.id],
    (currentPosition, previousPosition) => {
      if (currentPosition !== previousPosition) {
        if (!moving) {
          top.value = currentPosition * ITEM_HEIGHT;
        }
      }
    },
    [moving],
  );

  const gestureHandler = useAnimatedGestureHandler({
    onStart() {
      runOnJS(setMoving)(true);
    },
    onActive(event) {
      const positionY = event.absoluteY + scrollY.value - 50;

      if (positionY <= scrollY.value + ITEM_HEIGHT) {
        // scroll up
        scrollY.value = withTiming(0, {duration: 1000, easing: Easing.linear});
      } else if (positionY >= scrollY.value + height - ITEM_HEIGHT) {
        // scroll down
        const contentHeight = moviesCount * ITEM_HEIGHT;
        const containerHeight = height - insets.top - insets.bottom;
        const maxScroll = contentHeight - containerHeight;

        scrollY.value = withTiming(maxScroll, {
          duration: 1000,
          easing: Easing.linear,
        });
      } else {
        cancelAnimation(scrollY);
      }

      top.value = positionY - ITEM_HEIGHT;

      const newPosition = clamp(
        Math.floor(positionY / ITEM_HEIGHT),
        0,
        moviesCount - 1,
      );

      if (newPosition !== positions.value[movie.id]) {
        positions.value = objectMove(
          positions.value,
          positions.value[movie.id],
          newPosition,
        );
      }
    },
    onFinish() {
      top.value = positions.value[movie.id] * ITEM_HEIGHT;
      runOnJS(setMoving)(false);
    },
  });

  const UIStyle = useAnimatedStyle(
    () => ({
      position: 'absolute',
      left: 0,
      right: 0,
      top: withSpring(top.value),
      zIndex: moving ? 1 : 0,
      elevation: withSpring(moving ? 5 : 0),
      backgroundColor: withTiming(moving ? '#ffffff' : 'transparent', {
        duration: 200,
      }),
    }),
    [moving],
  );

  return (
    <Animated.View style={UIStyle}>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={styles.touchMovableArea}>
          <Item movie={movie} width={width} />
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  touchMovableArea: {
    maxWidth: '70%',
    // backgroundColor: 'blue',
  },
});
