import React from 'react';
import {AuthPage} from '../../common/AuthPage';

export const SignInScreen = ({navigation}) => {
  const goToSignUp = () => navigation.navigate('SignUp');
  const onSummit = data => console.log(data);

  const configuration = {
    showPasswordConfirmation: false,
    btnText: 'Sign in',
    redirectionText: 'New here? Sign Up',
    redirectTo: goToSignUp,
    onSummit,
  };

  return <AuthPage configuration={configuration} />;
};
