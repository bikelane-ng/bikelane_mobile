import React from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions';
import { Form, Item, Label, Input } from 'native-base';
import Text from '../../config/AppText';
import { fonts, colors } from '../../constants/DefaultProps';
import Button from '../../components/Button';
import { SafeAreaView } from 'react-navigation';

class Register extends React.Component {
    state = {
        isProccessing: false,
        validationErr: false,
    }

    UNSAFE_componentWillReceiveProps(prevProps) {
        if (prevProps.status && this.props.status !== prevProps.status) {

        }
    }

    doRegister = () => {
        this.props.navigation.navigate('OnBoard');
        // if (!this.firstName || !this.surname || !this.email || !this.password) {
        //     this.setState({ validationErr: true, isProcessing: false, })
        // } else if (this.password !== this.confirmPassword) {
        //     this.setState({ validationErr: false, pwMatchErr: true, isProcessing: false, })
        // } else {
        //     this.setState({ isProccessing: true, validationErr: false, pwMatchErr: false, })
        //     return this.props.doRegister({
        //         firstName: this.firstName,
        //         surname: this.surname,
        //         email: this.email,
        //         mobile: this.props.mobile,
        //         password: this.password,
        //     })
        // }
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, }}>
                <View style={styles.container}>
                    <Text style={{ fontFamily: fonts.bold, fontSize: 20, paddingVertical: 30, }}>Key in your details</Text>

                    {this.state.validationErr && <Text style={{ color: colors.danger }}>One or more fields are missing</Text>}
                    {this.state.pwMatchErr && <Text style={{ color: colors.danger }}>Password and confirm password does not match</Text>}
                    <View style={{ marginVertical: 10 }}>
                        <Text style={{ paddingVertical: 8, }}>First name</Text>
                        <Item
                            style={[{ backgroundColor: "#F7F7F7", height: 40, }, styles.cardShadow]}
                            error={(this.firstName === undefined || this.firstName === '') && this.state.validationErr}
                            rounded
                        >
                            <Input
                                onChangeText={e => this.firstName = e}
                                style={styles.input}
                            />
                        </Item>
                    </View>

                    <View style={{ marginVertical: 10 }}>
                        <Text style={{ paddingVertical: 8, }}>Last name</Text>
                        <Item
                            style={[{ backgroundColor: "#F7F7F7", height: 40, }, styles.cardShadow]}
                            error={(this.surname === undefined || this.surname === '') && this.state.validationErr}
                            rounded>
                            <Input
                                onChangeText={e => this.surname = e}
                                style={styles.input}
                            />
                        </Item>
                    </View>

                    <View style={{ marginVertical: 10 }}>
                        <Text style={{ paddingVertical: 8, }}>Email address</Text>
                        <Item
                            style={[{ backgroundColor: "#F7F7F7", height: 40, }, styles.cardShadow]}
                            error={(this.email === undefined || this.email === '') && this.state.validationErr}
                            rounded>
                            <Input
                                onChangeText={e => this.email = e}
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

                    <View style={{ marginVertical: 10 }}>
                        <Text style={{ paddingVertical: 8, }}>Confirm Password</Text>
                        <Item
                            style={[{ backgroundColor: "#F7F7F7", height: 40, }, styles.cardShadow]}
                            error={(this.password !== this.confirmPassword) && this.state.validationErr}
                            rounded>
                            <Input
                                onChangeText={e => this.confirmPassword = e}
                                secureTextEntry={true}
                                style={styles.input}
                            />
                        </Item>
                    </View>
                </View>
                <View style={{ padding: 10, marginVertical: 10, alignItems: 'center', }}>
                    <Button
                        onPress={this.doRegister}
                        BtnText={"Continue"}
                        loading={this.state.isProccessing}
                        style={{ width: '40%', }}
                        BtnTextStyles={{ color: '#ffffff' }}
                    />
                </View>
            </SafeAreaView>
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
})

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Register);