import React, {Component} from 'react';
import {Text, StyleSheet, Image, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {setError} from '../store/auth/actions';
import {getErrorMessage} from '../store/auth/selectors';
import {Error} from '../common/Error';
import {COLOR_WHITE} from '../consts/consts';

class ErrorProtector extends Component {
  constructor(props) {
    super(props);
    this.state = {hasError: false};
  }

  static getDerivedStateFromError(error) {
    return {hasError: true};
  }

  componentDidCatch(error, info) {
    this.props.setError(
      "Some error occurred. We'll try to fix it as soon as possible",
    );
  }

  render() {
    const {width, height, errorMessage} = this.props;

    const size = width < height ? width : height;

    if (this.state.hasError) {
      return (
        <ScrollView contentContainerStyle={styles.container}>
          {errorMessage && <Error />}
          <Image
            style={[styles.image, {width: size, height: size}]}
            source={require('../assets/images/dogError.jpg')}
          />
          <Text>Try to restart your app</Text>
        </ScrollView>
      );
    }
    return this.props.children;
  }
}

const mapStateToProps = state => ({
  errorMessage: getErrorMessage(state),
});

export const ErrorBoundary = connect(mapStateToProps, {setError})(
  ErrorProtector,
);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: COLOR_WHITE,
  },
  image: {
    resizeMode: 'cover',
    marginBottom: 20,
  },
});
