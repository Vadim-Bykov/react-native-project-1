import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Avatar} from 'react-native-elements/dist/avatar/Avatar';
import {BASE_IMAGE_URL} from '../../../../consts/consts';

export const GeneralInfo = ({data, castInfo}) => {
  console.log(castInfo);
  return (
    <>
      <View style={styles.infoBlock}>
        <Text style={styles.title}>{data.title}</Text>

        <View style={styles.extraInfo}>
          <Text style={{color: '#9A9BB3'}}>
            {data.release_date.slice(0, 4)}
          </Text>
          <Text style={{color: '#9A9BB3'}}>
            {Math.floor(data.runtime / 60)}h {data.runtime % 60}min
          </Text>
        </View>

        <View style={styles.genres}>
          {data.genres.map(genre => (
            <View key={genre.id} style={styles.genre}>
              <Text style={styles.genreName}>{genre.name}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.summaryBlock}>
        <Text style={styles.summaryTitle}>Plot Summary</Text>
        <Text style={styles.summaryText}>{data.overview}</Text>
      </View>

      <ScrollView horizontal={true} style={styles.castBlock}>
        <Text style={styles.castTitle}>Cast & Crew</Text>

        {castInfo.cast.map(actor => (
          <View key={actor.id}>
            <Avatar
              rounded
              source={{
                uri: `${BASE_IMAGE_URL}${actor.profile_path}`,
              }}
              size="large"
            />
            <Text>{actor.name}</Text>
            <Text>{actor.character}</Text>
          </View>
        ))}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  infoBlock: {
    paddingHorizontal: 32,
    marginVertical: 24,
  },
  title: {
    fontSize: 30,
  },
  extraInfo: {
    width: 120,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  genres: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
  },
  genre: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: '#828282',
    borderWidth: 1.5,
    borderRadius: 20,
    height: 45,
    marginRight: 12,
    marginTop: 12,
  },
  genreName: {
    color: '#000',
  },
  summaryBlock: {
    paddingHorizontal: 32,
    marginVertical: 36,
  },
  summaryTitle: {
    fontSize: 24,
    marginBottom: 14,
  },
  castBlock: {
    paddingHorizontal: 32,
  },
  castTitle: {
    fontSize: 24,
    marginBottom: 14,
  },
});
