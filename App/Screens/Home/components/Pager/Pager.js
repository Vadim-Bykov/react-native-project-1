import {Pager, PagerProvider, useFocus} from '@crowdlinker/react-native-pager';
import React from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
// import PagerView from 'react-native-pager-view';
import {BASE_IMAGE_URL} from '../../../../consts/consts';
import {Slide} from './Slide';

const inlineCardsConfig = {
  transform: [
    {
      scale: {
        inputRange: [-1, 0, 1],
        outputRange: [1, 1, 1],
      },
    },
  ],
};

export const MoviePager = ({shownMovies, goToMovieDetails}) => {
  console.log(shownMovies);
  const {width} = useWindowDimensions();

  const focused = useFocus();
  // console.log(focus);

  return (
    <>
      {shownMovies.length ? (
        <PagerProvider>
          <Pager
            initialIndex={2}
            style={{
              height: width * 1.05,
              width: width * 0.75,
              alignSelf: 'center',
            }}
            pageInterpolation={inlineCardsConfig}>
            {shownMovies.map(movie => (
              <Slide
                key={movie.id}
                movie={movie}
                width={width}
                goToMovieDetails={goToMovieDetails}
                inlineCardsConfig={inlineCardsConfig}
              />
              // <TouchableOpacity
              //   key={movie.id}
              //   activeOpacity={0.8}
              //   onPress={() => goToMovieDetails(movie.id)}
              //   style={{
              //     borderColor: 'blue',
              //     borderWidth: StyleSheet.hairlineWidth,
              //     height: width * 1.05,
              //     width: width * 0.75,
              //     alignSelf: 'center',
              //     marginHorizontal: 10,
              //   }}>
              //   <Image
              //     source={{uri: `${BASE_IMAGE_URL}w300/${movie.poster_path}`}}
              //     style={{
              //       ...styles.image,
              //       height: width * 1,
              //       width: width * 0.68,
              //     }}
              //   />
              //   <Text>{`Focused: ${focused}`}</Text>
              // </TouchableOpacity>
            ))}
          </Pager>
        </PagerProvider>
      ) : (
        <View>
          <Text>No movies for this genre</Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  pagerView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'blue',
  },
  image: {
    borderRadius: 20,
    alignSelf: 'center',
    // elevation: 10,
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
