import React, {useEffect} from 'react';
import {useQuery} from 'react-query';
import {useDispatch} from 'react-redux';
import * as api from '../../api/movieApiService';
import {Loader} from '../../common/Loader';
import {setError} from '../../store/auth/actions';
import {Error} from '../../common/Error';
import {DetailsPage} from './components/DetaisPage/DetailsPage';

export const DetailsScreen = ({route}) => {
  const movieId = route.params.movieId;

  const details = useQuery('Details', () => api.getDetails(movieId));
  const castInfo = useQuery('CastInfo', () => api.getCastInfo(movieId));

  const dispatch = useDispatch();

  useEffect(() => {
    if (details.isError) {
      console.log(details);
      console.log(details.isError);
      console.log(details.error.response.data.status_message);
      dispatch(setError(details.error.response.data.status_message));
    }
    if (castInfo.isError)
      dispatch(setError(castInfo.error.response.data.status_message));
  }, [details.isError, castInfo.isError]);

  return (
    <>
      {(details.isFetching || castInfo.isFetching) && <Loader />}
      {details.isError ? (
        <Error />
      ) : castInfo.isError && details.data ? (
        <DetailsPage data={details.data} castInfoIsError={castInfo.isError} />
      ) : (
        details.data &&
        castInfo.data && (
          <DetailsPage data={details.data} castInfo={castInfo.data} />
        )
      )}
    </>
  );
};
