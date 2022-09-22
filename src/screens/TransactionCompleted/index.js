import React from 'react';
import {View, StyleSheet} from 'react-native';
import Button from '../../components/Button';
import {colors, fonts} from '../../constants/DefaultProps';
import {CheckCircle} from '../assets/Components';
var Spinner = require('react-native-spinkit');
import Text from '../../config/AppText';

const TransactionCompleted = ({tranx, status, creditAccount, proceed}) => {
  // const { error, data } = requestedRide || {};
  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.9)',
      }}>
      {/* {!rideDetails && !error && <Spinner style={{ alignItems: "center" }} isVisible={true} size={150} type={"Bounce"} color={"#FFFFFF"} />} */}
      {tranx && <CheckCircle />}
      {tranx && (
        <Text
          style={{
            color: colors.white,
            marginTop: 30,
            fontFamily: fonts.medium,
            fontSize: 16,
          }}>
          {'Payment Successfuly'}
        </Text>
      )}
      {/* {status.failed && <Text style={{ color: colors.white, marginTop: 30, fontFamily: fonts.medium, fontSize: 16, }}>{'Payment Declined'}</Text>} */}

      {/* <View style={{ marginTop: 20, }}>
                {status.failed && <Text style={{ color: colors.white, marginTop: 30, fontFamily: fonts.medium, fontSize: 16, }}>{'You do not have sufficient money in your wallet '}</Text>}
            </View>
            {status.failed && <View style={{ padding: 50, width: '100%', position: 'absolute', bottom: 70, }}>
                <Button
                    onPress={() => creditAccount()}
                    BtnText={"Credit Account"}
                    BtnTextStyles={{ color: '#ffffff' }}
                />
            </View>} */}
      {tranx && (
        <View
          style={{
            padding: 50,
            width: '100%',
            position: 'absolute',
            bottom: 70,
          }}>
          <Button
            onPress={() => proceed()}
            BtnText={'Complete'}
            BtnTextStyles={{color: '#ffffff'}}
          />
        </View>
      )}
    </View>
  );
};

export default TransactionCompleted;
