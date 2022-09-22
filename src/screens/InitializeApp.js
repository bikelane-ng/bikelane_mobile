import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {bindActionCreators} from 'redux';
import * as actionAcreators from '../actions';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import * as constants from '../constants/ActionTypes';
import NavigationService from '../navigation/NavigationService';

class InitializeApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isProcessing: false,
      toast: false,
      toastMsg: '',
      toastType: '',
    };
  }

  componentDidMount() {
    AsyncStorage.getItem(constants.TOKEN).then(token => {
      if (!token) this.props.navigation.navigate('Auth');
      this.props.initApp({token});
    });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      nextProps.user.loggedIn &&
      nextProps.user.current &&
      nextProps.user.current != this.props.user.current
    ) {
      if (nextProps.user.current.role.name === 'ADMIN') {
        this.props.navigation.dispatch(NavigationService.resetAction('Admin'));
      } else if (nextProps.user.current.role.name === 'DRIVER') {
        this.props.navigation.dispatch(
          NavigationService.resetAction('DriverMap'),
        );
      } else {
        this.props.navigation.dispatch(
          NavigationService.resetAction('RiderMap'),
        );
      }
    }
    if (
      nextProps.app.init_failed &&
      nextProps.app.init_failed != this.props.app.init_failed
    ) {
      this.props.navigation.navigate('Login');
    }
    // if (nextProps.styler.status != this.props.styler.status) {
    //     if (typeof nextProps.styler.status !== 'undefined') {
    //         if (nextProps.styler.status === true) {
    //             this.props.navigation.dispatch(NavigationService.resetAction('Requests'))
    //         } else {
    //             this.props.navigation.dispatch(NavigationService.resetAction('StylerService'))
    //         }
    //     }
    // }
  }

  render() {
    return <View style={styles.container} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
});

const mapStateToProps = state => ({
  app: state.app,
  user: state.user,
  styler: state.styler,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(actionAcreators, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InitializeApp);
