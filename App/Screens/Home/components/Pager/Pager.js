import React from 'react';
import {StyleSheet, Image, Text, View, ScrollView} from 'react-native';
import PagerView from 'react-native-pager-view';
import {BASE_IMAGE_URL} from '../../../../consts/consts';

export const Pager = ({movies}) => {
  console.log(movies);

  return (
    <>
      {movies.length ? (
        // <PagerView style={styles.pagerView}>
        //   {movies.map(movie => (
        //     <Image
        //       key={movie.id}
        //       source={{uri: `${BASE_IMAGE_URL}w185/${movie.poster_path}`}}
        //       style={styles.image}
        //     />
        //   ))}
        // </PagerView>
        <ScrollView
          horizontal={true}
          style={styles.containerStyle}
          contentContainerStyle={styles.container}>
          {movies.map(movie => (
            <Image
              key={movie.id}
              source={{uri: `${BASE_IMAGE_URL}w185/${movie.poster_path}`}}
              style={styles.image}
            />
          ))}
        </ScrollView>
      ) : (
        <View>
          <Text>No movies for this genre</Text>
        </View>
      )}
      <Text>Hello</Text>
    </>
  );
};

const styles = StyleSheet.create({
  pagerView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'blue',
    // zIndex: 10000,
  },
  image: {
    width: 185,
    height: 280,
    marginHorizontal: 10,
  },

  container: {
    //  height: 45,
    padding: 10,
    //  backgroundColor: 'blue',
    // marginBottom: 20,
  },
  containerStyle: {
    flexGrow: 0,
  },
});
