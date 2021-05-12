import React, {useRef} from 'react';
import {Animated, StyleSheet, Text, View} from 'react-native';
import {Icon} from 'react-native-elements';

const BottomPart = ({movie, focused}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    console.log('fadeIn');
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
    }).start();
  };

  //   const fadeOut = () => {
  //     console.log('fadeOut');
  //     Animated.timing(fadeAnim, {
  //       toValue: 0,
  //       duration: 1000,
  //     }).reset();
  //   };

  focused && fadeIn();

  return (
    <Animated.View
      style={[styles.container, {opacity: fadeAnim}]}
      onTouchMove={e => console.log('Ok')}>
      <Text style={styles.title}>{movie.title}</Text>
      <View style={styles.voteBlock}>
        <Icon type="antdesign" name="star" color="#FFDD00" />
        <Text style={styles.voteText}>{movie.vote_average}</Text>
      </View>
    </Animated.View>
  );
};

export default BottomPart;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
    // flexGrow: 1,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
  },
  voteBlock: {
    flexDirection: 'row',
  },
  voteText: {
    alignSelf: 'center',
    marginLeft: 10,
  },
});
