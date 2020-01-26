import React, { Component } from "react";
import { bindActionCreators } from 'redux';
import * as actionAcreators from '../../actions';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { Icon, Spinner } from "native-base";
import { NavigationActions, StackActions } from "react-navigation";
import NavigationService from "../../navigation/NavigationService";
import { SplashLogo } from "../assets/Components";
import AsyncStorage from '@react-native-community/async-storage';
import * as constants from '../../constants/ActionTypes';

class Splash extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isProcessing: false,
            toast: false,
            toastMsg: '',
            toastType: '',
        }
    }

    componentDidMount() {
        AsyncStorage.getItem(constants.TOKEN)
            .then((token) => {
                if (!token) this.props.navigation.navigate('Auth');
                this.props.initApp({ token });
            })
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.user.loggedIn && nextProps.user.current && nextProps.user.current != this.props.user.current) {
            this.props.getCurrentLocation();
        }
        if (nextProps.app.init_failed && nextProps.app.init_failed != this.props.app.init_failed) {
            this.props.navigation.navigate('Login');
        }
        if (nextProps.home.location && nextProps.home.location != this.props.home.location) {
            if (nextProps.user.current.role.name === 'ADMIN') {
                this.props.navigation.dispatch(NavigationService.resetAction('Admin'))
            } else if (nextProps.user.current.role.name === 'DRIVER') {
                this.props.navigation.dispatch(NavigationService.resetAction('DriverMap'))
            } else {
                this.props.navigation.dispatch(NavigationService.resetAction('RiderMap'))
            }
        }
    }

    render() {
        return (
            <LinearGradient
                style={{ flex: 1, justifyContent: "center", alignItems: "center", }}
                start={{ x: 1, y: 2 }} end={{ x: 1, y: 0 }} colors={['#54058A', '#54058A', '#54058A']}>
                {/* <Spinner color={'#ccc'} /> */}
                <SplashLogo />
            </LinearGradient>
        );
    }
}

const mapStateToProps = state => ({
    app: state.app,
    user: state.user,
    home: state.home,
})

const mapDispatchToProps = dispatch => bindActionCreators(actionAcreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Splash);
