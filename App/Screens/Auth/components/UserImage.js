import React, { useState } from 'react';
import {useCallback} from 'react';
import {StyleSheet, Text, View, Button, Image} from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useDispatch} from 'react-redux';
import * as actions from '../../../store/auth/actions';

export const UserImage = () => {
  const [imageUri, setImageUri] = useState(null);
  const dispatch = useDispatch();


  const addPhoto = useCallback(() => {
    launchImageLibrary(
      {mediaType: 'photo', includeBase64: true},
      ({assets, didCancel, errorMessage, errorCode}) => {
        if (didCancel) {
          console.log('User cancelled image picker');
        } else if (errorCode) {
          console.error(errorCode, errorMessage);
          dispatch(actions.setError(errorMessage));
        } else {
          console.log(assets);
          const source = { uri: assets[0].uri }
          setImageUri(source)
          //   let path = this.getPlatformPath(response).value;
          //   let fileName = this.getFileName(response.fileName, path);
          //   this.setState({imagePath: path});
          //   this.uploadImageToStorage(path, fileName);
        }
      },
    );
  }, []);

  console.log(imageUri);

  return (
    <View style={styles.container} >
      {imageUri && <Avatar rounded source={imageUri} size='medium' containerStyle={styles.avatar} />}
      <Icon type='entypo' name='add-user' color='#DDBA33' size={35} onPress={addPhoto} />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems:'center'
  },
  avatar: {
    marginRight:10
  }
});
