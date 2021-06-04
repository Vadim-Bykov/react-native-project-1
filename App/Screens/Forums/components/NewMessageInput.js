import React from 'react';
import {useForm} from 'react-hook-form';
import {
  StyleSheet,
  useWindowDimensions,
  View,
  TouchableOpacity,
} from 'react-native';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {useDispatch, useSelector} from 'react-redux';
import {Input} from '../../../common/Input';
import * as selectors from '../../../store/auth/selectors';
import * as actions from '../../../store/auth/actions';
import firestore from '@react-native-firebase/firestore';
import {extractErrorMessage} from '../../../utils/utils';

export const NewMessageInput = ({forumId}) => {
  const user = useSelector(selectors.getUser);
  const {displayName, email, photoURL, uid} = user;

  const {width} = useWindowDimensions();
  const {control, handleSubmit, reset, formState} = useForm();
  const dispatch = useDispatch();

  const MessageInput = {
    icon: {type: 'antdesign', iconName: 'message1', color: '#DDBA33'},
    input: {
      placeholder: 'Enter your message',
      textContentType: 'name',
      width: width * 0.86,
      name: 'message',
      control,
      rules: {
        required: 'This field is required',
      },
      multiline: true,
    },
  };

  const onSubmit = ({message}) => {
    firestore()
      .collection('forums')
      .doc(forumId)
      .update({
        messages: firestore.FieldValue.arrayUnion({
          message,
          user: {
            name: displayName,
            email,
            photoURL,
            id: uid,
          },
          timeMessage: Date.now(),
        }),
      })
      .catch(error => {
        console.error(error);
        dispatch(actions.setError(extractErrorMessage(error)));
      });
    reset();
  };

  if (!user) return null;

  return (
    <View style={styles.container}>
      <View>
        <Input inputConfig={MessageInput} />
      </View>
      <TouchableOpacity onPress={handleSubmit(onSubmit)} activeOpacity={0.6}>
        <Icon
          type="ionicon"
          name="ios-send"
          color="#DDBA33"
          size={28}
          style={styles.sendIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    //  backgroundColor: 'gray',
    justifyContent: 'space-between',
    alignItems: 'center',
    //  marginBottom: -10,
  },
  sendIcon: {
    marginRight: 10,
  },
});
