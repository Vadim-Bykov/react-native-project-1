import React from 'react';
import {ScrollView, StyleSheet, Text, View, Button} from 'react-native';
import {useSelector} from 'react-redux';
import {Loader} from '../../common/Loader';
import * as selectors from '../../store/auth/selectors';
import {Genres} from './components/Genres/Genres';
import {MoviePager} from './components/Pager/Pager';
import {Sections} from './components/Sections/Sections';
import {useMovieContext} from './HomeScreenProvider';
import {Error} from '../../common/Error';

export const HomeScreen = () => {
  const error = useSelector(selectors.getErrorMessage);

  const {genres, movies, shownMovies, goToMovieDetails} = useMovieContext();

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        {error && <Error />}
        {(genres.isFetching || movies.isFetching) && <Loader />}

        <Sections />
        <Genres />
        {shownMovies && (
          <MoviePager
            shownMovies={shownMovies}
            goToMovieDetails={goToMovieDetails}
          />
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: 'center',
    zIndex: 0,
    paddingTop: 50,
    // flexGrow: 1,
    // backgroundColor: 'blue',
  },
});
