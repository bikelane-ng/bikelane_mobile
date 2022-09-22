import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import * as actionAcreators from '../../actions';
import {connect} from 'react-redux';
import {View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Icon, Spinner} from 'native-base';
import {NavigationActions, StackActions} from 'react-navigation';
import NavigationService from '../../navigation/NavigationService';
import {SplashLogo} from '../assets/Components';
import AsyncStorage from '@react-native-community/async-storage';
import * as constants from '../../constants/ActionTypes';
import Button from '../../components/Button';
import Text from '../../config/AppText';
import {colors, fonts} from '../../constants/DefaultProps';

class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isProcessing: false,
      toast: false,
      toastMsg: '',
      toastType: '',
      showErr: false,
    };
  }

  componentDidMount() {
    this.init();
  }

  init = () => {
    setTimeout(() => {
      AsyncStorage.getItem(constants.TOKEN).then(token => {
        if (!token) this.props.navigation.navigate('Auth');
        this.props.initApp({token});
      });
    }, 1000);
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      nextProps.user.loggedIn &&
      nextProps.user.current &&
      nextProps.user.current != this.props.user.current
    ) {
      this.props.getCurrentLocation();
    }
    if (
      nextProps.app.init_failed &&
      nextProps.app.init_failed != this.props.app.init_failed
    ) {
      if (nextProps.app.error == 'Network request failed') {
        this.setState({
          showErr: true,
          error:
            'You seem to be offline. Please kindly check that you have a stable Internet connection',
        });
      } else this.props.navigation.navigate('Login');
    }
    if (
      nextProps.home.location &&
      nextProps.home.location != this.props.home.location
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
  }

  reload = () => {
    this.setState({showErr: false, error: undefined});
    this.init();
  };

  render() {
    return (
      <>
        {!this.state.showErr ? (
          <LinearGradient
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
            start={{x: 1, y: 2}}
            end={{x: 1, y: 0}}
            colors={['#54058A', '#54058A', '#54058A']}>
            {/* <Spinner color={'#ccc'} /> */}
            <SplashLogo />
          </LinearGradient>
        ) : (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 30,
            }}>
            <Text
              style={{
                marginTop: 50,
                fontSize: 12,
                textAlign: 'center',
                color: colors.danger,
                fontFamily: fonts.medium,
              }}>
              {this.state.error}
            </Text>
            <View style={{marginTop: 20, width: '50%'}}>
              <Button
                onPress={this.reload}
                BtnText={'RETRY'}
                style={{backgroundColor: colors.black}}
                BtnTextStyles={{color: colors.white, fontFamily: fonts.medium}}
              />
            </View>
          </View>
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({
  app: state.app,
  user: state.user,
  home: state.home,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(actionAcreators, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Splash);
