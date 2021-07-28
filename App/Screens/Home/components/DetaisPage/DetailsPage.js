import {useTheme} from '@react-navigation/native';
import React from 'react';
import {
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  View,
} from 'react-native';
import {Error} from '../../../../common/Error';
import {BASE_IMAGE_URL, DEFAULT_MOVIE_IMAGE} from '../../../../consts/consts';
import {CastInfo} from './CastInfo';
import {GeneralInfo} from './GeneralInfo';
import {StarBlock} from './StarBlock';

export const DetailsPage = ({data, castInfo, castInfoIsError}) => {
  const {width} = useWindowDimensions();
  const {dark, colors} = useTheme();

  return (
    <ScrollView>
      <Image
        source={{
          uri: data.poster_path
            ? `${BASE_IMAGE_URL}w500/${data.poster_path}`
            : DEFAULT_MOVIE_IMAGE,
        }}
        style={{...styles.image, width, height: width * 0.9}}
      />
      <View style={styles.container}>
        <StarBlock data={data} width={width} dark={dark} />
        <GeneralInfo data={data} colorText={colors.text} dark={dark} />
        {castInfoIsError ? (
          <Error />
        ) : (
          <CastInfo castInfo={castInfo} colorText={colors.text} />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  image: {
    borderBottomLeftRadius: 50,
  },
});
