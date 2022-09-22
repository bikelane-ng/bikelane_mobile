import React from 'react';
import {View, Linking, TouchableOpacity} from 'react-native';
import {Thumbnail, Icon, Card, CardItem} from 'native-base';
import styles from './DriverDetailsStyles';
import Text from '../../config/AppText';
import LinearGradient from 'react-native-linear-gradient';
import {Rating, AirbnbRating} from 'react-native-ratings';
import Button from '../../components/Button';
import {colors} from '../../constants/DefaultProps';
import {Call} from '../assets/Components';

const DriverDetails = ({rideDetails, cancelRide}) => {
  const {driver} = rideDetails || {};
  return (
    <>
      <View style={{flexDirection: 'row', paddingTop: 15}}>
        <View style={{flex: 1, flexDirection: 'column'}}>
          <CardItem
            onPress={() => toggleSearchModal('pickUp')}
            style={{flexDirection: 'column', alignItems: 'flex-start'}}>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity activeOpacity={0.7}>
                  <Thumbnail
                    style={{width: 40, height: 40}}
                    source={
                      driver.avatar
                        ? {uri: driver.avatar}
                        : require('../../imgs/avatar.png')
                    }
                  />
                </TouchableOpacity>
                <View
                  style={{
                    paddingLeft: 10,
                    alignItems: 'flex-start',
                    position: 'relative',
                    bottom: 5,
                  }}>
                  <Text
                    style={{fontFamily: 'NoirPro-Medium', fontSize: 18}}>{`${
                    driver.firstName
                  } ${driver.surname}`}</Text>
                  <AirbnbRating
                    count={5}
                    starStyle={{tintColor: '#009C24', marginTop: 5}}
                    reviews={['Terrible', 'Bad', 'Okay', 'Good', 'Excellent']}
                    defaultRating={5}
                    showRating={false}
                    size={10}
                    // starStyle={{ justifyContent: "flex-start" }}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: 'NoirPro-Medium',
                      marginTop: 5,
                    }}>
                    {driver.driverInfo.vehicleInfo.licensePlate}
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                style={{
                  height: 50,
                  width: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 50 / 2,
                }}
                activeOpacity={0.7}
                onPress={() => Linking.openURL(`tel:${driver.mobile}`)}>
                <Call />
              </TouchableOpacity>
            </View>
          </CardItem>

          <View
            style={{paddingVertical: 20, width: '100%', paddingHorizontal: 10}}>
            <Button
              onPress={() => cancelRide()}
              BtnText={'Cancel Ride'}
              // style={{ backgroundColor: colors.black, }}
              BtnTextStyles={{color: '#ffffff'}}
            />
          </View>
        </View>
      </View>
    </>
  );
};

export default DriverDetails;
