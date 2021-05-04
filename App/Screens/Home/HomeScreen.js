import React, {useEffect} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Loader} from '../../common/Loader';
import * as thunks from '../../store/auth/operations';
import * as selectors from '../../store/auth/selectors';

export const HomeScreen = ({navigation}) => {
  const user = useSelector(selectors.getUser);
  const isAuth = useSelector(selectors.getIsAuth);
  const isFetching = useSelector(selectors.getIsFetching);
  const error = useSelector(selectors.getErrorMessage);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunks.fetchUserData());
  }, []);

  if (!isAuth) {
    navigation.navigate('SignIn');
    return null;
  }

  return (
    <>
      {isFetching && <Loader />}
      {error && <Error />}
      <View style={styles.container}>
        <Text>{user.displayName}</Text>
        <Button title="Logout" onPress={() => dispatch(thunks.logout())} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 0,
    backgroundColor: '#9ED9F7',
  },
});
