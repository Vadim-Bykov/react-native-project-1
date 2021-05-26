import React, {useCallback} from 'react';
import {StyleSheet, useWindowDimensions, View} from 'react-native';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {useMovieContext} from '../../HomeScreenProvider';

export const Pagination = React.memo(() => {
  const {width, height} = useWindowDimensions();
  const {
    mode,
    setMode,
    sectionPage,
    setSectionPage,
    genrePage,
    setGenrePage,
  } = useMovieContext();

  const arrowLeftName = useCallback(() => {
    let name = '';
    if (mode === 'section') {
      name = sectionPage === 1 ? 'ios-arrow-undo-outline' : 'ios-arrow-undo';
    }
    if (mode === 'genre') {
      name = genrePage === 1 ? 'ios-arrow-undo-outline' : 'ios-arrow-undo';
    }
    return name;
  }, [sectionPage, genrePage]);

  const arrowRightName = useCallback(() => {
    let name = '';
    if (mode === 'section') {
      name = sectionPage === 20 ? 'ios-arrow-redo-outline' : 'ios-arrow-redo';
    }
    if (mode === 'genre') {
      name = genrePage === 20 ? 'ios-arrow-redo-outline' : 'ios-arrow-redo';
    }
    return name;
  }, [sectionPage, genrePage]);

  const onNextPage = useCallback(() => {
    if (mode === 'section') {
      sectionPage === 20
        ? setSectionPage(prev => prev)
        : setSectionPage(prev => prev + 1);
    }
    if (mode === 'genre') {
      genrePage === 20
        ? setGenrePage(prev => prev)
        : setGenrePage(prev => prev + 1);
    }
  }, [mode, sectionPage, genrePage]);

  //   console.log(genrePage);

  const onPrevPage = useCallback(() => {
    if (mode === 'section') {
      sectionPage === 1
        ? setSectionPage(prev => prev)
        : setSectionPage(prev => prev - 1);
    }
    if (mode === 'genre') {
      genrePage === 1
        ? setGenrePage(prev => prev)
        : setGenrePage(prev => prev - 1);
    }
  }, [mode, sectionPage, genrePage]);

  return (
    <View style={styles(height, width).container}>
      <Icon
        type="ionicon"
        name={arrowLeftName()}
        size={40}
        color="#FF6666"
        onPress={onPrevPage}
      />
      <Icon
        type="ionicon"
        name={arrowRightName()}
        size={40}
        color="#FF6666"
        onPress={onNextPage}
      />
    </View>
  );
});

const styles = (height, width) =>
  StyleSheet.create({
    container: {
      width,
      position: 'absolute',
      top: height * 0.5,
      flexDirection: 'row',
      justifyContent: 'space-between',
      // paddingHorizontal: 10,
    },
  });
