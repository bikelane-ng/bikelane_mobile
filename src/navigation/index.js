import React from 'react';
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator, DrawerNavigatorItems } from "react-navigation-drawer";
import SplashScreen from '../screens/Splash';
import RiderMapScreen from '../screens/RiderMap';
import LocateDriver from '../screens/LocateDriver';
import { Container, Header, Body, Image, Thumbnail, Content } from "native-base";
import { colors } from '../helpers/utils';

const drawerContentComponents = (props) => (
    <Container style={{ backgroundColor: colors.default }}>
        <Header style={{ height: 200, backgroundColor: colors.default, }}>
            <Body style={{ alignItems: 'center' }}>
                <Thumbnail source={require('../imgs/avatar.png')} />
            </Body>
        </Header>
        <Content>
            <DrawerNavigatorItems labelStyle={{ color: "white" }} {...props} />
        </Content>
    </Container>
);

const MyDrawerNavigator = createDrawerNavigator({
    Home: {
        screen: RiderMapScreen,
    },
}, {
    contentComponent: drawerContentComponents,
});

const AppNavigator = createStackNavigator({
    Splash: SplashScreen,
    RiderMap: MyDrawerNavigator,
    LocateDriver: LocateDriver
},
    {
        initialRouteName: "Splash",
        headerMode: "none"
    }
);

export default createAppContainer(AppNavigator);