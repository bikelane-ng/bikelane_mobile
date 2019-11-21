import React from 'react';
import {
    View,
    Text,
} from 'react-native';
import { Button } from 'native-base';

class Screen8 extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', padding: 30, }}>
                <Text style={{ fontSize: 18, textAlign: 'center', }}>Screen8</Text>
                <View style={{ marginTop: 20, }}>
                    <Button
                        style={{ justifyContent: 'center', }}
                        onPress={() => this.props.navigation.navigate('Home')}
                        success><Text style={{ color: 'white' }}> Go Home </Text>
                    </Button>
                </View>
            </View>
        )
    }
};


export default Screen8;