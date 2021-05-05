import React, {useEffect} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Loader} from '../../common/Loader';
import * as thunks from '../../store/auth/operations';
import * as selectors from '../../store/auth/selectors';

export const HomeScreen = () => {
  const user = useSelector(selectors.getUser);
  const isFetching = useSelector(selectors.getIsFetching);
  const error = useSelector(selectors.getErrorMessage);
  const dispatch = useDispatch();

  // const isAuth = useSelector(selectors.getIsAuth);
  // console.log(isAuth);

  // useEffect(() => {
  //   dispatch(thunks.fetchUserData());
  // }, []);

  return (
    <>
      {isFetching && <Loader />}
      {error && <Error />}

      {user ? (
        <View style={styles.container}>
          <Text>{user.displayName}</Text>
          <Button title="Logout" onPress={() => dispatch(thunks.logout())} />
        </View>
      ) : null}
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
