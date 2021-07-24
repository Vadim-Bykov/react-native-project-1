import {useNavigation, useTheme} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {StyleSheet, ToastAndroid} from 'react-native';
import {Header, Input} from 'react-native-elements';
import {COLOR_PURPLE, DEFAULT_BG_COLOR} from '../../../../consts/consts';
import {useMovieContext} from '../../HomeScreen';

export const MoviesHeader = React.memo(() => {
  const navigation = useNavigation();
  const {colors} = useTheme();

  const {
    moviesInstance,
    setShownMovies,
    pagerRef,
    inputText,
    setInputText,
    setActiveIndex,
  } = useMovieContext();

  const onSearchMovie = useCallback(() => {
    if (!inputText.trim()) {
      setActiveIndex(0);
      setShownMovies(moviesInstance);
      pagerRef?.current?.setPageWithoutAnimation(0);
      return;
    }

    const filteredMovies = moviesInstance?.filter(movie =>
      movie.title.toUpperCase().includes(inputText.toUpperCase()),
    );

    if (filteredMovies.length) {
      pagerRef?.current?.setPageWithoutAnimation(0);
      setShownMovies(filteredMovies);
      setActiveIndex(0);
    } else {
      ToastAndroid.show(
        'No movies according to your request',
        ToastAndroid.SHORT,
      );
    }
  }, [inputText, moviesInstance]);

  return (
    <Header
      placement="left"
      leftComponent={{
        icon: 'menu',
        color: COLOR_PURPLE,
        onPress: navigation.openDrawer,
      }}
      centerComponent={
        <Input
          placeholder="Search movie"
          renderErrorMessage={false}
          inputContainerStyle={styles().inputContainer}
          inputStyle={styles().input}
          value={inputText}
          onChangeText={setInputText}
        />
      }
      rightComponent={{
        icon: 'search1',
        type: 'antdesign',
        color: COLOR_PURPLE,
        onPress: onSearchMovie,
      }}
      containerStyle={styles(colors.background).container}
      statusBarProps={{backgroundColor: 'transparent'}}
    />
  );
});

const styles = backgroundColor =>
  StyleSheet.create({
    container: {
      backgroundColor,
      paddingTop: 16,
      paddingBottom: 5,
      paddingHorizontal: 20,
      borderBottomWidth: 0,
    },
    inputContainer: {
      borderBottomColor: COLOR_PURPLE,
      height: 30,
    },

    input: {
      color: COLOR_PURPLE,
      paddingTop: 5,
    },
  });
