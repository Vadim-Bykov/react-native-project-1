import React, {useCallback, useEffect, useState} from 'react';
import {AsyncStorage, StyleSheet, Text, View} from 'react-native';
import {Badge, Icon} from 'react-native-elements';
import {useDispatch} from 'react-redux';
import {COMMON_ERROR_MESSAGE} from '../../../../consts/consts';
import {setError} from '../../../../store/auth/actions';

export const StarBlock = ({data, width}) => {
  const [favoriteMovies, setFavoriteMovies] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  const dispatch = useDispatch();
  // AsyncStorage.removeItem('favoriteMovies', (err, res) => console.log(err, res));

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

  const getItem = useCallback(async (err, res) => {
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
      favoriteMovies && favoriteMovies.length
        ? await AsyncStorage.getItem('favoriteMovies', (err, res) => {
            if (res) {
              res = JSON.parse(res);

              if (isFavorite) removeItem(res);

              if (!isFavorite) setItem(res);
            } else {
              dispatch(setError(`AsyncStorage Error: ${COMMON_ERROR_MESSAGE}`));
              console.error(`AsyncStorage Error: ${err}`);
            }
          })
        : await AsyncStorage.setItem(
            'favoriteMovies',
            JSON.stringify([data]),
            getItem,
          );
    } catch (err) {
      dispatch(setError(`AsyncStorage Error: ${COMMON_ERROR_MESSAGE}`));
      console.error(`AsyncStorage Error: ${err}`);
    }
  }, [favoriteMovies, isFavorite]);

  return (
    <View style={{...styles.container, width: width * 0.9}}>
      <View>
        <Icon type="antdesign" name="star" color="#FFDD00" />
        <Text>{data.vote_average}/10</Text>
      </View>

      <View>
        <Icon
          type="antdesign"
          name={isFavorite ? 'star' : 'staro'}
          color={isFavorite ? '#FF005F' : '#000'}
          onPress={changeMovieStorage}
        />
        <Text>{isFavorite ? 'Saved' : 'Save to favorites'}</Text>
      </View>

      <View>
        <Badge
          status="success"
          value={data.vote_count}
          textStyle={styles.voteCount}
          containerStyle={{height: 24, marginTop: 5}}
        />
        <Text>Vote count</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    alignSelf: 'flex-end',
    paddingHorizontal: 30,
    marginTop: -50,
    backgroundColor: '#fff',
    elevation: 10,
  },
  voteCount: {
    borderRadius: 3,
    backgroundColor: '#51C51B',
    height: 24,
    paddingTop: 3,
  },
});
