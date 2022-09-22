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
  Spinner,
} from 'native-base';
import Text from '../../config/AppText';
import {fonts, colors} from '../../constants/DefaultProps';
import Button from '../../components/Button';
import {SafeAreaView, ScrollView} from 'react-navigation';
import OnBoarder from '../../imgs/OnBoarder.png';
import NavigationService from '../../navigation/NavigationService';
import Header from '../../components/Header';
import {Rating, AirbnbRating} from 'react-native-ratings';
import {TouchableOpacity} from 'react-native-gesture-handler';

class AllDrivers extends React.Component {
  state = {
    otp: '',
    loading: true,
  };

  componentDidMount() {
    this.props.allDrivers();
  }

  UNSAFE_componentWillReceiveProps(prevProps) {
    if (prevProps.drivers && prevProps.drivers !== this.props.drivers) {
      this.setState({loading: false});
    }
  }

  driversView = drivers => {
    return drivers.map((items, i) => (
      <ListItem
        key={i}
        onPress={() =>
          this.props.navigation.navigate('AdminDriverDetail', {driver: items})
        }
        style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{flexDirection: 'column'}}>
          <Text style={[styles.main_txt, {fontSize: 16, marginTop: 4}]}>{`${
            items.firstName
          } ${items.surname}`}</Text>
          <Text style={[styles.main_txt, {fontSize: 12, marginTop: 4}]}>
            {items.mobile}
          </Text>
          <Text style={[styles.main_txt, {fontSize: 12, marginTop: 4}]}>
            {items.driverInfo.vehicleInfo.licensePlate}
          </Text>
        </View>
        <View style={{flexDirection: 'column'}}>
          <Text style={{color: colors.default}}>$400</Text>
          <View
            style={{marginVertical: 7, flexDirection: 'row', paddingBottom: 5}}>
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
      </ListItem>
    ));
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: colors.bg}}>
        <Header hamburger={true} role={'ADMIN'} wallet={false} />
        <ScrollView contentContainerStyle={styles.container}>
          <List style={{backgroundColor: colors.white}}>
            <ListItem
              style={{flexDirection: 'column', alignItems: 'flex-start'}}
              itemDivider>
              <View style={{flexDirection: 'row', marginTop: 10}}>
                <Icon
                  name="add"
                  style={{fontSize: 20, color: colors.default_text}}
                />
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() =>
                    this.props.navigation.navigate('DriverDetails')
                  }>
                  <Text style={styles.h1}>Add Drivers</Text>
                </TouchableOpacity>
              </View>
              <Text
                style={{
                  fontFamily: fonts.medium,
                  fontSize: 18,
                  paddingVertical: 10,
                }}>
                Drivers
              </Text>
            </ListItem>
            {this.state.loading ? (
              <Spinner />
            ) : (
              this.driversView(
                (this.props.drivers && this.props.drivers.items) || [],
              )
            )}
          </List>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
    bottom: 10,
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
