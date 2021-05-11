import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  useWindowDimensions,
  ScrollView,
  View,
} from 'react-native';
import {BASE_IMAGE_URL} from '../../../../consts/consts';
import {CastInfo} from './CastInfo';
import {GeneralInfo} from './GeneralInfo';
import {StarBlock} from './StarBlock';

export const DetailsPage = ({data, castInfo}) => {
  const {width} = useWindowDimensions();

  return (
    <ScrollView>
      <Image
        source={{uri: `${BASE_IMAGE_URL}w500/${data.poster_path}`}}
        style={{...styles.image, width, height: width * 0.9}}
      />
      <View style={styles.container}>
        <StarBlock data={data} width={width} />
        <GeneralInfo data={data} />
        <CastInfo castInfo={castInfo} />
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
