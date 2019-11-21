import React from 'react';
import {
    View,
} from 'react-native';
import {
    Button, Icon
} from 'native-base';
import Text from '../../config/AppText';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    static navigationOptions = {
        drawerIcon: ({ tintColor }) => (
            <View style={{ marginTop: 3 }}>
                <Icon type="Ionicons" style={{ color: tintColor, }} name="ios-person" />
            </View>
        )
    }
    
    componentDidMount() {

    }
    componentWillReceiveProps(nextProps) {

    }
    render() {
        return (
            <View style={{ flex: 1, padding: 10 }}>
                
            </View >
        );
    }
}

export default Profile;