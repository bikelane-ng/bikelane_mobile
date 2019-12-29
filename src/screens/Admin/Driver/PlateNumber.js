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

class PlateNumber extends React.Component {
    state = {
        isProccessing: false,
        validationErr: false,
    }

    doRegister = () => {

        this.props.navigation.navigate('AddPhoto');
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, }}>
                <View style={styles.container}>
                    <Text style={{ fontFamily: fonts.bold, fontSize: 20, paddingVertical: 30, }}>Add Driver's Plate Number</Text>
                    {this.state.validationErr && <Text style={{ color: colors.danger }}>One or more fields are missing</Text>}
                    <View style={{ marginVertical: 10 }}>
                        <Text style={{ paddingVertical: 8, }}>Plate Number</Text>
                        <Item
                            style={[{ backgroundColor: "#F7F7F7", height: 40, }, styles.cardShadow]}
                            rounded
                        >
                            <Input
                                defaultValue={this.props.driver.plateNumber}
                                onEndEditing={(e) => this.props.driverDetails({ plateNumber: e.nativeEvent.text })}
                                style={styles.input}
                            />
                        </Item>
                    </View>
                </View>
                <View style={{ padding: 10, marginVertical: 10, alignItems: 'center', }}>
                    <Button
                        onPress={() => this.props.navigation.navigate('PersonalDocuments')}
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
    mobile: state.app.mobile,
    status: state.app.status,
    driver: state.driver.driverDetails,
})

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PlateNumber);