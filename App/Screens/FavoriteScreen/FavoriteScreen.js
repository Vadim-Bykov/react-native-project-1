import React, {useCallback, useEffect, useState} from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  FlatList,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Error} from '../../common/Error';
import {Loader} from '../../common/Loader';
import {COMMON_ERROR_MESSAGE} from '../../consts/consts';
import {setError, setIsFetching} from '../../store/auth/actions';
import * as selectors from '../../store/auth/selectors';
import {FavoriteMovieItem} from './components/FavoriteMovieItem';

export const FavoriteScreen = ({navigation}) => {
  const isFetching = useSelector(selectors.getIsFetching);
  const error = useSelector(selectors.getErrorMessage);

  const dispatch = useDispatch();

  const {width, height} = useWindowDimensions();

  const [favoriteMovies, setFavoriteMovies] = useState(null);

  useEffect(() => {
    dispatch(setIsFetching(true));
    AsyncStorage.getItem('favoriteMovies', (err, res) => {
      if (res) {
        setFavoriteMovies(JSON.parse(res));
        dispatch(setIsFetching(false));
      } else if (err) {
        dispatch(setError(`AsyncStorage Error: ${COMMON_ERROR_MESSAGE}`));
        console.error(`AsyncStorage Error: ${err}`);
      }
    });
  }, []);

  const getItem = useCallback((err, res) => {
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
      dispatch(setIsFetching(false));
    });
  }, []);

  const removeStorageItem = id => {
    dispatch(setIsFetching(true));
    const restMovies = favoriteMovies.filter(movie => movie.id !== id);
    AsyncStorage.setItem('favoriteMovies', JSON.stringify(restMovies), getItem);
  };

  const removeItem = useCallback(
    id => {
      Alert.alert(
        'Remove movie',
        'Are sure? Do you want to remove a movie from your favorites?',
        [{text: 'Cancel'}, {text: 'Yes', onPress: () => removeStorageItem(id)}],
      );
    },
    [favoriteMovies],
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

  return (
    <>
      {error && <Error />}
      {isFetching ? (
        <Loader />
      ) : favoriteMovies && favoriteMovies.length ? (
        <FlatList
          data={favoriteMovies}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          windowSize={11}
          initialNumToRender={6}
          maxToRenderPerBatch={6}
          style={
            favoriteMovies.length === 1 &&
            width < height && {marginTop: width * 0.2}
          }
        />
      ) : (
        <View style={styles.emptyScreen}>
          <Text style={styles.text}>
            No favorite movies. Please, choose some films for your own favorite
            list.
          </Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  emptyScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  text: {
    textAlign: 'center',
  },
});
