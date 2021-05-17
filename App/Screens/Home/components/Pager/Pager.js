import React, {useEffect, useRef, useState} from 'react';
import {Text, View, useWindowDimensions} from 'react-native';
import PagerView from 'react-native-pager-view';
import {useMovieContext} from '../../HomeScreenProvider';
import BottomPart from './BottomPart';
import {Slide} from './Slide';

export const MoviePager = () => {
  const {width} = useWindowDimensions();
  const [isScrollRight, setIsScrollRight] = useState(false);
  const {
    shownMovies,
    goToMovieDetails,
    activeIndex,
    setActiveIndex,
    setPagerRef,
    isBottomPart,
    setIsBottomPart,
  } = useMovieContext();

  const pagerView = useRef(null);

  useEffect(() => {
    if (pagerView && pagerView.current) setPagerRef(pagerView);
  }, [pagerView]);

  const onPageScroll = e => {
    e.nativeEvent.offset === 0 ? setIsBottomPart(true) : setIsBottomPart(false);

    // if (e.nativeEvent.offset > 0.95) {
    //   setIsScrollRight(true);
    // } else if (e.nativeEvent.offset === 0) {
    //   setIsScrollRight(false);
    //   setIsBottomPart(0);
    // }
    // setIsBottomPart(e.nativeEvent.offset);
  };

  return (
    <>
      {shownMovies.length ? (
        <>
          <PagerView
            ref={pagerView}
            initialPage={0}
            pageMargin={-90}
            offscreenPageLimit={1}
            onPageScroll={onPageScroll}
            onPageSelected={e => setActiveIndex(e.nativeEvent.position)}
            style={{height: width, width}}>
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
          <BottomPart
            movie={shownMovies[activeIndex]}
            isBottomPart={isBottomPart}
            isScrollRight={isScrollRight}
          />
        </>
      ) : (
        <View>
          <Text>No movies for this genre</Text>
        </View>
      )}
    </>
  );
};