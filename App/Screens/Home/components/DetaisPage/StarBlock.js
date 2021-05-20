import React, {useEffect, useState} from 'react';
import {AsyncStorage, StyleSheet, Text, View} from 'react-native';
import {Badge, Icon} from 'react-native-elements';

const getSoundList = () => {
  let soundList = [];

  const localSoundList = JSON.parse(localStorage.getItem('soundList'));

  if (localSoundList) {
    soundList = localSoundList;
  } else {
    soundList = sounds;
    localStorage.setItem('soundList', JSON.stringify(sounds));
  }
  return soundList;
};

export const StarBlock = ({data, width}) => {
  const [favoriteMovies, setFavoriteMovies] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('favoriteMovies', (err, res) => {
      // console.log(res);
      if (res) {
        res = JSON.parse(res);
        setFavoriteMovies(res);
        const isFavorite = res.some(movie => movie.id === data.id);
        console.log(isFavorite);
        setIsFavorite(isFavorite);
      }
    });
  }, []);

  const setMovieIntoStorage = async data => {
    try {
      favoriteMovies
        ? AsyncStorage.getItem('favoriteMovies', (err, res) => {
            if (res) {
              res = JSON.parse(res);
              console.log(res);
              AsyncStorage.setItem(
                'favoriteMovies',
                JSON.stringify([...res, data]),
                () =>
                  AsyncStorage.getItem('favoriteMovies', (err, res) => {
                    setFavoriteMovies(JSON.parse(res));
                    setIsFavorite(true);
                  }),
              );
            }
          })
        : await AsyncStorage.setItem(
            'favoriteMovies',
            JSON.stringify([data]),
            () =>
              AsyncStorage.getItem('favoriteMovies', (err, res) =>
                setFavoriteMovies(JSON.parse(res)),
              ),
          );
    } catch (error) {
      console.error(error);
    }
  };

  console.log(favoriteMovies);
  // console.log(data);

  return (
    <View style={{...styles.container, width: width * 0.9}}>
      <View>
        <Icon type="antdesign" name="star" color="#FFDD00" />
        <Text>{data.vote_average}/10</Text>
      </View>

      <View>
        <Icon
          type="antdesign"
          name="staro"
          color={isFavorite ? 'red' : '#000'}
          onPress={() => setMovieIntoStorage(data)}
        />
        <Text>Save to favorites</Text>
      </View>

      <View>
        <Badge
          status="success"
          value={data.vote_count}
          textStyle={styles.voteCount}
          containerStyle={{height: 24, marginTop: 5}}
        />
        <Text>Vote count</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    alignSelf: 'flex-end',
    marginTop: -50,
    backgroundColor: '#fff',
    elevation: 10,
  },
  voteCount: {
    borderRadius: 3,
    backgroundColor: '#51C51B',
    height: 24,
    paddingTop: 3,
  },
});
