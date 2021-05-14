import React, {useEffect} from 'react';
import {useQuery} from 'react-query';
import {useDispatch} from 'react-redux';
import * as api from '../../api/moviesApi';
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
    if (details.isError)
      dispatch(setError(details.error.response.data.status_message));
    if (castInfo.isError)
      dispatch(setError(castInfo.error.response.data.status_message));
  }, []);

  return (
    <>
      {(details.isFetching || castInfo.isFetching) && <Loader />}
      {details.isError || castInfo.isError ? (
        <Error />
      ) : (
        details.data &&
        castInfo.data && (
          <DetailsPage data={details.data} castInfo={castInfo.data} />
        )
      )}
    </>
  );
};
