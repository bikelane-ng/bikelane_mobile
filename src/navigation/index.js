import React from 'react';
import {
    View,
    Image,
} from 'react-native';
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator, DrawerNavigatorItems } from "react-navigation-drawer";
import Text from '../config/AppText';
import SplashScreen from '../screens/Splash';
import InitAppScreen from '../screens/InitializeApp';
import RiderMapScreen from '../screens/RiderMap';
import LocateDriver from '../screens/LocateDriver';
import { Container, Header, Body, Thumbnail, Content, } from "native-base";
import { colors, fonts } from '../constants/DefaultProps';
import OTPScreen from '../screens/Auth/index';
import VerifyOTPScreen from '../screens/Auth/VerifyOTP';
import LoginScreen from '../screens/Auth/Login';
import RegisterScreen from '../screens/Auth/Register';
import OnBoardScreen from '../screens/Auth/OnBoard';
import TripScreen from '../screens/Trips';
import PromotionScreen from '../screens/Promotion';
import SettingsScreen from '../screens/Settings';
import ProfileScreen from '../screens/Profile';
import DriverAuthScreen from '../screens/Admin/Driver/index';
import VerifyDriverOTPScreen from '../screens/Admin/Driver/VerifyOTP';
import DriverDetailsScreen from '../screens/Admin/Driver/Details';
import AddPhotoScreen from '../screens/Admin/Driver/AddPhoto';
import BankDetailsScreen from '../screens/Admin/Driver/BankDetails';
import PersonalDocumentScreen from '../screens/Admin/Driver/PersonalDocs';
import PlateNumberScreen from '../screens/Admin/Driver/PlateNumber';

/**Admin screens starts here */
import AllDriverScreen from '../screens/Admin';

const drawerContentComponents = (props) => (
    <Container>
        <Header style={{ height: 200, backgroundColor: colors.yellow, }}>
            <Body style={{ flexDirection: 'row', paddingLeft: 20, }}>
                <Thumbnail source={require('../imgs/avatar.png')} />
                <Text style={{ fontFamily: fonts.medium, paddingLeft: 20, fontSize: 16, marginTop: 15, }}>John Doe</Text>
            </Body>
        </Header>
        <Content style={{ marginTop: -3 }}>
            <DrawerNavigatorItems labelStyle={{ color: "#707070", paddingLeft: 10, }} {...props} />
        </Content>
        <View style={{ padding: 30, alignItems: 'center', justifyContent: 'center' }}>
            <Image source={require('../imgs/Bikelane.png')} />
        </View>
    </Container>
);

const MyDrawerNavigator = createDrawerNavigator({
    'Home': {
        screen: RiderMapScreen,
    },
    'Profile': {
        screen: ProfileScreen,
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
        screen: SettingsScreen,
    },
    'About': {
        screen: RiderMapScreen,
    },
}, {
    initialRouteName: "Home",
    contentComponent: drawerContentComponents,
});

const AdminDrawerNavigator = createDrawerNavigator({
    'Drivers': {
        screen: AllDriverScreen,
    },
}, {
    initialRouteName: "Drivers",
    contentComponent: drawerContentComponents,
});

const AppNavigator = createStackNavigator({
    Splash: SplashScreen,
    Init: InitAppScreen,
    OTP: OTPScreen,
    VerifyOTP: VerifyOTPScreen,
    Login: LoginScreen,
    Register: RegisterScreen,
    OnBoard: OnBoardScreen,
    DriverAuth: DriverAuthScreen,
    VerifyDriverOTP: VerifyDriverOTPScreen,
    AddPhoto: AddPhotoScreen,
    DriverDetails: DriverDetailsScreen,
    BankDetails: BankDetailsScreen,
    PlateNumber: PlateNumberScreen,
    PersonalDocuments: PersonalDocumentScreen,
    RiderMap: MyDrawerNavigator,
    Admin: AdminDrawerNavigator,
    LocateDriver: LocateDriver
},
    {
        initialRouteName: "Init",
        headerMode: "none"
    }
);

export default createAppContainer(AppNavigator);