import React, {useCallback, useEffect} from 'react';
import {FlatList, StyleSheet, Text, View, Alert} from 'react-native';
import {useQuery} from 'react-query';
import * as movieListService from '../../api/movieListService';
import {Loader} from '../../common/Loader';
import {Error} from '../../common/Error';
import {EmptyList} from '../../common/EmptyList';
import {SavedMovieItem} from './components/SavedMovieItem';
import {useDispatch} from 'react-redux';

export const SavedMoviesScreen = ({navigation}) => {
  const {data, error, isError, isLoading} = useQuery(
    ['movieList'],
    movieListService.getList,
  );

  const dispatch = useDispatch();

  const goToDetails = useCallback(
    movieId => navigation.navigate('Details', {movieId}),
    [],
  );

  const removeMovie = useCallback(
    id =>
      Alert.alert(
        'Deleting',
        'Are sure you want to remove permanently this movie?',
        [{text: 'Cancel'}, {text: 'Yes', onPress: () => {}}],
      ),
    [],
  );

  useEffect(() => {
    if (isError) {
      dispatch(actions.setError(error.message));
    }
  }, [isError]);

  const renderItem = useCallback(
    ({item}) => (
      <SavedMovieItem
        movie={item}
        goToDetails={goToDetails}
        removeMovie={removeMovie}
      />
    ),
    [],
  );

  if (isError) return <Error />;

  return (
    <>
      {isLoading && <Loader />}
      {data && data.results ? (
        <FlatList
          data={data.results.reverse()}
          keyExtractor={item => item.id}
          ListEmptyComponent={<EmptyList text="No one movie" />}
          renderItem={renderItem}
        />
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({});
