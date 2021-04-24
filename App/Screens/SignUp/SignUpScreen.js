import React from 'react';
import {AuthPage} from '../../common/AuthPage';

export const SignUpScreen = ({navigation}) => {
  const goToSignIn = () => navigation.goBack();

  const configuration = {
    showPasswordConfirmation: true,
    btnText: 'Sign up',
    redirectionText: 'Already have account? Sign In',
    redirectTo: goToSignIn,
  };

  return <AuthPage configuration={configuration} />;
};
