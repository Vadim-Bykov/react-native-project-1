import React, {useRef} from 'react';
import {View, Animated, useWindowDimensions} from 'react-native';

const CURSOR_SIDE_SIZE = 20;
const CURSOR_HALF_SIDE_SIZE = CURSOR_SIDE_SIZE / 2;

export const Gestures = () => {
  const {width, height} = useWindowDimensions();
  const touch = useRef(new Animated.ValueXY({x: 0, y: 0})).current;

  return (
    <View
      style={{flex: 1, backgroundColor: 'yellow'}}
      onStartShouldSetResponder={() => true}
      onMoveShouldSetResponder={() => true}
      // onResponderGrant={e => {
      //   touch.setValue({
      //     x: e.nativeEvent.locationX,
      //     y: e.nativeEvent.locationY,
      //   });
      // }}
      onResponderMove={e => {
        touch.setValue({
          x: e.nativeEvent.locationX,
          y: e.nativeEvent.locationY,
        });
      }}
      onResponderRelease={() => {
        Animated.spring(touch, {
          toValue: {
            x: width / 2 + CURSOR_HALF_SIDE_SIZE,
            y: height / 2 + CURSOR_HALF_SIDE_SIZE,
          },
          useNativeDriver: false,
        }).start();
      }}>
      <Animated.View
        style={{
          position: 'absolute',
          left: Animated.subtract(touch.x, CURSOR_HALF_SIDE_SIZE),
          top: Animated.subtract(touch.y, CURSOR_HALF_SIDE_SIZE),
          width: CURSOR_SIDE_SIZE,
          height: CURSOR_SIDE_SIZE,
          borderRadius: CURSOR_HALF_SIDE_SIZE,
          backgroundColor: 'orange',
        }}
      />
    </View>
  );
};
