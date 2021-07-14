import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {useDispatch} from 'react-redux';
import {
  COLOR_BLACK,
  COLOR_BLUE,
  COLOR_TRANSLUCENT_PURPLE,
} from '../../../../consts/consts';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import * as movieListService from '../../../../api/movieListService';
import * as actions from '../../../../store/auth/actions';
import {extractErrorMessage} from '../../../../utils/utils';

export const SavedInList = React.memo(({movieId}) => {
  const [isSaved, setIsSaved] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const queryClient = useQueryClient();

  const {isError, data, error} = useQuery(
    ['movieList'],
    movieListService.getList,
  );

  useEffect(() => {
    if (data && data.results) {
      const isContains = data.results.some(item => item.id === movieId);
      setIsSaved(isContains);
      setDisabled(false);
    } else if (isError) {
      dispatch(actions.setError(error.message));
      setDisabled(false);
    }
  }, [isError, data, error]);

  const mutateStorage = useMutation(
    () =>
      isSaved
        ? movieListService.removeMovie(movieId)
        : movieListService.addMovie(movieId),

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