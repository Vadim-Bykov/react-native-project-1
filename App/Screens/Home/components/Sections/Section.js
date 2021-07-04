import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLOR_BLACK} from '../../../../consts/consts';

export const Section = ({section, currentSection, onChangeSection, mode}) => {
  const isMarker = section.request === currentSection && mode === 'section';
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => onChangeSection(section.request)}
        style={styles.touchArea}>
        <Text style={[styles.title, isMarker && styles.active]}>
          {section.title}
        </Text>
      </TouchableOpacity>
      {isMarker && <View style={styles.dash} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },

  touchArea: {
    marginBottom: 10,
  },

  title: {
    color: 'gray',
    fontSize: 30,
  },

  dash: {
    width: '50%',
    borderWidth: 2,
    borderColor: '#FC6283',
  },

  active: {color: COLOR_BLACK},
});
