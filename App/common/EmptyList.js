import {useTheme} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export const EmptyList = ({text}) => {
  const {colors} = useTheme();

  return (
    <View style={styles().emptyScreen}>
      <Text style={styles(colors.text).text}>{text}</Text>
    </View>
  );
};

const styles = color =>
  StyleSheet.create({
    emptyScreen: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
    },

    text: {
      color,
      textAlign: 'center',
    },
  });
