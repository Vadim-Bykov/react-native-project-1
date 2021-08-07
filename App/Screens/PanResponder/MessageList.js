import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View, Text, Button, Animated, Easing} from 'react-native';

const Message = React.memo(({text, removeMessage}) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.delay(5000),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(removeMessage);
  }, []);

  const translateY = opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [-20, 0],
  });

  return (
    <Animated.View
      style={{
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 5,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        opacity,
        transform: [{translateY}],
      }}>
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
      <View style={{flex: 1}}>
        {list.map(message => (
          <Message
            key={message}
            text={message}
            removeMessage={() => onHideMessage(message)}
          />
        ))}
      </View>

      <Button
        title="Add message"
        onPress={() => setList(list => [...list, `Message ${list.length}`])}
      />
    </>
  );
};
