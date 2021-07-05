import React, {useRef} from 'react';
import {Animated, StyleSheet, Text, View} from 'react-native';
import {Icon} from 'react-native-elements';

const BottomPart = ({movie, isBottomPart}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  isBottomPart ? fadeIn() : fadeOut();

  if (!movie) return null;

  return (
    <Animated.View style={[styles.container, {opacity: fadeAnim}]}>
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
    marginBottom: 10,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    marginHorizontal: 20,
  },
  voteBlock: {
    flexDirection: 'row',
  },
  voteText: {
    alignSelf: 'center',
    marginLeft: 10,
  },
});
