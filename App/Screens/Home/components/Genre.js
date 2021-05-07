import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export const Genre = ({genre}) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Text>{genre.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: '#828282',
    borderWidth: 1,
    borderRadius: 20,
    marginHorizontal: 10,
    height: 45,
  },
});
