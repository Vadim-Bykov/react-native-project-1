import React, {useLayoutEffect, useRef} from 'react';
import {StyleSheet, Text, Animated, TouchableOpacity} from 'react-native';
import {BOTTOM_PART_HEIGHT, COLLAPSED_PART_HEIGHT} from '../AnimatedHeader';

export const TabItem = ({tabItem, onTabPress, isActive, scrollY}) => {
  const translateY = useRef(new Animated.Value(BOTTOM_PART_HEIGHT)).current;

  const translateText = scrollY.interpolate({
    inputRange: [0, COLLAPSED_PART_HEIGHT],
    outputRange: [0, COLLAPSED_PART_HEIGHT / 4],
    extrapolate: 'clamp',
  });

  useLayoutEffect(() => {
    Animated.timing(translateY, {
      toValue: isActive ? 0 : BOTTOM_PART_HEIGHT,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isActive]);

  return (
    <TouchableOpacity onPress={() => onTabPress(tabItem)} style={[styles.tab]}>
      <Animated.View style={[styles.animatedBG, {transform: [{translateY}]}]} />
      <Text>Header Top</Text>
      <Animated.View style={{transform: [{translateY: translateText}]}}>
        <Text>Header Bottom</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },

  animatedBG: {
    position: 'absolute',
    ...StyleSheet.absoluteFill,
    backgroundColor: 'gray',
  },
});
