import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Section} from './Section';
import {MOVIE_SECTIONS} from '../../../../consts/consts';
import {useMovieContext} from '../../HomeScreenProvider';

export const Sections = () => {
  const {currentSection, onChangeSection} = useMovieContext();

  return (
    <>
      <ScrollView
        style={styles.containerStyle}
        contentContainerStyle={styles.container}
        horizontal={true}>
        {MOVIE_SECTIONS.map((section, i) => (
          <Section
            key={section.title}
            section={section}
            currentSection={currentSection}
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
