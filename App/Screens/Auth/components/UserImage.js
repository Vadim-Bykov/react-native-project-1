import React from 'react';
import {useCallback} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Avatar, Icon} from 'react-native-elements';
import {launchImageLibrary} from 'react-native-image-picker';
import {useDispatch} from 'react-redux';
import * as actions from '../../../store/auth/actions';

export const UserImage = ({imageUri, setImageData}) => {
  const dispatch = useDispatch();

  const addPhoto = useCallback(() => {
    const options = {
      mediaType: 'photo',
      maxHeight: 200,
      maxWidth: 200,
    };

    const handleImage = ({assets, didCancel, errorMessage, errorCode}) => {
      if (didCancel) {
        dispatch(actions.setError('User cancelled image picker'));
      } else if (errorCode) {
        console.error(errorCode, errorMessage);
        dispatch(actions.setError(errorMessage));
      } else {
        const ImageData = assets[0];
        setImageData(ImageData);
      }
    };

    launchImageLibrary(options, handleImage);
  }, []);

  return (
    <View style={styles.container}>
      {imageUri ? (
        <Avatar rounded source={{uri: imageUri}} size="medium" />
      ) : (
        <Text style={styles.text}>Add your photo</Text>
      )}
      <Icon
        type="entypo"
        name="add-user"
        color="#DDBA33"
        size={35}
        onPress={addPhoto}
        containerStyle={styles.icon}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
  },
  icon: {
    marginHorizontal: 10,
  },
});
