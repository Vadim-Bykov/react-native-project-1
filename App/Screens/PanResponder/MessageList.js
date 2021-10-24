import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View, Text, Button, StyleSheet, Easing} from 'react-native';
import Animated, {
  Extrapolate,
  FlipInYRight,
  FlipOutYRight,
  interpolate,
  Layout,
  runOnJS,
  SlideInLeft,
  SlideOutLeft,
  SlideOutRight,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

const Message = React.memo(({text, removeMessage}) => {
  // const opacity = useRef(new Animated.Value(0)).current;

  const opacity = useSharedValue(0);

  // useEffect(() => {
  //   Animated.sequence([
  //     Animated.timing(opacity, {
  //       toValue: 1,
  //       duration: 500,
  //       useNativeDriver: true,
  //     }),
  //     Animated.delay(5000),
  //     Animated.timing(opacity, {
  //       toValue: 0,
  //       duration: 500,
  //       useNativeDriver: true,
  //     }),
  //   ]).start(removeMessage);
  // }, []);

  useEffect(() => {
    // opacity.value = withSequence(
    //   withTiming(1, {duration: 500}),
    //   withDelay(
    //     5000,
    //     withTiming(1, undefined, () => {
    //       runOnJS(removeMessage)();
    //     }),
    //   ),
    // );
    setTimeout(removeMessage, 5000);
  }, []);

  // const translateY = opacity.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: [-20, 0],
  // });

  const animatedStyles = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  // const animatedTranslateY = useAnimatedStyle(() => {
  //   const translateY = interpolate(
  //     opacity.value,
  //     [0, 1],
  //     [-50, 0],
  //     Extrapolate.CLAMP,
  //   );

  //   return {
  //     transform: [{translateY: translateY}],
  //   };
  // });

  return (
    <Animated.View
      entering={FlipInYRight}
      exiting={FlipOutYRight}
      layout={Layout.springify()}
      style={[styles.messageContainer]}>
      <Text>{text}</Text>
    </Animated.View>
  );
});

export const MessageList = () => {
  const [list, setList] = useState([]);

  const onHideMessage = useCallback(
    message => {
      setList(list =>
        list.filter(currentMessage => currentMessage !== message),
      );
    },
    [list],
  );

  return (
    <>
      <Animated.View style={{flex: 1}}>
        {list.map(message => (
          <Message
            key={message}
            text={message}
            removeMessage={() => onHideMessage(message)}
          />
        ))}
      </Animated.View>

      <Button
        title="Add message"
        onPress={() => setList(list => [...list, `Message ${list.length + 1}`])}
      />
    </>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 5,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    // opacity,
    // transform: [{translateY}],
  },
});
