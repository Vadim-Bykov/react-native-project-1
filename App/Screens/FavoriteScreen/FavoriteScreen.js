import React, {useCallback, useLayoutEffect, useMemo, useState} from 'react';
import {StyleSheet, useWindowDimensions, FlatList, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {Loader} from '../../common/Loader';
import {COMMON_ERROR_MESSAGE} from '../../consts/consts';
import {setError, setIsFetching} from '../../store/auth/actions';
import * as selectors from '../../store/auth/selectors';
import {FavoriteMovieItem} from './components/FavoriteMovieItem';
import {EmptyList} from '../../common/EmptyList';
import {ErrorBoundary} from '../../common/ErrorBoundary';
import {hideNavigationBar} from 'react-native-navigation-bar-color';
import {useTheme} from '@react-navigation/native';

export const FavoriteScreen = ({navigation}) => {
  const isFetching = useSelector(selectors.getIsFetching);

  const dispatch = useDispatch();

  const {width, height} = useWindowDimensions();
  const {isFullScreen} = useTheme();

  const [favoriteMovies, setFavoriteMovies] = useState(null);

  useLayoutEffect(() => {
    dispatch(setIsFetching(true));
    AsyncStorage.getItem('favoriteMovies', (err, res) => {
      if (res) {
        setFavoriteMovies(JSON.parse(res));
      } else if (err) {
        dispatch(setError(`AsyncStorage Error: ${COMMON_ERROR_MESSAGE}`));
        console.error(`AsyncStorage Error: ${err}`);
      }
    }).finally(() => dispatch(setIsFetching(false)));
  }, []);

  const getItem = useCallback(err => {
    if (err) {
      dispatch(setError(`AsyncStorage Error: ${COMMON_ERROR_MESSAGE}`));
      console.error(`AsyncStorage Error: ${err}`);
      return;
    }

    AsyncStorage.getItem('favoriteMovies', (err, res) => {
      if (res) {
        res = JSON.parse(res);
        setFavoriteMovies(res);
      } else {
        dispatch(setError(`AsyncStorage Error: ${COMMON_ERROR_MESSAGE}`));
        console.error(`AsyncStorage Error: ${err}`);
      }
    });
  }, []);

  const removeStorageItem = useCallback(async id => {
    try {
      const favoriteMovies = await AsyncStorage.getItem('favoriteMovies');

      const restMovies = JSON.parse(favoriteMovies).filter(
        movie => movie.id !== id,
      );
      AsyncStorage.setItem(
        'favoriteMovies',
        JSON.stringify(restMovies),
        getItem,
      );
    } catch (err) {
      dispatch(setError(`AsyncStorage Error: ${COMMON_ERROR_MESSAGE}`));
      console.error(`AsyncStorage Error: ${err}`);
    }
  }, []);

  const removeItem = useCallback(
    id => {
      Alert.alert(
        'Remove movie',
        'Are sure? Do you want to remove a movie from your favorites?',
        [
          {
            text: 'Cancel',
            onPress: () => {
              isFullScreen && hideNavigationBar();
            },
          },
          {
            text: 'Yes',
            onPress: () => {
              removeStorageItem(id);
              isFullScreen && hideNavigationBar();
            },
          },
        ],
      );
    },
    [favoriteMovies, isFullScreen],
  );

  const goToDetailsPage = useCallback(
    movieId => navigation.navigate('Details', {movieId}),
    [],
  );

  const renderItem = ({item}) => (
    <FavoriteMovieItem
      movie={item}
      goToDetailsPage={goToDetailsPage}
      removeItem={removeItem}
    />
  );

  const isSingleMoviePortrait = useMemo(
    () => favoriteMovies && favoriteMovies.length === 1 && width < height,
    [favoriteMovies],
  );

  return (
    <ErrorBoundary width={width} height={height}>
      {isFetching ? (
        <Loader />
      ) : (
        <FlatList
          data={favoriteMovies}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          ListEmptyComponent={
            <EmptyList
              text="No favorite movies. Please, choose some films for your own favorite
      list."
            />
          }
          windowSize={11}
          initialNumToRender={6}
          maxToRenderPerBatch={6}
          contentContainerStyle={styles.flatListContainer}
          style={isSingleMoviePortrait && {marginTop: width * 0.2}}
        />
      )}
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  flatListContainer: {
    flexGrow: 1,
  },
});
