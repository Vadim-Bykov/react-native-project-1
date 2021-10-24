import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, View, ScrollView, Animated} from 'react-native';

export const AnimatedScrollView = () => {
  //   const [headerShown, setHeaderShown] = useState(false);

  //   const translation = useRef(new Animated.Value(-100)).current;
  const scrolling = useRef(new Animated.Value(0)).current;
  const translation = scrolling.interpolate({
    inputRange: [100, 180],
    outputRange: [-80, 0],
    extrapolate: 'clamp',
  });

  //   useEffect(() => {
  //     Animated.timing(translation, {
  //       toValue: headerShown ? 0 : -100,
  //       useNativeDriver: true,
  //     }).start();
  //   }, [headerShown]);

  return (
    <>
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          left: 0,
          height: 80,
          backgroundColor: 'blue',
          transform: [{translateY: translation}],
        }}
      />
      <Animated.ScrollView
        style={{flex: 1}}
        //   onScroll={e => {
        //     const scroll = e.nativeEvent.contentOffset.y;
        //     console.log(scroll);
        //     scroll > 100 ? setHeaderShown(true) : setHeaderShown(false);
        //      }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: scrolling,
                },
              },
            },
          ],
          {useNativeDriver: true},
        )}>
        <View style={{flex: 1, height: 1000}}>
          {new Array(30).fill(1).map((_, index) => (
            <Text key={index}>Hello {index + 1}</Text>
          ))}
        </View>
      </Animated.ScrollView>
    </>
  );
};
