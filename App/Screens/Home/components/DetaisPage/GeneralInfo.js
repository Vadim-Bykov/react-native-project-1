import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Avatar} from 'react-native-elements/dist/avatar/Avatar';
import {BASE_IMAGE_URL} from '../../../../consts/consts';

export const GeneralInfo = ({data, castInfo}) => (
  <>
    <View style={styles.infoBlock}>
      <Text style={styles.title}>{data.title}</Text>

      <View style={styles.extraInfo}>
        <Text style={styles.extraInfoText}>
          {data.release_date.slice(0, 4)}
        </Text>
        <Text style={styles.extraInfoText}>
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

    <View style={styles.castBlock}>
      <Text style={styles.castTitle}>Cast & Crew</Text>
      <ScrollView horizontal={true} style={{paddingBottom: 6}}>
        {castInfo.cast.map(actor => (
          <View key={actor.id} style={styles.profile}>
            <Avatar
              rounded
              source={{
                uri: actor.profile_path
                  ? `${BASE_IMAGE_URL}w45/${actor.profile_path}`
                  : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROZzxwSXuX4cnu0J_5Rry0_Al5RqAafnKT3A&usqp=CAU',
              }}
              size={60}
              containerStyle={{marginBottom: 12}}
            />
            <Text>{actor.name}</Text>
            <Text style={styles.character}>{actor.character}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  </>
);

const styles = StyleSheet.create({
  infoBlock: {
    paddingHorizontal: 32,
    marginTop: 56,
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
  extraInfoText: {
    color: '#9A9BB3',
  },
  genres: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
  },
  genre: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: '#9A9BB3',
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
    marginVertical: 48,
  },
  summaryTitle: {
    fontSize: 24,
    marginBottom: 14,
  },
  summaryText: {
    color: '#737599',
  },
  castBlock: {
    paddingHorizontal: 32,
    marginBottom: 24,
  },
  castTitle: {
    fontSize: 24,
    marginBottom: 14,
  },
  profile: {
    alignItems: 'center',
    marginRight: 16,
  },
  character: {
    color: '#9A9BB3',
  },
});
