import React, {useRef, useState} from 'react';
import {Image, useWindowDimensions, Animated, PanResponder} from 'react-native';

const PHOTO = '../../assets/images/city.jpg';

const getDistance = ([xA, yA], [xB, yB]) =>
  Math.sqrt(Math.pow(xA - xB, 2) + Math.pow(yA - yB, 2));

export const GesturesPanResponder = () => {
  const {width} = useWindowDimensions();

  const pan = useRef(new Animated.ValueXY({x: 0, y: 0})).current;
  const scale = useRef(new Animated.Value(1)).current;
  const [initialDistance, setInitialDistance] = useState(0);

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,

    onPanResponderGrant: (e, gestureState) => {
      const touches = e.nativeEvent.changedTouches;

      if (touches.length >= 2) {
        const distance = getDistance(
          [touches[0].pageX, touches[0].pageY],
          [touches[1].pageX, touches[1].pageY],
        );

        setInitialDistance(distance);
      }

      //  pan.setOffset({
      //    x: pan.x._value,
      //    y: pan.y._value,
      //  });
    },

    onPanResponderMove: (e, gestureState) => {
      const activeTouches = e.nativeEvent.changedTouches.length;

      // console.log(gestureState);
      // console.log(initialDistance); // 0 because of touching not two fingers on the screen at once (the first finger then the second one)
      if (activeTouches === 1) {
        pan.setValue({
          x: gestureState.dx,
          y: gestureState.dy,
        });
      } else if (activeTouches >= 2) {
        const touches = e.nativeEvent.changedTouches;
        const distance = getDistance(
          [touches[0].pageX, touches[0].pageY],
          [touches[1].pageX, touches[1].pageY],
        );

        const screenMovedPercents = (distance - initialDistance) / width;

        scale.setValue(1 + screenMovedPercents);
      }
    },

    onPanResponderRelease: (e, gestureState) => {
      // pan.flattenOffset();
      setInitialDistance(0);
      Animated.parallel(
        [
          Animated.spring(pan, {
            toValue: {x: 0, y: 0},
            useNativeDriver: true,
          }),
          Animated.spring(scale, {
            toValue: 1,
            useNativeDriver: true,
          }),
        ],
        //  { useNativeDriver: true }
      ).start();
    },
  });

  return (
    <Animated.Image
      {...panResponder.panHandlers}
      source={require(PHOTO)}
      resizeMode="cover"
      style={{
        width: width * 0.8,
        height: width,
        alignSelf: 'center',
        transform: [{translateX: pan.x}, {translateY: pan.y}, {scale}],
        //   transform: pan.getTranslateTransform(),
      }}
    />
  );
};
