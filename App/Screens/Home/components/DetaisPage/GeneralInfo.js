import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export const GeneralInfo = ({data, colorText, dark}) => {
  return (
    <>
      <View style={styles().infoBlock}>
        <Text style={styles(colorText).title}>{data.title}</Text>

        <View style={styles().extraInfo}>
          <Text style={styles().extraInfoText}>
            {data.release_date.slice(0, 4)}
          </Text>
          <Text style={styles().extraInfoText}>
            {Math.floor(data.runtime / 60)}h {data.runtime % 60}min
          </Text>
        </View>

        <View style={styles().genres}>
          {data.genres.map(genre => (
            <View key={genre.id} style={styles().genre}>
              <Text style={styles(colorText).genreName}>{genre.name}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles().summaryBlock}>
        <Text style={styles(colorText).summaryTitle}>Plot Summary</Text>
        <Text style={styles(null, dark).summaryText}>{data.overview}</Text>
      </View>
    </>
  );
};

const styles = (color, dark) =>
  StyleSheet.create({
    infoBlock: {
      paddingHorizontal: 32,
      marginTop: 56,
    },
    title: {
      fontSize: 30,
      color,
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
      color,
    },
    summaryBlock: {
      paddingHorizontal: 32,
      marginVertical: 48,
    },
    summaryTitle: {
      fontSize: 24,
      marginBottom: 14,
      color,
    },
    summaryText: {
      color: dark ? '#B4B4B4' : '#737599',
    },
  });
