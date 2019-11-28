import React from 'react';
import {
    View,
    TouchableOpacity,
} from 'react-native';
import { Icon, Header, Left, Body, Title, Right } from 'native-base';
import Text from '../config/AppText';
import { fonts, colors } from '../constants/DefaultProps';
import { Menu } from '../screens/assets/Components';
import NavigationService from '../navigation/NavigationService';

export default function (props) {
    return (
        <View>
            <Header>
                <Left style={{ paddingLeft: 15, }}>
                    <TouchableOpacity
                        onPress={() => NavigationService.toggleDrawer()}
                        activeOpacity={0.7}>
                        <Menu />
                    </TouchableOpacity>
                </Left>
                <Body />
                <Right style={{ paddingRight: 15, }}>
                    <Text style={{ fontFamily: fonts.medium, fontSize: 16, }}>NGN2000</Text>
                </Right>
            </Header>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, marginHorizontal: 10, }}>
                <Text style={{ fontFamily: fonts.medium, fontSize: 20, color: colors.gray, }}>{props.title}</Text>
                {props.back && <TouchableOpacity
                    onPress={() => NavigationService.goBack()}
                >
                    <Icon style={{ color: colors.gray }} name="ios-close" />
                </TouchableOpacity>}
            </View>
        </View>
    )
}