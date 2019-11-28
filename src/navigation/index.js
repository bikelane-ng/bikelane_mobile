import React from 'react';
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator, DrawerNavigatorItems } from "react-navigation-drawer";
import Text from '../config/AppText';
import SplashScreen from '../screens/Splash';
import RiderMapScreen from '../screens/RiderMap';
import LocateDriver from '../screens/LocateDriver';
import { Container, Header, Body, Image, Thumbnail, Content } from "native-base";
import { colors, fonts } from '../constants/DefaultProps';
import OTPScreen from '../screens/Auth/index';
import VerifyOTPScreen from '../screens/Auth/VerifyOTP';
import RegisterScreen from '../screens/Auth/Register';
import OnBoardScreen from '../screens/Auth/OnBoard';
import TripScreen from '../screens/Trips';
import PromotionScreen from '../screens/Promotion';

const drawerContentComponents = (props) => (
    <Container>
        <Header style={{ height: 200, backgroundColor: colors.yellow, }}>
            <Body style={{ flexDirection: 'row', paddingLeft: 20, }}>
                <Thumbnail source={require('../imgs/avatar.png')} />
                <Text style={{ fontFamily: fonts.medium, paddingLeft: 20, fontSize: 16, }}>John Doe</Text>
            </Body>
        </Header>
        <Content style={{ marginTop: -3 }}>
            <DrawerNavigatorItems labelStyle={{ color: "#707070", paddingLeft: 10, }} {...props} />
        </Content>
    </Container>
);

const MyDrawerNavigator = createDrawerNavigator({
    'Home': {
        screen: RiderMapScreen,
    },
    'Your Trips': {
        screen: TripScreen,
    },
    'Payment': {
        screen: RiderMapScreen,
    },
    'Calculate Fare': {
        screen: RiderMapScreen,
    },
    'Promotions': {
        screen: PromotionScreen,
    },
    'Settings': {
        screen: RiderMapScreen,
    },
    'Settings': {
        screen: RiderMapScreen,
    },
    'About': {
        screen: RiderMapScreen,
    },
}, {
    initialRouteName: "Home",
    contentComponent: drawerContentComponents,
});

const AppNavigator = createStackNavigator({
    Splash: SplashScreen,
    OTP: OTPScreen,
    VerifyOTP: VerifyOTPScreen,
    Register: RegisterScreen,
    OnBoard: OnBoardScreen,
    RiderMap: MyDrawerNavigator,
    LocateDriver: LocateDriver
},
    {
        initialRouteName: "RiderMap",
        headerMode: "none"
    }
);

export default createAppContainer(AppNavigator);