import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useController, useForm} from 'react-hook-form';
import {
  StyleSheet,
  useWindowDimensions,
  Keyboard,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {useDispatch, useSelector} from 'react-redux';
import * as actions from '../../../store/auth/actions';
import * as selectors from '../../../store/auth/selectors';
import * as firebaseService from '../../../api/firebaseService';
import {COLOR_PURPLE} from '../../../consts/consts';
import {SafeAreaView} from 'react-native-safe-area-context';
import {hideNavigationBar} from 'react-native-navigation-bar-color';
import {StatusBar} from 'react-native';

export const NewMessageInput = React.memo(
  ({forumId, colorText, colorTextGray, isFullScreen}) => {
    const {width, height} = useWindowDimensions();
    const {uid} = useSelector(selectors.getUser);
    const dispatch = useDispatch();

    const fullScreenLandscape = useMemo(() => isFullScreen && width > height, [
      isFullScreen,
      width,
      height,
    ]);

    const {control, handleSubmit, reset} = useForm();

    const {field, fieldState} = useController({
      control,
      name: 'message',
      defaultValue: '',
      rules: {
        required: true,
        validate: value => !!value.trim(),
      },
    });

    const [fieldValue, setFieldValue] = useState('');

    useEffect(() => {
      setFieldValue(field.value);
    }, [field.value]);

    const onSubmit = useCallback(({message}) => {
      firebaseService.addMessage(forumId, message, uid).catch(error => {
        console.error(error);
        dispatch(actions.setError(extractErrorMessage(error)));
      });

      reset();
    }, []);

    // If add StatusBar only on the ForumScreen and then remove it
    // useEffect(() => {
    //   isFullScreen && StatusBar.setHidden(false);

    //   return () => {
    //     isFullScreen && StatusBar.setHidden(true);
    //   };
    // }, []);

    // Without StatusBar and bug (hidden navigator's header)

    // const [isMargin, setIsMargin] = useState(false);

    // const setExtraMargin = useCallback(() => setIsMargin(false), []);
    // const removeExtraMargin = useCallback(() => setIsMargin(true), []);

    // useEffect(() => {
    //   Keyboard.addListener('keyboardDidHide', setExtraMargin);
    //   Keyboard.addListener('keyboardDidShow', removeExtraMargin);

    //   return () => {
    //     Keyboard.removeListener('keyboardDidHide', setExtraMargin);
    //     Keyboard.removeListener('keyboardDidShow', removeExtraMargin);
    //   };
    // }, []);

    return (
      <>
        <View style={styles.container}>
          <View style={[styles.inputContainer, {width: width * 0.86}]}>
            <Icon name="message1" type="antdesign" color={COLOR_PURPLE} />

            <TextInput
              onSubmitEditing={fullScreenLandscape && hideNavigationBar}
              placeholder="Enter your message"
              placeholderTextColor={colorTextGray}
              textContentType="name"
              value={field.value}
              onChangeText={field.onChange}
              multiline={true}
              style={[styles.input, {color: colorText}]}
            />
          </View>

          {fieldValue && fieldValue.trim() && !fieldState.error ? (
            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              activeOpacity={0.6}>
              <Icon
                type="ionicon"
                name="ios-send"
                color={COLOR_PURPLE}
                size={28}
                style={styles.sendIcon}
              />
            </TouchableOpacity>
          ) : (
            <Icon
              type="foundation"
              name="prohibited"
              color={COLOR_PURPLE}
              size={28}
              style={styles.sendIcon}
            />
          )}
        </View>

        {/*Without StatusBar and bug (hidden navigator's header)*/}

        {/* {isFullScreen && (
          <SafeAreaView
            style={{
              marginBottom: isMargin ? 0 : -50,
            }}
          />
        )} */}
      </>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: 'gray',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    marginLeft: 10,
  },
  sendIcon: {
    marginRight: 10,
  },
});
