import React, {useEffect, useState} from 'react';
import {AsyncStorage, StyleSheet, Text, View} from 'react-native';
import {Badge, Icon} from 'react-native-elements';

export const StarBlock = ({data, width}) => {
  const [favoriteMovies, setFavoriteMovies] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  // AsyncStorage.removeItem('favoriteMovies', (err, res) => console.log(res));

  useEffect(() => {
    AsyncStorage.getItem('favoriteMovies', (err, res) => {
      if (res) {
        res = JSON.parse(res);
        setFavoriteMovies(res);
        const isFavorite = res.some(movie => movie.id === data.id);
        console.log(isFavorite);
        setIsFavorite(isFavorite);
      }
    });
  }, []);

  const removeItem = res => {
    res = res.filter(movie => movie.id !== data.id);
    AsyncStorage.setItem('favoriteMovies', JSON.stringify(res), () =>
      AsyncStorage.getItem('favoriteMovies', (err, res) => {
        if (res) {
          res = JSON.parse(res);
          setFavoriteMovies(res);
          setIsFavorite(false);
        }
      }),
    );
  };

  const setFirstItem = res => {
    AsyncStorage.setItem('favoriteMovies', JSON.stringify([data, ...res]), () =>
      AsyncStorage.getItem('favoriteMovies', (err, res) => {
        setFavoriteMovies(JSON.parse(res));
        setIsFavorite(true);
      }),
    );
  };

  const setMovieIntoStorage = async data => {
    try {
      favoriteMovies
        ? AsyncStorage.getItem('favoriteMovies', (err, res) => {
            if (res) {
              res = JSON.parse(res);

              if (isFavorite) removeItem(res);

              if (!isFavorite) setFirstItem(res);
            }
          })
        : await AsyncStorage.setItem(
            'favoriteMovies',
            JSON.stringify([data]),
            () =>
              AsyncStorage.getItem('favoriteMovies', (err, res) => {
                setFavoriteMovies(JSON.parse(res));
                setIsFavorite(true);
              }),
          );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{...styles.container, width: width * 0.9}}>
      <View>
        <Icon type="antdesign" name="star" color="#FFDD00" />
        <Text>{data.vote_average}/10</Text>
      </View>

      <View>
        <Icon
          type="antdesign"
          name={isFavorite ? 'star' : 'staro'}
          color={isFavorite ? '#FF005F' : '#000'}
          onPress={() => setMovieIntoStorage(data)}
        />
        <Text>{isFavorite ? 'Saved' : 'Save to favorites'}</Text>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    alignSelf: 'flex-end',
    paddingHorizontal: 30,
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
