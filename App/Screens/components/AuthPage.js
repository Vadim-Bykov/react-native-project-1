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
import {Input} from '../../common/Input';
import auth from '@react-native-firebase/auth';
import {AuthFireBase} from './AuthFirebase';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId:
    '846892742605-1lgkes0r5amg8rji2e1b4g11sbq2trev.apps.googleusercontent.com',
});

export const AuthPage = ({configuration}) => {
  const {
    showPasswordConfirmation = false,
    btnText,
    redirectionText,
    redirectTo,
    onSummit,
  } = configuration;

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
        maxLength: {value: 6, message: 'Exceeded max length 6'},
        minLength: {value: 4, message: 'Not achieved min length 4'},
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
        maxLength: {value: 6, message: 'Exceeded max length 6'},
        minLength: {value: 4, message: 'Not achieved min length 4'},
      },
      // setError,
    },
  };

  const onPressHandler = useCallback(data => {
    // console.log(errors);

    if (
      showPasswordConfirmation &&
      data.password.trim() !== data.confirmPassword.trim()
    ) {
      return Alert.alert('Please enter correct password confirmation');
    }

    onSummit(data);
  }, []);

  const signUp = () => {
    auth()
      .createUserWithEmailAndPassword(
        'jane_1.doe@example.com',
        'SuperSecretPassword!',
      )
      .then(userCredentials => {
        if (userCredentials.user) {
          userCredentials.user
            .updateProfile({
              displayName: 'Jane_1',
            })
            .then(userCredentials => {
              // this.props.navigation.navigate('Account');
              console.log(userCredentials);
            });
        }
      })
      // .then(() => {
      //   console.log('User account created & signed in!');
      // })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  };

  const signIn = () => {
    auth()
      .signInWithEmailAndPassword(
        'jane.doe@example.com',
        'SuperSecretPassword!',
      )
      .then(userCredentials => {
        if (userCredentials.user) {
          userCredentials.user
            .updateProfile({
              displayName: 'Jane_Ok',
            })
            .then(() => {
              auth().currentUser.reload();
              // this.props.navigation.navigate('Account');
              console.log(auth().currentUser);
            });
        }
      })
      // .then(() => {
      //   console.log('User account created & signed in!');
      // })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  };

  const logout = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };

  const onGoogleButtonPress = async () => {
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  };

  return (
    <ImageBackground
      source={require('../../assets/images/city.jpg')}
      style={styles.imageBackground}>
      <View style={styles.wrapper}>
        <ScrollView contentContainerStyle={styles.container}>
          <AuthFireBase />
          <Button title="Sign Up" onPress={signUp} />
          <Button title="Sign In" onPress={signIn} />
          <Button title="Logout" onPress={logout} />
          <Button
            title="Google sign in"
            onPress={() =>
              onGoogleButtonPress().then(() =>
                console.log('Signed in with Google!'),
              )
            }
          />

          <View style={styles.imageContainer}>
            <Image
              style={styles.logo}
              source={require('../../assets/images/logo1.png')}
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
