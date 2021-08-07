import React, {useCallback, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';

export const AnimatedComplex = () => {
  const val = useRef(new Animated.Value(0)).current;
  const opacityParallel = useRef(new Animated.Value(0)).current;
  const translateParallel = useRef(new Animated.Value(0)).current;
  const rotateParallel = useRef(new Animated.Value(0)).current;
  const valWidth = useRef(new Animated.Value(0)).current;

  const [isActive, setIsActive] = useState(false);

  const onParallel = useCallback(() => {
    Animated.stagger(2000, [
      Animated.timing(opacityParallel, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
        easing: Easing.bounce,
      }),
      Animated.spring(translateParallel, {
        toValue: 100,
        useNativeDriver: true,
        bounciness: 5,
      }),
      Animated.loop(
        Animated.timing(rotateParallel, {
          toValue: 360,
          duration: 1000,
          useNativeDriver: true,
        }),
      ),
    ]).start();
  }, []);

  const rotateParallelVal = rotateParallel.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  const onAnimate = useCallback(() => {
    Animated.timing(val, {
      duration: 1000,
      toValue: isActive ? 0 : 1,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();

    setIsActive(prev => !prev);
  }, [isActive]);

  const onAnimateUI = useCallback(() => {
    Animated.timing(valWidth, {
      duration: 1000,
      toValue: isActive ? 0 : 1,
      useNativeDriver: false,
    }).start();

    //  setIsActive(prev => !prev);
  }, [isActive]);

  const opacity = val.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 0, 0.5],
  });

  const translateY = val.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, -150, -100],
    extrapolate: 'extend',
  });

  const rotateY = val.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['0deg', '360deg', '180deg'],
  });

  const width = valWidth.interpolate({
    inputRange: [0, 1],
    outputRange: [100, 200],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.circle,
          {
            opacity: opacityParallel,
            transform: [
              {translateY: translateParallel},
              {rotateY},
              {rotateX: rotateParallelVal},
            ],
          },
        ]}
      />
      <TouchableOpacity onPress={onParallel}>
        <Text>PanResponder</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'blue',
    marginBottom: 20,
  },
});
