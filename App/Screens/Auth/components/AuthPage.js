import React, {useCallback, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Alert,
  useWindowDimensions,
  Button,
} from 'react-native';
import {Input} from '../../../common/Input';
// import auth from '@react-native-firebase/auth';
import {AuthFireBase} from './AuthFirebase';
// import {GoogleSignin} from '@react-native-google-signin/google-signin';
import * as thunks from '../../../store/auth/operations';
import {useDispatch, useSelector} from 'react-redux';
import {getIsAuth} from '../../../store/auth/selectors';

// GoogleSignin.configure({
//   webClientId:
//     '846892742605-1lgkes0r5amg8rji2e1b4g11sbq2trev.apps.googleusercontent.com',
// });

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
  const isAuth = useSelector(getIsAuth);
  const width = useWindowDimensions().width;

  const {
    control,
    handleSubmit,
    // formState: {errors},
    // setError,
  } = useForm();

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
        // pattern: /.+@.+\..+/i,
      },
      // setError,
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
      // setError,
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
      },
      // setError,
    },
  };

  const onPressHandler = useCallback(data => {
    if (
      showPasswordConfirmation &&
      data.password.trim() !== data.confirmPassword.trim()
    ) {
      return Alert.alert('Please enter correct password confirmation');
    }

    if (showPasswordConfirmation && data) {
      if (data.password.trim() !== data.confirmPassword.trim())
        return Alert.alert('Please enter correct password confirmation');

      return dispatch(thunks.signUp(data, 'Vadya'));
    }

    if (data) {
      dispatch(thunks.signIn(data));
    }

    onSummit(data);
  }, []);

  if (isAuth) {
    navigation.navigate('Home');
    return null;
  }

  return (
    <>
      {/* {isAuth && navigation.navigate('Home')} */}
      <ImageBackground
        source={require('../../../assets/images/city.jpg')}
        style={styles.imageBackground}>
        <View style={styles.wrapper}>
          <ScrollView contentContainerStyle={styles.container}>
            <AuthFireBase />
            <Button title="Logout" onPress={() => dispatch(thunks.logout())} />
            {/* <Button
            title="Google sign in"
            onPress={() => dispatch(thunks.signInGoogle())}
          /> */}

            <View style={styles.imageContainer}>
              <Image
                style={styles.logo}
                source={require('../../../assets/images/logo1.png')}
              />
            </View>

            <View style={styles.form}>
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
            </View>

            <TouchableOpacity
              style={styles.redirect}
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
  },
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    minHeight: 568,
  },
  imageContainer: {
    flex: 0.45,
    justifyContent: 'center',
  },
  logo: {
    width: 100,
    height: 100,
  },
  form: {
    flex: 0.55,
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
  btnText: {
    color: '#fff',
  },
  redirect: {
    justifyContent: 'center',
    height: 80,
  },
  redirectText: {
    color: '#C1C1C1',
  },
});
