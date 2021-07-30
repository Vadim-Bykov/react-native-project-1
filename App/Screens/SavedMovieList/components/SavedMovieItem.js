import {useTheme} from '@react-navigation/native';
import React, {useCallback, useMemo} from 'react';
import {StyleSheet, View, Animated} from 'react-native';
import {Card, Icon} from 'react-native-elements';
import {FAB} from 'react-native-elements/dist/buttons/FAB';
import FastImage from 'react-native-fast-image';
import {
  BASE_IMAGE_URL,
  COLOR_DARK_YELLOW,
  DEFAULT_MOVIE_IMAGE,
} from '../../../consts/consts';
import {useAnimateStyle} from '../useAnimateStyle';
import {VoteAverage} from './VoteAverage';

export const SavedMovieItem = React.memo(
  ({movie, goToDetails, removeMovie, width, isActive}) => {
    const goToDetailsPage = useCallback(() => goToDetails(movie.id), []);
    const removeMovieFromStorage = useCallback(() => removeMovie(movie.id), []);

    const {colors, dark} = useTheme();

    const {
      backgroundColor,
      borderColor,
      textColor,
      scale,
      onAnimateColors,
      onAnimateScale,
    } = useAnimateStyle(dark);

    useMemo(() => {
      // onAnimateColors(isActive);
      onAnimateScale(isActive);
    }, [isActive]);

    return (
      // <Card
      //   containerStyle={
      //     // {backgroundColor: 'transparent'}
      //     cardContainerStyles({
      //       backgroundColor: colors.card,
      //       borderColor: colors.border,
      //     }).cardContainer
      //   }>
      <Animated.View
        style={
          cardContainerStyles({
            backgroundColor: colors.card,
            // backgroundColor: backgroundColor,
            borderColor: colors.border,
            scale,
          }).cardContainer
        }>
        <Card.Title style={titleStyles({color: colors.text}).divider}>
          {movie.title.length > 25
            ? `${movie.title.slice(0, 25)}...`
            : movie.title}
        </Card.Title>

        <Card.Divider
          style={dividerStyles({backgroundColor: colors.border}).divider}
        />

        <FastImage
          source={{
            uri: movie.poster_path
              ? `${BASE_IMAGE_URL}w500/${movie.poster_path}`
              : DEFAULT_MOVIE_IMAGE,
          }}
          style={[
            styles.image,
            {width: width * 0.8, height: Math.ceil(width * 1.05)},
          ]}>
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

          <View style={styles.topBlock}>
            <VoteAverage voteAverage={movie.vote_count} />

            <FAB
              icon={
                <Icon
                  type="antdesign"
                  name="delete"
                  color={COLOR_DARK_YELLOW}
                />
              }
              style={styles.FAB}
              onPress={removeMovieFromStorage}
            />
          </View>
        </FastImage>
      </Animated.View>
      // </Card>
    );
  },
);

const cardContainerStyles = ({backgroundColor, borderColor, scale}) =>
  StyleSheet.create({
    cardContainer: {
      backgroundColor,
      borderColor,
      borderWidth: 1,
      marginHorizontal: 20,
      marginTop: 25,
      padding: 10,
      transform: [{scale}],
    },
  });

const dividerStyles = ({backgroundColor}) =>
  StyleSheet.create({
    divider: {
      backgroundColor,
    },
  });

const titleStyles = ({color}) =>
  StyleSheet.create({
    divider: {
      color,
    },
  });

const styles = StyleSheet.create({
  image: {
    elevation: 15,
    justifyContent: 'space-between',
    alignSelf: 'center',
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
