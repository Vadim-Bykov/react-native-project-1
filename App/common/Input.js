import React, {useCallback, useEffect, useRef} from 'react';
import {useController} from 'react-hook-form';
import {StyleSheet, View, TextInput, Text} from 'react-native';
import {Icon} from 'react-native-elements/dist/icons/Icon';

export const Input = ({inputConfig}) => {
  const {
    icon: {iconName, type = 'material', color = '#fff'} = {},
    input: {
      placeholder = '',
      placeholderTextColor = '#fff',
      textContentType = 'none',
      secureTextEntry = false,
      width,
      name,
      setSecurePassword,
      multiline = false,
      backgroundColor = 'rgba(0,0,0, 0.4)',
      colorText = '#fff',
      control,
      rules,
    },
  } = inputConfig;

  const inputRef = useRef(null);

  useEffect(
    () =>
      inputRef.current.setNativeProps({style: {fontFamily: 'Nunito-Light'}}),
    [secureTextEntry],
  );

  const {field, fieldState} = useController({
    control,
    name,
    defaultValue: '',
    rules,
  });

  const showPassword = useCallback(() => setSecurePassword(prev => !prev), []);

  return (
    <>
      <View style={[styles.inputContainer, {width, backgroundColor}]}>
        {iconName && <Icon name={iconName} type={type} color={color} />}

        <TextInput
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          textContentType={textContentType}
          secureTextEntry={secureTextEntry}
          value={field.value}
          onChangeText={field.onChange}
          ref={inputRef}
          multiline={multiline}
          style={[styles.input, {color: colorText}]}
        />

        {textContentType === 'password' && (
          <Icon
            name={secureTextEntry ? 'eye-check-outline' : 'eye-off-outline'}
            type="material-community"
            color={color}
            onPress={showPassword}
          />
        )}
      </View>

      <View style={styles.errorContainer}>
        {fieldState.error && (
          <Text style={styles.error}>{fieldState.error.message}</Text>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    // backgroundColor: 'rgba(0,0,0, 0.4)',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  input: {
    // color: '#fff',
    flex: 1,
    marginLeft: 10,
  },
  errorContainer: {
    alignSelf: 'flex-start',
  },
  error: {color: 'red'},
});
