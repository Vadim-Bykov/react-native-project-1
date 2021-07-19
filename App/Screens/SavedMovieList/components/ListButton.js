import React from 'react';
import {StyleSheet} from 'react-native';
import {Icon, Button} from 'react-native-elements';
import {COLOR_DARK_YELLOW} from '../../../consts/consts';

export const ListButton = React.memo(({title, name, disabled, setPage}) => {
  return (
    <Button
      title={title}
      type="outline"
      icon={
        <Icon
          type="material-community"
          name={name}
          color={disabled ? '#9F9F9F' : COLOR_DARK_YELLOW}
        />
      }
      containerStyle={[
        styles.btnContainer,
        title === 'Next' && styles.extraMargin,
      ]}
      buttonStyle={styles.btn}
      titleStyle={{color: COLOR_DARK_YELLOW}}
      disabled={disabled}
      onPress={setPage}
    />
  );
});

const styles = StyleSheet.create({
  btnContainer: {
    width: 150,
    alignSelf: 'center',
    borderRadius: 25,
  },

  extraMargin: {
    marginVertical: 15,
  },

  btn: {
    justifyContent: 'space-evenly',
    borderWidth: 2,
    borderColor: COLOR_DARK_YELLOW,
    borderRadius: 25,
  },
});
