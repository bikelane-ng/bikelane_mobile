import React from 'react';
import {
    View,
    FlatList,
    TouchableOpacity
} from 'react-native';
import { Input, Item, List, Icon, Left, Body, ListItem, Spinner, CardItem, Card } from 'native-base';
import styles from './SearchResultStyles';
import Text from '../../config/AppText';
import { colors, fonts } from '../../constants/DefaultProps';
import Button from '../../components/Button';
import PlacesComponent from './PlacesComponents';
import Header from '../../components/Header';

const truncateLength = 28;
const SearchResult = ({
    inputData,
    resultTypes,
    predictions,
    getInputData,
    clearInputData,
    getAddressPredictions,
    selectedAddress,
    getSelectedAddress,
    closeToggleModal,
    confirmSelection,
    searching,
    error
}) => {
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
            {/* <TouchableOpacity
                onPress={() => closeToggleModal()}
                style={{ padding: 10 }}>
                <Icon style={{ color: "#00A87E", fontSize: 30 }} type='Ionicons' name='arrow-round-back' />
            </TouchableOpacity> */}
            <Header
                hamburger={false}
                backAction={() => closeToggleModal()}
            />

            <View style={{ backgroundColor: '#ffffff' }}>
                <View style={{ padding: 15 }}>
                    <View >
                        <View style={{ flexDirection: "row" }}>
                            <View style={{ marginTop: 15, padding: 10 }}>
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
                                        {inputData && inputData['pickUp'] && inputData['pickUp'].length > 0 && <TouchableOpacity onPress={() => clearInputData('pickUp')}>
                                            <Icon style={{ color: colors.gray, fontSize: 30, marginRight: 5, }} type='Ionicons' name='ios-close' />
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
                                        {inputData && inputData['dropOff'] && inputData['dropOff'].length > 0 && <TouchableOpacity onPress={() => clearInputData('dropOff')}>
                                            <Icon style={{ color: colors.gray, fontSize: 30, marginRight: 5, }} type='Ionicons' name='ios-close' />
                                        </TouchableOpacity>}
                                    </Item>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>


            <View style={{ flex: 1 }}>
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
                        dataArray={predictions && predictions}
                        keyExtractor={(item, index) => index.toString()}
                        renderRow={(item) =>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => handleSelectedAddress(item.placeID)}
                                style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#ffffff', marginTop: 2, padding: 20, }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Icon style={{ fontSize: 20, color: colors.default }} name='ios-pin' />
                                    <View style={{ paddingLeft: 30, paddingRight: 10 }}>
                                        <Text style={styles.primaryText}>{item.primaryText}</Text>
                                        <Text style={styles.secondaryText}>{item.secondaryText}</Text>
                                    </View>
                                </View>
                                <View>
                                    <Icon style={{ color: colors.default, fontSize: 20, }} name='ios-heart' />
                                </View>
                            </TouchableOpacity>
                        }
                    />
                </View>
                {!inputData['pickUp'] && !inputData['dropOff'] ? <PlacesComponent /> : null}

                {selectedAddress && selectedAddress['pickUp'] && selectedAddress['dropOff'] && <View style={{ padding: 30, flex: 1, justifyContent: 'flex-end' }}>
                    <Button
                        onPress={() => confirmSelection()}
                        BtnText={"Done"}
                        // loading={this.state.isProcessing ? true : false}
                        // style={{ backgroundColor: colors.black, }}
                        BtnTextStyles={{ color: '#ffffff' }}
                    />
                </View>}
            </View>
        </View>
    )
}

export default SearchResult;