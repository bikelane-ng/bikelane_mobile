import React from "react";
import {
    View,
    TouchableOpacity,
} from "react-native";
import {
    Thumbnail, Icon, Card, CardItem
} from "native-base";
import styles from "./DriverDetailsStyles";
import Text from '../../config/AppText';
import LinearGradient from 'react-native-linear-gradient';
import { Rating, AirbnbRating } from 'react-native-ratings';
import Button from '../../components/Button';
import { colors } from "../../constants/DefaultProps";
import { Call } from "../assets/Components";

const DriverDetails = ({ driverDetails, cancelRide }) => {
    return (
        <View style={styles.searchBox}>
            <View style={{ marginTop: 20, padding: 15 }}>
                <Card style={[{ padding: 10 }, styles.cardShadow]}>
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ flex: 1, flexDirection: "column", paddingHorizontal: 10, }}>
                            <CardItem
                                onPress={() => toggleSearchModal("pickUp")}
                                style={{ flexDirection: "column", alignItems: "flex-start" }}>
                                <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between" }}>
                                    <View style={{ flexDirection: "row" }}>
                                        <TouchableOpacity
                                            activeOpacity={0.7}
                                        >
                                            <Thumbnail
                                                style={{ width: 40, height: 40 }}
                                                source={require('../../imgs/avatar.png')} />
                                        </TouchableOpacity>
                                        <View style={{ paddingLeft: 10, alignItems: "flex-start", position: 'relative', bottom: 5, }}>
                                            <Text style={{ fontFamily: 'NoirPro-Medium', fontSize: 18 }}>{driverDetails.name}</Text>
                                            <AirbnbRating
                                                count={5}
                                                starStyle={{ tintColor: '#009C24', marginTop: 5, }}
                                                reviews={['Terrible', 'Bad', 'Okay', 'Good', 'Excellent']}
                                                defaultRating={5}
                                                showRating={false}
                                                size={10}
                                            // starStyle={{ justifyContent: "flex-start" }}
                                            />
                                            <Text style={{ fontSize: 12, fontFamily: 'NoirPro-Medium', marginTop: 5, }}>{driverDetails.plate_number}</Text>
                                        </View>
                                    </View>

                                    <View>
                                        <Call />
                                    </View>
                                </View>
                            </CardItem>

                            <View style={{ paddingVertical: 20, width: '100%', paddingHorizontal: 10, }}>
                                <Button
                                    onPress={() => cancelRide()}
                                    BtnText={"Cancel Ride"}
                                    style={{ backgroundColor: colors.black, }}
                                    BtnTextStyles={{ color: '#ffffff' }}
                                />
                            </View>
                            {/* <View style={{ borderWidth: 0.3, borderColor: "#F0F1F3", width: "93%", alignSelf: "flex-end" }}></View>
                            <TouchableOpacity onPress={() => toggleSearchModal("dropOff")}>
                                <CardItem
                                    onPress={() => toggleSearchModal("dropOff")}
                                    style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
                                    <View>
                                        <Icon
                                            style={{ color: "#898989" }}
                                            type="Ionicons"
                                            name="ios-call" />
                                    </View>
                                    <View
                                        style={{
                                            borderLeftWidth: 1,
                                            height: 30,
                                            borderLeftColor: '#F0F1F3',
                                        }}
                                    />
                                    <View>
                                        <Icon
                                            style={{ color: "#898989" }}
                                            type="Ionicons"
                                            name="ios-chatbubbles" />
                                    </View>
                                </CardItem>
                            </TouchableOpacity> */}
                        </View>
                    </View>
                </Card>
            </View>
        </View>
    );
}

export default DriverDetails;