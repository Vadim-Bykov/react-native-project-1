import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Error} from '../../common/Error';
import {Loader} from '../../common/Loader';
import * as thunks from '../../store/auth/operations';
import * as selectors from '../../store/auth/selectors';

export const FavoriteScreen = () => {
  const isFetching = useSelector(selectors.getIsFetching);
  const error = useSelector(selectors.getErrorMessage);
  return (
    <>
      {isFetching && <Loader />}
      {error && <Error />}
      <View>
        <Text>FavoriteScreen</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({});
