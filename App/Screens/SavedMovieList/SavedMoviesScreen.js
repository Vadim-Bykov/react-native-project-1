import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {FlatList, StyleSheet, Alert, useWindowDimensions} from 'react-native';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import * as movieListService from '../../api/movieListService';
import {Loader} from '../../common/Loader';
import {Error} from '../../common/Error';
import {EmptyList} from '../../common/EmptyList';
import {SavedMovieItem} from './components/SavedMovieItem';
import {useDispatch} from 'react-redux';
import * as actions from '../../store/auth/actions';
import {extractErrorMessage} from '../../utils/utils';
import {RefreshControl} from 'react-native';
import {
  COLOR_DARK_YELLOW,
  COLOR_PURPLE,
  COLOR_ROSE_RED,
} from '../../consts/consts';
import {useIsFocused} from '@react-navigation/native';
import {ListButton} from './components/ListButton';

export const SavedMoviesScreen = ({navigation}) => {
  const {width} = useWindowDimensions();
  const dispatch = useDispatch();
  const flatListRef = useRef(null);
  const [page, setPage] = useState(1);

  const queryClient = useQueryClient();

  const {data, error, isError, isLoading, isFetching} = useQuery(
    ['movieList', page],
    () => movieListService.getList(page),
    {
      keepPreviousData: true,
    },
  );

  useEffect(() => {
    if (data?.total_pages > 1)
      queryClient.prefetchQuery(['movieList', page + 1], () =>
        movieListService.getList(page + 1),
      );
  }, [data, page, queryClient]);

  const mutation = useMutation(
    movieId => movieListService.removeMovie(movieId),
    {
      onMutate: async () => {
        await queryClient.cancelQueries('movieList');

        const prevData = queryClient.getQueryData('movieList');
        return prevData;
      },

      onError: (err, _, prevData) => {
        queryClient.setQueryData('movieList', prevData);

        dispatch(actions.setError(extractErrorMessage(err)));
        console.error(err);
      },

      onSettled: () => {
        queryClient.invalidateQueries('movieList');
      },
    },
  );

  const onRefresh = useCallback(() => {
    queryClient.invalidateQueries('movieList');
  }, []);

  const goToDetails = useCallback(
    movieId => navigation.navigate('Details', {movieId}),
    [],
  );

  const removeMovie = useCallback(
    movieId =>
      Alert.alert(
        'Deleting',
        'Are sure you want to remove permanently this movie?',
        [
          {text: 'Cancel'},
          {text: 'Yes', onPress: () => mutation.mutate(movieId)},
        ],
      ),
    [],
  );

  const renderItem = useCallback(
    ({item}) => (
      <SavedMovieItem
        movie={item}
        goToDetails={goToDetails}
        removeMovie={removeMovie}
        width={width}
      />
    ),
    [width],
  );

  const ITEM_HEIGHT = useMemo(() => Math.ceil(width * 1.05) + 82, [width]);

  const getItemLayout = (_, index) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  });

  const isFocused = useIsFocused();

  useMemo(() => {
    flatListRef?.current?.scrollToIndex({index: 0, animated: false});
  }, [isFocused, flatListRef?.current, data?.page]);

  useEffect(() => {
    if (isError) {
      dispatch(actions.setError(error.message));
    }
  }, [isError]);

  const setPrevPage = useCallback(() => {
    setPage(prev => Math.max(prev - 1, 1));
  }, []);

  const setNextPage = useCallback(() => {
    setPage(prev => (data?.total_pages > page ? prev + 1 : prev));
  }, [data?.total_pages, page]);

  return (
    <>
      {isLoading && <Loader />}
      {isError && <Error />}

      {data && data.results ? (
        <FlatList
          ref={flatListRef}
          data={data.results}
          keyExtractor={item => item.id}
          ListEmptyComponent={
            <EmptyList text="No saved movies. Please, choose some films." />
          }
          renderItem={renderItem}
          contentContainerStyle={styles.flatListContainer}
          refreshControl={
            <RefreshControl
              colors={[COLOR_DARK_YELLOW, COLOR_ROSE_RED]}
              refreshing={mutation.isLoading || isFetching}
              onRefresh={onRefresh}
              progressBackgroundColor={COLOR_PURPLE}
            />
          }
          getItemLayout={getItemLayout}
          ListHeaderComponent={
            <ListButton
              title="Previous"
              name="page-previous-outline"
              disabled={page === 1}
              setPage={setPrevPage}
            />
          }
          ListFooterComponent={
            <ListButton
              title="Next"
              name="page-next-outline"
              disabled={data?.total_pages === page}
              setPage={setNextPage}
            />
          }
        />
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  flatListContainer: {
    flexGrow: 1,
  },
});
