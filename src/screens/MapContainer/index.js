import React from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions';
import {
    View,
    Image,
    Text
} from "react-native";
import MapView, {
    Marker,
    AnimatedRegion,
    Polyline,
    PROVIDER_GOOGLE
} from "react-native-maps";
import styles from "./MapContainerStyles";
import MapViewDirections from 'react-native-maps-directions';
import marker from '../../imgs/pickUp.png';
// import pickUpMarker from '../../imgs/pickUp.png';
import pickUpMarker from '../../imgs/dropOff.png';
import { fonts, API_KEY, colors } from "../../constants/DefaultProps";
import { Pickup, Dropoff } from "../assets/Components";

const DEFAULT_PADDING = { top: 50, right: 50, bottom: 50, left: 50 };

class MapContainer extends React.Component {
    UNSAFE_componentWillReceiveProps(prevProps) {
        if (this.props.estimate) {
            this.fitMarkers();
        }
    }

    fitMarkers = () => {
        const { pickUp, dropOff } = this.props.selectedAddress;
        const region = [
            { longitude: parseFloat(pickUp.location.longitude), latitude: parseFloat(pickUp.location.latitude), },
            { longitude: parseFloat(dropOff.location.longitude), latitude: parseFloat(dropOff.location.latitude), },
        ];
        // console.log(this.map)
        // console.log(region)
        // this.map.fitToCoordinates(query, {
        //     edgePadding: DEFAULT_PADDING,
        //     animated: true,
        // });
        this.map.fitToCoordinates(region, {
            edgePadding: DEFAULT_PADDING,
            animated: true,
        });
    }
    render() {
        const { pickUp, dropOff } = this.props.selectedAddress || this.props.rideDetails || {};
        // console.log(this.props.rideDetails);
        return (
            <View style={styles.mapContainer}>
                {this.props.role === 'USER' && <View style={{ position: 'absolute', top: 80, left: 25, zIndex: 1000, }}>
                    <Text style={{ fontFamily: fonts.bold, fontSize: 20, }}>Select your Drive</Text>
                </View>}
                {this.props.overlay && <View style={{ backgroundColor: '#000000', opacity: 0.7, width: '100%', height: '100%', zIndex: 1000, position: 'absolute', top: 0 }}>
                </View>}
                <MapView
                    ref={e => this.map = e}
                    style={styles.map}
                    provider={PROVIDER_GOOGLE}
                    // customMapStyle={customStyle}
                    // onRegionChangeComplete={onRegionChange}
                    // onLayout={() => mapRef && mapRef.fitToCoordinates(coordinate, { edgePadding: { top: 10, right: 10, bottom: 10, left: 10 }, animated: true })}
                    region={this.props.region}
                    showsUserLocation={true}
                    showsMyLocationButton={true}
                    followUserLocation={true}
                    showsCompass={true}
                    zoomEnabled={true}
                    loadingEnabled={true}
                >
                    {/* <Polyline coordinates={routeCoordinates} strokeWidth={5} /> */}
                    {/* {pickUp && dropOff && routeDirections ? <Polyline coordinates={routeDirections[1].toArray()} strokeWidth={3} /> : null} */}

                    {
                        pickUp && dropOff ?
                            <MapViewDirections
                                origin={pickUp.location.latitude + "," + pickUp.location.longitude}
                                destination={dropOff.location.latitude + "," + dropOff.location.longitude}
                                apikey={API_KEY}
                                strokeColor={'#000000'}
                                strokeWidth={3}
                            /> : null
                    }

                    {pickUp && dropOff && <>
                        <MapView.Marker
                            coordinate={pickUp.location}
                            // image={pickUpMarker}
                            // pinColor={colors.default}
                            title={pickUp.name}
                        >
                            <Pickup />
                        </MapView.Marker>
                        <MapView.Marker
                            coordinate={dropOff.location}
                            // pinColor="blue"
                            title={dropOff.name}
                        >
                            <Dropoff />
                        </MapView.Marker>
                    </>}

                    {/* {nearbyDrivers &&
                        nearbyDrivers.map((marker, i) => {
                            <MapView.Marker
                                key={i}
                                coordinate={marker.position}
                                image={require('../../imgs/taxi1-sm.png')}
                                title={`Driver ${i}`}
                            />
                        })
                    }

                    {nearestDriver && Object.keys(nearestDriver).length > 0 &&
                        <MapView.Marker
                            coordinate={nearestDriver.position}
                            // pinColor="yellow"
                            image={require('../../imgs/taxi1-sm.png')}
                            title="Driver Location"
                        />
                    } */}

                    {/* {
                        nearByDrivers && nearByDrivers.map((marker, index) =>
                            <MapView.Marker
                                key={index}
                                coordinate={{ latitude: marker.coordinate.coordinates[1], longitude: marker.coordinate.coordinates[0] }}
                                image={carMarker}
                            />
                        )
                    } */}

                </MapView>

                {/* <View style={styles.markerFixed}>
                    <Image style={styles.marker} source={marker} />
                </View> */}
                {/* 
                <View pointerEvents="none" style={styles.markerFixed}>
                    <Image style={{ width: 40, height: 40 }} pointerEvents="none" source={marker} />
                </View> */}
            </View>
        );
    }
}

const customStyle = [
    {
        elementType: 'geometry',
        stylers: [
            {
                color: '#242f3e',
            },
        ],
    },
    {
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#746855',
            },
        ],
    },
    {
        elementType: 'labels.text.stroke',
        stylers: [
            {
                color: '#242f3e',
            },
        ],
    },
    {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#d59563',
            },
        ],
    },
    {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#d59563',
            },
        ],
    },
    {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [
            {
                color: '#263c3f',
            },
        ],
    },
    {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#6b9a76',
            },
        ],
    },
    {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [
            {
                color: '#38414e',
            },
        ],
    },
    {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [
            {
                color: '#212a37',
            },
        ],
    },
    {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#9ca5b3',
            },
        ],
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [
            {
                color: '#746855',
            },
        ],
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [
            {
                color: '#1f2835',
            },
        ],
    },
    {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#f3d19c',
            },
        ],
    },
    {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [
            {
                color: '#2f3948',
            },
        ],
    },
    {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#d59563',
            },
        ],
    },
    {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [
            {
                color: '#17263c',
            },
        ],
    },
    {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#515c6d',
            },
        ],
    },
    {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [
            {
                color: '#17263c',
            },
        ],
    },
];

// const mapStateToProps = state => ({
//     home: state.home,
//     socket: state.socket,
// });

// const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

// export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);
export default MapContainer;