import React, {useEffect, useLayoutEffect, useMemo, useState} from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {MainStackNavigator} from './MainStackNavigator';
import {Linking, useColorScheme} from 'react-native';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import {
  COLORS_DARK_THEME,
  COLORS_LIGHT_THEME,
  COLOR_BLACK,
  DEFAULT_BG_COLOR,
} from '../consts/consts';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AppNavigator = () => {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState(colorScheme);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useLayoutEffect(() => {
    setTheme(colorScheme);
  }, [colorScheme]);

  useEffect(async () => {
    try {
      const bool = await AsyncStorage.getItem('fullscreen');

      bool && setIsFullScreen(JSON.parse(bool));
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    try {
      const color = theme === 'dark' ? COLOR_BLACK : DEFAULT_BG_COLOR;

      const isLightIcons = theme === 'dark' ? false : true;

      changeNavigationBarColor(color, isLightIcons, true);
    } catch (error) {
      console.error(`AsyncStorage Error: ${error}`);
    }
  }, [theme, isFullScreen]);

  // const CustomDarkTheme = useMemo(
  //   () => ({
  //     ...DarkTheme,
  //     colors: {
  //       ...DarkTheme.colors,
  //       textGray: '#A1A1A1',
  //       backgroundGray: '#BFBFBF',
  //       backgroundBlue: '#ABD2FF',
  //     },
  //     setTheme,
  //     isFullScreen,
  //     setIsFullScreen,
  //   }),
  //   [isFullScreen],
  // );

  // const CustomLightTheme = useMemo(
  //   () => ({
  //     ...DefaultTheme,
  //     colors: {
  //       ...DefaultTheme.colors,
  //       textGray: COLOR_GRAY,
  //       backgroundGray: '#EBEBEB',
  //       backgroundBlue: '#CDE6FF',
  //     },
  //     setTheme,
  //     isFullScreen,
  //     setIsFullScreen,
  //   }),
  //   [isFullScreen],
  // );

  const CustomLightTheme = useMemo(
    () => ({
      colors: COLORS_LIGHT_THEME,
      dark: false,
      setTheme,
      isFullScreen,
      setIsFullScreen,
    }),
    [isFullScreen],
  );

  const CustomDarkTheme = useMemo(
    () => ({
      colors: COLORS_DARK_THEME,
      dark: true,
      setTheme,
      isFullScreen,
      setIsFullScreen,
    }),
    [isFullScreen],
  );

  const linking = {
    prefixes: ['https://www.testproject.com', 'rnproject://'],

    config: {
      screens: {
        initialRouteName: 'HomeDrawer',
        HomeDrawer: {
          screens: {
            Home: {
              initialRouteName: 'Movies',
              screens: {
                Movies: 'movie_list',
                Details: 'details/:movieId',
              },
            },

            Saved: 'saved',

            Forums: {
              initialRouteName: 'ForumList',
              screens: {
                ForumList: 'forum_list',
                Forum: 'forum/:forumId/:title?',
              },
            },
          },
        },

        Auth: {
          screens: {
            SignIn: 'sign_in',
            SignUp: 'sign_up',
          },
        },
        NotFound: '*',
      },
    },

    async getInitialURL() {
      const url = await Linking.getInitialURL();
      console.log({url});

      if (url != null) {
        // const currentUser = await auth().currentUser;
        // console.log({currentUser});
        // store.dispatch(actionsAuth.setUserData(currentUser));
        // store.dispatch(actionsAuth.setIsAuth(true));
        return url;
      }
    },

    // subscribe(listener) {
    //   const onReceiveURL = ({url}) => {
    //     console.log({listener: url});
    //     return listener(url);
    //   };

    //   Linking.addEventListener('url', onReceiveURL);

    //   return () => {
    //     Linking.removeEventListener('url', onReceiveURL);
    //   };
    // },
  };

  return (
    <NavigationContainer
      linking={linking}
      theme={theme === 'dark' ? CustomDarkTheme : CustomLightTheme}>
      <MainStackNavigator />
    </NavigationContainer>
  );
};
