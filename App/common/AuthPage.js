import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {w} from '../consts/consts';

export const AuthPage = ({configuration}) => {
  const {
    showPasswordConfirmation,
    btnText,
    redirectionText,
    redirectTo,
  } = configuration;

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
            <View style={styles.inputContainer}>
              <Icon name="mail-outline" color="#DDBA33" />
              <TextInput
                placeholder="E-mail address"
                placeholderTextColor="#fff"
                textContentType="emailAddress"
                style={styles.input}
              />
            </View>
            <View style={styles.inputContainer}>
              <Icon name="lock-outline" color="#DDBA33" />
              <TextInput
                placeholder="Password"
                placeholderTextColor="#fff"
                textContentType="password"
                style={styles.input}
                secureTextEntry={true}
              />
            </View>
            <TouchableOpacity style={styles.btn} activeOpacity={0.8}>
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
  inputContainer: {
    width: w * 0.7,
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
