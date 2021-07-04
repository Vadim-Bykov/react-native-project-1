import React, {useCallback} from 'react';
import {
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {
  BASE_IMAGE_URL,
  COLOR_BLACK,
  COLOR_ROSE_RED,
  COLOR_WHITE,
  DEFAULT_MOVIE_IMAGE,
} from '../../../consts/consts';

const MONTHS_MAP = {
  '01': 'January',
  '02': 'February',
  '03': 'March',
  '04': 'April',
  '05': 'May',
  '06': 'June',
  '07': 'July',
  '08': 'August',
  '09': 'September',
  10: 'October',
  11: 'November  ',
  12: 'December ',
};

export const FavoriteMovieItem = React.memo(
  ({movie, goToDetailsPage, removeItem}) => {
    const {width} = useWindowDimensions();

    const dateArray = movie.release_date.split('-');
    const month = MONTHS_MAP[dateArray[1]];
    const day = dateArray[2];

    const goToDetails = useCallback(() => goToDetailsPage(movie.id), [
      movie.id,
    ]);

    const removeMovieFromSaved = useCallback(() => removeItem(movie.id), [
      movie.id,
    ]);

    return (
      <TouchableOpacity onPress={goToDetails} activeOpacity={0.8}>
        <ImageBackground
          fadeDuration={100}
          imageStyle={styles.image}
          style={{
            ...styles.container,
            width: width * 0.8,
            height: width * 1.05,
          }}
          source={{
            uri: movie.poster_path
              ? `${BASE_IMAGE_URL}w300${movie.poster_path}`
              : DEFAULT_MOVIE_IMAGE,
          }}>
          <View style={styles.topBlock}>
            <View style={styles.outline}>
              <View style={styles.infoCircle}>
                <Text style={styles.voteAverage}>{movie.vote_average}</Text>
              </View>
            </View>

            <Icon
              type="antdesign"
              name="heart"
              color={COLOR_ROSE_RED}
              size={30}
              onPress={removeMovieFromSaved}
            />
          </View>

          <Text style={styles.title}>{movie.title}</Text>

          <View style={styles.extraInfo}>
            <Text style={styles.runtime}>
              {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}min
            </Text>
            <Text style={styles.releaseDate}>
              {day} {month}
            </Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
    alignSelf: 'center',
    borderRadius: 30,
    elevation: 15,
  },

  image: {
    borderRadius: 30,
  },

  topBlock: {
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },

  outline: {
    width: 50,
    height: 50,
    borderColor: COLOR_WHITE,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 25,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  infoCircle: {
    width: '100%',
    height: '100%',
    backgroundColor: COLOR_WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },

  voteAverage: {
    fontWeight: '700',
  },

  title: {
    alignSelf: 'center',
    width: '80%',
    color: COLOR_WHITE,
    fontSize: 32,
    textAlign: 'center',
    fontWeight: '700',
    paddingVertical: 10,
    textShadowColor: COLOR_BLACK,
    textShadowOffset: {width: 0.5, height: 0.5},
    textShadowRadius: 1,
  },

  extraInfo: {
    alignSelf: 'center',
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  runtime: {
    color: COLOR_WHITE,
    textShadowColor: COLOR_BLACK,
    textShadowOffset: {width: 0.5, height: 0.5},
    textShadowRadius: 1,
  },

  releaseDate: {
    color: COLOR_WHITE,
    textShadowColor: COLOR_BLACK,
    textShadowOffset: {width: 0.5, height: 0.5},
    textShadowRadius: 1,
    marginLeft: 10,
  },
});
