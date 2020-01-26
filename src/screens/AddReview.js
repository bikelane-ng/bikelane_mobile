import React, { Component } from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { Icon, Container, Image, Thumbnail, Item, Input, Content, Textarea } from "native-base";
import Text from '../config/AppText';
import { colors, fonts } from "../constants/DefaultProps";
import Header from '../components/Header';
import Button from '../components/Button';
import SubHeader from "../components/SubHeader";
import { Rating, AirbnbRating } from 'react-native-ratings';

class AddReview extends Component {
    constructor(props) {
        super(props);
    }

    send = () => {

    }

    render() {
        return (
            <Container style={{ backgroundColor: colors.bg, }}>
                <Header />
                <Content>
                    <SubHeader title='Leave a review' />
                    <View style={styles.container}>
                        <View style={{ alignItems: 'center' }}>
                            <Thumbnail style={{ width: 150, height: 150, }} source={require('../imgs/avatar.png')} />
                            <View>
                                <Text>Chika Onyeonu</Text>
                                <Text>ANU83FK</Text>
                            </View>
                            <View style={{ paddingVertical: 20, }}>
                                <AirbnbRating
                                    count={5}
                                    starStyle={{ tintColor: colors.default_text, marginTop: 5, }}
                                    reviews={['Terrible', 'Bad', 'Okay', 'Good', 'Excellent']}
                                    defaultRating={5}
                                    showRating={false}
                                    size={10}
                                />
                            </View>
                        </View>
                        <View style={{ alignContent: 'center' }}>
                            <Textarea
                                style={styles.inputShadow}
                                rowSpan={6}
                                placeholder={'Tell us about the ride?'}
                            />
                        </View>
                    </View>
                    <View style={{ padding: 10, marginVertical: 30, alignItems: 'center', }}>
                        <Button
                            onPress={this.send}
                            BtnText={"Send"}
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
    inputShadow: {
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1.2,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
    },
})

export default AddReview;