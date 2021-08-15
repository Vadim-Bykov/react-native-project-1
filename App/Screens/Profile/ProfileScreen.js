import React, {useCallback} from 'react';
import {
  StyleSheet,
  View,
  Animated,
  ImageBackground,
  StatusBar,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import {COLOR_WHITE} from '../../consts/consts';
import {getUser} from '../../store/auth/selectors';
import {CustomText} from './components/CustomText';
import {MenuButton} from './components/MenuButton';
import {useResponder} from './hooks/useResponder';
import UserItems from './components/UserItems';
import {useAnimated} from './hooks/useAnimated';

const HEADER_HEIGHT_NARROWED = 90;
const HEADER_HEIGHT_EXPANDED = 35;

const AnimatedImageBackground = Animated.createAnimatedComponent(
  ImageBackground,
);

export const ProfileScreen = ({navigation}) => {
  const userData = useSelector(getUser);
  const insets = useSafeAreaInsets();
  const openDrawer = useCallback(() => navigation.openDrawer(), []);

  const {
    scrollY,
    scale,
    opacity,
    rotate,
    arrowOpacity,
    nameOpacity,
    nameTranslateY,
    userImageScale,
    topUserImageScale,
    blurRadius,
  } = useAnimated();

  const {pan, panResponder} = useResponder();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <AnimatedImageBackground
        source={require('../../assets/images/city.jpg')}
        resizeMode="cover"
        // blurRadius={10}
        style={[styles.imageBackground, {transform: [{scale}]}]}>
        <Animated.View style={[styles.blurView, {opacity}]} />
      </AnimatedImageBackground>

      <Animated.View
        style={[
          styles.arrowContainer,
          {
            top: insets.top + 13,
            opacity: arrowOpacity,
            transform: [{rotate}],
          },
        ]}>
        <Icon type="ionicon" name="ios-arrow-up" color={COLOR_WHITE} />
      </Animated.View>

      <View style={[styles.arrowContainer, {top: insets.top + 6}]}>
        <Animated.Image
          {...panResponder.panHandlers}
          style={[
            styles.userImageTop,
            {
              transform: [
                {scale: topUserImageScale},
                {translateY: pan.y},
                {translateX: pan.x},
              ],
            },
          ]}
          source={{uri: userData.photoURL}}
        />

        <Animated.Text
          style={[
            styles.displayName,
            {opacity: nameOpacity, transform: [{translateY: nameTranslateY}]},
          ]}>
          {userData.displayName}
        </Animated.Text>
      </View>

      <MenuButton openDrawer={openDrawer} />

      <Animated.ScrollView
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: scrollY,
                },
              },
            },
          ],
          {useNativeDriver: true},
        )}
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <View style={[styles.container, {backgroundColor: '#000000'}]}>
          {/* <View style={[styles.container, {paddingHorizontal: 20}]}> */}
          <Animated.Image
            style={[styles.userImage, {transform: [{scale: userImageScale}]}]}
            source={{uri: userData.photoURL}}
          />
          {/* </View> */}

          <CustomText>Name: {userData.displayName}</CustomText>
          <CustomText>Email: {userData.email}</CustomText>

          <UserItems uri={userData.photoURL} name={userData.displayName} />
        </View>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  imageBackground: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: HEADER_HEIGHT_EXPANDED + HEADER_HEIGHT_NARROWED,
  },

  blurView: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,1)',
  },

  arrowContainer: {
    zIndex: 2,
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  userImageTop: {
    width: 45,
    height: 45,
    borderRadius: 40,
    borderWidth: 4,
    marginRight: 5,
  },

  displayName: {
    color: COLOR_WHITE,
    marginLeft: 5,
  },

  scrollContainer: {
    zIndex: 3,
    marginTop: HEADER_HEIGHT_NARROWED,
    paddingTop: HEADER_HEIGHT_EXPANDED,
  },

  userImage: {
    width: 75,
    height: 75,
    borderRadius: 40,
    borderWidth: 4,
    // backgroundColor: '#000000',
    marginTop: 10,
    marginLeft: 20,
    // marginTop: -30,
  },
});
