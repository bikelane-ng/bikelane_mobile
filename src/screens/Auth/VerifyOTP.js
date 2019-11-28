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
import OTPTextView from 'react-native-otp-textinput';
import NavigationService from '../../navigation/NavigationService';

class VerifyOTP extends React.Component {
    state = {
        otp: '',
        isProcessing: false,
        mobile: undefined,
    }

    UNSAFE_componentWillReceiveProps(prevProps) {
        if (prevProps.status && this.props.status !== prevProps.status) {
            this.props.navigation.dispatch(NavigationService.resetAction('Register'))
        }
        if (prevProps.error && this.props.error !== prevProps.error) {
            this.setState({ isProcessing: false })
            alert(prevProps.error)
        }
    }

    verifyOTP = () => {
        this.setState({ isProcessing: true, })
        this.props.verifyOTP({
            mobile: this.props.mobile,
            otp: this.state.otp
        })
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg, }}>
                <View style={styles.container}>
                    <Text style={{ textAlign: 'center', fontFamily: fonts.bold, fontSize: 20, }}>Enter the 4-digit code sent to your number</Text>

                    <Form style={{ width: '100%', marginTop: 50, }}>
                        <Item floatingLabel>
                            <Label style={{ fontFamily: fonts.default }}>OTP</Label>
                            <Input
                                onChangeText={otp => this.setState({ otp })}
                                keyboardType={'number-pad'}
                                maxLength={12}
                                style={{ fontFamily: fonts.default, fontSize: 16, }}
                            />
                        </Item>
                    </Form>

                    <OTPTextView
                        containerStyle={styles.textInputContainer}
                        handleTextChange={text => this.setState({ text })}
                        inputCount={4}
                        keyboardType="numeric"
                    />
                </View>
                <View style={{ padding: 10, marginVertical: 10, alignItems: 'center', }}>
                    <Button
                        onPress={this.verifyOTP}
                        BtnText={"Continue"}
                        loading={this.state.isProcessing}
                        style={{ backgroundColor: colors.black, width: '40%', }}
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
        alignItems: 'center',
    },
    textInputContainer: {
        alignContent: 'center',
        marginVertical: 50,
    }
})

const mapStateToProps = state => ({
    mobile: state.app.mobile,
    status: state.app.status,
    error: state.app.error,
})

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(VerifyOTP);