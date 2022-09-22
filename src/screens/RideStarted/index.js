import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Icon, Card, CardItem, Spinner} from 'native-base';
import styles from './RideStartedStyles';
import Text from '../../config/AppText';
import PropTypes from 'prop-types';
import {fonts, colors} from '../../constants/DefaultProps';
import Button from '../../components/Button';
import {Rating, AirbnbRating} from 'react-native-ratings';
const haversine = require('haversine');

// const propTypes = {
//     estimatedRideDetails: PropTypes.object.isRequired,
// }

const PaymentMethod = ({rideDetails}) => {
  // const { fare, duration, distance, } = rideDetails || {};
  return (
    <>
      <View
        style={{
          justifyContent: 'center',
          paddingHorizontal: 15,
          paddingTop: 15,
          marginTop: 2,
          marginBottom: 15,
        }}>
        <Text style={{fontSize: 14, fontFamily: fonts.medium}}>
          Your trip has started
        </Text>
      </View>

      <View
        style={{flexDirection: 'row', paddingHorizontal: 15, paddingTop: 10}}>
        <View style={{marginHorizontal: 5}}>
          <View
            style={{
              width: 12,
              height: 12,
              borderRadius: 12 / 2,
              marginLeft: -1.8,
              borderWidth: 1,
              borderColor: '#9C9C9C',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                height: 6,
                width: 6,
                borderRadius: 6 / 2,
                borderWidth: 1,
                borderColor: colors.default,
                backgroundColor: colors.default,
              }}
            />
          </View>
          <View style={{marginLeft: 2.5, marginTop: 2}}>
            <Text style={{lineHeight: 5, color: '#D1D2D2'}}>.</Text>
            <Text style={{lineHeight: 5, color: '#D1D2D2'}}>.</Text>
            <Text style={{lineHeight: 5, color: '#D1D2D2'}}>.</Text>
            <Text style={{lineHeight: 5, color: '#D1D2D2'}}>.</Text>
            <Text style={{lineHeight: 5, color: '#D1D2D2'}}>.</Text>
            <Text style={{lineHeight: 5, color: '#D1D2D2'}}>.</Text>
          </View>
          <View>
            <Icon
              type="Ionicons"
              name="ios-pin"
              style={{fontSize: 22, color: '#000000', marginLeft: -1.5}}
            />
          </View>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
            marginLeft: 5,
          }}>
          <View style={{height: 45}}>
            <Text style={{fontSize: 14, marginTop: -5}}>
              {rideDetails.pickUp.name}
            </Text>
          </View>
          <View style={{height: 45}}>
            <Text style={{fontSize: 14, marginBottom: 3}}>
              {rideDetails.dropOff.name}
            </Text>
          </View>
        </View>
      </View>
      {/* <View style={{ paddingVertical: 20, width: '100%', paddingHorizontal: 10, }}>
                <Button
                    onPress={() => cancelRide()}
                    BtnText={"Cancel Ride"}
                    BtnTextStyles={{ color: '#ffffff' }}
                />
            </View> */}
    </>
  );
};

// BookingDetails.propTypes = propTypes;
export default PaymentMethod;
