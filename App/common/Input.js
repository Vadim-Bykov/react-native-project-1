import React from 'react';
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
      control,
      rules,
      setError,
    },
  } = inputConfig;

  const {field, fieldState} = useController({
    control,
    name,
    defaultValue: '',
    rules,
  });

  // console.log(fieldState.isTouched);
  console.log(fieldState.error);

  return (
    <>
      <View style={{...styles.inputContainer, width: width * 0.7}}>
        {iconName && <Icon name={iconName} type={type} color={color} />}
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          textContentType={textContentType}
          secureTextEntry={secureTextEntry}
          value={field.value}
          onChangeText={field.onChange}
          style={styles.input}
          // onChange={() =>
          //   fieldState.error &&
          //   setError(name, {
          //     type: 'required',
          //     message: 'Dont Forget Your Username Should Be Cool!',
          //   })
          // }
        />
      </View>
      <View style={styles.errorContainer}>
        {fieldState.error && (
          <Text style={styles.error}>{fieldState.error.type}</Text>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0, 0.4)',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  input: {
    color: '#fff',
    width: '90%',
    marginLeft: 10,
  },
  errorContainer: {
    alignSelf: 'flex-start',
  },
  error: {color: 'red'},
});
