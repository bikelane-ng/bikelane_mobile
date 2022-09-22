import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../../actions';
import {
  View,
  TouchableOpacity,
  PermissionsAndroid,
  Dimensions,
  StatusBar,
  StyleSheet,
} from 'react-native';
import MapView, {
  Marker,
  AnimatedRegion,
  Polyline,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import haversine from 'haversine';
import {Icon, Card, Spinner} from 'native-base';
import MapContainer from '../MapContainer';
import MapSearch from '../MapSearch';
import SearchResult from '../SearchResults';
import BookingDetails from '../BookingDetails';
import DriverDetails from '../DriverDetails';
import {Menu} from '../assets/Components';
import RequestRide from '../RequestRide';
import RideArrived from '../RideArrived';
import RideStarted from '../RideStarted';
import PaymentMethod from '../PaymentMethods';
import {colors, rideStatus} from '../../constants/DefaultProps';
import NavigationService from '../../navigation/NavigationService';
import TransactionCompleted from '../TransactionCompleted';
var width = Dimensions.get('window').width; //full width
import {notify} from '../../services';

const homePlace = {
  description: 'Home',
  geometry: {location: {lat: 48.8152937, lng: 2.4597668}},
};
const workPlace = {
  description: 'Work',
  geometry: {location: {lat: 48.8496818, lng: 2.2940881}},
};

// const LATITUDE = 29.95539;
// const LONGITUDE = 78.07513;
const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const DEFAULT_PADDING = {top: 50, right: 50, bottom: 50, left: 50};
const SPACE = 0.01;

class RiderMap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputTxt: false,
      requestLoader: false,
      mapRef: {},
      selected: false,
      hasAddress: false,
      estimate: false,
      region: {
        latitude: this.props.home.location.coords.latitude,
        longitude: this.props.home.location.coords.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      nearestDriver: {},
      nearbyDrivers: [],
      routeCoordinates: [],
      distanceTravelled: 0,
      prevLatLng: {},
      coordinate: new AnimatedRegion({
        latitude: this.props.home.location.coords.latitude || 0,
        longitude: this.props.home.location.coords.longitude || 0,
        latitudeDelta: 0,
        longitudeDelta: 0,
      }),
      rideArrived: false,
      rideStarted: false,
      paymentMethod: undefined,
    };
    this.mapRef = this.mapRef.bind(this);
    this.requestRide = this.requestRide.bind(this);
    this.fitMarkers = this.fitMarkers.bind(this);
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.onRegionChange = this.onRegionChange.bind(this);
    this.props.socket.on('DriverLocation.push', data => {
      console.log(data);
    });
    this.props.socket.on('RideStatus.push', data => {
      this.props.rideStatus(data);
      if (data.status === rideStatus.ARRIVED) {
        //do something
        notify(
          'Driver has arrived',
          'Your driver just arrived your pick up location',
        );
        // alert('Driver just arrived location');
      } else if (data.status === rideStatus.ONGOING) {
        //do something
        // alert('Driver just started trip');
        notify('Trip started', 'Your driver just started the trip');
        // this.setState({ rideStarted: true, rideArrived: false, });
      } else if (data.status === rideStatus.COMPLETED) {
        //do something
        notify(
          'Ride Completed',
          'Driver just arrived destination. Please make payment',
        );
        // alert('Driver just arrived destination. Please make payment');
      } else if (data.status === rideStatus.CANCELLED) {
        //do something
        notify('Ride Cancelled', 'Your trip has been cancelled');
        alert('Driver just cancelled trip');
      }
    });
  }

  componentDidMount() {
    const {navigation} = this.props;
    // this.props.getCurrentLocation();
    // this.props.getCurrentAddress();
    // socket.emit('serverData', { name: 'Obinna Okoro', role: 'Sofware Dev' })
    // const { coordinate } = this.state;
    // this.requestCameraPermission();

    // this.watchID = Geolocation.watchPosition(
    //     position => {
    //         const { routeCoordinates, distanceTravelled } = this.state;
    //         const { latitude, longitude } = position.coords;

    //         const newCoordinate = {
    //             latitude,
    //             longitude
    //         };
    //         console.log({ newCoordinate });

    //         if (Platform.OS === "android") {
    //             if (this.marker) {
    //                 this.marker._component.animateMarkerToCoordinate(
    //                     newCoordinate,
    //                     500
    //                 );
    //             }
    //         } else {
    //             coordinate.timing(newCoordinate).start();
    //         }

    //         this.setState({
    //             latitude,
    //             longitude,
    //             routeCoordinates: routeCoordinates.concat([newCoordinate]),
    //             distanceTravelled:
    //                 distanceTravelled + this.calcDistance(newCoordinate),
    //             prevLatLng: newCoordinate
    //         });
    //     },
    //     error => console.log(error),
    //     {
    //         enableHighAccuracy: true,
    //         timeout: 20000,
    //         maximumAge: 1000,
    //         distanceFilter: 10
    //     }
    // );
  }

  UNSAFE_componentWillReceiveProps(prevProps) {
    if (
      prevProps.home.nearbyDrivers &&
      prevProps.home.nearbyDrivers != this.props.home.nearbyDrivers
    ) {
      this.setState({
        nearbyDrivers: prevProps.home.nearbyDrivers,
      });
    }
    if (
      prevProps.home.rideDetails &&
      prevProps.home.rideDetails != this.props.home.rideDetails
    ) {
      let rideDetails = Object.assign(
        prevProps.home.rideDetails,
        this.props.home.estimatedRideDetails,
        {
          pickUp: this.props.home.selectedAddress.pickUp,
          dropOff: this.props.home.selectedAddress.dropOff,
        },
      );
      this.props.updateRideDetails(rideDetails);
      this.props.socket.emit('RideBooked', rideDetails);
    }
    if (
      prevProps.home.toggle &&
      prevProps.home.toggle != this.props.home.toggle
    ) {
      this.props.navigation.navigate('SearchResult');
    }
    if (
      prevProps.home.estimate &&
      prevProps.home.estimate != this.props.home.estimate
    ) {
      // this.fitMarkers();
      this.setState({estimate: true});
    }
  }

  componentWillUnmount() {
    Geolocation.clearWatch(this.watchID);
  }

  toggleSearchModal = () => {
    this.setState({inputTxt: true});
  };

  calcDistance = newLatLng => {
    const {prevLatLng} = this.state;
    return haversine(prevLatLng, newLatLng) || 0;
  };

  requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Location Access Permission',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  async animateCamera() {}

  mapRef = ref => {
    if (ref) {
      // this.props.mapRef(ref);
      this.map = ref;
      console.log(this.map);
    }
  };

  onSelect = driver => {
    this.props.nearestDriver(driver);
    this.setState({nearestDriver: driver});
  };

  requestRide = () => {
    const {navigation} = this.props;
    this.setState({requestLoader: true});
    this.props.requestRide();
    // navigation.navigate('LocateDriver', {
    //     returnToRoute: navigation.state,
    //     onSelect: this.onSelect
    // });
  };

  createMarker = (modifier = 1, latitude, longitude) => {
    return {
      latitude: latitude - SPACE * modifier,
      longitude: longitude - SPACE * modifier,
    };
  };

  getMarkers = () => {
    const {pickUp, dropOff} = this.props.home.selectedAddress;
    return (MARKERS = [
      this.createMarker(1, pickUp.location.latitude, pickUp.location.longitude),
      this.createMarker(
        2,
        dropOff.location.latitude,
        dropOff.location.longitude,
      ),
    ]);
  };

  fitMarkers = () => {
    const {pickUp, dropOff} = this.props.home.selectedAddress;
    const region = [
      {
        latitude: pickUp.location.latitude,
        longitude: pickUp.location.longitude,
      },
      {
        latitude: dropOff.location.latitude,
        longitude: dropOff.location.longitude,
      },
    ];
    console.log(this.map);
    console.log(region);
    // this.map.fitToCoordinates(query, {
    //     edgePadding: DEFAULT_PADDING,
    //     animated: true,
    // });
    this.map.fitToCoordinates(region, {
      edgePadding: DEFAULT_PADDING,
      animated: true,
    });
  };

  onRegionChange = region => {
    this.setState({
      region,
    });
  };

  confirmSelection = () => {
    const {pickUp, dropOff} = this.props.home.selectedAddress;
    // this.props.closeToggleModal();
    this.props.estimateRideDetails({
      pickup: pickUp.location,
      destination: dropOff.location,
    });
    // this.fitMarkers(pickUp.location, dropOff.location);
  };

  requestRide = () => {
    const {pickUp, dropOff} = this.props.home.selectedAddress;
    this.props.requestRide({
      pickup: pickUp.location,
      destination: dropOff.location,
    });
  };

  pay = () => {
    const {paymentMethod} = this.state;
    if (paymentMethod && paymentMethod == 'cash') {
      this.props.cashPayment();
      this.props.socket.emit('Payment', {
        ride: this.props.home.rideDetails._id,
        amount: 500,
      });
      return;
    }
    this.props.navigation.navigate('AddCard', {
      rideDetails: this.props.home.rideDetails,
    });
  };

  selectMethod = paymentMethod => {
    this.setState({paymentMethod});
  };

  toggleDrawer = () => this.props.navigation.toggleDrawer();

  render() {
    const width = Dimensions.get('screen').width;
    return (
      <View style={{flex: 1}}>
        <StatusBar barStyle="light-content" backgroundColor={colors.default} />
        <View style={{flex: 1}}>
          <MapContainer
            role={'USER'}
            region={this.state.region}
            coordinate={this.state.coordinate}
            selectedAddress={this.props.home.selectedAddress}
            mapRef={this.mapRef}
            nearbyDrivers={this.state.nearbyDrivers}
            nearestDriver={this.state.nearestDriver}
            onRegionChange={this.onRegionChange}
            overlay={this.props.home.overlay}
            estimate={this.state.estimate}
          />
          <View
            style={{
              position: 'absolute',
              top: 20,
              zIndex: 1000,
              elevation: 5,
              padding: 20,
              left: 0,
            }}>
            <TouchableOpacity onPress={this.toggleDrawer} activeOpacity={0.7}>
              <Menu />
            </TouchableOpacity>
          </View>
          {this.props.home.confirmedLocations ? null : (
            <MapSearch
              toggleSearchModal={() =>
                this.props.navigation.navigate('SearchResult')
              }
              // toggleSearchModal={this.props.toggleSearchModal}
              getAddressPredictions={this.props.getAddressPredictions}
              getInputData={this.props.getInputData}
              inputData={this.props.home.inputData}
              addressLoading={this.props.home.addressLoading}
            />
          )}

          {this.props.home.requestRide && !this.props.home.rideDetails && (
            <RequestRide
              // response={this.props.home.rideDetails}
              rideDetails={this.props.home.rideDetails}
              error={this.props.home.reqRideErr}
              cancelRide={this.props.cancelRide}
              searchAgain={this.requestRide}
            />
          )}

          {this.props.home.tranx && (
            <TransactionCompleted
              tranx={this.props.home.tranx}
              // status={this.props.home.payment.status}
              // creditAccount={() => this.props.navigation.navigate('MyCards')}
              proceed={() =>
                this.props.navigation.dispatch(
                  NavigationService.resetAction('AddReview'),
                )
              }
            />
          )}

          {this.props.home.showCard && (
            <View style={styles.searchBox}>
              <View style={{marginTop: 20, padding: 15}}>
                <Card
                  style={[
                    {paddingBottom: 10, paddingTop: 0, padding: 10},
                    styles.cardShadow,
                  ]}>
                  {this.props.home.error &&
                    !this.props.home.estimatedRideDetails && (
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={{
                            color: colors.white,
                            paddingHorizontal: 10,
                            padding: 2,
                            backgroundColor: colors.danger,
                            borderRadius: 5,
                            margin: 10,
                          }}>
                          {this.props.home.error}
                        </Text>
                      </View>
                    )}
                  {this.props.home.processing ? (
                    <Spinner color={colors.default_text} />
                  ) : (
                    <>
                      {this.props.home.estimate && (
                        <BookingDetails
                          estimatedRideDetails={
                            this.props.home.estimatedRideDetails
                          }
                          // distanceMatrix={this.props.home.distanceMatrix}
                          processing={this.props.home.processing}
                          requestRide={this.requestRide}
                          error={this.props.home.error}
                          cancelRide={this.props.cancelRide}
                        />
                      )}
                      {this.props.home.rideDetails &&
                        !this.props.home.hideDriverDetails && (
                          <DriverDetails
                            rideDetails={this.props.home.rideDetails}
                            cancelRide={this.props.cancelRide}
                          />
                        )}
                      {this.props.home.status == rideStatus.ARRIVED && (
                        <RideArrived
                          rideDetails={this.props.home.rideDetails}
                          // rideArrived={this.state.rideArrived}
                        />
                      )}
                      {this.props.home.status == rideStatus.ONGOING && (
                        <RideStarted
                          rideDetails={this.props.home.rideDetails}
                          // rideArrived={this.state.rideArrived}
                        />
                      )}
                      {this.props.home.status == rideStatus.COMPLETED && (
                        <PaymentMethod
                          rideDetails={this.props.home.rideDetails}
                          pay={this.pay}
                          paymentMethod={this.state.paymentMethod}
                          selectMethod={this.selectMethod}
                          transactionObj={this.props.home.transactionObj}
                        />
                      )}
                    </>
                  )}
                </Card>
              </View>
            </View>
          )}
          {/* <SearchResult
                        inputData={this.props.home.inputData}
                        resultTypes={this.props.home.resultTypes}
                        predictions={this.props.home.predictions}
                        getInputData={this.props.getInputData}
                        clearInputData={this.props.clearInputData}
                        getAddressPredictions={this.props.getAddressPredictions}
                        selectedAddress={this.props.home.selectedAddress}
                        getSelectedAddress={this.props.getSelectedAddress}
                        closeToggleModal={this.props.closeToggleModal}
                        confirmSelection={this.confirmSelection}
                        searching={this.props.home.searching}
                        error={this.props.home.error}
                    /> */}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  searchBox: {
    bottom: 50,
    position: 'absolute',
    width: width,
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
    opacity: 0.9,
  },
  cardShadow: {
    borderWidth: 1,
    borderRadius: 12,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
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
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1.2,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
  },
});

const mapStateToProps = state => ({
  home: state.home,
  socket: state.socket,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(actionCreators, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RiderMap);
