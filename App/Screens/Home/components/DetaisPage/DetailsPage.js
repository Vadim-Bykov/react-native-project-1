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
import {StarBlock} from './StarBlock';

export const DetailsPage = ({data}) => {
  const {width} = useWindowDimensions();

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{uri: `${BASE_IMAGE_URL}w500/${data.poster_path}`}}
        style={{...styles.image, width, height: width * 0.9}}
      />
      <StarBlock data={data} width={width} />
      <Text>Hello</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    borderBottomLeftRadius: 50,
  },
});
