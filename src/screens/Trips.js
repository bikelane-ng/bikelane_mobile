import React, { Component } from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { Icon, Container, Image, Thumbnail } from "native-base";
import Text from '../config/AppText';
import { colors } from "../constants/DefaultProps";
import { SafeAreaView } from "react-navigation";
import Header from '../components/Header';
import { Rating, AirbnbRating } from 'react-native-ratings';

class Trips extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container style={{ backgroundColor: '#FAFAFA', }}>
                <Header title={'My Trips'} />
                <View
                    activeOpacity={0.7}
                    // onPress={() => handleSelectedAddress(item.placeID)}
                    style={{ backgroundColor: '#ffffff', marginTop: 5, }}>
                    <View style={{ padding: 20 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <View>
                                <Text style={styles.date_txt}>November 08, 07: 40</Text>
                            </View>
                            <View>
                                <Text style={styles.text_1}>Completed</Text>
                            </View>
                        </View>
                        <View style={{ marginTop: 10, }}>
                            <Text style={{ fontSize: 18, }}>Order ID: 675TYU6</Text>
                        </View>
                        <View style={{ marginTop: 30, }}>
                            <Text>Ugwuaji road, nike</Text>
                            <Text style={{ marginTop: 3, }}>15 Nza Street, Independence Layout</Text>
                        </View>
                    </View>
                    <View style={{ height: 1, opacity: 0.1, width: '100%', backgroundColor: colors.gray, marginTop: 20, }}></View>
                    <View style={{ padding: 20, flexDirection: 'row', }}>
                        <Thumbnail style={{ width: 40, height: 40, }} source={require('../imgs/avatar.png')} />
                        <View style={{ paddingLeft: 10, }}>
                            <Text>John Doe</Text>
                            <AirbnbRating
                                count={5}
                                starStyle={{ tintColor: '#009C24', marginTop: 5, }}
                                reviews={['Terrible', 'Bad', 'Okay', 'Good', 'Excellent']}
                                defaultRating={5}
                                showRating={false}
                                size={10}
                            />
                            <Text>AN245YU</Text>
                        </View>
                    </View>
                </View>

                <View
                    activeOpacity={0.7}
                    // onPress={() => handleSelectedAddress(item.placeID)}
                    style={{ backgroundColor: '#ffffff', marginTop: 5, }}>
                    <View style={{ padding: 20 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <View>
                                <Text style={styles.date_txt}>November 08, 07: 40</Text>
                            </View>
                            <View>
                                <Text style={styles.text_1}>Completed</Text>
                            </View>
                        </View>
                        <View style={{ marginTop: 10, }}>
                            <Text style={{ fontSize: 18, }}>Order ID: 675TYU6</Text>
                        </View>
                        <View style={{ marginTop: 30, }}>
                            <Text>Ugwuaji road, nike</Text>
                            <Text style={{ marginTop: 3, }}>15 Nza Street, Independence Layout</Text>
                        </View>
                    </View>
                    <View style={{ height: 1, opacity: 0.1, width: '100%', backgroundColor: colors.gray, marginTop: 20, }}></View>
                    <View style={{ padding: 20, flexDirection: 'row', }}>
                        <Thumbnail style={{ width: 40, height: 40, }} source={require('../imgs/avatar.png')} />
                        <View style={{ paddingLeft: 10, }}>
                            <Text>John Doe</Text>
                            <AirbnbRating
                                count={5}
                                starStyle={{ tintColor: '#009C24', marginTop: 5, }}
                                reviews={['Terrible', 'Bad', 'Okay', 'Good', 'Excellent']}
                                defaultRating={5}
                                showRating={false}
                                size={10}
                            />
                            <Text>AN245YU</Text>
                        </View>
                    </View>
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
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

export default Trips;