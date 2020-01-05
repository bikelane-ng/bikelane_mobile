import React from 'react';
import {
    View,
    TouchableOpacity,
    Platform,
} from 'react-native';
import { Icon, Header, Left, Body, Title, Right, Thumbnail, Switch } from 'native-base';
import Text from '../config/AppText';
import { fonts, colors } from '../constants/DefaultProps';
import { Menu } from '../screens/assets/Components';
import NavigationService from '../navigation/NavigationService';

export default function ({ hamburger, backAction, wallet, admin, headerColor, role, avatar, }) {
    return (
        <View>
            <Header style={{ backgroundColor: Platform.OS === 'android' && admin ? colors.bg : Platform.OS === 'android' && !admin ? colors.white || colors.white : null, }}>
                {role !== 'USER' && <>
                    {hamburger === false && backAction !== false && <Left style={{ paddingLeft: 0, }}>
                        <TouchableOpacity
                            onPress={() => backAction ? backAction() : NavigationService.goBack()}
                            activeOpacity={0.7}>
                            <View style={{ padding: 20, }}>
                                <Icon name='arrow-back' />
                            </View>
                        </TouchableOpacity>
                    </Left>}
                    {hamburger && <Left style={{ paddingLeft: 15, }}>
                        <TouchableOpacity
                            onPress={() => NavigationService.toggleDrawer()}
                            activeOpacity={0.7}>
                            <Icon name='ios-menu' />
                        </TouchableOpacity>
                    </Left>}
                    <Body />
                    {wallet === false ? null : <Right style={{ paddingRight: 15, }}>
                        <Text style={{ fontFamily: fonts.medium, fontSize: 16, }}>NGN2000</Text>
                    </Right>}
                </>}

                {role === 'DRIVER' && <>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => NavigationService.toggleDrawer()}
                            >
                                <Thumbnail
                                    style={{ width: 40, height: 40, borderRadius: 40 / 2, marginHorizontal: 10, }}
                                    source={{ uri: avatar }}
                                // source={require('../imgs/avatar.png')}
                                />
                            </TouchableOpacity>
                            <Text style={{ color: colors.black, fontFamily: fonts.medium, }}>N15,000</Text>
                        </View>
                        <View style={{ backgroundColor: colors.default_text, width: 60, height: 30, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', borderRadius: 10, marginRight: 10, }}>
                            <Text style={{ fontFamily: fonts.medium, color: colors.white, }}>Online</Text>
                        </View>
                    </View>
                </>}
            </Header>
            {/* {props.title && <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, marginHorizontal: 10, marginVertical: 7, }}>
                <Text style={{ fontFamily: fonts.medium, fontSize: 16, color: colors.gray, }}>{props.title}</Text>
                {props.back && <TouchableOpacity
                    onPress={() => NavigationService.goBack()}
                >
                    <Icon style={{ color: colors.gray }} name="ios-close" />
                </TouchableOpacity>}
            </View>} */}
        </View>
    )
}