import React, {useEffect, useRef} from 'react';
import {StyleSheet, Text} from 'react-native';
import {COLOR_WHITE} from '../../../consts/consts';

export const CustomText = ({children}) => {
  const ref = useRef(null);
  useEffect(() => {
    ref.current.setNativeProps({style: {fontFamily: 'Nunito-Light'}});
  }, []);

  return (
    <Text ref={ref} style={styles.text}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    marginVertical: 2,
    marginLeft: 30,
    color: COLOR_WHITE,
  },
});
