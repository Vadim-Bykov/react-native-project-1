import React, {useEffect, useState} from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  FlatList,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Error} from '../../common/Error';
import {Loader} from '../../common/Loader';
import * as thunks from '../../store/auth/operations';
import * as selectors from '../../store/auth/selectors';
import {FavoriteMovieItem} from './components/FavoriteMovieItem';

export const FavoriteScreen = () => {
  const isFetching = useSelector(selectors.getIsFetching);
  const error = useSelector(selectors.getErrorMessage);

  const {width, height} = useWindowDimensions();

  const [favoriteMovies, setFavoriteMovies] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem('favoriteMovies', (err, res) =>
      setFavoriteMovies(JSON.parse(res)),
    );
  }, []);
  console.log(favoriteMovies);

  const renderItem = ({item}) => <FavoriteMovieItem movie={item} />;

  return (
    <>
      {isFetching && <Loader />}
      {error && <Error />}
      {favoriteMovies ? (
        <FlatList
          data={favoriteMovies}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      ) : (
        <View>
          <Text>FavoriteScreen</Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({});
