import React, {useContext} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Section} from './Section';
import {movieSections} from '../../../../consts/consts';
import {MoviesContext} from '../../HomeScreen';

export const Sections = () => {
  const {currentSection, onChangeSection} = useContext(MoviesContext);

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
