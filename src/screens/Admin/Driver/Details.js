import React from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../../actions';
import { Form, Item, Label, Input } from 'native-base';
import Text from '../../../config/AppText';
import { fonts, colors } from '../../../constants/DefaultProps';
import Button from '../../../components/Button';
import { SafeAreaView, ScrollView } from 'react-navigation';

class DriverDetails extends React.Component {
    state = {
        isProccessing: false,
        validationErr: false,
    }

    doRegister = () => {
        // this.props.navigation.navigate('OnBoard');
        // this.props.driverDetails({
        //     firstName: this.firstName,
        //     surname: this.surname,
        //     email: this.email,
        //     address: this.address,
        //     password: this.password,
        // })
        this.props.navigation.navigate('AddPhoto');
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, }}>
                <ScrollView contentContainerStyle={styles.container}>
                    <Text style={{ fontFamily: fonts.bold, fontSize: 20, paddingVertical: 30, }}>Key in driver details</Text>

                    {this.state.validationErr && <Text style={{ color: colors.danger }}>One or more fields are missing</Text>}
                    {this.state.pwMatchErr && <Text style={{ color: colors.danger }}>Password and confirm password does not match</Text>}

                    <View style={{ marginVertical: 10 }}>
                        <Text style={{ paddingVertical: 8, }}>Driver's mobile number</Text>
                        <Item
                            style={[{ backgroundColor: "#F7F7F7", height: 40, }, styles.cardShadow]}
                            rounded
                        >
                            <Input
                                keyboardType={'numeric'}
                                defaultValue={this.props.driver.mobile}
                                onEndEditing={(e) => this.props.driverDetails({ mobile: e.nativeEvent.text })}
                                style={styles.input}
                            />
                        </Item>
                    </View>

                    <View style={{ marginVertical: 10 }}>
                        <Text style={{ paddingVertical: 8, }}>Driver's first name</Text>
                        <Item
                            style={[{ backgroundColor: "#F7F7F7", height: 40, }, styles.cardShadow]}
                            // error={(this.props.driver.firstName === undefined || this.props.driver.firstName === '') && this.state.validationErr}
                            rounded
                        >
                            <Input
                                // onChangeText={e => this.firstName = e}
                                defaultValue={this.props.driver.firstName}
                                onEndEditing={(e) => this.props.driverDetails({ firstName: e.nativeEvent.text })}
                                style={styles.input}
                            />
                        </Item>
                    </View>

                    <View style={{ marginVertical: 10 }}>
                        <Text style={{ paddingVertical: 8, }}>Driver's last name</Text>
                        <Item
                            style={[{ backgroundColor: "#F7F7F7", height: 40, }, styles.cardShadow]}
                            error={(this.surname === undefined || this.surname === '') && this.state.validationErr}
                            rounded>
                            <Input
                                // onChangeText={e => this.surname = e}
                                defaultValue={this.props.driver.surname}
                                onEndEditing={(e) => this.props.driverDetails({ surname: e.nativeEvent.text })}
                                style={styles.input}
                            />
                        </Item>
                    </View>

                    <View style={{ marginVertical: 10 }}>
                        <Text style={{ paddingVertical: 8, }}>Driver's email address</Text>
                        <Item
                            style={[{ backgroundColor: "#F7F7F7", height: 40, }, styles.cardShadow]}
                            error={(this.email === undefined || this.email === '') && this.state.validationErr}
                            rounded>
                            <Input
                                // onChangeText={e => this.email = e}
                                defaultValue={this.props.driver.email}
                                onEndEditing={(e) => this.props.driverDetails({ email: e.nativeEvent.text })}
                                autoCapitalize={'none'}
                                style={styles.input}
                            />
                        </Item>
                    </View>

                    <View style={{ marginVertical: 10 }}>
                        <Text style={{ paddingVertical: 8, }}>Driver's house Address</Text>
                        <Item
                            style={[{ backgroundColor: "#F7F7F7", height: 40, }, styles.cardShadow]}
                            error={(this.houseAddress === undefined || this.houseAddress === '') && this.state.validationErr}
                            rounded>
                            <Input
                                // onChangeText={e => this.houseAddress = e}
                                defaultValue={this.props.driver.houseAddress}
                                onEndEditing={(e) => this.props.driverDetails({ houseAddress: e.nativeEvent.text })}
                                style={styles.input}
                            />
                        </Item>
                    </View>

                    <View style={{ marginVertical: 10 }}>
                        <Text style={{ paddingVertical: 8, }}>Create Driver's Password</Text>
                        <Item
                            style={[{ backgroundColor: "#F7F7F7", height: 40, }, styles.cardShadow]}
                            error={(this.password === undefined || this.password === '') && this.state.validationErr}
                            rounded>
                            <Input
                                onChangeText={e => this.password = e}
                                onEndEditing={(e) => this.props.driverDetails({ password: e.nativeEvent.text })}
                                secureTextEntry={true}
                                style={styles.input}
                            />
                        </Item>
                    </View>

                    <View style={{ marginVertical: 10 }}>
                        <Text style={{ paddingVertical: 8, }}>Confirm Driver's Password</Text>
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
                </ScrollView>
                <View style={{ padding: 10, marginVertical: 10, alignItems: 'center', }}>
                    <Button
                        onPress={() => this.props.navigation.navigate('AddPhoto')}
                        BtnText={"Continue"}
                        loading={this.state.isProccessing}
                        style={{ backgroundColor: colors.default, width: '80%', }}
                        BtnTextStyles={{ color: '#ffffff' }}
                    />
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
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
    driver: state.driver.driverDetails,
})

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DriverDetails);