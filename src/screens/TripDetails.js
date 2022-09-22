import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../actions';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {
  Icon,
  Container,
  Image,
  Thumbnail,
  Item,
  Input,
  Content,
  Textarea,
} from 'native-base';
import Text from '../config/AppText';
import {colors, fonts, API_KEY} from '../constants/DefaultProps';
import Header from '../components/Header';
import Button from '../components/Button';
import SubHeader from '../components/SubHeader';
import {Rating, AirbnbRating} from 'react-native-ratings';
import NavigationService from '../navigation/NavigationService';
import MapView, {
  Marker,
  AnimatedRegion,
  Polyline,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

class TripDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 5,
      rideDetails: undefined,
      selectedAddress: undefined,
    };
  }

  componentDidMount() {
    this.setState({
      rideDetails: this.props.home.rideDetails,
      selectedAddress: this.props.home.selectedAddress,
    });
  }

  UNSAFE_componentWillReceiveProps(prevProps) {
    if (
      prevProps.home.refresh &&
      prevProps.home.refresh != this.props.home.refresh
    ) {
      this.props.navigation.dispatch(
        NavigationService.resetAction('DriverMap'),
      );
    }
  }

  goHome = () => {
    this.props.navigation.dispatch(NavigationService.resetAction('DriverMap'));
  };

  render() {
    const {rideDetails, selectedAddress} = this.state;
    return (
      <Container style={{backgroundColor: colors.bg}}>
        {/* <Header /> */}
        <Content style={{marginTop: 30}}>
          <SubHeader title="Trip Details" />
          <View style={styles.container}>
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
                      backgroundColor: colors.black,
                    }}
                  />
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  marginLeft: 5,
                  marginTop: -3,
                }}>
                <View style={{height: 45}}>
                  <Text style={{fontSize: 14}}>
                    {rideDetails && rideDetails.pickUp.name}
                  </Text>
                </View>
                <View style={{height: 42}}>
                  <Text style={{fontSize: 14}}>
                    {rideDetails && rideDetails.dropOff.name}
                  </Text>
                </View>
              </View>
            </View>

            {/* maps */}
            <View style={{position: 'absolute', zIndex: 1000, elevation: 8}}>
              <MapView
                ref={e => (this.map = e)}
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                region={this.props.home.location.coords}
                // zoomEnabled={true}
                // loadingEnabled={true}
              >
                {selectedAddress &&
                selectedAddress.pickUp &&
                selectedAddress.dropOff ? (
                  <MapViewDirections
                    origin={
                      selectedAddress.pickUp.location.latitude +
                      ',' +
                      selectedAddress.pickUp.location.longitude
                    }
                    destination={
                      selectedAddress.dropOff.location.latitude +
                      ',' +
                      selectedAddress.dropOff.location.longitude
                    }
                    apikey={API_KEY}
                    strokeColor={'#000000'}
                    strokeWidth={3}
                  />
                ) : null}
              </MapView>
            </View>

            <View
              style={{
                alignItems: 'center',
                padding: 20,
                borderBottomWidth: 1,
                borderBottomColor: '#e6e6e6',
              }}>
              <Text style={{fontFamily: fonts.medium, fontSize: 16}}>
                NGN500
              </Text>
              <View style={{marginTop: 10}} />
              <Text style={{color: colors.gray}}>
                Payment made successfully by cash
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                borderBottomWidth: 1,
                borderBottomColor: '#e6e6e6',
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 20,
                }}>
                <Text style={{fontFamily: fonts.medium, fontSize: 16}}>
                  15mins
                </Text>
                <View style={{marginTop: 10}} />
                <Text style={{color: colors.gray}}>Time</Text>
              </View>
              <View
                style={{
                  borderWidth: 0.5,
                  height: '100%',
                  borderColor: '#D8D8D8',
                }}
              />
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 20,
                }}>
                <Text style={{fontFamily: fonts.medium, fontSize: 16}}>
                  45 mil
                </Text>
                <View style={{marginTop: 10}} />
                <Text style={{color: colors.gray}}>Distance</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 20,
                marginHorizontal: 10,
                borderBottomWidth: 1,
                borderBottomColor: '#e6e6e6',
              }}>
              <Text>Date</Text>
              <Text>{new Date().toDateString()}</Text>
            </View>
            <View style={{borderBottomWidth: 1, borderBottomColor: '#e6e6e6'}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: 10,
                  marginHorizontal: 20,
                }}>
                <Text
                  style={{
                    fontFamily: fonts.medium,
                    fontSize: 14,
                    color: colors.gray,
                  }}>
                  Trip
                </Text>
                <Text style={{color: colors.gray}}>NGN500</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: 10,
                  marginHorizontal: 20,
                }}>
                <Text
                  style={{
                    fontFamily: fonts.medium,
                    fontSize: 14,
                    color: colors.gray,
                  }}>
                  +Tax
                </Text>
                <Text style={{color: colors.gray}}>NGN500</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: 10,
                  marginHorizontal: 20,
                }}>
                <Text
                  style={{
                    fontFamily: fonts.medium,
                    fontSize: 14,
                    color: colors.gray,
                  }}>
                  Discount
                </Text>
                <Text style={{color: colors.gray}}>NGN500</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 20,
                borderBottomWidth: 1,
                borderBottomColor: '#e6e6e6',
              }}>
              <Text style={{fontFamily: fonts.medium, fontSize: 18}}>
                Your Payment
              </Text>
              <Text style={{fontFamily: fonts.medium, fontSize: 18}}>
                NGN1500
              </Text>
            </View>
          </View>
          <View style={{padding: 10, marginVertical: 30, alignItems: 'center'}}>
            <Button
              onPress={() => this.props.refresh()}
              BtnText={'Close'}
              loading={this.state.isProcessing}
              style={{backgroundColor: colors.default, width: '80%'}}
              BtnTextStyles={{color: '#ffffff'}}
            />
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 30,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    // flex: 1
  },
  text_1: {
    color: '#02A05D',
    fontSize: 12,
  },
  date_txt: {
    fontSize: 12,
  },
  input: {
    fontFamily: fonts.default,
    marginLeft: 20,
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
    borderWidth: 0,
    borderRadius: 2,
    borderColor: '#ddd',
    fontFamily: fonts.default,
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 1.2,
    marginLeft: 0,
    marginRight: 0,
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
)(TripDetails);
