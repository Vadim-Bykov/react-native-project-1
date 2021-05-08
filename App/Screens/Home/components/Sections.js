import React, {useEffect} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import * as api from '../../../api/moviesApi';
import * as actionsMovie from '../../../store/movies/actions';
import {Genre} from './Genre';
import {Loader} from '../../../common/Loader';
import {getGenres} from '../../../store/movies/selectors';
import {movieSections} from '../../../consts/consts';

export const Sections = () => {
  const dispatch = useDispatch();

  const onChangeSection = requestName => {};

  return (
    <>
      <ScrollView
        style={styles.containerStyle}
        contentContainerStyle={styles.container}
        horizontal={true}>
        {movieSections.map((section, i) => (
          <Section
            key={section.title}
            section={section}
            onChangeSection={onChangeSection}
          />
        ))}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    //  height: 45,
    padding: 10,
    //  backgroundColor: 'blue',
  },
  containerStyle: {
    flexGrow: 0,
  },
});
