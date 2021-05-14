import React, {useEffect, useRef} from 'react';
import {Text, View, useWindowDimensions} from 'react-native';
import PagerView from 'react-native-pager-view';
import {useMovieContext} from '../../HomeScreenProvider';
import BottomPart from './BottomPart';
import {Slide} from './Slide';

export const MoviePager = () => {
  const {width} = useWindowDimensions();
  const {
    shownMovies,
    goToMovieDetails,
    activeIndex,
    setActiveIndex,
    setPagerRef,
  } = useMovieContext();

  const pagerView = useRef(null);

  useEffect(() => {
    if (pagerView && pagerView.current) setPagerRef(pagerView);
  }, [pagerView]);

  return (
    <>
      {shownMovies.length ? (
        <>
          <PagerView
            ref={pagerView}
            initialPage={0}
            pageMargin={-90}
            offscreenPageLimit={1}
            onPageSelected={e => setActiveIndex(e.nativeEvent.position)}
            style={{height: width, width: width * 1}}>
            {shownMovies.map(movie => (
              <View style={{width: 0.68}} key={movie.id}>
                <Slide
                  key={movie.id}
                  movie={movie}
                  width={width}
                  goToMovieDetails={goToMovieDetails}
                />
              </View>
            ))}
          </PagerView>
          <BottomPart movie={shownMovies[activeIndex]} />
        </>
      ) : (
        <View>
          <Text>No movies for this genre</Text>
        </View>
      )}
    </>
  );
};
