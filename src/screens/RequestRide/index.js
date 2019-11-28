import React from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import Button from '../../components/Button';
import { colors } from '../../constants/DefaultProps';
var Spinner = require('react-native-spinkit');

const RequestRide = ({cancelRide}) => {
    return (
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', }}>
            <Spinner style={{ alignItems: "center" }} isVisible={true} size={150} type={"Bounce"} color={"#FFFFFF"} />

            <View style={{ padding: 50, width: '100%', position: 'absolute', bottom: 10, }}>
                <Button
                    onPress={() => cancelRide()}
                    BtnText={"Cancel Ride"}
                    style={{ backgroundColor: colors.black, }}
                    BtnTextStyles={{ color: '#ffffff' }}
                />
            </View>
        </View>
    )
}

export default RequestRide;