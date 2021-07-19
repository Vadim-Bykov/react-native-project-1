import React, {useEffect, useRef} from 'react';
import {useController} from 'react-hook-form';
import {StyleSheet} from 'react-native';
import {Icon, Input} from 'react-native-elements';

export const ModalInput = ({inputConfig}) => {
  const inputRef = useRef(null);

  const {
    icon: {iconName, type = 'material'},
    input: {
      placeholder = '',
      width,
      name,
      multiline = false,
      label,
      control,
      rules,
    },
  } = inputConfig;

  const {field, fieldState} = useController({
    name,
    control,
    rules,
    defaultValue: '',
  });

  useEffect(
    () =>
      inputRef.current.setNativeProps({style: {fontFamily: 'Nunito-Light'}}),
    [],
  );

  return (
    <Input
      ref={inputRef}
      placeholder={placeholder}
      multiline={multiline}
      value={field.value}
      onChangeText={field.onChange}
      errorMessage={fieldState.error?.message}
      label={label}
      labelProps={{style: styles().label}}
      containerStyle={styles(width).container}
      leftIcon={<Icon name={iconName} type={type} />}
    />
  );
};

const styles = width =>
  StyleSheet.create({
    container: {
      width,
      marginTop: 10,
    },

    label: {
      color: '#454545',
    },
  });
