import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {w} from '../consts/consts';
import {Input} from './Input';

export const AuthPage = ({configuration}) => {
  const {
    showPasswordConfirmation = false,
    btnText,
    redirectionText,
    redirectTo,
    onSummit,
  } = configuration;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const emailInput = {
    icon: {name: 'mail-outline', color: '#DDBA33'},
    input: {
      placeholder: 'E-mail address',
      textContentType: 'emailAddress',
      value: email,
      setValue: setEmail,
    },
  };

  const passwordInput = {
    icon: {...emailInput.icon, name: 'lock-outline'},
    input: {
      placeholder: 'Password',
      textContentType: 'password',
      secureTextEntry: true,
      value: password,
      setValue: setPassword,
    },
  };

  const confirmPasswordInput = {
    icon: {...passwordInput.icon},
    input: {
      ...passwordInput.input,
      placeholder: 'Confirm password',
      value: confirmPassword,
      setValue: setConfirmPassword,
    },
  };
  const onPressHandler = () => {
    if (!email.trim()) {
      Alert.alert('Please enter e-mail');
      return setEmail('');
    }
    if (!password.trim()) {
      Alert.alert('Please enter password');
      return setPassword('');
    }
    if (showPasswordConfirmation && !confirmPassword.trim()) {
      Alert.alert('Please confirm password');
      return setConfirmPassword('');
    }
    onSummit({email, password, confirmPassword});
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <ImageBackground
      source={require('../../assets/images/city.jpg')}
      style={styles.imageBackground}>
      <View style={styles.wrapper}>
        <ScrollView contentContainerStyle={styles.container}>
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
              style={styles.btn}
              activeOpacity={0.8}
              onPress={onPressHandler}>
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
    // backgroundColor: 'blue',
  },
  logo: {
    width: 100,
    height: 100,
  },
  form: {
    flex: 0.55,
    // backgroundColor: 'green',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  btn: {
    width: w * 0.6,
    backgroundColor: '#DDBA33',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginTop: 20,
  },
  btnText: {
    color: '#fff',
    // fontFamily: 'Nunito-Italic',
  },
  redirect: {
    // backgroundColor: 'red',
    // flex: 0.1,
    justifyContent: 'center',
    height: 80,
  },
  redirectText: {
    color: '#C1C1C1',
  },
});
