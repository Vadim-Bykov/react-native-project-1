import React, {useCallback} from 'react';
import {StyleSheet, Text, View, ToastAndroid, Platform} from 'react-native';
import {Avatar, Icon} from 'react-native-elements';
import {launchImageLibrary} from 'react-native-image-picker';
import {useDispatch} from 'react-redux';
import * as actions from '../../../store/auth/actions';

export const UserImage = ({imageUri, setImageData}) => {
  const dispatch = useDispatch();

  const addPhoto = useCallback(() => {
    const options = {
      mediaType: 'photo',
      maxHeight: 300,
      maxWidth: 300,
    };

    const handleAddImage = ({assets, didCancel, errorMessage, errorCode}) => {
      if (didCancel) {
        Platform.OS === 'android' &&
          ToastAndroid.show('Adding an image was canceled', ToastAndroid.SHORT);
      } else if (errorCode) {
        console.error(errorCode, errorMessage);
        dispatch(actions.setError(errorMessage));
      } else {
        const ImageData = assets[0];
        setImageData(ImageData);
      }
    };

    launchImageLibrary(options, handleAddImage);
  }, []);

  return (
    <View style={styles.container}>
      <Icon
        type="entypo"
        name="add-user"
        color="#DDBA33"
        size={imageUri ? 25 : 75}
        onPress={addPhoto}
        containerStyle={imageUri ? styles.iconWithPhoto : styles.icon}
      />

      {imageUri ? (
        <Avatar
          rounded
          source={{uri: imageUri}}
          size={120}
          onPress={addPhoto}
        />
      ) : (
        <Text style={styles.text}>Add your photo</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  text: {
    color: '#fff',
  },
  icon: {
    marginBottom: 5,
    marginLeft: 15,
  },
  iconWithPhoto: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    zIndex: 1,
  },
});
