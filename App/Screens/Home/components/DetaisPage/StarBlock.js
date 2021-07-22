import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Badge, Icon} from 'react-native-elements';
import {useDispatch} from 'react-redux';
import {
  COLOR_BLACK,
  COLOR_ROSE_RED,
  COLOR_WHITE,
  COMMON_ERROR_MESSAGE,
} from '../../../../consts/consts';
import {setError} from '../../../../store/auth/actions';
import {SavedInList} from './SavedInList';

export const StarBlock = ({data, width, dark}) => {
  const [favoriteMovies, setFavoriteMovies] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    AsyncStorage.getItem('favoriteMovies', (err, res) => {
      if (res) {
        res = JSON.parse(res);
        setFavoriteMovies(res);
        const isFavorite = res.some(movie => movie.id === data.id);
        setIsFavorite(isFavorite);
      } else if (err) {
        dispatch(setError(`AsyncStorage Error: ${COMMON_ERROR_MESSAGE}`));
        console.error(`AsyncStorage Error: ${err}`);
      }
    });
  }, []);

  const getItem = useCallback(async err => {
    if (err) {
      dispatch(setError(`AsyncStorage Error: ${COMMON_ERROR_MESSAGE}`));
      console.error(`AsyncStorage Error: ${err}`);
      return;
    }

    await AsyncStorage.getItem('favoriteMovies', (err, res) => {
      if (res) {
        setFavoriteMovies(JSON.parse(res));
        setIsFavorite(isFavorite => !isFavorite);
      } else {
        dispatch(setError(`AsyncStorage Error: ${COMMON_ERROR_MESSAGE}`));
        console.error(`AsyncStorage Error: ${err}`);
      }
    });
  }, []);

  const removeItem = useCallback(async res => {
    try {
      res = res.filter(movie => movie.id !== data.id);
      await AsyncStorage.setItem(
        'favoriteMovies',
        JSON.stringify(res),
        getItem,
      );
    } catch (err) {
      dispatch(setError(`AsyncStorage Error: ${COMMON_ERROR_MESSAGE}`));
      console.error(`AsyncStorage Error: ${err}`);
    }
  }, []);

  const setItem = useCallback(async res => {
    try {
      await AsyncStorage.setItem(
        'favoriteMovies',
        JSON.stringify([data, ...res]),
        getItem,
      );
    } catch (err) {
      dispatch(setError(`AsyncStorage Error: ${COMMON_ERROR_MESSAGE}`));
      console.error(`AsyncStorage Error: ${err}`);
    }
  }, []);

  const changeMovieStorage = useCallback(async () => {
    try {
      if (favoriteMovies && favoriteMovies.length) {
        isFavorite ? removeItem(favoriteMovies) : setItem(favoriteMovies);
      } else {
        await AsyncStorage.setItem(
          'favoriteMovies',
          JSON.stringify([data]),
          getItem,
        );
      }
    } catch (err) {
      dispatch(setError(`AsyncStorage Error: ${COMMON_ERROR_MESSAGE}`));
      console.error(`AsyncStorage Error: ${err}`);
    }
  }, [favoriteMovies, isFavorite]);

  return (
    <View style={{...styles(dark, width).container}}>
      <View>
        <Icon type="antdesign" name="star" color="#FFDD00" />
        <Text>{data.vote_average}/10</Text>
      </View>

      <View>
        <Icon
          type="antdesign"
          name={isFavorite ? 'star' : 'staro'}
          color={isFavorite ? COLOR_ROSE_RED : COLOR_BLACK}
          onPress={changeMovieStorage}
        />
        <Text>{isFavorite ? 'Saved' : 'Save to favorites'}</Text>
      </View>

      <SavedInList movieId={data.id} posterPath={data.poster_path} />

      <View>
        <Badge
          status="success"
          value={data.vote_count}
          textStyle={styles().voteCount}
          containerStyle={{height: 24, marginTop: 5}}
        />
        <Text>Vote count</Text>
      </View>
    </View>
  );
};

const styles = (dark, width) =>
  StyleSheet.create({
    container: {
      width: width * 0.9,
      height: 100,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderTopLeftRadius: 50,
      borderBottomLeftRadius: 50,
      alignSelf: 'flex-end',
      paddingHorizontal: 30,
      marginTop: -50,
      backgroundColor: dark ? '#B4B4B4' : COLOR_WHITE,
      elevation: 10,
    },
    voteCount: {
      borderRadius: 3,
      backgroundColor: '#51C51B',
      height: 24,
      paddingTop: 3,
    },
  });
