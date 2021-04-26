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
  useWindowDimensions,
} from 'react-native';
import {Input} from '../../common/Input';

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

  const width = useWindowDimensions().width;

  const emailInput = {
    icon: {name: 'mail-outline', color: '#DDBA33'},
    input: {
      placeholder: 'E-mail address',
      textContentType: 'emailAddress',
      value: email,
      setValue: setEmail,
      width,
    },
  };

  const passwordInput = {
    icon: {name: 'lock-outline', color: '#DDBA33'},
    input: {
      placeholder: 'Password',
      textContentType: 'password',
      secureTextEntry: true,
      value: password,
      setValue: setPassword,
      width,
    },
  };

  const confirmPasswordInput = {
    icon: {name: 'lock-outline', color: '#DDBA33'},
    input: {
      placeholder: 'Confirm password',
      textContentType: 'password',
      secureTextEntry: true,
      value: confirmPassword,
      setValue: setConfirmPassword,
      width,
    },
  };

  const onPressHandler = () => {
    if (!email.trim()) {
      Alert.alert('Please fill in the form');
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
    if (
      showPasswordConfirmation &&
      password.trim() !== confirmPassword.trim()
    ) {
      return Alert.alert('Please enter correct password for the second time');
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
              style={{...styles.btn, width: width * 0.6}}
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
