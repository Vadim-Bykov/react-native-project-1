import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {COLOR_WHITE} from '../../../consts/consts';

const UserItems = ({uri, name}) => {
  const data = new Array(15).fill(0).map((_, index) => (
    <View key={index} style={styles.container}>
      <Image source={{uri}} style={styles.userImage} />
      <Text style={styles.name}>{name}</Text>
    </View>
  ));

  return <>{data}</>;
};

export default UserItems;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginBottom: 10,
    padding: 10,
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLOR_WHITE,
  },

  userImage: {
    width: 60,
    height: 60,
    borderRadius: 40,
    marginRight: 10,
    //  borderWidth: 4,
    //  backgroundColor: '#000000',
  },

  name: {
    color: COLOR_WHITE,
  },
});
