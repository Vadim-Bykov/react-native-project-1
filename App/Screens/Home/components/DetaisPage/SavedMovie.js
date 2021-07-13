import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {useDispatch} from 'react-redux';
import {COLOR_BLACK, COLOR_BLUE} from '../../../../consts/consts';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import * as movieListService from '../../../../api/movieListService';
import * as actions from '../../../../store/auth/actions';

export const SavedInList = React.memo(({movie}) => {
  const [isSaved, setIsSaved] = useState(false);

  const queryClient = useQueryClient();

  const {isError, data, error} = useQuery(
    ['movieList'],
    movieListService.getList,
  );

  useEffect(() => {
    if (data && data.results) {
      const isContains = data.results.some(item => item.id === movie.id);
      setIsSaved(isContains);
    } else if (isError) {
      dispatch(actions.setError(error.message));
    }
  }, [isError, data, error]);

  // console.log(data && data.results.length);

  const mutateStorage = useMutation(
    () => {
      console.log(isSaved);
      isSaved
        ? movieListService.removeMovie(movie.id)
        : movieListService.addMovie(movie.id);
    },
    {
      onMutate: async () => {
        await queryClient.cancelMutations('movieList');
      },
      onError: err => {
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
        type="antdesign"
        name={isSaved ? 'star' : 'staro'}
        color={isSaved ? COLOR_BLUE : COLOR_BLACK}
        onPress={mutateStorage.mutate}
      />
      <Text>{isSaved ? 'Saved' : 'Save'}</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});
