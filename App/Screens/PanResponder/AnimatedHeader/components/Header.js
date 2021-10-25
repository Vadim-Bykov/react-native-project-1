import React, {useState} from 'react';
import {StyleSheet, Text, View, Animated, Image} from 'react-native';
import {
  COLLAPSED_BOTTOM_PART_HEIGHT,
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

  const scaleY_1 = scrollY.interpolate({
    inputRange: [
      COLLAPSED_BOTTOM_PART_HEIGHT * 3,
      COLLAPSED_BOTTOM_PART_HEIGHT * 4,
    ],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const scaleY_2 = scrollY.interpolate({
    inputRange: [
      COLLAPSED_BOTTOM_PART_HEIGHT * 2,
      COLLAPSED_BOTTOM_PART_HEIGHT * 3,
    ],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const scaleY_3 = scrollY.interpolate({
    inputRange: [
      COLLAPSED_BOTTOM_PART_HEIGHT,
      COLLAPSED_BOTTOM_PART_HEIGHT * 2,
    ],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const translateY = scrollY.interpolate({
    inputRange: [0, COLLAPSED_BOTTOM_PART_HEIGHT],
    outputRange: [0, -COLLAPSED_BOTTOM_PART_HEIGHT / 2],
    extrapolate: 'clamp',
  });

  const translateYBottom = scrollY.interpolate({
    inputRange: [0, COLLAPSED_PART_HEIGHT],
    outputRange: [0, -COLLAPSED_PART_HEIGHT + 15],
    extrapolate: 'clamp',
  });

  return (
    <View style={[styles.header]}>
      <View style={styles.topPart}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require('../../../../assets/images/logo1.png')}
          />
        </View>

        <View style={{backgroundColor: 'yellow', zIndex: 6}}>
          <Animated.Text
            style={[
              styles.headerTitle,
              {
                alignSelf: 'flex-start',
                transform: [{translateY}],
              },
            ]}>
            Header Main
          </Animated.Text>
        </View>

        <Animated.Text
          style={[
            styles.headerTitle,
            {transform: [{scaleY: scaleY_1}], paddingTop: 16},
          ]}>
          Header_1
        </Animated.Text>

        <Animated.Text
          style={[styles.headerTitle, {transform: [{scaleY: scaleY_2}]}]}>
          Header_2
        </Animated.Text>

        <Animated.Text
          style={[
            styles.headerTitle,
            {
              transform: [{scaleY: scaleY_3}],
              paddingBottom: 16,
            },
          ]}>
          Header_3
        </Animated.Text>
      </View>

      <Animated.View
        style={[
          styles.headerTab,
          {transform: [{translateY: translateYBottom}]},
        ]}>
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

  logoContainer: {
    backgroundColor: 'yellow',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    zIndex: 5,
  },

  logo: {
    width: 32,
    height: 32,
    // alignSelf: 'flex-end',
  },

  topPart: {
    // backgroundColor: 'yellow',
    // height: TOP_PART_HEIGHT,
    // zIndex: 1,
    // paddingHorizontal: 16,
    // paddingBottom: 16,
  },

  headerTitle: {
    fontSize: 24,
    backgroundColor: 'yellow',
    paddingHorizontal: 16,
  },

  headerTab: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    // backgroundColor: 'yellow',
  },
});
