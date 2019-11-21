import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/index';
import {
    View,
    TouchableOpacity,
    Image,
    ScrollView
} from 'react-native';
import { Thumbnail, Icon, Item, Button, Input, Toast, Spinner } from 'native-base';
import Text from '../../../config/AppText';
// import styles from '../styles';
import ImagePicker from 'react-native-image-crop-picker';

class EditProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isProcessing: false,
            loaded: false,
            firstName: '',
            lastName: '',
            email: '',
            phone: ''
        }
    }
    componentDidMount() {
        this.props.fetchUser(this.props.user.current._id);
        this.props.fetchDriver(this.props.user.current._id);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.user.modified && nextProps.user.modified != this.props.user.modified) {
            this.setState({ isProcessing: false });
            Toast.show({
                type: "success",
                text: "Successful",
                position: "top",
                duration: 4000,
                onClose: this.onClose
            })
        }
        if (nextProps.user.credentials && nextProps.user.credentials != this.props.user.credentials) {
            this.setState({
                loaded: true,
                firstName: nextProps.user.credentials.firstName,
                lastName: nextProps.user.credentials.lastName,
                email: nextProps.user.credentials.email,
                phone: nextProps.user.credentials.phone
            })
        }
        if (nextProps.driver.avatar && nextProps.driver.avatar != this.props.driver.avatar) {
            Toast.show({
                type: "success",
                text: "Avatar uploaded successfully",
                position: "top",
                duration: 2000
            })
            this.props.fetchDriver(this.props.user.current._id);
        }
    }

    onClose() {
        driverProfile();
    }

    selectPhoto() {
        ImagePicker.openPicker({
            cropping: true
        }).then(image => {
            this.props.avatar({
                avatarPhoto: image.path
            })
        });
    }

    editUser() {
        this.setState({ isProcessing: true });
        this.props.editUser(this.props.user.current._id, {
            email: this.state.email,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            phone: this.state.phone
        })
    }
    updateInput(props, value) {
        this.setState({ [props]: value });
    }

    render() {
        return (
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                {
                    this.state.loaded ? <View style={{ flex: 1, padding: 30 }}>
                        <View style={{ alignItems: "center" }}>
                            <View>
                                <TouchableOpacity onPress={() => this.selectPhoto()}>
                                    <Thumbnail
                                        style={{ width: 110, height: 110, borderRadius: 110 / 2 }}
                                        source={this.props.driver.credentials && this.props.driver.credentials.avatarPhoto == null ? require('../../../imgs/avatar-profile-picture-3.png') :
                                            { uri: `${this.props.driver.credentials && this.props.driver.credentials.avatarPhoto}` }}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={{ marginTop: 10 }}>
                                <Text>{`${this.state.firstName} ${this.state.lastName}`}</Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: "row", marginTop: 20, width: 140, justifyContent: "space-between", alignSelf: "center" }}>
                            <TouchableOpacity style={{ height: 35, width: 35, borderRadius: 35 / 2, backgroundColor: "#3B5998", justifyContent: "center" }} iconLeft dark>
                                <Icon style={{ fontSize: 17, textAlign: "center", alignItems: "center", color: "white" }} name='logo-facebook' />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ height: 35, width: 35, borderRadius: 35 / 2, backgroundColor: "#1DA1F3", justifyContent: "center" }} iconLeft dark>
                                <Icon style={{ fontSize: 17, textAlign: "center", alignItems: "center", color: "white" }} name='logo-twitter' />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ height: 35, width: 35, borderRadius: 35 / 2, backgroundColor: "#DD4B39", justifyContent: "center" }} iconLeft dark>
                                <Icon style={{ fontSize: 17, textAlign: "center", alignItems: "center", color: "white" }} name='logo-googleplus' />
                            </TouchableOpacity>
                        </View>

                        <View style={{ marginTop: 20 }}>
                            <Item style={styles.inputBefore} regular>
                                <Icon style={{ color: "#00A87E" }} type="Ionicons" name="person" />
                                <Input
                                    value={this.state.firstName}
                                    onChangeText={e => this.updateInput("firstName", e)}
                                    style={styles.mainInput}
                                    placeholderTextColor={"#bbb"}
                                />
                            </Item>
                            <Item style={styles.inputAfter} regular>
                                <Icon style={{ color: "#00A87E" }} type="Ionicons" name="person" />
                                <Input
                                    value={this.state.lastName}
                                    onChangeText={e => this.updateInput("lastName", e)}
                                    style={styles.mainInput}
                                    placeholderTextColor={"#bbb"}
                                />
                            </Item>
                            <Item style={styles.inputAfter} regular>
                                <Icon style={{ color: "#00A87E" }} type="Ionicons" name="ios-mail" />
                                <Input
                                    value={this.state.email}
                                    onChangeText={e => this.updateInput("email", e)}
                                    style={styles.mainInput}
                                    placeholderTextColor={"#bbb"}
                                />
                            </Item>
                            <Item style={styles.inputAfter} regular>
                                <Icon style={{ color: "#00A87E" }} type="Ionicons" name="ios-call" />
                                <Input
                                    value={this.state.phone}
                                    onChangeText={e => this.updateInput("phone", e)}
                                    style={styles.mainInput}
                                    placeholderTextColor={"#bbb"}
                                />
                            </Item>
                        </View>

                        <View style={{ flex: 1, marginTop: 20 }}>
                            <View style={{ flexDirection: "row", flex: 1 }}>
                                <View>
                                    <Icon style={{ color: "#00A87E" }} type="Ionicons" name="ios-pin" />
                                </View>
                                <View style={{ paddingLeft: 20, flex: 1 }}>
                                    <View style={{ flexDirection: "row" }}>
                                        <View>
                                            <Text>Home</Text>
                                            <Text style={{ color: "#bbb" }}>460 Park Ave, New York</Text>
                                        </View>
                                        <View style={{ position: "absolute", right: 0 }}>
                                            <Icon style={{ color: "#00A87E", fontSize: 20 }} type="Ionicons" name="ios-remove-circle-outline" />
                                        </View>
                                    </View>
                                    <View style={{ marginTop: 10, flexDirection: "row" }}>
                                        <View>
                                            <Text>Office</Text>
                                            <Text style={{ color: "#bbb" }}>541-549 Columbus Ave, New York</Text>
                                        </View>
                                        <View style={{ position: "absolute", right: 0 }}>
                                            <Icon style={{ color: "#00A87E", fontSize: 20 }} type="Ionicons" name="ios-remove-circle-outline" />
                                        </View>
                                    </View>
                                    <View>
                                        <TouchableOpacity style={{ marginTop: 10, flexDirection: "row" }}>
                                            <Icon style={{ color: "#00A87E", fontSize: 20 }} type="Ionicons" name="add" />
                                            <Text style={{ paddingLeft: 10, marginTop: 0 }}>Add Location</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{ marginTop: 30 }}>
                            <Button
                                disabled={this.state.isProcessing ? true : false}
                                onPress={() => this.editUser()}
                                style={[{ backgroundColor: "#00A87E", height: 50 }, { opacity: this.state.isProcessing ? 0.4 : 1 }]} block>
                                <Text style={{ color: "white" }}>{this.state.isProcessing ? "Processing..." : "SAVE CHANGES"}</Text>
                            </Button>
                        </View>
                    </View> : <View style={{ flex: 1, justifyContent: "center" }}>
                            <Spinner size="small" />
                        </View>
                }
            </ScrollView>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
    driver: state.driver
});

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);