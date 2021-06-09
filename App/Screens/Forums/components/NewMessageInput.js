import React, {useCallback, useEffect, useState} from 'react';
import {useController, useForm} from 'react-hook-form';
import {
  StyleSheet,
  useWindowDimensions,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {useDispatch, useSelector} from 'react-redux';
import * as selectors from '../../../store/auth/selectors';
import * as firebaseService from '../../../api/firebaseService';

export const NewMessageInput = React.memo(({forumId}) => {
  const {uid} = useSelector(selectors.getUser);

  const {width} = useWindowDimensions();
  const {control, handleSubmit, reset} = useForm();
  const dispatch = useDispatch();

  const [fieldValue, setFieldValue] = useState('');
  useEffect(() => {
    setFieldValue(field.value);
  }, [field.value]);

  const onSubmit = useCallback(({message}) => {
    firebaseService
      .addMessage(forumId, message, uid)
      .then(reset)
      .catch(error => {
        console.error(error);
        dispatch(setError(extractErrorMessage(error)));
      });
  }, []);

  const {field, fieldState} = useController({
    control,
    name: 'message',
    defaultValue: '',
    rules: {
      required: true,
      validate: value => !!value.trim(),
    },
  });

  return (
    <View style={styles.container}>
      <View style={[styles.inputContainer, {width: width * 0.86}]}>
        <Icon name="message1" type="antdesign" color="#8B5AB1" />

        <TextInput
          placeholder="Enter your message"
          placeholderTextColor="#696A6C"
          textContentType="name"
          value={field.value}
          onChangeText={field.onChange}
          multiline={true}
          style={styles.input}
        />
      </View>
      {fieldValue && fieldValue.trim() && !fieldState.error ? (
        <TouchableOpacity onPress={handleSubmit(onSubmit)} activeOpacity={0.6}>
          <Icon
            type="ionicon"
            name="ios-send"
            color={'#8B5AB1'}
            size={28}
            style={styles.sendIcon}
          />
        </TouchableOpacity>
      ) : (
        <Icon
          type="foundation"
          name="prohibited"
          color={'#8B5AB1'}
          size={28}
          style={styles.sendIcon}
        />
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopColor: 'gray',
    borderTopWidth: StyleSheet.hairlineWidth,
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  input: {
    color: '#000',
    flex: 1,
    marginLeft: 10,
  },
  sendIcon: {
    marginRight: 10,
  },
});
