import React from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions';
import { Form, Item, Label, Input } from 'native-base';
import Text from '../../config/AppText';
import { fonts, colors } from '../../constants/DefaultProps';
import Button from '../../components/Button';
import { SafeAreaView } from 'react-navigation';

class Login extends React.Component {
    state = {
        isProccessing: false,
        validationErr: false,
    }

    UNSAFE_componentWillReceiveProps(prevProps) {
        if (prevProps.error && this.props.error !== prevProps.error) {
            alert(prevProps.error);
            this.setState({ isProccessing: false, })
        }
        if (prevProps.loggedIn && this.props.loggedIn !== prevProps.loggedIn) {
            if (this.props.role === "ADMIN") {
                this.props.navigation.navigate('Admin');
            }
            if (this.props.role === "DRIVER") {
                this.props.navigation.navigate('DriverMap');
            }
            if (this.props.role === "USER") {
                this.props.navigation.navigate('RiderMap');
            }
        }
    }

    doLogin = () => {
        if (!this.username || !this.password) {
            this.setState({ validationErr: true, isProcessing: false, })
        } else {
            this.setState({ isProccessing: true, validationErr: false, pwMatchErr: false, })
            return this.props.doLogin({
                username: this.username,
                password: this.password,
            })
        }
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, }}>
                <View style={styles.container}>
                    <Text style={{ fontFamily: fonts.bold, fontSize: 20, paddingVertical: 30, }}>Key in your details</Text>

                    {this.state.validationErr && <Text style={{ color: colors.danger }}>One or more fields are missing</Text>}
                    {this.state.pwMatchErr && <Text style={{ color: colors.danger }}>Password and confirm password does not match</Text>}

                    <View style={{ marginVertical: 10 }}>
                        <Text style={{ paddingVertical: 8, }}>Username</Text>
                        <Item
                            style={[{ backgroundColor: "#F7F7F7", height: 40, }, styles.cardShadow]}
                            error={(this.username === undefined || this.username === '') && this.state.validationErr}
                            rounded>
                            <Input
                                onChangeText={e => this.username = e}
                                autoCapitalize={'none'}
                                style={styles.input}
                            />
                        </Item>
                    </View>

                    <View style={{ marginVertical: 10 }}>
                        <Text style={{ paddingVertical: 8, }}>Password</Text>
                        <Item
                            style={[{ backgroundColor: "#F7F7F7", height: 40, }, styles.cardShadow]}
                            error={(this.password === undefined || this.password === '') && this.state.validationErr}
                            rounded>
                            <Input
                                onChangeText={e => this.password = e}
                                secureTextEntry={true}
                                style={styles.input}
                            />
                        </Item>
                    </View>

                    <View style={{ alignItems: 'center', }}>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => this.props.navigation.navigate('OTP')}
                        >
                            <Text>Don't have an account? <Text style={{ color: colors.danger, }}>Sign up</Text></Text>
                        </TouchableOpacity>
                </View>
                </View>
            <View style={{ padding: 10, marginVertical: 10, alignItems: 'center', }}>
                <Button
                    onPress={this.doLogin}
                    BtnText={"Done"}
                    loading={this.state.isProccessing}
                    style={{ width: '75%', }}
                    BtnTextStyles={{ color: '#ffffff' }}
                />
            </View>
            </SafeAreaView >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 30,
    },
    textInputContainer: {
        alignContent: 'center',
        marginVertical: 50,
    },
    input: {
        fontFamily: fonts.default,
        // color: '#222B2F',
        height: 45,
        fontSize: 13,
        paddingVertical: 4,
        marginLeft: 10,
    },
})

const mapStateToProps = state => ({
    mobile: state.app.mobile,
    status: state.app.status,
    error: state.user.error,
    loggedIn: state.user.loggedIn,
    role: state.user.role,
})

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login);