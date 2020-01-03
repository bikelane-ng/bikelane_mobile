import React from 'react';
import {
    View,
    StyleSheet,
    Image,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions';
import { Form, Item, Label, Input, } from 'native-base';
import Text from '../../config/AppText';
import { fonts, colors } from '../../constants/DefaultProps';
import Button from '../../components/Button';
import { SafeAreaView } from 'react-navigation';
import OnBoarder from '../../imgs/OnBoarder.png';
import NavigationService from '../../navigation/NavigationService';

class OnBoard extends React.Component {
    state = {
        otp: ''
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, }}>
                <View style={styles.container}>
                    <Image
                        style={{ alignSelf: 'center' }}
                        source={OnBoarder}
                    />
                    <View style={{ marginVertical: 50, }}>
                        <Text style={{ fontFamily: fonts.medium, fontSize: 16, paddingVertical: 20, }}>How it works</Text>
                        <View>
                            <Text style={{ paddingVertical: 10 }}>1. Choose your location and request a ride</Text>
                            <Text style={{ paddingVertical: 10 }}>2. The driver will call to confirm request and location</Text>
                            <Text style={{ paddingVertical: 10 }}>3. The driver will arrive at your location and pick you up</Text>
                            <Text style={{ paddingVertical: 10 }}>4. Live fare shows on your screen</Text>
                            <Text style={{ paddingVertical: 10 }}>5. You arrive your location and make payment</Text>
                        </View>
                    </View>
                    <View style={{ alignItems: 'center', }}>
                        <Text style={{ fontFamily: fonts.medium }}>Viola!</Text>
                    </View>
                </View>
                <View style={{ padding: 10, marginVertical: 10, alignItems: 'center', }}>
                    <Button
                        onPress={() => this.props.navigation.dispatch(NavigationService.resetAction('RiderMap'))}
                        BtnText={"Let's get started"}
                        style={{ width: '50%', }}
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

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(null, mapDispatchToProps)(OnBoard);