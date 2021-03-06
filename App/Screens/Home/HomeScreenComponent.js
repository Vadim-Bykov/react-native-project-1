import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {Loader} from '../../common/Loader';
import * as selectors from '../../store/auth/selectors';
import {Genres} from './components/Genres/Genres';
import {MoviePager} from './components/Pager/Pager';
import {Sections} from './components/Sections/Sections';
import {useMovieContext} from './HomeScreen';
import {Error} from '../../common/Error';
import {MoviesHeader} from './components/Header/Header';

export const HomeScreenComponent = () => {
  const error = useSelector(selectors.getErrorMessage);
  const isFetchingCommon = useSelector(selectors.getIsFetching);

  const {genres, movies, shownMovies} = useMovieContext();

  return (
    <>
      {error && <Error />}
      {(genres.isFetching || movies.isFetching || isFetchingCommon) && (
        <Loader />
      )}

      <ScrollView
        contentContainerStyle={styles.container}
        stickyHeaderIndices={[0]}>
        <MoviesHeader />
        <Sections />
        <Genres />
        {shownMovies && <MoviePager />}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    zIndex: 0,
    // paddingTop: 70,
  },
});
