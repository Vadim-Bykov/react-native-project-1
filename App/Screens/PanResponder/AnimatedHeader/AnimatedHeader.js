import React, {useLayoutEffect, useRef, useState} from 'react';
import {StyleSheet, Text, View, Animated, TouchableOpacity} from 'react-native';
import {Header} from './components/Header';

export const HEADER_HEIGHT = 300;
export const TOP_PART_HEIGHT = (HEADER_HEIGHT * 2) / 3;
export const BOTTOM_PART_HEIGHT = HEADER_HEIGHT - TOP_PART_HEIGHT;
export const COLLAPSED_BOTTOM_PART_HEIGHT = BOTTOM_PART_HEIGHT / 2;
export const COLLAPSED_PART_HEIGHT = TOP_PART_HEIGHT;

// const TAB_ITEMS = ['left', 'center', 'right'];
// const TABS_STATE = {left: true, center: false, right: false};

// const Tab = ({tabItem, onTabPress, isActive}) => {
//   const translateY = useRef(new Animated.Value(BOTTOM_PART_HEIGHT)).current;

//   useLayoutEffect(() => {
//     Animated.timing(translateY, {
//       toValue: isActive ? 0 : BOTTOM_PART_HEIGHT,
//       duration: 200,
//       useNativeDriver: true,
//     }).start();
//   }, [isActive]);

//   const onPress = () => {
//     onTabPress(tabItem);
//   };

//   return (
//     <TouchableOpacity onPress={onPress} style={[styles.tab]}>
//       <Animated.View style={[styles.animatedBG, {transform: [{translateY}]}]} />

//       <Text>Header Top</Text>
//       <Text>Header Bottom</Text>
//     </TouchableOpacity>
//   );
// };

// const Header = ({scrollY}) => {
//   const [tabs, setTabs] = useState(TABS_STATE);

//   const onTabPress = activeItem => {
//     setTabs({left: false, center: false, right: false, [activeItem]: true});
//   };

//   const translateY = scrollY.interpolate({
//     inputRange: [0, COLLAPSED_BOTTOM_PART_HEIGHT],
//     outputRange: [0, -COLLAPSED_BOTTOM_PART_HEIGHT],
//     extrapolate: 'clamp',
//   });

//   return (
//     <View style={[styles.header]}>
//       <Text style={styles.topPart}>Header</Text>

//       <Animated.View style={[styles.headerTab, {transform: [{translateY}]}]}>
//         {TAB_ITEMS.map((item, index) => {
//           return (
//             <Tab
//               key={index}
//               tabItem={item}
//               onTabPress={onTabPress}
//               isActive={tabs[item]}
//             />
//           );
//         })}
//       </Animated.View>
//     </View>
//   );
// };

export const AnimatedHeader = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);

  const handleScroll = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollY}}}],
    {useNativeDriver: true},
  );

  const handleScrollEnd = ({nativeEvent}) => {
    if (nativeEvent.contentOffset.y < COLLAPSED_BOTTOM_PART_HEIGHT / 2) {
      scrollViewRef?.current.scrollTo({x: 0, y: 0, animated: true});
    }

    if (
      nativeEvent.contentOffset.y > COLLAPSED_BOTTOM_PART_HEIGHT / 2 &&
      nativeEvent.contentOffset.y < COLLAPSED_BOTTOM_PART_HEIGHT
    ) {
      scrollViewRef?.current.scrollTo({
        x: 0,
        y: COLLAPSED_BOTTOM_PART_HEIGHT,
        animated: true,
      });
    }
  };

  return (
    <Animated.ScrollView
      ref={scrollViewRef}
      contentContainerStyle={styles.scrollViewContainer}
      stickyHeaderIndices={[0]}
      onScroll={handleScroll}
      onMomentumScrollEnd={handleScrollEnd}>
      <Header scrollY={scrollY} />

      {new Array(30).fill(1).map((_, index) => (
        <Text key={index}>Hello {index + 1}</Text>
      ))}
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    height: 1500,
  },

  // header: {
  //   height: HEADER_HEIGHT,
  // },

  // topPart: {
  //   backgroundColor: 'yellow',
  //   height: TOP_PART_HEIGHT,
  //   zIndex: 1,
  // },

  // headerTab: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   flex: 1,
  //   backgroundColor: 'yellow',
  // },

  // tab: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   overflow: 'hidden',
  // },

  // animatedBG: {
  //   position: 'absolute',
  //   ...StyleSheet.absoluteFill,
  //   backgroundColor: 'gray',
  // },
});
