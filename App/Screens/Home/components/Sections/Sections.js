import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Section} from './Section';
import {MOVIE_SECTIONS} from '../../../../consts/consts';
import {useMovieContext} from '../../HomeScreenProvider';

export const Sections = () => {
  const {currentSection, onChangeSection, mode} = useMovieContext();

  return (
    <>
      <ScrollView
        style={styles.containerStyle}
        contentContainerStyle={styles.container}
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
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  containerStyle: {
    flexGrow: 0,
  },
});
