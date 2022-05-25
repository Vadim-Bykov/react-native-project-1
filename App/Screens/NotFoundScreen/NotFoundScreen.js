import React from 'react';
import {Linking, StyleSheet, Text, View} from 'react-native';

export const NotFoundScreen = ({route}) => {
  console.log({path: route.path});
  //   if (route.path) {
  //     Linking.openURL('https://www.google.com');
  //   }
  return (
    <View style={styles.container}>
      <Text>Path "{route.path}" does not exist</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
