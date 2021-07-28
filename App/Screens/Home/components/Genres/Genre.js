import {useTheme} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLOR_BLACK} from '../../../../consts/consts';

export const Genre = ({genre, onChangeGenre, currentGenreID, mode}) => {
  const {colors} = useTheme();
  const isMarker = genre.id === currentGenreID && mode === 'genre';

  return (
    <View style={styles().container}>
      <TouchableOpacity
        onPress={() => onChangeGenre(genre.id)}
        style={[styles().touchArea, isMarker && styles().active]}>
        <Text
          style={[styles(colors.text).title, isMarker && styles().activeTitle]}>
          {genre.name}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = color =>
  StyleSheet.create({
    container: {
      marginHorizontal: 10,
    },

    touchArea: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderColor: '#828282',
      borderWidth: 1.5,
      borderRadius: 20,
      height: 45,
    },
    title: {
      color,
    },
    activeTitle: {
      color: '#FC6283',
      fontWeight: 'bold',
    },

    active: {
      backgroundColor: '#E4EFF4',
    },
  });
