import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const ForumScreen = ({route}) => {
  console.log(route.params.id);
  return (
    <View>
      <Text>ForumScreen</Text>
    </View>
  );
};

export default ForumScreen;

const styles = StyleSheet.create({});
