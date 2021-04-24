import React from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {w} from '../consts/consts';

export const Input = ({inputConfig}) => {
  const {
    icon: {name, type = 'material', color = '#fff'},
    input: {
      placeholder = '',
      placeholderTextColor = '#fff',
      textContentType = 'none',
      secureTextEntry = false,
      value = '',
      setValue,
      width = w,
    },
  } = inputConfig;

  return (
    <View style={{...styles.inputContainer, width: width * 0.7}}>
      <Icon name={name} type={type} color={color} />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        textContentType={textContentType}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={setValue}
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: 'rgba(0,0,0, 0.4)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  input: {
    color: '#fff',
    width: '90%',
    marginLeft: 10,
    fontFamily: 'sans-serif-light',
  },
});
