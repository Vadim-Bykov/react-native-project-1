import {Pager, PagerProvider} from '@crowdlinker/react-native-pager';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  Animated,
} from 'react-native';
import PagerView from 'react-native-pager-view';
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
  const {width} = useWindowDimensions();
  const {
    focus,
    currentMovieData,
    activeIndex,
    setActiveIndex,
  } = useMovieContext();

  return (
    <>
      {shownMovies.length ? (
        <>
          {/* <PagerView
            initialPage={1}
            pageMargin={-90}
            offscreenPageLimit={1}
            style={{
              height: width * 1.2,
              width: width * 1,
              marginBottom: 20,
              elevation: 15,
            }}>
            {shownMovies.map(movie => (
              <View style={{width: 0.68}} key={movie.id}>
                <Slide
                  key={movie.id}
                  movie={movie}
                  width={width}
                  goToMovieDetails={goToMovieDetails}
                />
                <BottomPart movie={movie} focused={true} />
              </View>
            ))}
          </PagerView> */}

          <PagerProvider activeIndex={activeIndex} onChange={setActiveIndex}>
            <Pager
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
                />
              ))}
            </Pager>
          </PagerProvider>
          {focus && <BottomPart movie={currentMovieData} focused={focus} />}
        </>
      ) : (
        <View>
          <Text>No movies for this genre</Text>
        </View>
      )}
    </>
  );
};
