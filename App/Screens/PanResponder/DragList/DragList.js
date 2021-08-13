import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, useWindowDimensions, ScrollView} from 'react-native';
import Animated, {
  runOnJS,
  scrollTo,
  useAnimatedReaction,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import {useQuery} from 'react-query';
import {useDispatch} from 'react-redux';
import * as api from '../../../api/movieApiService';
import {Error} from '../../../common/Error';
import {Loader} from '../../../common/Loader';
import * as actions from '../../../store/auth/actions';
import {DragItem, ITEM_HEIGHT} from './components/DragItem';

const listToObject = list => {
  'worklet';
  if (!list) return;

  // const values = Object.values(list);
  const object = {};

  for (let i = 0; i < list.length; i++) {
    object[list[i].id] = i;
  }

  return object;
};

export const DragList = () => {
  const [page, setPage] = useState(1);
  const [isPositions, setIsPositions] = useState(false);
  const dispatch = useDispatch();
  const {width, height} = useWindowDimensions();
  const scrollViewRef = useAnimatedRef();

  const {data, error, isError, isFetching, isLoading} = useQuery(
    ['movies', page],
    () => api.getMovies('popular', page),
    {keepPreviousData: true},
  );

  const positions = useDerivedValue(() => {
    if (data?.results.length) {
      const value = listToObject(data?.results);
      runOnJS(setIsPositions)(true);

      return value;
    }
  }, [data]);

  useEffect(() => {
    isError && dispatch(actions.setError(error.message));
  }, [isError]);

  const scrollY = useSharedValue(0);

  const handleScroll = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });

  useAnimatedReaction(
    () => scrollY.value,
    currentScrollValue => scrollTo(scrollViewRef, 0, currentScrollValue, false),
  );

  return (
    <>
      {(isLoading || isFetching || !isPositions) && <Loader />}
      {isError && <Error />}

      {isPositions && (
        <Animated.ScrollView
          ref={scrollViewRef}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          style={styles.container}
          contentContainerStyle={{height: data?.results.length * ITEM_HEIGHT}}>
          {data.results.map(movie => (
            <DragItem
              key={movie.id}
              movie={movie}
              width={width}
              height={height}
              positions={positions}
              scrollY={scrollY}
              moviesCount={data?.results.length}
            />
          ))}
        </Animated.ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
});
