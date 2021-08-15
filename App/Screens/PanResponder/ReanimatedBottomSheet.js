import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  useWindowDimensions,
} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  withSpring,
  useAnimatedStyle,
} from 'react-native-reanimated';

const SPRING_CONFIG = {
  damping: 80,
  overshootClamping: true,
  restDisplacementThreshold: 0.1,
  stiffness: 500,
};

export const ReanimatedBottomSheet = () => {
  const {height} = useWindowDimensions();
  const top = useSharedValue(height);

  const styleTop = useAnimatedStyle(() => ({
    top: withSpring(top.value, SPRING_CONFIG),
  }));

  const gestureHandler = useAnimatedGestureHandler({
    onStart(_, context) {
      context.startTop = top.value;
    },

    onActive(event, context) {
      top.value = context.startTop + event.translationY;
    },

    onEnd() {
      if (top.value > height / 2.2 + 150) {
        top.value = height;
      } else {
        top.value = height / 2.2;
      }
    },
  });

  return (
    <>
      <View style={styles.container}>
        <Button
          title="Open sheet"
          onPress={() => {
            top.value = height / 2.2;
          }}
        />

        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View style={[styles.sheet, styleTop]}>
            <Text>Sheet</Text>
          </Animated.View>
        </PanGestureHandler>
      </View>
    </>
  );
};

// export const ReanimatedBottomSheet = gestureHandlerRootHOC(BottomSheet);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'blue',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
