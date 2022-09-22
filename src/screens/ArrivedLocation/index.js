import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Icon, Card, CardItem, Spinner} from 'native-base';
import styles from './ArrivedLocationStyles';
import Text from '../../config/AppText';
import PropTypes from 'prop-types';
import {fonts, colors} from '../../constants/DefaultProps';
import Button from '../../components/Button';
import {Rating, AirbnbRating} from 'react-native-ratings';
import {Call} from '../assets/Components';
const haversine = require('haversine');

// const propTypes = {
//     estimatedRideDetails: PropTypes.object.isRequired,
// }

const ArrivedLocation = ({
  rideDetails,
  arrived,
  isRideStatusUpdated,
  error,
}) => {
  const {fare, duration, distance} = rideDetails || {};
  return (
    <>
      {error && (
        <View style={{backgroundColor: colors.danger, padding: 5}}>
          <Text
            style={{
              fontFamily: fonts.medium,
              fontSize: 12,
              color: colors.white,
            }}>
            {error}
          </Text>
        </View>
      )}
      {rideDetails && (
        <>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 30,
              paddingTop: 0,
            }}>
            <View>
              <View style={{padding: 20, alignItems: 'flex-start'}}>
                <Text
                  style={{
                    fontSize: 14,
                  }}>{`${rideDetails.rider.firstName} ${
                  rideDetails.rider.surname
                }`}</Text>
                <AirbnbRating
                  count={5}
                  starStyle={{tintColor: colors.default_text, marginTop: 5}}
                  reviews={['Terrible', 'Bad', 'Okay', 'Good', 'Excellent']}
                  defaultRating={5}
                  showRating={false}
                  size={10}
                />
              </View>
            </View>
            <View style={{justifyContent: 'center'}}>
              <Call />
            </View>
          </View>
          <View
            style={{paddingHorizontal: 20, paddingBottom: 20, marginTop: 10}}>
            <Button
              onPress={() => arrived()}
              BtnText={'Arrived'}
              loading={isRideStatusUpdated}
              BtnTextStyles={{color: '#ffffff'}}
            />
          </View>
        </>
      )}
    </>
  );
};

// BookingDetails.propTypes = propTypes;
export default ArrivedLocation;
