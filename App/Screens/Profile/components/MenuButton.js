import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLOR_WHITE} from '../../../consts/consts';

export const MenuButton = ({openDrawer}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, {top: insets.top + 10}]}>
      <Icon name="menu" color={COLOR_WHITE} onPress={openDrawer} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 3,
    position: 'absolute',
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
    height: 30,
    width: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
