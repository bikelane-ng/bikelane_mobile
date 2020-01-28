import React from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions';
import {
    View,
    TouchableOpacity,
    PermissionsAndroid,
    Dimensions,
    StyleSheet,
} from "react-native";
import MapView, {
    Marker,
    AnimatedRegion,
    Polyline,
    PROVIDER_GOOGLE
} from "react-native-maps";
import Geolocation from '@react-native-community/geolocation';
import haversine from "haversine";
import {
    Icon, Spinner, Card
} from "native-base";
import MapContainer from "../MapContainer";
import Header from "../../components/Header";
import { colors, rideStatus, fonts, } from "../../constants/DefaultProps";
import RideDetails from "../RideDetails";
import ArrivedLocation from "../ArrivedLocation";
import StartRide from '../StartRide';
import CompleteRide from '../CompleteRide';
import ConfirmPayment from '../ConfirmPayment';
import Button from '../../components/Button';
import { Acceptance, RatingIcon, Cancellation } from "../Admin/assets";
import Text from '../../config/AppText';
import whoosh from '../../services/sound';
import NavigationService from "../../navigation/NavigationService";

var width = Dimensions.get("window").width; //full width

const homePlace = { description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } } };
const workPlace = { description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } } };

// const LATITUDE = 29.95539;
// const LONGITUDE = 78.07513;
const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const DEFAULT_PADDING = { top: 80, right: 80, bottom: 80, left: 80 };
const SPACE = 0.01;

