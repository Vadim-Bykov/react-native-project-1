import {Pager, PagerProvider, useFocus} from '@crowdlinker/react-native-pager';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  Animated,
} from 'react-native';
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
  // console.log(shownMovies);
  const {width, height} = useWindowDimensions();

  return (
    <>
      {shownMovies.length ? (
        <PagerProvider>
          <Pager
            initialIndex={1}
            style={{
              height: height * 0.8,
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
