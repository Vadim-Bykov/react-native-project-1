import {Pager, PagerProvider} from '@crowdlinker/react-native-pager';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  Animated,
} from 'react-native';
import {useMovieContext} from '../../HomeScreenProvider';
import BottomPart from './BottomPart';
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
  const {width, height} = useWindowDimensions();
  const {focus, movieData, activeIndex, setActiveIndex} = useMovieContext();

  return (
    <>
      {shownMovies.length ? (
        <>
          <PagerProvider activeIndex={activeIndex} onChange={setActiveIndex}>
            <Pager
              // initialIndex={2}
              style={{
                height: width * 0.95,
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
                  // inlineCardsConfig={inlineCardsConfig}
                />
              ))}
            </Pager>
          </PagerProvider>
          {focus && <BottomPart movie={movieData} focused={focus} />}
        </>
      ) : (
        <View>
          <Text>No movies for this genre</Text>
        </View>
      )}
    </>
  );
};
