import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useQuery} from 'react-query';
import {useDispatch} from 'react-redux';
import {getDetails} from '../../api/moviesApi';
import {Loader} from '../../common/Loader';
import {setError} from '../../store/auth/actions';
import {Error} from '../../common/Error';
import {DetailsPage} from './components/DetaisPage/DetailsPage';

export const DetailsScreen = ({route}) => {
  const movieId = route.params.movieId;

  const {data, error, isError, isLoading} = useQuery('Details', () =>
    getDetails(movieId),
  );
  console.log(data);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) dispatch(setError(error.response.data.status_message));
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      {isError ? <Error /> : data && <DetailsPage data={data} />}
    </>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // paddingTop: 50,
//     // zIndex: 0,
//   },
// });
