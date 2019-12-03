import React, { Component } from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { Icon, Container, Image, Thumbnail, Accordion, Content, } from "native-base";
import Text from '../config/AppText';
import { colors, fonts } from "../constants/DefaultProps";
import Header from '../components/Header';
import Button from '../components/Button';
import { Home, Briefcase, Heart } from "./assets/Components";
import SubHeader from "../components/SubHeader";

const dataArray = [
    { key: 0, title: "Saved Places", content: "Lorem ipsum dolor sit amet" },
    { key: 1, title: "Favourites", content: "Lorem ipsum dolor sit amet" },
    // { title: "Third Element", content: "Lorem ipsum dolor sit amet" }
];

class Settings extends Component {
    constructor(props) {
        super(props);
    }

    _renderHeader(item, expanded) {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, marginHorizontal: 10, marginVertical: 7, }}>
                <Text style={{ fontWeight: "600" }}>
                    {" "}{item.title}
                </Text>
                {expanded
                    ? <Icon style={{ fontSize: 18 }} name="ios-arrow-up" />
                    : <Icon style={{ fontSize: 18 }} name="ios-arrow-down" />}
            </View>
        );
    }
    _renderContent(item) {
        return (
            <View>
                {item.key === 0 ? <View>
                    <View
                        activeOpacity={0.7}
                        style={{ backgroundColor: '#ffffff', marginBottom: 5, }}>
                        <View style={{ padding: 20, flexDirection: 'row', justifyContent: 'space-between', }}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ justifyContent: 'center' }}>
                                    <Home />
                                </View>
                                <View style={{ paddingLeft: 15, }}>
                                    <Text style={{ fontSize: 12, fontFamily: fonts.bold, }}>Home</Text>
                                    <Text style={{ fontSize: 12, marginTop: 3, color: colors.gray, }}>11 Oba road, Trans-Ekulu, Enugu</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View
                        activeOpacity={0.7}
                        style={{ backgroundColor: '#ffffff', marginBottom: 5, }}>
                        <View style={{ padding: 20, flexDirection: 'row', justifyContent: 'space-between', }}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ justifyContent: 'center' }}>
                                    <Briefcase />
                                </View>
                                <View style={{ paddingLeft: 15, }}>
                                    <Text style={{ fontSize: 12, fontFamily: fonts.bold, }}>Work</Text>
                                    <Text style={{ fontSize: 12, marginTop: 3, color: colors.gray, }}>11 Oba road, Trans-Ekulu, Enugu</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View
                        activeOpacity={0.7}
                        style={{ backgroundColor: '#ffffff', marginBottom: 5, }}>
                        <View style={{ padding: 10, }}>
                            <Text style={{ fontSize: 12, marginTop: 3, color: colors.gray, paddingHorizontal: 40, }}>Add more saved places</Text>
                        </View>
                    </View>
                </View> : <View>
                        <View
                            activeOpacity={0.7}
                            style={{ backgroundColor: '#ffffff', marginBottom: 5, }}>
                            <View style={{ padding: 25, flexDirection: 'row', }}>
                                <View style={{ justifyContent: 'center' }}>
                                    <Heart />
                                </View>
                                <View style={{ paddingLeft: 15, }}>
                                    <Text style={{ fontSize: 12, marginTop: 3, color: colors.gray, }}>11 Oba road, Trans-Ekulu, Enugu</Text>
                                </View>
                            </View>
                        </View>
                        <View
                            activeOpacity={0.7}
                            style={{ backgroundColor: '#ffffff', marginBottom: 5, }}>
                            <View style={{ padding: 25, flexDirection: 'row', }}>
                                <View style={{ justifyContent: 'center' }}>
                                    <Heart />
                                </View>
                                <View style={{ paddingLeft: 15, }}>
                                    <Text style={{ fontSize: 12, marginTop: 3, color: colors.gray, }}>11 Oba road, Trans-Ekulu, Enugu</Text>
                                </View>
                            </View>
                        </View>
                        <View
                            activeOpacity={0.7}
                            style={{ backgroundColor: '#ffffff', marginBottom: 5, }}>
                            <View style={{ padding: 10, }}>
                                <Text style={{ fontSize: 12, marginTop: 3, color: colors.gray, paddingHorizontal: 40, }}>Add favourite places</Text>
                            </View>
                        </View>
                    </View>}
            </View>
        );
    }

    render() {
        return (
            <Container style={{ backgroundColor: '#FAFAFA', }}>
                <Header />
                <Content>
                    <SubHeader title={'Settings'} />
                    <View
                        activeOpacity={0.7}
                        style={{ backgroundColor: '#ffffff', }}>
                        <View style={{ padding: 20, flexDirection: 'row', justifyContent: 'space-between', }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Thumbnail style={{ width: 40, height: 40, }} source={require('../imgs/avatar.png')} />
                                <View style={{ paddingLeft: 15, }}>
                                    <Text style={{ fontSize: 12, }}>John Doe</Text>
                                    <Text style={{ fontSize: 12, }}>+2340000000</Text>
                                    <Text style={{ fontSize: 12, }}>john.doe@gmail.com</Text>
                                </View>
                            </View>
                            <View style={{ justifyContent: 'center', }}>
                                <Icon style={{ fontSize: 20, }} name='ios-arrow-forward' />
                            </View>
                        </View>
                    </View>

                    {/* <Header
                    title={'Saved Places'}
                    header={false}
                /> */}

                    <Accordion
                        dataArray={dataArray}
                        animation={true}
                        expanded={true}
                        renderHeader={this._renderHeader}
                        renderContent={this._renderContent}
                    />
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
    },
    text_1: {
        color: '#02A05D',
        fontSize: 12,
    },
    date_txt: {
        fontSize: 12,
    }
})

export default Settings;