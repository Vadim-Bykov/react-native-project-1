import React, {useCallback} from 'react';
import {
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  ImageBackground,
  PixelRatio,
  TouchableOpacity,
} from 'react-native';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {BASE_IMAGE_URL} from '../../../consts/consts';

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
    // const poster = {
    //   uri: `${BASE_IMAGE_URL}w300${movie.poster_path}`,
    //   width: width * 0.8,
    //   height: width * 1.05,
    // };

    // console.log(PixelRatio.getPixelSizeForLayoutSize(width));
    // console.log(width);

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
          source={{uri: `${BASE_IMAGE_URL}w300${movie.poster_path}`}}
          // source={poster}
          // style={{
          //   ...styles.container,
          //   width: PixelRatio.getPixelSizeForLayoutSize(width * 0.8), height: width * 1.05
          // }}
        >
          <View style={styles.topBlock}>
            <View style={styles.outline}>
              <View style={styles.infoCircle}>
                <Text style={styles.voteAverage}>{movie.vote_average}</Text>
              </View>
            </View>

            <Icon
              type="antdesign"
              name="heart"
              color="#FF005F"
              size={30}
              onPress={removeMovieFromSaved}
            />
          </View>

          <Text style={styles.title}>{movie.title}</Text>

          <View style={styles.extraInfo}>
            <Text style={styles.extraInfoText}>
              {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}min
            </Text>
            <Text style={styles.extraInfoText}>
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
    borderColor: '#fff',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 25,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  infoCircle: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
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
    color: '#fff',
    fontSize: 32,
    textAlign: 'center',
    fontWeight: '700',
    paddingVertical: 10,
  },

  extraInfo: {
    alignSelf: 'center',
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  extraInfoText: {
    color: '#fff',
  },
});
