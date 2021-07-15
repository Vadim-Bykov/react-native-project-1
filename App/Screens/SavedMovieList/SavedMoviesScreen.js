import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Alert,
  useWindowDimensions,
} from 'react-native';
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
  COLOR_WHITE,
} from '../../consts/consts';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import {Button, Chip, Icon} from 'react-native-elements';
import {TouchableOpacity} from 'react-native';

export const SavedMoviesScreen = ({navigation}) => {
  const {width} = useWindowDimensions();
  const dispatch = useDispatch();
  const flatListRef = useRef(null);
  const [page, setPage] = useState(1);

  const queryClient = useQueryClient();

  const {
    data,
    error,
    isError,
    isLoading,
    isPreviousData,
    isFetching,
  } = useQuery(['movieList', page], () => movieListService.getList(page), {
    keepPreviousData: true,
    staleTime: 5000,
  });

  useEffect(() => {
    // if (data?.hasMore)
    if (data?.total_pages > 1)
      queryClient.prefetchQuery(['movieList', page + 1], () =>
        movieListService.getList(page + 1),
      );
  }, [data, page, queryClient]);

  // console.log(data && data.results.length);

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
    !isFocused &&
      flatListRef &&
      flatListRef.current &&
      flatListRef.current.scrollToIndex({index: 0, animated: false});
  }, [flatListRef, isFocused]);

  useEffect(() => {
    if (isError) {
      dispatch(actions.setError(error.message));
    }
  }, [isError]);

  console.log(data);

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
              refreshing={mutation.isLoading}
              onRefresh={() => queryClient.invalidateQueries('movieList')}
              progressBackgroundColor={COLOR_PURPLE}
            />
          }
          getItemLayout={getItemLayout}
          ListHeaderComponent={
            <Button
              title="Prev"
              type="outline"
              icon={
                <Icon
                  type="material-community"
                  name="page-previous-outline"
                  color={COLOR_DARK_YELLOW}
                />
              }
              containerStyle={styles.btnContainer}
              buttonStyle={styles.btn}
              titleStyle={{color: COLOR_DARK_YELLOW}}
              disabled={page === 1}
              onPress={() => setPage(prev => Math.max(prev - 1, 1))}
              loading={isFetching}
            />
          }
          ListFooterComponent={
            <Button
              title="Next"
              type="outline"
              icon={
                <Icon
                  type="material-community"
                  name="page-next-outline"
                  color={COLOR_DARK_YELLOW}
                />
              }
              containerStyle={[styles.btnContainer, styles.extraMargin]}
              buttonStyle={styles.btn}
              titleStyle={{color: COLOR_DARK_YELLOW}}
              disabled={data?.total_pages === page}
              // onPress={() => setPage(prev => (data?.hasMore ? prev + 1 : prev))}
              onPress={() =>
                setPage(prev => (data?.total_pages > page ? prev + 1 : prev))
              }
              // onPress={() => setPage(prev => prev + 1)}
              loading={isFetching}
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

  btnContainer: {
    width: 150,
    alignSelf: 'center',
  },

  extraMargin: {
    marginVertical: 15,
  },

  btn: {
    justifyContent: 'space-evenly',
    borderWidth: 2,
    borderColor: COLOR_DARK_YELLOW,
    borderRadius: 25,
  },
});
