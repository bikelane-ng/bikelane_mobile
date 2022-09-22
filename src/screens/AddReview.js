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
import {colors, fonts} from '../constants/DefaultProps';
import Header from '../components/Header';
import Button from '../components/Button';
import SubHeader from '../components/SubHeader';
import {Rating, AirbnbRating} from 'react-native-ratings';
import NavigationService from '../navigation/NavigationService';

class AddReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 5,
      rideDetails: undefined,
    };
  }

  componentDidMount() {
    this.setState({rideDetails: this.props.home.rideDetails});
  }

  UNSAFE_componentWillReceiveProps(prevProps) {
    if (
      prevProps.home.refreshed &&
      prevProps.home.refreshed != this.props.home.refreshed
    ) {
      this.props.getCurrentLocation();
      this.props.navigation.dispatch(NavigationService.resetAction('RiderMap'));
    }
  }

  send = () => {
    this.props.addReview();
  };

  render() {
    const {rideDetails} = this.state;
    const ride = (rideDetails && rideDetails.driver) || {};
    return (
      <Container style={{backgroundColor: colors.bg}}>
        {/* <Header /> */}
        <Content style={{marginTop: 30}}>
          <SubHeader title="Leave a review" />
          <View style={styles.container}>
            <View style={{alignItems: 'center'}}>
              <Thumbnail
                style={{width: 120, height: 120, borderRadius: 120 / 2}}
                source={
                  ride.avatar
                    ? {uri: ride.avatar}
                    : require('../imgs/avatar.png')
                }
              />
              <View style={{alignItems: 'center', marginTop: 10}}>
                <Text style={{fontFamily: fonts.medium}}>{`${ride.firstName} ${
                  ride.surname
                }`}</Text>
                <Text style={{color: colors.gray}}>
                  {ride.driverInfo && ride.driverInfo.vehicleInfo.licensePlate}
                </Text>
              </View>
              <View style={{paddingVertical: 20}}>
                <AirbnbRating
                  count={5}
                  starStyle={{marginTop: 5}}
                  reviews={['Terrible', 'Bad', 'Okay', 'Good', 'Excellent']}
                  reviewSize={15}
                  defaultRating={5}
                  onFinishRating={e => this.setState({rating: e})}
                  showRating={true}
                  size={20}
                />
                {/* <Rating
                                    type='custom'
                                    ratingColor={colors.default_text}
                                    ratingBackgroundColor={'#ffffff'}
                                    ratingCount={5}
                                    startingValue={5}
                                    imageSize={25}
                                    onFinishRating={this.ratingCompleted}
                                    style={{ paddingVertical: 10, }}
                                /> */}
              </View>
            </View>
            <View style={{alignContent: 'center', paddingHorizontal: 20}}>
              <Textarea
                style={styles.inputShadow}
                rowSpan={6}
                placeholder={'Tell us about the ride?'}
              />
              <View style={{marginVertical: 30, alignItems: 'center'}}>
                <Button
                  onPress={this.send}
                  BtnText={'Send'}
                  style={{backgroundColor: colors.default, width: '100%'}}
                  BtnTextStyles={{color: '#ffffff'}}
                />
              </View>
            </View>
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
)(AddReview);
