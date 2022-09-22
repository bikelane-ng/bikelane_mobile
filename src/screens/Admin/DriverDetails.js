import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../../actions';
import {
  Form,
  Item,
  Label,
  Input,
  List,
  ListItem,
  Icon,
  Thumbnail,
} from 'native-base';
import Text from '../../config/AppText';
import {fonts, colors} from '../../constants/DefaultProps';
import Button from '../../components/Button';
import {SafeAreaView} from 'react-navigation';
import OnBoarder from '../../imgs/OnBoarder.png';
import NavigationService from '../../navigation/NavigationService';
import Header from '../../components/Header';
import {Rating, AirbnbRating} from 'react-native-ratings';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Acceptance, RatingIcon, Cancellation, Thrash} from './assets';

class AllDrivers extends React.Component {
  state = {
    driver: {},
  };

  componentDidMount() {
    this.setState({
      driver: this.props.navigation.getParam('driver', ''),
    });
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: colors.bg}}>
        <Header wallet={false} admin />
        <View style={styles.container}>
          <View style={{backgroundColor: colors.white, padding: 30}}>
            <View style={{alignItems: 'center', marginTop: 10}}>
              <Thumbnail
                style={{width: 120, height: 120, borderRadius: 120 / 2}}
                source={{uri: this.state.driver.avatar}}
                // source={require('../../imgs/avatar.png')}
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 30,
              }}>
              <View style={{flexDirection: 'column'}}>
                <Text
                  style={[styles.main_txt, {fontSize: 16, marginTop: 4}]}>{`${
                  this.state.driver.firstName
                } ${this.state.driver.surname}`}</Text>
                <Text style={[styles.main_txt, {fontSize: 12, marginTop: 4}]}>
                  {this.state.driver.mobile}
                </Text>
                <Text style={[styles.main_txt, {fontSize: 12, marginTop: 4}]}>
                  {this.state.driver.driverInfo &&
                    this.state.driver.driverInfo.vehicleInfo.licensePlate}
                </Text>
              </View>
              <View style={{flexDirection: 'column'}}>
                <Text style={{color: colors.default, alignSelf: 'flex-end'}}>
                  $400
                </Text>
                <View
                  style={{
                    marginVertical: 7,
                    flexDirection: 'row',
                    paddingBottom: 5,
                  }}>
                  <Rating
                    type="star"
                    ratingCount={5}
                    startingValue={4}
                    ratingColor={'#E6750C'}
                    ratingTextColor={'#E6750C'}
                    ratingBackgroundColor={'#E6750C'}
                    imageSize={12}
                    showRating={false}
                    onFinishRating={this.ratingCompleted}
                  />
                </View>
              </View>
            </View>
          </View>

          <View
            style={{backgroundColor: colors.white, padding: 30, marginTop: 5}}>
            <View
              style={{
                marginTop: 10,
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <View style={{flexDirection: 'column', alignItems: 'center'}}>
                <Acceptance />
                <Text style={{paddingVertical: 5, fontFamily: fonts.medium}}>
                  95.0%
                </Text>
                <Text style={{color: colors.gray}}>Acceptance</Text>
              </View>
              <View style={{flexDirection: 'column', alignItems: 'center'}}>
                <RatingIcon />
                <Text style={{paddingVertical: 5, fontFamily: fonts.medium}}>
                  4.75
                </Text>
                <Text style={{color: colors.gray}}>Rating</Text>
              </View>
              <View style={{flexDirection: 'column', alignItems: 'center'}}>
                <Cancellation />
                <Text style={{paddingVertical: 5, fontFamily: fonts.medium}}>
                  2.0%
                </Text>
                <Text style={{color: colors.gray}}>Cancellation</Text>
              </View>
            </View>
          </View>

          <View
            style={{backgroundColor: colors.white, padding: 20, marginTop: 5}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text
                style={{
                  color: colors.gray,
                  fontFamily: fonts.medium,
                  fontSize: 16,
                }}>
                Trips Taken
              </Text>
              <Text
                style={{
                  color: colors.default_text,
                  fontFamily: fonts.medium,
                  fontSize: 16,
                }}>
                1,500
              </Text>
            </View>
          </View>

          <View
            style={{backgroundColor: colors.white, padding: 20, marginTop: 5}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text
                style={{
                  color: colors.gray,
                  fontFamily: fonts.medium,
                  fontSize: 16,
                }}>
                View Drivers Reviews
              </Text>
              <View
                style={{
                  marginVertical: 7,
                  flexDirection: 'row',
                  paddingBottom: 5,
                }}>
                <Rating
                  type="star"
                  ratingCount={5}
                  startingValue={4}
                  ratingColor={'#E6750C'}
                  ratingTextColor={'#E6750C'}
                  ratingBackgroundColor={'#E6750C'}
                  imageSize={12}
                  showRating={false}
                  onFinishRating={this.ratingCompleted}
                />
              </View>
            </View>
          </View>

          <View
            style={{
              backgroundColor: colors.white,
              padding: 20,
              marginTop: 5,
              paddingHorizontal: 100,
            }}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Thrash />
              <Text
                style={{
                  color: colors.gray,
                  fontFamily: fonts.medium,
                  fontSize: 16,
                  position: 'relative',
                  bottom: 2,
                  right: 20,
                }}>
                Delete Driver Account
              </Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // padding: 30,
  },
  main_txt: {
    color: colors.gray,
  },
  h1: {
    paddingVertical: 10,
    color: colors.default_text,
    fontFamily: fonts.medium,
    position: 'relative',
    bottom: 8,
    marginLeft: 5,
  },
  textInputContainer: {
    alignContent: 'center',
    marginVertical: 50,
  },
  input: {
    fontFamily: fonts.default,
    // color: '#222B2F',
    height: 45,
    fontSize: 13,
    paddingVertical: 4,
    marginLeft: 10,
  },
});

const mapStateToProps = state => ({
  drivers: state.admin.drivers,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(actionCreators, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AllDrivers);
