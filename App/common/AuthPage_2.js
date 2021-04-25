import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import {Dimensions} from 'react-native';
import {getWidthWindow} from '../utils/utils';
import {Icon} from 'react-native-elements/dist/icons/Icon';

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
  const [width, setWidth] = useState(getWidthWindow);

  const changeWidth = () => setWidth(getWidthWindow());

  useEffect(() => {
    Dimensions.addEventListener('change', changeWidth);

    return () => Dimensions.removeEventListener('change', changeWidth);
  }, []);

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
      source={require('../assets/images/city.jpg')}
      style={styles.imageBackground}>
      <View style={styles.wrapper}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.logo}
              source={require('../assets/images/logo1.png')}
            />
          </View>

          <View style={styles.form}>
            <View style={{...styles.inputContainer, width: width * 0.7}}>
              <Icon name="mail-outline" type="material" color="#DDBA33" />
              <TextInput
                placeholder="E-mail address"
                placeholderTextColor="#fff"
                textContentType="emailAddress"
                secureTextEntry={false}
                value={email}
                onChangeText={setEmail}
                style={styles.input}
              />
            </View>
            <View style={{...styles.inputContainer, width: width * 0.7}}>
              <Icon name="lock-outline" type="material" color="#DDBA33" />
              <TextInput
                placeholder="Password"
                placeholderTextColor="#fff"
                textContentType="password"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
                style={styles.input}
              />
            </View>

            {showPasswordConfirmation && (
              <View style={{...styles.inputContainer, width: width * 0.7}}>
                <Icon name="lock-outline" type="material" color="#DDBA33" />
                <TextInput
                  placeholder="Confirm password"
                  placeholderTextColor="#fff"
                  textContentType="password"
                  secureTextEntry={true}
                  value={password}
                  onChangeText={setPassword}
                  style={styles.input}
                />
              </View>
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

  inputContainer: {
    backgroundColor: 'rgba(0,0,0, 0.4)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  input: {
    color: '#fff',
    width: '90%',
    marginLeft: 10,
    // fontFamily: 'Nunito-Light',
  },
});
