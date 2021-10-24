import React, {useState} from 'react';
import {StyleSheet, Text, View, Animated} from 'react-native';
import {
  COLLAPSED_PART_HEIGHT,
  HEADER_HEIGHT,
  TOP_PART_HEIGHT,
} from '../AnimatedHeader';
import {TabItem} from './TabItem';

const TAB_ITEMS = ['left', 'center', 'right'];
const TABS_STATE = {left: true, center: false, right: false};

export const Header = ({scrollY}) => {
  const [tabs, setTabs] = useState(TABS_STATE);

  const onTabPress = activeItem => {
    setTabs({left: false, center: false, right: false, [activeItem]: true});
  };

  const translateY = scrollY.interpolate({
    inputRange: [0, COLLAPSED_PART_HEIGHT],
    outputRange: [0, -COLLAPSED_PART_HEIGHT],
    extrapolate: 'clamp',
  });

  return (
    <View style={[styles.header]}>
      <Text style={styles.topPart}>Header</Text>

      <Animated.View style={[styles.headerTab, {transform: [{translateY}]}]}>
        {TAB_ITEMS.map((item, index) => {
          return (
            <TabItem
              key={index}
              tabItem={item}
              onTabPress={onTabPress}
              isActive={tabs[item]}
              scrollY={scrollY}
            />
          );
        })}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: HEADER_HEIGHT,
  },

  topPart: {
    backgroundColor: 'yellow',
    height: TOP_PART_HEIGHT,
    zIndex: 1,
  },

  headerTab: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    backgroundColor: 'yellow',
  },
});
