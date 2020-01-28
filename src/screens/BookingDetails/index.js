import React from "react";
import {
    StyleSheet,
    View,
    TouchableOpacity,
} from "react-native";
import {
    Icon,
    Card,
    CardItem,
    Spinner
} from "native-base";
import styles from "./BookingDetailsStyles";
import Text from '../../config/AppText';
import PropTypes from 'prop-types';
import { fonts, colors } from "../../constants/DefaultProps";
import Button from '../../components/Button';
const haversine = require('haversine');

// const propTypes = {
//     estimatedRideDetails: PropTypes.object.isRequired,
// }

const BookingDetails = ({ estimatedRideDetails, processing, requestRide, error, cancelRide, }) => {
    // const distance = distanceMatrix && distanceMatrix.rows[0].elements[0].duration.text;
    // const duration = distanceMatrix && distanceMatrix.rows[0].elements[0].distance.text;
    const { fare, duration, distance, } = estimatedRideDetails || {};

    return (
        <>
            {estimatedRideDetails && <>
                <View style={{ flexDirection: "row", justifyContent: 'space-between', paddingTop: 15, }}>
                    <View style={{ padding: 10 }}>
                        <Text style={{ fontSize: 10, }}>Estimated Cost</Text>
                        <Text style={{ fontFamily: fonts.bold, }}>NGN{fare.min} - NGN{fare.max}</Text>
                    </View>

                    <View style={{ padding: 10 }}>
                        <Text style={{ fontSize: 10, }}>Estimated Trip Time</Text>
                        <Text style={{ fontFamily: fonts.bold, }}>{distance}/{duration}</Text>
                    </View>
                </View>
                <View style={{ padding: 10, marginVertical: 10, flex: 1, justifyContent: 'flex-end' }}>
                    <Button
                        onPress={() => requestRide()}
                        BtnText={"Confirm Ride"}
                        // loading={this.state.isProcessing ? true : false}
                        // style={{ backgroundColor: colors.black, }}
                        BtnTextStyles={{ color: '#ffffff' }}
                    />
                </View>
            </>}

            {!estimatedRideDetails && <View style={{ padding: 10, marginVertical: 10, flex: 1, justifyContent: 'flex-end' }}>
                <Button
                    onPress={() => cancelRide()}
                    BtnText={"Search again"}
                    // loading={this.state.isProcessing ? true : false}
                    // style={{ backgroundColor: colors.black, }}
                    BtnTextStyles={{ color: '#ffffff' }}
                />
            </View>}
        </>
    );
}

// BookingDetails.propTypes = propTypes;
export default BookingDetails;