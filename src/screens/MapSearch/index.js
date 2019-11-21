import React from "react";
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Platform,
    PermissionsAndroid,
    Dimensions,
} from "react-native";
import {
    Item,
    Input,
    InputGroup,
    Icon,
    Card,
    CardItem
} from "native-base";
import styles from "./MapSearchStyles";
import Text from '../../config/AppText';
import PropTypes from 'prop-types';
import { fonts } from "../../helpers/utils";
import { colors } from "../../constants/DefaultProps";

const propTypes = {
    toggleSearchModal: PropTypes.func.isRequired,
    getAddressPredictions: PropTypes.func.isRequired,
    getInputData: PropTypes.func.isRequired,
    inputData: PropTypes.object.isRequired,
}

const truncateLength = 28;
const MapSearch = ({ toggleSearchModal, getAddressPredictions, getInputData, inputData }) => {
    function handleSearch(key, val) {
        getInputData({
            key,
            value: val
        });
        getAddressPredictions();
    }
    return (
        <View style={styles.searchBox}>
            <View style={{ marginTop: 20, padding: 15 }}>
                <Card style={[{ padding: 10 }, styles.cardShadow]}>
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ marginTop: 15, padding: 10 }}>
                            <View style={{ width: 12, height: 12, borderRadius: 12 / 2, marginLeft: -1.8, borderWidth: 1, borderColor: "#9C9C9C", alignItems: "center", justifyContent: "center" }}>
                                <View style={{ height: 6, width: 6, borderRadius: 6 / 2, borderWidth: 1, borderColor: colors.yellow, backgroundColor: colors.yellow }}></View>
                            </View>
                            <View style={{ marginLeft: 2.5, marginTop: 2 }}>
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
                        <View style={{ flex: 1, flexDirection: "column", position: "relative", right: 10 }}>
                            <TouchableOpacity onPress={() => toggleSearchModal("pickUp")}>
                                <CardItem
                                    onPress={() => toggleSearchModal("pickUp")}
                                    style={{ flexDirection: "column", alignItems: "flex-start", backgroundColor: '#EBEBEB', borderRadius: 20, width: 250, margin: 10, marginLeft: 20, }}>
                                    <Text style={{ paddingLeft: 8, fontSize: 12, fontFamily: fonts.medium, color: "#898989" }}>
                                        {inputData && inputData["pickUp"] && inputData.pickUp.length > truncateLength ? `${inputData.pickUp.substring(0, truncateLength)}...` : inputData.pickUp && inputData.pickUp.length < truncateLength ? inputData.pickUp : "Set location"}
                                    </Text>
                                </CardItem>
                            </TouchableOpacity>
                            {/* <View style={{ borderWidth: 0.3, borderColor: "#ccc", width: "93%", alignSelf: "flex-end" }}></View> */}
                            <TouchableOpacity onPress={() => toggleSearchModal("dropOff")}>
                                <CardItem
                                    onPress={() => toggleSearchModal("dropOff")}
                                    style={{ flexDirection: "column", alignItems: "flex-start", backgroundColor: '#EBEBEB', borderRadius: 20, width: 250, margin: 10, marginLeft: 20, }}>

                                    <Text style={{ paddingLeft: 8, fontSize: 12, fontFamily: fonts.medium, color: "#898989" }}>
                                        {inputData && inputData["dropOff"] && inputData.dropOff.length > truncateLength ? `${inputData.dropOff.substring(0, truncateLength)}...` : inputData.dropOff && inputData.dropOff.length < truncateLength ? inputData.dropOff : "Set destination"}
                                    </Text>


                                    {/* <Item style={{ backgroundColor: '#EBEBEB' }} rounded>
                                        <Input
                                            disabled
                                            style={{ fontSize: 12, fontFamily: fonts.medium, height: 35, paddingLeft: 20, }}
                                            placeholder='Set destination' />
                                    </Item> */}
                                </CardItem>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Card>
            </View>
        </View>
    );
}

MapSearch.propTypes = propTypes;
export default MapSearch;