import React from 'react';
import {AuthPage} from './components/AuthPage';

export const SignUpScreen = ({navigation}) => {
  const goToSignIn = () => navigation.navigate('SignIn');

  const configuration = {
    showPasswordConfirmation: true,
    btnText: 'Sign up',
    redirectionText: 'Already have account? Sign In',
    redirectTo: goToSignIn,
  };

  return <AuthPage configuration={configuration} />;
};
