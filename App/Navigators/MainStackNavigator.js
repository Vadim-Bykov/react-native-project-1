import React, {useEffect, useState} from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
// import {SignInScreen} from '../Screens/Auth/SignInScreen';
// import {SignUpScreen} from '../Screens/Auth/SignUpScreen';
import {HomeScreen} from '../Screens/Home/HomeScreen';
import {AuthStackNavigator} from './AuthStackNavigator';
import {SplashScreen} from '../Screens/StartScreen/SplashScreen';
import {useAuthentication} from '../Screens/StartScreen/components/useAuthentication';
import {useDispatch} from 'react-redux';
import {setIsAuth} from '../store/auth/actions';

const Stack = createStackNavigator();

export const MainStackNavigator = () => {
  const [initialized, setInitialized] = useState(false);
  const dispatch = useDispatch();

  const authorized = useAuthentication();
  useEffect(() => {
    dispatch(setIsAuth(authorized));
    setInitialized(true);
  }, [authorized]);

  const config = {
    animation: 'timing',
    config: {
      duration: 200,
    },
  };

  if (!initialized) return <SplashScreen />;

  return (
    <Stack.Navigator
      screenOptions={{
        transitionSpec: {open: config, close: config},
        cardStyle: {backgroundColor: 'transparent'},
        cardOverlayEnabled: true,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
      }}
      mode="modal">
      <Stack.Screen
        name="Auth"
        component={AuthStackNavigator}
        options={{
          headerShown: false,
        }}
      />
      {/* <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{
          headerTitle: false,
          headerTransparent: 1,
          headerTintColor: '#fff',
        }}
      /> */}
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
