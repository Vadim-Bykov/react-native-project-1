import React, {useEffect, useRef} from 'react';
import {View, useWindowDimensions} from 'react-native';
import PagerView from 'react-native-pager-view';
import {useMovieContext} from '../../HomeScreen';
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
    isBottomPart,
    setIsBottomPart,
  } = useMovieContext();

  const pagerView = useRef(null);

  useEffect(() => {
    if (pagerView && pagerView.current) setPagerRef(pagerView);
  }, [pagerView]);

  const onPageScroll = e => {
    e.nativeEvent.offset === 0 ? setIsBottomPart(true) : setIsBottomPart(false);
  };

  return (
    <>
      <PagerView
        ref={pagerView}
        initialPage={0}
        pageMargin={-90}
        offscreenPageLimit={2}
        onPageScroll={onPageScroll}
        onPageSelected={e => setActiveIndex(e.nativeEvent.position)}
        style={{height: width, width}}>
        {shownMovies.map((movie, index) => (
          <View style={{width: 0.68}} key={movie.id}>
            <Slide
              index={index}
              lastIndex={shownMovies.length - 1}
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
      />
    </>
  );
};
