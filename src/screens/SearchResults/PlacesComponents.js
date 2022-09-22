import React, {Component} from 'react';
import {View} from 'react-native';
import {Icon, Accordion} from 'native-base';
import Text from '../../config/AppText';
import {colors, fonts} from '../../constants/DefaultProps';
import {Home, Briefcase, Heart} from '../assets/Components';

const dataArray = [
  {key: 0, title: 'Saved Places', content: 'Lorem ipsum dolor sit amet'},
  {key: 1, title: 'Favourites', content: 'Lorem ipsum dolor sit amet'},
];

function _renderHeader(item, expanded) {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        marginHorizontal: 10,
        marginVertical: 7,
      }}>
      <Text style={{fontWeight: '600'}}> {item.title}</Text>
      {expanded ? (
        <Icon style={{fontSize: 18}} name="ios-arrow-up" />
      ) : (
        <Icon style={{fontSize: 18}} name="ios-arrow-down" />
      )}
    </View>
  );
}
function _renderContent(item) {
  return (
    <View>
      {item.key === 0 ? (
        <View>
          <View
            activeOpacity={0.7}
            style={{backgroundColor: '#ffffff', marginBottom: 5}}>
            <View
              style={{
                padding: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'row'}}>
                <View style={{justifyContent: 'center'}}>
                  <Home />
                </View>
                <View style={{paddingLeft: 15}}>
                  <Text style={{fontSize: 12, fontFamily: fonts.bold}}>
                    Home
                  </Text>
                  <Text
                    style={{fontSize: 12, marginTop: 3, color: colors.gray}}>
                    11 Oba road, Trans-Ekulu, Enugu
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View
            activeOpacity={0.7}
            style={{backgroundColor: '#ffffff', marginBottom: 5}}>
            <View
              style={{
                padding: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'row'}}>
                <View style={{justifyContent: 'center'}}>
                  <Briefcase />
                </View>
                <View style={{paddingLeft: 15}}>
                  <Text style={{fontSize: 12, fontFamily: fonts.bold}}>
                    Work
                  </Text>
                  <Text
                    style={{fontSize: 12, marginTop: 3, color: colors.gray}}>
                    11 Oba road, Trans-Ekulu, Enugu
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View
            activeOpacity={0.7}
            style={{backgroundColor: '#ffffff', marginBottom: 5}}>
            <View style={{padding: 10}}>
              <Text
                style={{
                  fontSize: 12,
                  marginTop: 3,
                  color: colors.gray,
                  paddingHorizontal: 40,
                }}>
                Add more saved places
              </Text>
            </View>
          </View>
        </View>
      ) : (
        <View>
          <View
            activeOpacity={0.7}
            style={{backgroundColor: '#ffffff', marginBottom: 5}}>
            <View style={{padding: 25, flexDirection: 'row'}}>
              <View style={{justifyContent: 'center'}}>
                <Heart />
              </View>
              <View style={{paddingLeft: 15}}>
                <Text style={{fontSize: 12, marginTop: 3, color: colors.gray}}>
                  11 Oba road, Trans-Ekulu, Enugu
                </Text>
              </View>
            </View>
          </View>
          <View
            activeOpacity={0.7}
            style={{backgroundColor: '#ffffff', marginBottom: 5}}>
            <View style={{padding: 25, flexDirection: 'row'}}>
              <View style={{justifyContent: 'center'}}>
                <Heart />
              </View>
              <View style={{paddingLeft: 15}}>
                <Text style={{fontSize: 12, marginTop: 3, color: colors.gray}}>
                  11 Oba road, Trans-Ekulu, Enugu
                </Text>
              </View>
            </View>
          </View>
          <View
            activeOpacity={0.7}
            style={{backgroundColor: '#ffffff', marginBottom: 5}}>
            <View style={{padding: 10}}>
              <Text
                style={{
                  fontSize: 12,
                  marginTop: 3,
                  color: colors.gray,
                  paddingHorizontal: 40,
                }}>
                Add favourite places
              </Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

export default function(params) {
  return (
    <Accordion
      contentStyle={{flexGrow: 1}}
      dataArray={dataArray}
      animation={true}
      expanded={true}
      renderHeader={_renderHeader}
      renderContent={_renderContent}
    />
  );
}
