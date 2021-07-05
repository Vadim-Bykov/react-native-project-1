import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export const EmptyList = ({text}) => {
  return (
    <View style={[styles.emptyScreen]}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  text: {
    textAlign: 'center',
  },
});
