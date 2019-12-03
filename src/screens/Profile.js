import React, { Component } from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { Icon, Container, Image, Thumbnail, Item, Input, Content } from "native-base";
import Text from '../config/AppText';
import { colors, fonts } from "../constants/DefaultProps";
import Header from '../components/Header';
import Button from '../components/Button';
import SubHeader from "../components/SubHeader";

class Profile extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container style={{ backgroundColor: colors.bg, }}>
                <Header />
                <Content>
                    <SubHeader title='Edit Account' />
                    <View style={styles.container}>
                        <View style={{ marginLeft: 25, marginBottom: 25, }}>
                            <Thumbnail style={{ width: 80, height: 80, }} source={require('../imgs/avatar.png')} />
                        </View>
                        <View style={{ backgroundColor: '#ffffff', marginBottom: 5, }}>
                            <View style={{ padding: 20, flexDirection: 'row', justifyContent: 'space-between', }}>
                                <View>
                                    <View style={{ paddingLeft: 15, }}>
                                        <Text style={{ fontSize: 12, color: colors.gray, }}>First name</Text>
                                        <Text style={{ fontSize: 18, fontFamily: fonts.medium, }}>John</Text>
                                    </View>
                                </View>
                                <View style={{ justifyContent: 'center', }}>
                                    <Icon style={{ fontSize: 20, }} name='ios-arrow-forward' />
                                </View>
                            </View>
                        </View>

                        <View style={{ backgroundColor: '#ffffff', marginBottom: 5, }}>
                            <View style={{ padding: 20, flexDirection: 'row', justifyContent: 'space-between', }}>
                                <View>
                                    <View style={{ paddingLeft: 15, }}>
                                        <Text style={{ fontSize: 12, color: colors.gray, }}>Last name</Text>
                                        <Text style={{ fontSize: 18, fontFamily: fonts.medium, }}>Doe</Text>
                                    </View>
                                </View>
                                <View style={{ justifyContent: 'center', }}>
                                    <Icon style={{ fontSize: 20, }} name='ios-arrow-forward' />
                                </View>
                            </View>
                        </View>

                        <View style={{ backgroundColor: '#ffffff', marginBottom: 5, }}>
                            <View style={{ padding: 20, flexDirection: 'row', justifyContent: 'space-between', }}>
                                <View>
                                    <View style={{ paddingLeft: 15, }}>
                                        <Text style={{ fontSize: 12, color: colors.gray, }}>Phone no</Text>
                                        <Text style={{ fontSize: 18, fontFamily: fonts.medium, }}>+2340000000</Text>
                                    </View>
                                </View>
                                <View style={{ justifyContent: 'center' }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', }}>
                                        <Text style={{ paddingHorizontal: 10, color: colors.success, }}>Verified</Text>
                                        <Icon style={{ fontSize: 20, }} name='ios-arrow-forward' />
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={{ backgroundColor: '#ffffff', marginBottom: 5, }}>
                            <View style={{ padding: 20, flexDirection: 'row', justifyContent: 'space-between', }}>
                                <View>
                                    <View style={{ paddingLeft: 15, }}>
                                        <Text style={{ fontSize: 12, color: colors.gray, }}>Email address</Text>
                                        <Text style={{ fontSize: 18, fontFamily: fonts.medium, }}>john.doe@gmail.com</Text>
                                    </View>
                                </View>
                                <View style={{ justifyContent: 'center' }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', }}>
                                        <Text style={{ paddingHorizontal: 10, color: colors.warning, }}>Unverified</Text>
                                        <Icon style={{ fontSize: 20, }} name='ios-arrow-forward' />
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={{ backgroundColor: '#ffffff', marginBottom: 5, }}>
                            <View style={{ padding: 20, flexDirection: 'row', justifyContent: 'space-between', }}>
                                <View>
                                    <View style={{ paddingLeft: 15, }}>
                                        <Text style={{ fontSize: 12, color: colors.gray, }}>Password</Text>
                                        <Text style={{ fontSize: 18, fontFamily: fonts.medium, }}>******</Text>
                                    </View>
                                </View>
                                <View style={{ justifyContent: 'center', }}>
                                    <Icon style={{ fontSize: 20, }} name='ios-arrow-forward' />
                                </View>
                            </View>
                        </View>
                    </View>
                    {/* <View style={{ padding: 10, marginVertical: 30, alignItems: 'center', }}>
                        <Button
                            BtnText={"Claim Promo"}
                            style={{ backgroundColor: colors.black, width: '80%', }}
                            BtnTextStyles={{ color: '#ffffff' }}
                        />
                    </View> */}
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 30,
    },
    text_1: {
        color: '#02A05D',
        fontSize: 12,
    },
    date_txt: {
        fontSize: 12,
    },
    input: {
        fontFamily: fonts.default,
        marginLeft: 20,
    },
})

export default Profile;