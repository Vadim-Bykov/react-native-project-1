import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {FlatList, StyleSheet, Alert, useWindowDimensions} from 'react-native';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';
import * as movieListService from '../../api/movieListService';
import {Loader} from '../../common/Loader';
import {Error} from '../../common/Error';
import {EmptyList} from '../../common/EmptyList';
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
import {SavedMovieItem} from '../SavedMovieList/components/SavedMovieItem';
// import {ListButton} from '../SavedMovieList/components/ListButton';

export const InfinityMoviesScreen = ({navigation}) => {
  const {width, height} = useWindowDimensions();
  const dispatch = useDispatch();
  const flatListRef = useRef(null);
  const [movies, setMovies] = useState([]);

  const queryClient = useQueryClient();

  const onRefresh = useCallback(() => {
    queryClient.invalidateQueries('movieList');
  }, []);

  const goToDetails = useCallback(
    movieId => navigation.navigate('Details', {movieId}),
    [],
  );

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    isError,
  } = useInfiniteQuery('movieList', movieListService.getInfinityList, {
    getNextPageParam: lastPage => lastPage.next,
  });

  useEffect(() => {
    const movieSet = new Set();
    setMovies([]);
    data?.pages.forEach((page, i) => {
      page.data.results.forEach((movie, j) => {
        // fix the problem with displaying duplicates after deleting last item on the page
        if (!movieSet.has(movie.id)) {
          movieSet.add(movie.id);
          setMovies(prev => [...prev, movie]);
        }
      });
    });
  }, [data?.pages]);

  useEffect(() => {
    if (isError) {
      dispatch(actions.setError(error.message));
      console.error(error);
    }
  }, [isError]);

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

  const isFocused = useIsFocused();

  useLayoutEffect(() => {
    movies.length &&
      flatListRef?.current?.scrollToIndex({index: 0, animated: false});
  }, [isFocused]);

  const setNextPage = useCallback(() => fetchNextPage(), [fetchNextPage]);

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

  const ITEM_HEIGHT = useMemo(() => Math.ceil(width * 1.05) + 82 + 15, [width]);

  const getItemLayout = (_, index) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  });

  return (
    <>
      {isLoading && <Loader />}
      {isError && <Error />}

      {movies.length ? (
        <FlatList
          ref={flatListRef}
          data={movies}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          initialNumToRender={5}
          contentContainerStyle={styles(height, ITEM_HEIGHT).flatListContainer}
          snapToInterval={ITEM_HEIGHT}
          disableIntervalMomentum
          decelerationRate="normal"
          ListEmptyComponent={
            <EmptyList text="No saved movies. Please, choose some films." />
          }
          refreshControl={
            <RefreshControl
              colors={[COLOR_DARK_YELLOW, COLOR_ROSE_RED]}
              refreshing={mutation.isLoading || isFetching}
              onRefresh={onRefresh}
              progressBackgroundColor={COLOR_PURPLE}
            />
          }
          getItemLayout={getItemLayout}
          onEndReached={hasNextPage && setNextPage}
          // ListFooterComponent={
          //   <ListButton
          //     title="Next"
          //     name="page-next-outline"
          //     disabled={!hasNextPage}
          //     setPage={setNextPage}
          //   />
          // }
        />
      ) : null}
    </>
  );
};

const styles = (height, ITEM_HEIGHT) =>
  StyleSheet.create({
    flatListContainer: {
      flexGrow: 1,
      paddingVertical: (height - ITEM_HEIGHT - 82 - 15) / 2,
    },
  });
