import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export const Section = ({section, currentSection, onChangeSection}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => onChangeSection(section.request)}
        style={styles.touchArea}>
        <Text
          style={[
            styles.title,
            section.request === currentSection && styles.active,
          ]}>
          {section.title}
        </Text>
      </TouchableOpacity>
      {section.request === currentSection && <View style={styles.dash} />}
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

  active: {color: '#000'},
});
