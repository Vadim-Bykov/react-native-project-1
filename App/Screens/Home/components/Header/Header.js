import React, {useState} from 'react';
import {TextInput, StyleSheet} from 'react-native';
import {Header} from 'react-native-elements';
import {COLOR_PURPLE} from '../../../../consts/consts';
import {useMovieContext} from '../../HomeScreen';

export const MoviesHeader = () => {
  const [searchText, setSearchText] = useState(null);

  // useEffect(() => {
  //   navigation.setOptions({
  //     headerTitle: () => {
  //       // console.log(shownMovies);

  //       const onchange = value => {
  //         setSearchText(value);
  //         const filteredMovies = movies?.data?.results.filter(movie =>
  //           movie.title.toUpperCase().includes(value.toUpperCase()),
  //         );
  //         setShownMovies(filteredMovies);
  //         filteredMovies.length &&
  //           pagerRef?.current?.setPageWithoutAnimation(0);
  //       };

  //       return (
  //         <TextInput
  //           placeholder="Search movie"
  //           // renderErrorMessage={false}
  //           // inputContainerStyle={styles.inputContainer}
  //           style={styles.input}
  //           value={searchText}
  //           onChangeText={onchange}
  //         />
  //       );
  //     },
  // headerRight: () => {
  //   return (
  //     <Icon
  //       type="antdesign"
  //       name="search1"
  //       color={COLOR_PURPLE}
  //       onPress={onSearchMovie}
  //     />
  //   );
  // },
  //   });
  // }, [movies?.data?.results, searchText]);

  const {moviesForSearch, setShownMovies, pagerRef} = useMovieContext();
  const onSearchMovie = () => {
    const filteredMovies =
      moviesForSearch &&
      moviesForSearch.filter(movie =>
        movie.title.toUpperCase().includes(value.toUpperCase()),
      );
    setShownMovies(filteredMovies);
    filteredMovies.length && pagerRef?.current?.setPageWithoutAnimation(0);
  };

  const onChange = value => {
    setSearchText(value);
    //  const filteredMovies =
    //    moviesForSearch &&
    //    moviesForSearch.filter(movie =>
    //      movie.title.toUpperCase().includes(value.toUpperCase()),
    //    );
    //  setShownMovies(filteredMovies);
    //  filteredMovies.length && pagerRef?.current?.setPageWithoutAnimation(0);
  };

  return (
    <Header
      // placement="left"
      leftComponent={{icon: 'menu', color: COLOR_PURPLE}}
      centerComponent={
        <TextInput
          placeholder="Search movie"
          //   renderErrorMessage={false}
          //   inputContainerStyle={styles.inputContainer}
          style={styles.input}
          value={searchText}
          onChangeText={onChange}
        />
      }
      rightComponent={{
        icon: 'search1',
        type: 'antdesign',
        color: COLOR_PURPLE,
        onPress: onSearchMovie,
      }}
      containerStyle={styles.container}
      statusBarProps={{backgroundColor: 'transparent'}}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
  },
  // inputContainer: {
  //    borderBottomColor: COLOR_PURPLE,
  //    height: 30,
  //  },

  input: {
    color: COLOR_PURPLE,
    borderBottomColor: COLOR_PURPLE,
    borderBottomWidth: StyleSheet.hairlineWidth,
    // height: 30,
  },
});
