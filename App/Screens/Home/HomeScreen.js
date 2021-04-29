import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import * as thunks from '../../store/auth/operations';
import * as selectors from '../../store/auth/selectors';

const HomeScreen = ({navigation}) => {
  const user = useSelector(selectors.getUser);
  const isAuth = useSelector(selectors.getIsAuth);
  const dispatch = useDispatch();

  if (!isAuth) {
    navigation.navigate('SignIn');
    return null;
  }

  return (
    <View style={styles.container}>
      <Text>{user.displayName}</Text>
      <Button title="Logout" onPress={() => dispatch(thunks.logout())} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
