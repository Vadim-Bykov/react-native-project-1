import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Section} from './Section';
import {MOVIE_SECTIONS} from '../../../../consts/consts';
import {useMovieContext} from '../../HomeScreen';

export const Sections = () => {
  const {currentSection, onChangeSection, mode} = useMovieContext();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.containerStyle}
      horizontal={true}
      showsHorizontalScrollIndicator={false}>
      {MOVIE_SECTIONS.map((section, i) => (
        <Section
          key={section.title}
          section={section}
          currentSection={currentSection}
          onChangeSection={onChangeSection}
          mode={mode}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
  },
  containerStyle: {
    padding: 10,
  },
});
