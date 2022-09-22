import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Icon, Card, CardItem, Spinner, CheckBox} from 'native-base';
import styles from './PaymentMethodStyles';
import Text from '../../config/AppText';
import PropTypes from 'prop-types';
import {fonts, colors} from '../../constants/DefaultProps';
import Button from '../../components/Button';
import {Rating, AirbnbRating} from 'react-native-ratings';
const haversine = require('haversine');

// const propTypes = {
//     estimatedRideDetails: PropTypes.object.isRequired,
// }

const PaymentMethod = ({rideDetails, selectMethod, paymentMethod, pay}) => {
  // const { fare, duration, distance, } = rideDetails || {};
  return (
    <>
      <View
        style={{
          justifyContent: 'center',
          borderBottomWidth: 1,
          borderBottomColor: '#e6e6e6',
          padding: 20,
        }}>
        <Text style={{fontSize: 14, fontFamily: fonts.medium}}>
          Your trip has ended
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 20,
          paddingTop: 20,
          borderBottomWidth: 1,
          borderBottomColor: '#e6e6e6',
        }}>
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
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottomWidth: 1,
          borderBottomColor: '#e6e6e6',
          padding: 20,
        }}>
        <View style={{padding: 10}}>
          <Text style={{fontSize: 10, color: colors.default}}>Fare</Text>
          <Text style={{fontFamily: fonts.medium, color: colors.default}}>
            NGN500
          </Text>
        </View>

        <View style={{padding: 10}}>
          <Text style={{fontSize: 10, color: colors.default}}>Trip Time</Text>
          <Text style={{fontFamily: fonts.medium, color: colors.default}}>
            33KM/40mins
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 20,
          marginTop: 15,
        }}>
        <View style={{paddingHorizontal: 10, flexDirection: 'row'}}>
          <CheckBox
            onPress={() => selectMethod('wallet')}
            checked={paymentMethod == 'wallet' ? true : false}
            color={colors.default_text}
          />
          <Text style={{fontSize: 12, marginLeft: 15, alignSelf: 'center'}}>
            Wallet
          </Text>
        </View>

        <View style={{paddingHorizontal: 10, flexDirection: 'row'}}>
          <CheckBox
            onPress={() => selectMethod('cash')}
            checked={paymentMethod == 'cash' ? true : false}
            color={colors.default_text}
          />
          <Text style={{fontSize: 12, marginLeft: 15, alignSelf: 'center'}}>
            Cash
          </Text>
        </View>
      </View>
      <View style={{paddingHorizontal: 20, paddingBottom: 20, marginTop: 10}}>
        <Button
          onPress={paymentMethod ? () => pay() : () => {}}
          BtnText={'Pay'}
          // BtnTextStyles={{ color: '#ffffff' }}
          style={{
            backgroundColor: !paymentMethod
              ? colors.btnDisabled
              : colors.default,
            borderWidth: 1,
            borderColor: !paymentMethod ? colors.btnDisabled : '#000000',
          }}
          BtnTextStyles={{
            color: !paymentMethod ? colors.white : colors.black,
            fontFamily: fonts.bold,
          }}
        />
      </View>
    </>
  );
};

// BookingDetails.propTypes = propTypes;
export default PaymentMethod;
