import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Alert} from 'react-native';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Easing,
  PanResponder,
  InteractionManager,
} from 'react-native';

const useMount = func => useEffect(() => func(), []);

const useFadeIn = (duration = 1500) => {
  const [opacity] = useState(new Animated.Value(0));

  useMount(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration,
      // useNativeDriver: true, //without delay
      useNativeDriver: false,
    }).start();
  });

  return opacity;
};

export const PanResponderComponent = () => {
  const pan = useRef(new Animated.ValueXY()).current;

  const opacity = useFadeIn();

  useMount(() => {
    const interactionPromise = InteractionManager.runAfterInteractions(() => {
      Alert.alert('After animated', null, [{text: 'No'}, {text: 'Yeah'}]);
    });

    return () => interactionPromise.cancel();
  });

  const exampleFunc = useCallback(() => {
    InteractionManager.runAfterInteractions(() => {
      Alert.alert('After animated', null, [{text: 'No'}, {text: 'Yeah'}]);
    });
  }, []);

  // const panListener = e => console.log(e);

  //   useEffect(() => {
  //     pan.addListener(panListener);

  //     return () => {
  //       pan.removeListener(panListener);
  //     };
  //   }, []);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
      },
      // onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}]),
      onPanResponderMove: (_, gestureState) => {
        pan.x.setValue(gestureState.dx);
        pan.y.setValue(gestureState.dy);
      },
      onPanResponderRelease: (_, gestureState) => {
        // Animated.spring(pan, {
        //   toValue: {x: 0, y: 0},
        //   useNativeDriver: false,
        // }).start();

        // or just set value
        // pan.x.setValue(0);
        // pan.y.setValue(0);

        Animated.timing(pan, {
          duration: 500,
          toValue: {x: 0, y: 0},
          useNativeDriver: true, //if true - execute code immediately without delay with InteractionManager.runAfterInteractions
          easing: Easing.bounce,
        }).start(({finished}) => {
          pan.x.setValue(0);
          pan.y.setValue(0);
        });

        // pan.flattenOffset();
      },
    }),
  ).current;

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.circle,
          //   pan.getLayout(),
          {opacity, transform: [{translateY: pan.y}, {translateX: pan.x}]},
        ]}
        {...panResponder.panHandlers}
      />
      <TouchableOpacity
        onPress={() => {
          exampleFunc();
        }}>
        <Text>InteractionManager</Text>
      </TouchableOpacity>
      {/* </Animated.View> */}
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
