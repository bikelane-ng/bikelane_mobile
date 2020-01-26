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

class MyCards extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container style={{ backgroundColor: colors.bg, }}>
                <Header />
                <Content>
                    <SubHeader title='Cards' />
                    <View style={styles.container}>
                        <Card style={[{ paddingBottom: 10, paddingTop: 0, padding: 10, }, styles.cardShadow]}>
                            <Text style={{ fontSize: 12, }}>Card number</Text>
                            <Text style={{ fontFamily: fonts.bold, fontSize: 14, }}>**** **** **** 5538</Text>
                            <View style={{ marginTop: 20, }}></View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View>
                                    <Text style={{ fontSize: 12, }}>Card holder</Text>
                                    <Text style={{ fontFamily: fonts.bold, fontSize: 14, }}>John Doe</Text>
                                </View>
                                <View>
                                    <Text style={{ fontSize: 12, }}>Card holder</Text>
                                    <Text style={{ fontFamily: fonts.bold, fontSize: 14, }}>John Doe</Text>
                                </View>
                            </View>
                        </Card>
                    </View>
                    <View style={{ padding: 10, marginVertical: 30, alignItems: 'center', }}>
                        <Button
                            BtnText={"Add Card"}
                            style={{ backgroundColor: colors.default, width: '80%', }}
                            BtnTextStyles={{ color: '#ffffff' }}
                        />
                    </View>
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
    cardShadow: {
        borderWidth: 1,
        borderRadius: 12,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        // shadowRadius: 2,
        elevation: 5,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
    },
})

export default MyCards;