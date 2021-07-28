import React, {useCallback} from 'react';
import {StyleSheet, Text, View, Switch, ToastAndroid} from 'react-native';
import {Icon} from 'react-native-elements';
import {COLOR_DARK_YELLOW} from '../../../consts/consts';

export const SwitchModeItem = React.memo(({dark, colorText, setTheme}) => {
  const toggleTheme = useCallback(() => {
    setTheme(dark ? 'light' : 'dark');
    ToastAndroid.show(
      'The theme will be changed to default after closing app. If you want to change the theme permanently, please set it in settings device',
      ToastAndroid.LONG,
    );
  }, [dark]);

  return (
    <View style={styles().modeItemContainer}>
      <Icon
        name={dark ? 'nights-stay' : 'wb-sunny'}
        color={COLOR_DARK_YELLOW}
      />

      <Text style={styles(colorText).modeText}>
        {dark ? 'Dark' : 'Light'} mode
      </Text>

      <Switch
        trackColor={{false: '#FFEE82', true: '#81b0ff'}}
        thumbColor={COLOR_DARK_YELLOW}
        value={dark}
        onValueChange={toggleTheme}
      />
    </View>
  );
});

const styles = color =>
  StyleSheet.create({
    modeItemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 20,
      marginVertical: 10,
    },
    modeText: {
      color,
      fontWeight: 'bold',
      letterSpacing: 0.65,
      marginLeft: 30,
    },
  });
