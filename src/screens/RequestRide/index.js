import React from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import Button from '../../components/Button';
import { colors, fonts } from '../../constants/DefaultProps';
import { CheckCircle } from '../assets/Components';
var Spinner = require('react-native-spinkit');
import Text from '../../config/AppText';

const RequestRide = ({ cancelRide, rideDetails, searchAgain, error, }) => {
    // const { error, data } = requestedRide || {};
    return (
        <View style={{ position: 'absolute', zIndex: 1000, elevation: 8, top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.9)', }}>
            {!rideDetails && !error && <Spinner style={{ alignItems: "center" }} isVisible={true} size={150} type={"Bounce"} color={"#FFFFFF"} />}
            {error && <CheckCircle />}
            {error && <Text style={{ color: colors.white, marginTop: 30, fontFamily: fonts.medium, fontSize: 16, }}>{error}</Text>}

            <View style={{ padding: 50, width: '100%', position: 'absolute', bottom: 10, zIndex: 1000, }}>
                {error && <View style={{ marginBottom: 20, }}>
                    <Button
                        onPress={() => searchAgain()}
                        BtnText={"Retry"}
                        BtnTextStyles={{ color: '#ffffff' }}
                    />
                </View>}
                <View >
                    <Button
                        onPress={() => cancelRide()}
                        BtnText={"Cancel Ride"}
                        style={{ backgroundColor: colors.danger }}
                        BtnTextStyles={{ color: '#ffffff' }}
                    />
                </View>
            </View>
        </View>
    )
}

export default RequestRide;