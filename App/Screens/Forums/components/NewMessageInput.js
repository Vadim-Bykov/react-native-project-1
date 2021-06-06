import React, {useCallback} from 'react';
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
import {addMessage} from '../../../api/firebaseService';

export const NewMessageInput = ({forumId}) => {
  const user = useSelector(selectors.getUser);

  const {width} = useWindowDimensions();
  const {control, handleSubmit, reset} = useForm();
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

  const onSubmit = useCallback(async ({message}) => {
    await addMessage(forumId, message, user, dispatch);
    reset();
  }, []);

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
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sendIcon: {
    marginRight: 10,
  },
});
