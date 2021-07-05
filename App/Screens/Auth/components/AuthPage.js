import React, {useCallback, useEffect, useState} from 'react';
import {useForm, useWatch} from 'react-hook-form';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Input} from '../../../common/Input';
import * as thunks from '../../../store/auth/operations';
import * as selectors from '../../../store/auth/selectors';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {Loader} from '../../../common/Loader';
import {Error} from '../../../common/Error';
import {UserImage} from './UserImage';
import {COLOR_DARK_YELLOW, COLOR_WHITE} from '../../../consts/consts';

export const AuthPage = ({configuration}) => {
  const {
    isSignUpScreen = false,
    btnText,
    redirectionText,
    redirectTo,
  } = configuration;

  const dispatch = useDispatch();
  const isFetching = useSelector(selectors.getIsFetching);
  const error = useSelector(selectors.getErrorMessage);
  const {width, height} = useWindowDimensions();
  const [securePassword, setSecurePassword] = useState(true);
  const [secureConfirmPassword, setSecureConfirmPassword] = useState(true);
  const [imageData, setImageData] = useState(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: {isSubmitSuccessful},
  } = useForm();

  const password = useWatch({control, name: 'password', defaultValue: ''});

  const userNameInput = {
    icon: {type: 'feather', iconName: 'user', color: COLOR_DARK_YELLOW},
    input: {
      placeholder: 'user name',
      textContentType: 'name',
      width: width * 0.7,
      name: 'userName',
      control,
      rules: {
        required: 'This field is required',
        validate: value => !!value.trim() || 'Not only spaces',
      },
    },
  };

  const emailInput = {
    icon: {iconName: 'mail-outline', color: COLOR_DARK_YELLOW},
    input: {
      placeholder: 'E-mail address',
      textContentType: 'emailAddress',
      width: width * 0.7,
      name: 'email',
      control,
      rules: {
        required: 'This email field is required',
        pattern: {value: /.+@.+\..+/i, message: 'Incorrect e-mail'},
      },
    },
  };

  const passwordInput = {
    icon: {iconName: 'lock-outline', color: COLOR_DARK_YELLOW},
    input: {
      placeholder: 'Password',
      textContentType: 'password',
      secureTextEntry: securePassword,
      width: width * 0.7,
      name: 'password',
      control,
      rules: {
        required: 'This password field is required',
        maxLength: {value: 25, message: 'Exceeded max length 25'},
        minLength: {value: 6, message: 'Not achieved min length 6'},
        validate: value => !!value.trim() || 'Not only spaces',
      },
      setSecurePassword,
    },
  };

  const confirmPasswordInput = {
    icon: {iconName: 'lock-outline', color: COLOR_DARK_YELLOW},
    input: {
      placeholder: 'Confirm password',
      textContentType: 'password',
      secureTextEntry: secureConfirmPassword,
      width: width * 0.7,
      name: 'confirmPassword',
      control,
      rules: {
        required: 'This confirmation is required',
        maxLength: {value: 25, message: 'Exceeded max length 25'},
        minLength: {value: 6, message: 'Not achieved min length 6'},
        validate: value => value === password || 'The password do not match',
      },
      setSecurePassword: setSecureConfirmPassword,
    },
  };

  const onPressHandler = useCallback(
    data => {
      if (isSignUpScreen && data) {
        dispatch(
          thunks.signUp({
            ...data,
            uri: imageData?.uri,
            fileName: imageData?.fileName,
          }),
        );
      } else if (data) {
        dispatch(thunks.signIn(data));
      }
    },
    [imageData],
  );

  return (
    <>
      {isFetching && <Loader />}
      {error && <Error />}
      <ImageBackground
        source={require('../../../assets/images/city.jpg')}
        style={styles.imageBackground}>
        <View style={styles.wrapper}>
          <ScrollView contentContainerStyle={styles.container}>
            <View
              style={[
                styles.imageContainer,
                isSignUpScreen && {marginBottom: 10},
              ]}>
              <>
                {isSignUpScreen ? (
                  <UserImage
                    imageUri={imageData && imageData.uri}
                    setImageData={setImageData}
                  />
                ) : (
                  <Image
                    style={styles.logo}
                    source={require('../../../assets/images/logo1.png')}
                  />
                )}
              </>
            </View>

            <View style={styles.form}>
              {isSignUpScreen && <Input inputConfig={userNameInput} />}

              <Input inputConfig={emailInput} />
              <Input inputConfig={passwordInput} />

              {isSignUpScreen && <Input inputConfig={confirmPasswordInput} />}

              <TouchableOpacity
                style={{...styles.btn, width: width * 0.6}}
                activeOpacity={0.8}
                onPress={handleSubmit(onPressHandler)}>
                <Text style={styles.btnText}>{btnText}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{...styles.googleBtn, width: width * 0.6}}
                activeOpacity={0.8}
                onPress={() => dispatch(thunks.signInGoogle())}>
                <Text style={styles.btnText}> {btnText} with </Text>
                <Icon type="antdesign" name="google" color={COLOR_WHITE} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[
                {...styles.redirect, marginTop: height * 0.05},
                !isSignUpScreen &&
                  width < height &&
                  styles.redirectSignInScreen,
              ]}
              activeOpacity={0.8}
              onPress={redirectTo}>
              <Text style={styles.redirectText}>{redirectionText}</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  wrapper: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0, 0.4)',
    justifyContent: 'space-between',
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
  },
  imageContainer: {
    maxHeight: 200,
    height: '100%',
    flexShrink: 1,
    flexGrow: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
  },
  form: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  btn: {
    backgroundColor: COLOR_DARK_YELLOW,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginTop: 20,
  },
  googleBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 50,
    alignItems: 'center',
    borderRadius: 25,
    marginTop: 20,
    borderColor: COLOR_DARK_YELLOW,
    borderWidth: 3,
  },
  btnText: {
    color: COLOR_WHITE,
  },
  redirect: {
    justifyContent: 'flex-end',
    alignSelf: 'center',
    marginBottom: 20,
  },
  redirectSignInScreen: {
    flexGrow: 1,
  },
  redirectText: {
    color: '#C1C1C1',
  },
});
