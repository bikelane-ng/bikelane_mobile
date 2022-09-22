import React from 'react';
import {View, StyleSheet} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../../actions';
import {Form, Item, Label, Input} from 'native-base';
import Text from '../../config/AppText';
import {fonts, colors} from '../../constants/DefaultProps';
import Button from '../../components/Button';
import {SafeAreaView, ScrollView} from 'react-navigation';
import NavigationService from '../../navigation/NavigationService';

class OTP extends React.Component {
  state = {
    isProcessing: false,
  };

  UNSAFE_componentWillReceiveProps(prevProps) {
    if (prevProps.validate && this.props.validate !== prevProps.validate) {
      // this.props.navigation.dispatch(NavigationService.resetAction('VerifyOTP'))
      this.props.navigation.navigate('VerifyOTP');
      this.setState({isProcessing: false});
    }
  }

  validateMobile = () => {
    this.setState({isProcessing: true});
    this.props.validateMobile();
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text
            style={{textAlign: 'center', fontFamily: fonts.bold, fontSize: 20}}>
            Enter your phone number we will send you an OTP to verify your
            account
          </Text>

          <Form style={{marginTop: 50, marginHorizontal: 50}}>
            <Item>
              {/* <Label style={{ fontFamily: fonts.default }}>Phone</Label> */}
              <View style={{flexDirection: 'row'}}>
                <View style={{justifyContent: 'center'}}>
                  <Text style={{fontSize: 16, fontFamily: fonts.medium}}>
                    +234
                  </Text>
                </View>
                <View
                  style={{
                    height: 30,
                    width: 0.4,
                    backgroundColor: colors.btnColor,
                    marginHorizontal: 10,
                  }}
                />
              </View>
              <Input
                onChangeText={mobile => this.props.inputNumber(mobile)}
                keyboardType={'number-pad'}
                maxLength={13}
                style={{fontFamily: fonts.default, fontSize: 16}}
              />
            </Item>
          </Form>
        </ScrollView>
        <View style={{padding: 10, marginVertical: 10, alignItems: 'center'}}>
          <Button
            onPress={this.validateMobile}
            BtnText={'Continue'}
            loading={this.state.isProcessing}
            style={{backgroundColor: colors.black, width: '40%'}}
            BtnTextStyles={{color: '#ffffff'}}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 30,
  },
});

const mapStateToProps = state => ({
  validate: state.app.validate,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(actionCreators, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OTP);
