import React from 'react';
import {
    View,
    Text,
} from 'react-native';
import { Button } from 'native-base';

class Screen1 extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', padding: 30, }}>
                <Text style={{ fontSize: 18, textAlign: 'center', }}>Screen1</Text>
                <View style={{ marginTop: 20, }}>
                    <Button
                        style={{ justifyContent: 'center', }}
                        onPress={() => this.props.navigation.navigate('Screen2')}
                        success><Text style={{ color: 'white' }}> Next </Text>
                    </Button>
                </View>
            </View>
        )
    }
};


export default Screen1;
