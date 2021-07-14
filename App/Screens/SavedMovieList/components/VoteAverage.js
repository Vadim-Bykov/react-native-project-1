import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLOR_DARK_YELLOW, COLOR_WHITE} from '../../../consts/consts';

export const VoteAverage = ({voteAverage}) => {
  return (
    <View style={styles.outline}>
      <View style={styles.infoCircle}>
        <Text style={styles.voteAverage}>{voteAverage}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outline: {
    width: 50,
    height: 50,
    borderColor: COLOR_WHITE,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 25,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  infoCircle: {
    width: '100%',
    height: '100%',
    backgroundColor: COLOR_WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },

  voteAverage: {
    fontWeight: '700',
    color: COLOR_DARK_YELLOW,
  },
});