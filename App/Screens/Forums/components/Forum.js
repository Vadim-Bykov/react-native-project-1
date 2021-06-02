import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Icon} from 'react-native-elements';

export const Forum = ({forum}) => {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.6}>
      <View>
        <Text style={styles.title}>{forum.title}</Text>
        <Text>{forum.description}</Text>
      </View>
      <Icon
        name="skew-more"
        type="material-community"
        color="#3AD900"
        style={styles.icon}
        //   size={28}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    backgroundColor: 'white',
    alignSelf: 'center',
    padding: 10,
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#515CF0',
  },
  icon: {
    top: 5,
    right: 5,
    zIndex: 10,
  },
});
