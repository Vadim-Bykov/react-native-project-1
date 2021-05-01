import React, {useCallback, useEffect} from 'react';
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
  Alert,
} from 'react-native';
import {Input} from '../../../common/Input';
import {AuthFireBase} from './AuthFirebase';
import * as thunks from '../../../store/auth/operations';
import {useDispatch, useSelector} from 'react-redux';
import * as selectors from '../../../store/auth/selectors';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {setError} from '../../../store/auth/actions';
import {Loader} from '../../../common/Loader';

export const AuthPage = ({configuration}) => {
  const {
    showPasswordConfirmation = false,
    btnText,
    redirectionText,
    redirectTo,
    onSummit,
    navigation,
  } = configuration;

  const dispatch = useDispatch();
  const isAuth = useSelector(selectors.getIsAuth);
  const isFetching = useSelector(selectors.getIsFetching);
  const error = useSelector(selectors.getErrorMessage);
  const width = useWindowDimensions().width;
  const height = useWindowDimensions().height;

  // useEffect(() => dispatch(thunks.AuthFireBase()), []);

  const {
    control,
    handleSubmit,
    reset,
    formState: {isSubmitSuccessful},
  } = useForm();

  const password = useWatch({control, name: 'password', defaultValue: ''});

  const userNameInput = {
    icon: {type: 'feather', iconName: 'user', color: '#DDBA33'},
    input: {
      placeholder: 'user name',
      textContentType: 'name',
      width,
      name: 'userName',
      control,
      rules: {
        required: 'This field is required',
      },
    },
  };

  const emailInput = {
    icon: {iconName: 'mail-outline', color: '#DDBA33'},
    input: {
      placeholder: 'E-mail address',
      textContentType: 'emailAddress',
      width,
      name: 'email',
      control,
      rules: {
        required: 'This email field is required',
        pattern: {value: /.+@.+\..+/i, message: 'Incorrect e-mail'},
      },
    },
  };

  const passwordInput = {
    icon: {iconName: 'lock-outline', color: '#DDBA33'},
    input: {
      placeholder: 'Password',
      textContentType: 'password',
      secureTextEntry: true,
      width,
      name: 'password',
      control,
      rules: {
        required: 'This password field is required',
        maxLength: {value: 25, message: 'Exceeded max length 25'},
        minLength: {value: 6, message: 'Not achieved min length 6'},
      },
    },
  };

  const confirmPasswordInput = {
    icon: {iconName: 'lock-outline', color: '#DDBA33'},
    input: {
      placeholder: 'Confirm password',
      textContentType: 'password',
      secureTextEntry: true,
      width,
      name: 'confirmPassword',
      control,
      rules: {
        required: 'This confirmation is required',
        maxLength: {value: 25, message: 'Exceeded max length 25'},
        minLength: {value: 6, message: 'Not achieved min length 6'},
        validate: value => value === password || 'The password do not match',
      },
    },
  };

  const onPressHandler = useCallback(data => {
    if (showPasswordConfirmation && data) {
      return dispatch(thunks.signUp(data));
    }

    if (data) {
      dispatch(thunks.signIn(data));
    }

    onSummit(data);
  }, []);

  useEffect(() => {
    if (isSubmitSuccessful) reset();
  }, [isSubmitSuccessful, reset]);

  if (isAuth) {
    navigation.navigate('Home');
    return null;
  }

  if (error) {
    Alert.alert(error);
    dispatch(setError(''));
  }

  return (
    <>
      {isFetching && <Loader />}
      <AuthFireBase />
      <ImageBackground
        source={require('../../../assets/images/city.jpg')}
        style={styles.imageBackground}>
        <View style={styles.wrapper}>
          <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.imageContainer}>
              <Image
                style={styles.logo}
                source={require('../../../assets/images/logo1.png')}
              />
            </View>

            <View style={styles.form}>
              {showPasswordConfirmation && (
                <Input inputConfig={userNameInput} />
              )}

              <Input inputConfig={emailInput} />
              <Input inputConfig={passwordInput} />

              {showPasswordConfirmation && (
                <Input inputConfig={confirmPasswordInput} />
              )}

              <TouchableOpacity
                style={{...styles.btn, width: width * 0.6}}
                activeOpacity={0.8}
                onPress={handleSubmit(onPressHandler)}>
                <Text style={styles.btnText}>{btnText}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{...styles.btnGoogle, width: width * 0.6}}
                activeOpacity={0.8}
                onPress={() => dispatch(thunks.signInGoogle())}>
                <Text style={styles.btnText}> {btnText} with </Text>
                <Icon type="antdesign" name="google" color="#fff" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[
                {...styles.redirect, marginTop: height * 0.05},
                !showPasswordConfirmation &&
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
    backgroundColor: '#DDBA33',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginTop: 20,
  },
  btnGoogle: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 50,
    alignItems: 'center',
    borderRadius: 25,
    marginTop: 20,
    borderColor: '#DDBA33',
    borderWidth: 3,
  },
  btnText: {
    color: '#fff',
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
