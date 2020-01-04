import React from 'react';
import {
    View,
    Image,
    TouchableOpacity,
} from 'react-native';
import store from '../store/createStore';
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator, DrawerNavigatorItems } from "react-navigation-drawer";
import * as constants from '../constants/ActionTypes';
import Text from '../config/AppText';
import SplashScreen from '../screens/Splash';
import InitAppScreen from '../screens/InitializeApp';
import RiderMapScreen from '../screens/RiderMap';
import LocateDriver from '../screens/LocateDriver';
import { Container, Header, Body, Thumbnail, Content, Icon, } from "native-base";
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
import VehicleInfoScreen from '../screens/Admin/Driver/VehicleInfo';

/**Driver screens starts here */
import DriverMapScreen from '../screens/DriverMap';

/**Admin screens starts here */
import AllDriverScreen from '../screens/Admin';
import AdminDriverDetailScreen from '../screens/Admin/DriverDetails';
import AsyncStorage from '@react-native-community/async-storage';
import NavigationService from './NavigationService';

// let avatar = undefined,
//     fullName = undefined;
// if (!avatar || !fullName) {
//     AsyncStorage.getItem(constants.CURRENT_USER).then((user) => {
//         if (user) {
//             avatar = JSON.parse(user).avatar;
//             fullName = `${JSON.parse(user).firstName} ${JSON.parse(user).surname}`
//         }
//     })
// }

function logOut() {
    setTimeout(() => {
        AsyncStorage.clear();
        NavigationService.navigate('Login');
    }, 0);
}

const drawerContentComponents = (props) => {
    return(
        <Container>
        <Header style={{ height: 200, backgroundColor: colors.white, }}>
            <Body style={{ flexDirection: 'row', paddingLeft: 20, }}>
                <Thumbnail source={{ uri: store.getState().user.current.avatar }} />
                <Text style={{ fontFamily: fonts.medium, paddingLeft: 20, fontSize: 16, marginTop: 15, }}>{`${store.getState().user.current.firstName} ${store.getState().user.current.surname}`}</Text>
            </Body>
        </Header>
        <View style={{ justifyContent: 'flex-end', borderBottomWidth: 2.5, borderBottomColor: colors.default, opacity: 0.3, }}></View>
        <Content style={{ marginTop: -3 }}>
            <DrawerNavigatorItems labelStyle={{ color: "#707070", paddingLeft: 10, fontFamily: fonts.medium, }} {...props} />
            <View>
                <TouchableOpacity
                    onPress={() => logOut()}
                    style={{ flexDirection: 'row', justifyContent: 'space-evenly', }}
                    activeOpacity={0.7}
                >
                    <Icon name='ios-power' />
                    <Text style={{ alignSelf: 'center' }}>Temporary Logout</Text>
                </TouchableOpacity>
            </View>
        </Content>
        <View style={{ padding: 30, alignItems: 'center', justifyContent: 'center' }}>
            <Image source={require('../imgs/Bikelane.png')} />
        </View>
    </Container>
    )
}

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
    // 'Settings': {
    //     screen: RiderMapScreen,
    // },
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

const DriverDrawerNavigator = createDrawerNavigator({
    'Home': {
        screen: DriverMapScreen,
    },
    'Settings': {
        screen: SettingsScreen,
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
    VehicleInfo: VehicleInfoScreen,
    PersonalDocuments: PersonalDocumentScreen,
    RiderMap: MyDrawerNavigator,
    Admin: AdminDrawerNavigator,
    LocateDriver: LocateDriver,
    AdminDriverDetail: AdminDriverDetailScreen,
    DriverMap: DriverDrawerNavigator,
},
    {
        initialRouteName: "Init",
        headerMode: "none"
    }
);

export default createAppContainer(AppNavigator);