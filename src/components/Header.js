import React from 'react';
import {
    View,
    TouchableOpacity,
    Platform,
} from 'react-native';
import { Icon, Header, Left, Body, Title, Right } from 'native-base';
import Text from '../config/AppText';
import { fonts, colors } from '../constants/DefaultProps';
import { Menu } from '../screens/assets/Components';
import NavigationService from '../navigation/NavigationService';

export default function ({ hamburger, backAction, wallet }) {
    return (
        <View>
            <Header style={{ backgroundColor: Platform.OS === 'android' ? '#ffffff' : null }}>
                {hamburger === false ? <Left style={{ paddingLeft: 15, }}>
                    <TouchableOpacity
                        onPress={() => backAction ? backAction() : NavigationService.goBack()}
                        activeOpacity={0.7}>
                        <Icon name='arrow-back' />
                    </TouchableOpacity>
                </Left> : <Left style={{ paddingLeft: 15, }}>
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