import React from 'react';
import {
  Image,
  StyleSheet,
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
        source={{
          uri: data.poster_path
            ? `${BASE_IMAGE_URL}w500/${data.poster_path}`
            : 'https://target.scene7.com/is/image/Target/GUEST_e684225b-5a68-49b2-8fc3-493e515ef4ca?wid=488&hei=488&fmt=pjpeg',
        }}
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
