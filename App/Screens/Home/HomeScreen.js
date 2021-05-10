import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {useSelector} from 'react-redux';
import {Loader} from '../../common/Loader';
import * as selectors from '../../store/auth/selectors';
import {Genres} from './components/Genres/Genres';
import {Pager} from './components/Pager/Pager';
import {Sections} from './components/Sections/Sections';
import {useMovieContext} from './HomeScreenProvider';
import {Error} from '../../common/Error';

export const HomeScreen = () => {
  const error = useSelector(selectors.getErrorMessage);

  const {genres, movies, shownMovies, goToMovieDetails} = useMovieContext();

  return (
    <>
      {error && <Error />}
      {(genres.isFetching || movies.isFetching) && <Loader />}

      <View style={styles.container}>
        <Sections />
        <Genres />
        {shownMovies && (
          <Pager
            shownMovies={shownMovies}
            goToMovieDetails={goToMovieDetails}
          />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    zIndex: 0,
    // backgroundColor: '#fff',
    paddingTop: 50,
  },
});
