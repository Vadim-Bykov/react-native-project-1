import React, {useCallback} from 'react';
import {StyleSheet, useWindowDimensions, View} from 'react-native';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {useMovieContext} from '../../HomeScreenProvider';

export const Pagination = React.memo(() => {
  const {width, height} = useWindowDimensions();
  const {currentPage, setCurrentPage} = useMovieContext();

  const arrowLeftName = useCallback(() => {
    const name =
      currentPage === 1 ? 'ios-arrow-undo-outline' : 'ios-arrow-undo';

    return name;
  }, [currentPage]);

  const arrowRightName = useCallback(() => {
    const name =
      currentPage === 20 ? 'ios-arrow-redo-outline' : 'ios-arrow-redo';

    return name;
  }, [currentPage]);

  const onNextPage = useCallback(() => {
    currentPage === 20
      ? setCurrentPage(prev => prev)
      : setCurrentPage(prev => prev + 1);
  }, [currentPage]);

  const onPrevPage = useCallback(() => {
    currentPage === 1
      ? setCurrentPage(prev => prev)
      : setCurrentPage(prev => prev - 1);
  }, [currentPage]);

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
    },
  });
