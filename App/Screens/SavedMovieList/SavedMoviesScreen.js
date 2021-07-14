import React, {useCallback} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useQuery} from 'react-query';
import * as movieListService from '../../api/movieListService';
import {Loader} from '../../common/Loader';
import {Error} from '../../common/Error';
import {EmptyList} from '../../common/EmptyList';
import {SavedMovieItem} from './components/SavedMovieItem';

export const SavedMoviesScreen = () => {
  const {data, error, isError, isLoading} = useQuery(
    ['movieList'],
    movieListService.getList,
  );

  const renderItem = useCallback(({item}) => {
    // console.log(item);
    return <SavedMovieItem movie={item} />;
  }, []);

  if (isError) return <Error />;

  return (
    <>
      {isLoading && <Loader />}
      {data && data.results ? (
        <FlatList
          data={data.results}
          keyExtractor={item => item.id}
          ListEmptyComponent={<EmptyList text="No one movie" />}
          renderItem={renderItem}
        />
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({});
