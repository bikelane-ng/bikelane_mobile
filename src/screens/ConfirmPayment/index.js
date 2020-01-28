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
import Text from '../../config/AppText';
import PropTypes from 'prop-types';
import { fonts, colors } from "../../constants/DefaultProps";
import Button from '../../components/Button';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { Call } from "../assets/Components";
const haversine = require('haversine');

const ConfirmPayment = ({ rideDetails, confirmPayment, }) => {
    return (
        <>
            <View style={{ justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#e6e6e6', padding: 30, }}>
                <View>
                    <Text style={{ color: colors.gray, fontSize: 12, }}>Trip completed</Text>
                </View>
                <Text style={{ fontSize: 20, fontFamily: fonts.bold, }}>Fare: #500</Text>
            </View>

            <View style={{ alignItems: 'center', padding: 10, }}>
                {/* <View style={{ paddingHorizontal: 10 }}>
                    <Text style={{ fontSize: 12, }}>Wallet</Text>
                </View>

                <View style={{ paddingHorizontal: 10 }}>
                    <Text style={{ fontSize: 12, }}>Cash</Text>
                </View> */}
                <Text style={{ color: colors.gray, }}>Awaiting Payment from user</Text>
                <Spinner color={colors.default_text} />
            </View>
            {/* <View style={{ paddingHorizontal: 20, paddingBottom: 20, marginTop: 10, }}>
                <Button
                    onPress={() => confirmPayment()}
                    BtnText={"Confirm"}
                    BtnTextStyles={{ color: '#ffffff' }}
                />
            </View> */}
        </>
    );
}

export default ConfirmPayment;