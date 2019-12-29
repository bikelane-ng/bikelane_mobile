import React from 'react';
import {
    View,
    StyleSheet,
    Image,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions';
import { Form, Item, Label, Input, List, ListItem, Icon, } from 'native-base';
import Text from '../../config/AppText';
import { fonts, colors } from '../../constants/DefaultProps';
import Button from '../../components/Button';
import { SafeAreaView } from 'react-navigation';
import OnBoarder from '../../imgs/OnBoarder.png';
import NavigationService from '../../navigation/NavigationService';
import Header from '../../components/Header';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { TouchableOpacity } from 'react-native-gesture-handler';

class AllDrivers extends React.Component {
    state = {
        otp: ''
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg, }}>
                <Header
                    wallet={false}
                />
                <View style={styles.container}>
                    <List style={{ backgroundColor: colors.white }}>
                        <ListItem style={{ flexDirection: 'column', alignItems: 'flex-start', }} itemDivider>
                            <View style={{ flexDirection: 'row', marginTop: 10, }}>
                                <Icon name="add" style={{ fontSize: 20, color: colors.default_text }} />
                                <TouchableOpacity activeOpacity={0.7} onPress={() => this.props.navigation.navigate('DriverDetails')}>
                                    <Text style={styles.h1}>Add Drivers</Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={{ fontFamily: fonts.medium, fontSize: 18, paddingVertical: 10 }}>Drivers</Text>
                        </ListItem>
                        <ListItem style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                            <View style={{ flexDirection: 'column', }}>
                                <Text style={[styles.main_txt, { fontSize: 16, marginTop: 4 }]}>Pembroke Dock</Text>
                                <Text style={[styles.main_txt, { fontSize: 12, marginTop: 4 }]}>+234 800 000 000</Text>
                                <Text style={[styles.main_txt, { fontSize: 12, marginTop: 4 }]}>ENU45DE</Text>
                            </View>
                            <View style={{ flexDirection: 'column', }}>
                                <Text style={{ color: colors.default, }}>$400</Text>
                                <View style={{ marginVertical: 7, flexDirection: "row", paddingBottom: 5, }}>
                                    <Rating
                                        type='star'
                                        ratingCount={5}
                                        startingValue={4}
                                        ratingColor={"#E6750C"}
                                        ratingTextColor={"#E6750C"}
                                        ratingBackgroundColor={"#E6750C"}
                                        imageSize={12}
                                        showRating={false}
                                        onFinishRating={this.ratingCompleted}
                                    />
                                </View>
                            </View>
                        </ListItem>
                        <ListItem style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                            <View style={{ flexDirection: 'column', }}>
                                <Text style={[styles.main_txt, { fontSize: 16, marginTop: 4 }]}>Pembroke Dock</Text>
                                <Text style={[styles.main_txt, { fontSize: 12, marginTop: 4 }]}>+234 800 000 000</Text>
                                <Text style={[styles.main_txt, { fontSize: 12, marginTop: 4 }]}>ENU45DE</Text>
                            </View>
                            <View style={{ flexDirection: 'column', }}>
                                <Text style={{ color: colors.default, }}>$400</Text>
                                <View style={{ marginVertical: 7, flexDirection: "row", paddingBottom: 5, }}>
                                    <Rating
                                        type='star'
                                        ratingCount={5}
                                        startingValue={4}
                                        ratingColor={"#E6750C"}
                                        ratingTextColor={"#E6750C"}
                                        ratingBackgroundColor={"#E6750C"}
                                        imageSize={12}
                                        showRating={false}
                                        onFinishRating={this.ratingCompleted}
                                    />
                                </View>
                            </View>
                        </ListItem>
                    </List>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // padding: 30,
    },
    main_txt: {
        color: colors.gray,
    },
    h1: {
        paddingVertical: 10,
        color: colors.default_text,
        fontFamily: fonts.medium,
        position: 'relative',
        bottom: 8,
        marginLeft: 5
    },
    textInputContainer: {
        alignContent: 'center',
        marginVertical: 50,
    },
    input: {
        fontFamily: fonts.default,
        // color: '#222B2F',
        height: 45,
        fontSize: 13,
        paddingVertical: 4,
        marginLeft: 10,
    },
})

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(null, mapDispatchToProps)(AllDrivers);