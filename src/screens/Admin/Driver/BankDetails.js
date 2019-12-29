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
import { SafeAreaView } from 'react-navigation';

class BankDetails extends React.Component {
    state = {
        isProccessing: false,
        validationErr: false,
    }

    // doRegister = () => {
    //     // this.props.navigation.navigate('OnBoard');
    //     this.props.addBankDetails({
    //         accountHolderName: this.accountHolderName,
    //         accountNumber: this.accountNumber,
    //         bank: this.bank,
    //     })
    //     this.props.navigation.navigate('PersonalDocuments');
    // }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, }}>
                <View style={styles.container}>
                    <Text style={{ fontFamily: fonts.bold, fontSize: 20, paddingVertical: 30, }}>Add Driver's Bank Details</Text>

                    {this.state.validationErr && <Text style={{ color: colors.danger }}>One or more fields are missing</Text>}
                    {this.state.pwMatchErr && <Text style={{ color: colors.danger }}>Password and confirm password does not match</Text>}
                    <View style={{ marginVertical: 10 }}>
                        <Text style={{ paddingVertical: 8, }}>Account holder name</Text>
                        <Item
                            style={[{ backgroundColor: "#F7F7F7", height: 40, }, styles.cardShadow]}
                            error={(this.accountName === undefined || this.accountName === '') && this.state.validationErr}
                            rounded
                        >
                            <Input
                                // onChangeText={e => this.accountHolderName = e}
                                defaultValue={this.props.driver.accountName}
                                onEndEditing={(e) => this.props.driverDetails({ accountName: e.nativeEvent.text })}
                                style={styles.input}
                            />
                        </Item>
                    </View>

                    <View style={{ marginVertical: 10 }}>
                        <Text style={{ paddingVertical: 8, }}>Account numnber</Text>
                        <Item
                            style={[{ backgroundColor: "#F7F7F7", height: 40, }, styles.cardShadow]}
                            error={(this.accountNumber === undefined || this.accountNumber === '') && this.state.validationErr}
                            rounded>
                            <Input
                                // onChangeText={e => this.accountNumber = e}
                                defaultValue={this.props.driver.accountNumber}
                                onEndEditing={(e) => this.props.driverDetails({ accountNumber: e.nativeEvent.text })}
                                style={styles.input}
                            />
                        </Item>
                    </View>

                    <View style={{ marginVertical: 10 }}>
                        <Text style={{ paddingVertical: 8, }}>Bank</Text>
                        <Item
                            style={[{ backgroundColor: "#F7F7F7", height: 40, }, styles.cardShadow]}
                            error={(this.bank === undefined || this.bank === '') && this.state.validationErr}
                            rounded>
                            <Input
                                // onChangeText={e => this.bank = e}
                                defaultValue={this.props.driver.bank}
                                onEndEditing={(e) => this.props.driverDetails({ bank: e.nativeEvent.text })}
                                autoCapitalize={'none'}
                                style={styles.input}
                            />
                        </Item>
                    </View>

                </View>
                <View style={{ padding: 10, marginVertical: 10, alignItems: 'center', }}>
                    <Button
                        onPress={() => this.props.navigation.navigate('PlateNumber')}
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
    driver: state.driver.driverDetails,
})

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BankDetails);