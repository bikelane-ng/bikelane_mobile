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
import styles from "./RideDetailsStyles";
import Text from '../../config/AppText';
import PropTypes from 'prop-types';
import { fonts, colors } from "../../constants/DefaultProps";
import Button from '../../components/Button';
import { Rating, AirbnbRating } from 'react-native-ratings';
const haversine = require('haversine');

// const propTypes = {
//     estimatedRideDetails: PropTypes.object.isRequired,
// }

const RideDetails = ({ rideDetails, headtToLocation, }) => {
    const { fare, duration, distance, } = rideDetails || {};
    return (
        <View style={styles.searchBox}>
            <View style={{ marginTop: 20, padding: 15 }}>
                <Card style={[{ paddingBottom: 10, }, styles.cardShadow]}>
                    {rideDetails ? <>
                        <View style={{ alignItems: 'center', justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: '#e6e6e6', padding: 20, }}>
                            <Text style={{ fontSize: 14, fontFamily: fonts.medium, }}>NEW RIDE ALERT!!!</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#e6e6e6', padding: 20, }}>
                            <Text style={{ fontSize: 14, }}>{`${rideDetails.rider.firstName} ${rideDetails.rider.surname}`}</Text>
                            <AirbnbRating
                                count={5}
                                starStyle={{ tintColor: colors.default_text, marginTop: 5, }}
                                reviews={['Terrible', 'Bad', 'Okay', 'Good', 'Excellent']}
                                defaultRating={5}
                                showRating={false}
                                size={10}
                            // starStyle={{ justifyContent: "flex-start" }}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#e6e6e6', padding: 20, }}>
                            <View>
                                <Text style={{ fontSize: 12, color: colors.gray, }}>Cost</Text>
                                <Text style={{ fontSize: 14, }}>{`NGN${fare.min} - ${fare.max}`}</Text>
                            </View>
                            <View>
                                <Text style={{ fontSize: 12, color: colors.gray, }}>Trip Time</Text>
                                <Text style={{ fontSize: 14, }}>{`${distance}/${duration}`}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', paddingHorizontal: 20, paddingTop: 20, }}>
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
                        <View style={{ paddingHorizontal: 20, paddingBottom: 20, }}>
                            <Button
                                onPress={() => headtToLocation(rideDetails)}
                                BtnText={"Head to Location"}
                                // loading={this.state.isProcessing ? true : false}
                                BtnTextStyles={{ color: '#ffffff' }}
                            />
                        </View>
                    </> : <Spinner color={colors.default_text} />}
                </Card>
            </View>
        </View>
    );
}

// BookingDetails.propTypes = propTypes;
export default RideDetails;