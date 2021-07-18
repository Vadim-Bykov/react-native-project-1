import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {useDispatch} from 'react-redux';
import {
  BASE_IMAGE_URL,
  COLOR_BLACK,
  COLOR_BLUE,
  COLOR_TRANSLUCENT_PURPLE,
  DEFAULT_MOVIE_IMAGE,
} from '../../../../consts/consts';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import * as movieListService from '../../../../api/movieListService';
import * as actions from '../../../../store/auth/actions';
import {extractErrorMessage} from '../../../../utils/utils';
import FastImage from 'react-native-fast-image';

export const SavedInList = React.memo(({movieId, posterPath}) => {
  const [isSaved, setIsSaved] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [page, setPage] = useState(1);
  const [isUpdating, setIsUpdating] = useState(false);

  const queryClient = useQueryClient();

  // Fix the problem with invalidate (cashable) data after save  movie and go back to the DetailsPage earlier then 5 min
  useEffect(() => {
    setTimeout(() => {
      setIsUpdating(true);
      setPage(1);
      queryClient.invalidateQueries('movieList', 1);
    });
  }, []);

  const {isError, data, error} = useQuery(['movieList', page], () =>
    movieListService.getList(page),
  );

  useEffect(() => {
    if (isUpdating) return;

    if (data?.results) {
      const isContains = data.results.some(item => item.id === movieId);

      !isContains && data.total_pages > page
        ? setPage(prev => prev + 1)
        : (setIsSaved(isContains), setDisabled(false));
    } else if (isError) {
      dispatch(actions.setError(error.message));
      setDisabled(false);
    }
  }, [isError, data?.results, error]);

  const updateStatusIsSaved = useCallback((success, action) => {
    if (success) {
      setIsSaved(action === 'added' ? true : false);
      setIsUpdating(true);
      setDisabled(false);
    }
  }, []);

  const mutateStorage = useMutation(
    () =>
      isSaved
        ? movieListService
            .removeMovie(movieId)
            .then(res => updateStatusIsSaved(res.data.success, 'removed'))
        : (movieListService
            .addMovie(movieId)
            .then(res => updateStatusIsSaved(res.data.success, 'added')),
          FastImage.preload([
            {
              uri: posterPath
                ? `${BASE_IMAGE_URL}w500/${posterPath}`
                : DEFAULT_MOVIE_IMAGE,
            },
          ])),

    {
      onMutate: async () => {
        setDisabled(true);

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

  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Icon
        type="ionicon"
        name={isSaved ? 'save' : 'save-outline'}
        color={isSaved ? COLOR_BLUE : COLOR_BLACK}
        onPress={mutateStorage.mutate}
        disabled={disabled}
        disabledStyle={styles.disabledIcon}
      />
      <Text>{isSaved ? 'Saved' : 'Save'}</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  disabledIcon: {
    zIndex: 1,
    backgroundColor: COLOR_TRANSLUCENT_PURPLE,
  },
});
