import React, {useCallback} from 'react';
import {StyleSheet, View, Text, useWindowDimensions} from 'react-native';
import {Card, Icon} from 'react-native-elements';
import {FAB} from 'react-native-elements/dist/buttons/FAB';
import FastImage from 'react-native-fast-image';
import {
  BASE_IMAGE_URL,
  BG_COLOR_TRANSPARENT_GRAY,
  COLOR_DARK_YELLOW,
  DEFAULT_MOVIE_IMAGE,
} from '../../../consts/consts';
import {VoteAverage} from './VoteAverage';

export const SavedMovieItem = React.memo(
  ({movie, goToDetails, removeMovie}) => {
    const {width} = useWindowDimensions();
    console.log(movie);

    const goToDetailsPage = useCallback(() => goToDetails(movie.id), []);

    return (
      <Card>
        <Card.Title>{movie.title}</Card.Title>

        <Card.Divider />

        <FastImage
          source={{
            uri: movie.poster_path
              ? `${BASE_IMAGE_URL}w500${movie.poster_path}`
              : DEFAULT_MOVIE_IMAGE,
          }}
          style={[styles.image, {width: width * 0.8, height: width * 1.05}]}>
          <View style={styles.topBlock}>
            <VoteAverage voteAverage={movie.vote_average} />

            <FAB
              icon={
                <Icon type="entypo" name="info" color={COLOR_DARK_YELLOW} />
              }
              style={styles.FAB}
              onPress={goToDetailsPage}
            />
          </View>

          <FAB
            icon={
              <Icon type="antdesign" name="delete" color={COLOR_DARK_YELLOW} />
            }
            style={styles.FAB}
            onPress={removeMovie}
          />
        </FastImage>
      </Card>
    );
  },
);

const styles = StyleSheet.create({
  image: {
    elevation: 15,
  },

  FAB: {
    justifyContent: 'flex-end',
    marginRight: 10,
  },

  topBlock: {
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
});
