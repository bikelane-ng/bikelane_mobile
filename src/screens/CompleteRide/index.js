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
import styles from "./CompleteRideStyles";
import Text from '../../config/AppText';
import PropTypes from 'prop-types';
import { fonts, colors } from "../../constants/DefaultProps";
import Button from '../../components/Button';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { Call } from "../assets/Components";
const haversine = require('haversine');

// const propTypes = {
//     estimatedRideDetails: PropTypes.object.isRequired,
// }

const ArrivedLocation = ({ rideDetails, complete, }) => {
    return (
        <>
            {rideDetails && <>
                <View style={{ flexDirection: 'row', paddingHorizontal: 20, paddingTop: 30, }}>
                    <View style={{ marginHorizontal: 5, }}>
                        <View style={{ width: 12, height: 12, borderRadius: 12 / 2, marginLeft: -1.8, borderWidth: 1, borderColor: "#9C9C9C", alignItems: "center", justifyContent: "center" }}>
                            <View style={{ height: 6, width: 6, borderRadius: 6 / 2, borderWidth: 1, borderColor: colors.default, backgroundColor: colors.default }}></View>
                        </View>
                        <View style={{ marginLeft: 2.5, marginTop: 2 }}>
                            <Text style={{ lineHeight: 5, color: "#D1D2D2" }}>.</Text>
                            <Text style={{ lineHeight: 5, color: "#D1D2D2" }}>.</Text>
                            <Text style={{ lineHeight: 5, color: "#D1D2D2" }}>.</Text>
                            <Text style={{ lineHeight: 5, color: "#D1D2D2" }}>.</Text>
                            <Text style={{ lineHeight: 5, color: "#D1D2D2" }}>.</Text>
                            <Text style={{ lineHeight: 5, color: "#D1D2D2" }}>.</Text>
                        </View>
                        <View>
                            <Icon type="Ionicons" name="ios-pin" style={{ fontSize: 22, color: "#000000", marginLeft: -1.5 }} />
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between', marginLeft: 5, }}>
                        <View style={{ height: 45 }}>
                            <Text style={{ fontSize: 14, marginTop: -3, }}>{rideDetails.pickUp.name}</Text>
                        </View>
                        <View style={{ height: 45 }}>
                            <Text style={{ fontSize: 14, marginBottom: 4, }}>{rideDetails.dropOff.name}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ paddingHorizontal: 20, paddingBottom: 20, marginTop: 10, }}>
                    <Button
                        onPress={() => complete()}
                        BtnText={"Complete"}
                        BtnTextStyles={{ color: '#ffffff' }}
                    />
                </View>
            </>}
        </>
    );
}

// BookingDetails.propTypes = propTypes;
export default ArrivedLocation;