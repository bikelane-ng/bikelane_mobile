import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Icon} from 'native-base';
import Text from '../config/AppText';
import {fonts, colors} from '../constants/DefaultProps';
import NavigationService from '../navigation/NavigationService';

export default function(props) {
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 15,
          marginHorizontal: 10,
          marginVertical: 7,
        }}>
        {props.title ? (
          <Text
            style={{
              fontFamily: fonts.medium,
              fontSize: 20,
              color: colors.gray,
            }}>
            {props.title}
          </Text>
        ) : null}
        {props.back && (
          <TouchableOpacity onPress={() => NavigationService.goBack()}>
            <Icon style={{color: colors.gray}} name="ios-close" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