class DriverMap extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            inputTxt: false,
            requestLoader: false,
            mapRef: {},
            selected: false,
            hasAddress: false,
            prevCordinates: undefined,
            region: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            },
            rideDetails: undefined,
            nearestDriver: {},
            nearbyDrivers: [],
            routeCoordinates: [],
            distanceTravelled: 0,
            updateStatus: false,
            prevLatLng: {},
            coordinate: new AnimatedRegion({
                latitude: this.props.home.location.coords.latitude || 0,
                longitude: this.props.home.location.coords.longitude || 0,
                latitudeDelta: 0,
                longitudeDelta: 0
            })
        };
        this.mapRef = this.mapRef.bind(this);
        this.requestRide = this.requestRide.bind(this);
        this.fitMarkers = this.fitMarkers.bind(this);
        this.toggleDrawer = this.toggleDrawer.bind(this);
        this.onRegionChange = this.onRegionChange.bind(this);
        this.props.socket.on('RideBooked.push', (rideDetails) => {
            // alert('Ride Alert!!!');
            this.setState({ rideDetails, }, () => {
                whoosh.play((success) => {
                    if (success) {
                        console.log('successfully finished playing');
                    } else {
                        console.log('playback failed due to audio decoding errors');
                    }
                });
            });
            // console.log(data);
        });

        this.props.socket.on('Payment.push', (data) => {
            console.log(data);
            this.props.navigation.dispatch(NavigationService.resetAction('TripDetails'))
        });
    }

    // static navigationOptions = {
    //     drawerIcon: ({ tintColor }) => (
    //         <Icon type="Ionicons" style={{ color: tintColor }} name="ios-home" />
    //     )
    // }

    componentDidMount() {
        const { navigation } = this.props;
        this.props.getCurrentLocation();
        // socket.emit('serverData', { name: 'Obinna Okoro', role: 'Sofware Dev' })
        // const { coordinate } = this.state;
        // this.requestCameraPermission();
        this.watchPosition();
    }

    watchPosition = () => {
        this.watchID = Geolocation.watchPosition(
            position => {
                const { routeCoordinates, distanceTravelled, coordinate, } = this.state;
                const { latitude, longitude } = position.coords;

                const newCoordinate = {
                    latitude,
                    longitude
                };
                console.log({ newCoordinate });

                if (Platform.OS === "android") {
                    if (this.marker) {
                        this.marker._component.animateMarkerToCoordinate(
                            newCoordinate,
                            500
                        );
                    }
                } else {
                    coordinate.timing(newCoordinate).start();
                }

                this.setState({
                    prevCordinates: {
                        latitude,
                        longitude,
                    }
                });
                this.props.socket.emit('DriverLocation', {
                    longitude,
                    latitude,
                    driverId: this.props.current._id
                })
            },
            error => console.log(error),
            {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 1000,
                distanceFilter: 10
            }
        );
    }

    UNSAFE_componentWillReceiveProps(prevProps) {
        if (prevProps.home.location && prevProps.home.location != this.props.home.location) {
            this.setState({
                region: {
                    latitude: prevProps.home.location.coords.latitude,
                    longitude: prevProps.home.location.coords.longitude,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA
                }
            })
        }
        if (prevProps.home.selectedAddress && prevProps.home.selectedAddress != this.props.home.selectedAddress) {
            if (prevProps.home.selectedAddress.pickUp.location) {
                // this.props.updateInputAddress();
                this.setState({
                    region: {
                        latitude: prevProps.home.selectedAddress.pickUp.location.latitude,
                        longitude: prevProps.home.selectedAddress.pickUp.location.longitude,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA
                    }
                })
            }
        }
        if (prevProps.home.nearbyDrivers && prevProps.home.nearbyDrivers != this.props.home.nearbyDrivers) {
            this.setState({
                nearbyDrivers: prevProps.home.nearbyDrivers
            })
        }
        if (prevProps.driver.status && prevProps.driver.status != this.props.driver.status) {
            this.setState({
                updateStatus: false
            })
            alert('You are currently active')
        }
        // if (prevProps.home.isRideStatusUpdated && prevProps.home.isRideStatusUpdated != this.props.home.isRideStatusUpdated) {

        // }
    }

    componentWillUnmount() {
        Geolocation.clearWatch(this.watchID);
    }

    toggleSearchModal = () => {
        this.setState({ inputTxt: true })
    }

    calcDistance = newLatLng => {
        const { prevLatLng } = this.state;
        return haversine(prevLatLng, newLatLng) || 0;
    };

    requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: "Location Access Permission",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the camera");
            } else {
                console.log("Camera permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    };

    onPressZoomOut(region) {
        setTimeout(() => {
            this.region = {
                latitude: region.latitude,
                longitude: region.longitude,
                latitudeDelta: LATITUDE_DELTA * 10,
                longitudeDelta: LONGITUDE_DELTA * 10
            }

            this.setState({
                region: {
                    latitudeDelta: this.region.latitudeDelta,
                    longitudeDelta: this.region.longitudeDelta,
                    latitude: this.region.latitude,
                    longitude: this.region.longitude
                }
            })
            this.map.animateCamera(
                {
                    center: this.region
                }
            );
            // this.map.animateCamera(this.region, 100);
        }, 1000);
        // setTimeout(async () => {
        //     // this.map.animateToRegion(this.region, 1000);
        //     const camera = await this.map.getCamera();
        //     camera.heading += 10;
        //     camera.pitch = 2;
        //     // camera.altitude = 40;
        //     camera.zoom += 2;
        //     // camera.center.latitude += 0.5;
        //     this.map.animateCamera(camera, { duration: 2000 });
        //     // this.map.animateCamera(
        //     //     {
        //     //         center: {
        //     //             latitude: region.latitude,
        //     //             longitude: region.longitude,
        //     //         }
        //     //     }
        //     // );
        // }, 0);
    }

    onPressZoomIn(region) {
        this.region = {
            latitude: region.latitude,
            longitude: region.longitude,
            latitudeDelta: LATITUDE_DELTA / 10,
            longitudeDelta: LONGITUDE_DELTA / 10
        }
        this.setState({
            region: {
                latitudeDelta: this.region.latitudeDelta,
                longitudeDelta: this.region.longitudeDelta,
                latitude: this.region.latitude,
                longitude: this.region.longitude
            }
        })
        setTimeout(() => {
            this.map.animateToRegion(this.region, 100);
        }, 1000);
    }

    async animateCamera() {

    }

    mapRef = (ref) => {
        if (ref) {
            // this.props.mapRef(ref);
            this.map = ref;
            console.log(this.map)
        }
    }

    onSelect = driver => {
        this.props.nearestDriver(driver);
        this.setState({ nearestDriver: driver });
    };

    requestRide = () => {
        const { navigation } = this.props;
        this.setState({ requestLoader: true })
        this.props.requestRide();
        // navigation.navigate('LocateDriver', {
        //     returnToRoute: navigation.state,
        //     onSelect: this.onSelect
        // });
    }

    createMarker = (modifier = 1, latitude, longitude) => {
        return {
            latitude: latitude - SPACE * modifier,
            longitude: longitude - SPACE * modifier,
        };
    }

    getMarkers = () => {
        const { pickUp, dropOff } = this.props.home.selectedAddress;
        return MARKERS = [
            this.createMarker(1, pickUp.location.latitude, pickUp.location.longitude),
            this.createMarker(2, dropOff.location.latitude, dropOff.location.longitude),
        ];
    }

    fitMarkers = () => {
        const { pickUp, dropOff } = this.props.home.selectedAddress;
        setTimeout(() => {
            console.log(this.map)
            console.log(this.getMarkers())
            // this.map.fitToCoordinates(query, {
            //     edgePadding: DEFAULT_PADDING,
            //     animated: true,
            // });
            // this.map.fitToCoordinates(this.getMarkers(), {
            //     edgePadding: DEFAULT_PADDING,
            //     animated: true,
            // });
            this.map.fitToCoordinates([
                { latitude: pickUp.location.latitude, longitude: pickUp.location.longitude },
                { latitude: dropOff.location.latitude, longitude: dropOff.location.longitude },
            ], {
                edgePadding: DEFAULT_PADDING,
                animated: true,
            });
        }, 0);
    }

    onRegionChange = region => {
        this.setState({
            region
        })
    }

    headtToLocation = (rideDetails) => {
        whoosh.stop(() => {
            console.log('sounds stopped playing');
        })
        this.props.updateRideDetails(rideDetails);
    }

    changeStatus = (status) => {
        this.props.updateRideStatus({
            location: this.state.prevCordinates,
        },
            this.props.home.rideDetails._id,
            status
        );
    }

    confirmPayment = () => {

    }

    changeDriverStatus = () => {
        this.setState({ updateStatus: true, });
        this.props.updateDriverStatus({ active: true }, this.props.current._id);
    }

    toggleDrawer = () => this.props.navigation.toggleDrawer();

    render() {
        const width = Dimensions.get('screen').width;
        return (
            <View style={{ flex: 1, }}>
                <MapContainer
                    region={this.state.region}
                    coordinate={this.state.coordinate}
                    selectedAddress={undefined}
                    mapRef={this.mapRef}
                    nearbyDrivers={this.state.nearbyDrivers}
                    nearestDriver={this.state.nearestDriver}
                    onRegionChange={this.onRegionChange}
                    rideDetails={this.props.home.rideDetails}
                    overlay={this.props.home.overlay}
                />
                <View style={{ position: 'absolute', zIndex: 1000, elevation: 5, width: '100%', }}>
                    <Header
                        avatar={this.props.avatar}
                        hamburger={false}
                        backAction={false}
                        headerColor={'transparent'}
                        role={'DRIVER'}
                    />
                </View>

                {this.state.rideDetails && !this.props.home.hideAlert && <RideDetails
                    rideDetails={this.state.rideDetails}
                    headtToLocation={this.headtToLocation}
                />}

                {this.props.home.showCard && <View style={styles.searchBox}>
                    <View style={{ marginTop: 20, padding: 15 }}>
                        <Card style={[{ paddingBottom: 10, }, styles.cardShadow]}>
                            {this.props.home.processing ? <Spinner color={colors.default_text} /> : <>
                                {this.props.home.arrive && <ArrivedLocation
                                    rideDetails={this.props.home.rideDetails}
                                    arrived={() => this.changeStatus(rideStatus.ARRIVED)}
                                    isRideStatusUpdated={this.props.home.isRideStatusUpdated}
                                    error={this.props.home.updateRideError}
                                />}

                                {this.props.home.status == rideStatus.ARRIVED && <StartRide
                                    rideDetails={this.props.home.rideDetails}
                                    start={() => this.changeStatus(rideStatus.ONGOING)}
                                />}

                                {this.props.home.status == rideStatus.ONGOING && <CompleteRide
                                    rideDetails={this.props.home.rideDetails}
                                    complete={() => this.changeStatus(rideStatus.COMPLETED)}
                                />}

                                {this.props.home.status == rideStatus.COMPLETED && <ConfirmPayment
                                    rideDetails={this.props.home.rideDetails}
                                    confirmPayment={this.confirmPayment}
                                />}
                            </>}
                        </Card>
                    </View>
                </View>}


                {!this.state.rideDetails && <View style={styles.searchBox}>
                    <View style={{ marginTop: 20, padding: 15 }}>
                        <Card style={[{ paddingBottom: 10, }, styles.cardShadow]}>
                            <View style={{ backgroundColor: colors.white, padding: 10, paddingVertical: 20, marginTop: 5, }}>
                                <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-around', }}>
                                    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                        <Acceptance />
                                        <Text style={{ paddingVertical: 5, fontFamily: fonts.medium, }}>95.0%</Text>
                                        <Text style={{ color: colors.gray }}>Acceptance</Text>
                                    </View>
                                    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                        <RatingIcon />
                                        <Text style={{ paddingVertical: 5, fontFamily: fonts.medium, }}>4.75</Text>
                                        <Text style={{ color: colors.gray }}>Rating</Text>
                                    </View>
                                    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                        <Cancellation />
                                        <Text style={{ paddingVertical: 5, fontFamily: fonts.medium, }}>2.0%</Text>
                                        <Text style={{ color: colors.gray }}>Cancellation</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ alignItems: 'center', marginVertical: 15, }}>
                                <Button
                                    onPress={this.changeDriverStatus}
                                    BtnText={"Go"}
                                    loading={this.state.updateStatus}
                                    style={{ width: '85%', }}
                                    BtnTextStyles={{ color: '#ffffff' }}
                                />
                            </View>
                        </Card>
                    </View>
                    {/* <View style={{ alignItems: 'center' }}>
                        <Button
                            onPress={this.changeDriverStatus}
                            BtnText={"Stop"}
                            loading={this.state.isProccessing}
                            style={{ width: '80%', }}
                            BtnTextStyles={{ color: '#ffffff' }}
                        />
                    </View> */}
                </View>}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    searchBox: {
        bottom: 50,
        position: "absolute",
        width: width
    },
    searchBar: {
        flex: 1,
        flexDirection: 'column',
        position: 'absolute',
        zIndex: 999,
        left: 15,
        height: 40,
    },
    searchInput: {
        flex: 1,
        backgroundColor: 'white',
        borderWidth: 1,
        padding: 20,
        opacity: .9,
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

const mapStateToProps = state => ({
    home: state.home,
    avatar: state.user.current.avatar,
    socket: state.socket,
    current: state.user.current,
    driver: state.driver,
});

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DriverMap);