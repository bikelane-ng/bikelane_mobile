import React from 'react';
import {
    View,
    FlatList,
    TouchableOpacity
} from 'react-native';
import { Input, Item, List, Icon, Left, Body, ListItem, Spinner, CardItem, Card } from 'native-base';
import styles from './SearchResultStyles';
import Text from '../../config/AppText';
import { colors } from '../../constants/DefaultProps';

const truncateLength = 28;
const SearchResult = ({ inputData, resultTypes, predictions, getInputData, getAddressPredictions, getSelectedAddress, selectedAddress, closeToggleModal, searching, error }) => {
    function handleSelectedAddress(placeID) {
        getSelectedAddress(placeID)
    }
    function handleSearch(key, val) {
        getInputData({
            key,
            value: val
        });
        getAddressPredictions();
    }
    _keyExtractor = (item, index) => item.name;
    return (
        <View style={{ flex: 1, backgroundColor: '#FAFAFA', }}>
            <TouchableOpacity
                onPress={() => closeToggleModal()}
                style={{ padding: 10 }}>
                <Icon style={{ color: "#00A87E", fontSize: 30 }} type='Ionicons' name='arrow-round-back' />
            </TouchableOpacity>

            <View style={{ padding: 0, backgroundColor: '#ffffff' }}>
                <View style={{ marginTop: 20, padding: 15 }}>
                    <View >
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
                                    <Text style={{ lineHeight: 5, color: "#D1D2D2" }}>.</Text>
                                    <Text style={{ lineHeight: 5, color: "#D1D2D2" }}>.</Text>
                                    <Text style={{ lineHeight: 5, color: "#D1D2D2" }}>.</Text>
                                </View>
                                <View>
                                    <Icon type="Ionicons" name="ios-pin" style={{ fontSize: 22, color: "#000000", marginLeft: -1.5 }} />
                                </View>
                            </View>
                            <View style={{ flex: 1, flexDirection: "column", paddingHorizontal: 10, marginLeft: 10, }}>
                                <View style={{ marginTop: 0 }}>
                                    <Item style={[{ backgroundColor: "#F7F7F7", height: 40, }, styles.cardShadow]} rounded>
                                        <Input
                                            style={styles.input}
                                            onChangeText={handleSearch.bind(this, "pickUp")}
                                            placeholder={'Select Location'}
                                            placeholderTextColor='#9BABB4'
                                            autoFocus={false}
                                            value={inputData && inputData["pickUp"] && inputData.pickUp}

                                            // value={selectedAddress && selectedAddress["pickUp"] && selectedAddress.pickUp.name.length > truncateLength ? `${selectedAddress.pickUp.name.substring(0, truncateLength)}...` : selectedAddress.pickUp && selectedAddress.pickUp.name.length < truncateLength ? selectedAddress.pickUp.name : ""}
                                        />
                                        {inputData && inputData.length > 0 && <TouchableOpacity>
                                            <Icon style={{ color: "red", fontSize: 40 }} type='Ionicons' name='ios-close' />
                                        </TouchableOpacity>}
                                    </Item>
                                </View>

                                <View style={{ marginTop: 10 }}>
                                    <Item style={[{ backgroundColor: "#F7F7F7", height: 40, }, styles.cardShadow]} rounded>
                                        <Input
                                            style={styles.input}
                                            onChangeText={handleSearch.bind(this, "dropOff")}
                                            placeholder={'Select Destination'}
                                            placeholderTextColor='#9BABB4'
                                            autoFocus={false}
                                            value={inputData && inputData["dropOff"] && inputData.dropOff}
                                        />
                                        {inputData && inputData.length > 0 && <TouchableOpacity>
                                            <Icon style={{ color: "red", fontSize: 40 }} type='Ionicons' name='ios-close' />
                                        </TouchableOpacity>}
                                    </Item>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#ffffff', marginTop: 5, padding: 20, }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Icon style={{ fontSize: 20, color: colors.yellow }} name='ios-star' />
                    <Text style={{ paddingLeft: 15, fontSize: 16, position: 'relative', bottom: 2, }}>Saved Places</Text>
                </View>
                <View>
                    <Icon style={{ color: '#707070' }} name='ios-arrow-forward' />
                </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#ffffff', marginTop: 5, padding: 20, }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Icon style={{ fontSize: 20, color: colors.black }} name='ios-heart' />
                    <Text style={{ paddingLeft: 15, fontSize: 16, position: 'relative', bottom: 2, }}>Favourites</Text>
                </View>
                <View>
                    <Icon style={{ color: '#707070' }} name='ios-arrow-forward' />
                </View>
            </View>


            {searching && <View style={{ marginTop: 30, alignItems: "center" }}>
                <Spinner size='small' />
                <Text>Please wait...</Text>
            </View>}

            {error && !searching && <View style={{ width: "90%", marginTop: 30, alignItems: "center", padding: 20, flexDirection: "row" }}>
                <Icon type='Ionicons' name='ios-information-circle-outline' />
                <Text style={{ paddingLeft: 20 }}>{error}</Text>
            </View>}

            <View style={styles.searchResultsWrapper}>
                <List
                    dataArray={predictions}
                    keyExtractor={(item, index) => index.toString()}
                    renderRow={(item) =>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => handleSelectedAddress(item.placeID)}
                            style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#ffffff', marginTop: 2, padding: 20, }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Icon style={{ fontSize: 20, color: colors.yellow }} name='ios-pin' />
                                <View style={{ paddingLeft: 30 }}>
                                    <Text style={styles.primaryText}>{item.primaryText}</Text>
                                    <Text style={styles.secondaryText}>{item.secondaryText}</Text>
                                </View>
                            </View>
                            <View>
                                <Icon style={{ color: colors.yellow, fontSize: 20, }} name='ios-heart' />
                            </View>
                            {/* <ListItem onPress={() => handleSelectedAddress(item.placeID)} button avatar>
                                <Left style={styles.leftContainer}>
                                    <Icon style={styles.leftIcon} name="pin" />
                                </Left>
                                <Body>
                                    <Text style={styles.primaryText}>{item.primaryText}</Text>
                                    <Text style={styles.secondaryText}>{item.secondaryText}</Text>
                                </Body>
                            </ListItem> */}
                        </TouchableOpacity>
                    }
                />
            </View>
        </View>
    )
}

export default SearchResult;