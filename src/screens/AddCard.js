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
  Switch,
  Toast,
} from 'native-base';
import Text from '../config/AppText';
import {colors, fonts} from '../constants/DefaultProps';
import Header from '../components/Header';
import Button from '../components/Button';
import SubHeader from '../components/SubHeader';
import RNPaystack from 'react-native-paystack';
import config from '../config';
import NavigationService from '../navigation/NavigationService';
RNPaystack.init({publicKey: config.paystack});

class AddCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saveCard: false,
      isProcessing: false,
    };
  }

  UNSAFE_componentWillReceiveProps(prevProps) {
    if (prevProps.home.tranx && prevProps.home.tranx != this.props.home.tranx) {
      NavigationService.goBack();
      this.props.socket.emit('Payment', {
        ride: this.props.home.rideDetails._id,
        amount: 500,
      });
    }
    if (
      prevProps.home.tranxErr &&
      prevProps.home.tranxErr != this.props.home.tranxErr
    ) {
      this.setState({isProcessing: false});
      alert(prevProps.home.tranxErr);
    }
  }

  async chargeCard() {
    const {transactionDetails} = this.props.home || {};
    this.setState({isProcessing: true});
    const {navigation} = this.props;
    let rideDetails = navigation.getParam('rideDetails', '');
    if (this.expDate == null) {
      this.setState({isProcessing: false});
      return;
    } else if (this.expDate.split('/').length != 2) {
      this.setState({isProcessing: false});
      return;
    }
    var e = {
      cardNumber: this.cardNumber,
      expiryMonth: this.expDate.split('/')[0],
      expiryYear: this.expDate.split('/')[1],
      cvc: this.cvv,
      accessCode: transactionDetails.accessCode,
      // email: 'obinna.okoroeugene@gmail.com',
      // amountInKobo: 500 * 100,
    };
    await RNPaystack.chargeCardWithAccessCode(e)
      .then(response => {
        // this.setState({ isProcessing: false })
        if (response && response.reference) {
          var req = {
            rideId: '5e2cc2f725aab20017589109',
            transactionReference: response.reference,
            saveCard: this.state.saveCard,
          };
          console.log(req);
          this.props.completeTransaction(req);
        }
        console.log(response); // card charged successfully, get reference here
      })
      .catch(error => {
        this.setState({isProcessing: false});
        alert(`${error.code} ${'\n'} ${error.message}`);
        // Toast.show({ text: `${error.code} ${'\n'} ${error.message}`, type: 'danger' });
      });
  }

  render() {
    return (
      <Container style={{backgroundColor: colors.bg}}>
        {/* <Header /> */}
        <Content>
          <SubHeader title={'Add Card'} back />
          <View style={styles.container}>
            {/* <Text style={{ fontFamily: fonts.bold, fontSize: 20, paddingVertical: 30, textAlign: 'center', }}>Enter your promo code here and claim offer</Text> */}
            <View style={{marginVertical: 10}}>
              <Text style={{paddingVertical: 8}}>Cardholder name</Text>
              <Item
                style={[
                  {backgroundColor: '#F7F7F7', height: 40},
                  styles.cardShadow,
                ]}
                rounded>
                <Input
                  onChangeText={e => (this.firstName = e)}
                  style={styles.input}
                />
              </Item>
            </View>
            <View style={{marginVertical: 10}}>
              <Text style={{paddingVertical: 8}}>Card number</Text>
              <Item
                style={[
                  {backgroundColor: '#F7F7F7', height: 40},
                  styles.cardShadow,
                ]}
                rounded>
                <Input
                  onChangeText={e => (this.cardNumber = e)}
                  style={styles.input}
                  keyboardType={'numeric'}
                  maxLength={16}
                />
              </Item>
            </View>

            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{marginVertical: 10, width: '47%'}}>
                <Text style={{paddingVertical: 8}}>CVV</Text>
                <Item
                  style={[
                    {backgroundColor: '#F7F7F7', height: 40},
                    styles.cardShadow,
                  ]}
                  rounded>
                  <Input
                    onChangeText={e => (this.cvv = e)}
                    style={styles.input}
                    keyboardType={'numeric'}
                    maxLength={3}
                  />
                </Item>
              </View>
              <View style={{marginVertical: 10, width: '47%'}}>
                <Text style={{paddingVertical: 8}}>Date</Text>
                <Item
                  style={[
                    {backgroundColor: '#F7F7F7', height: 40},
                    styles.cardShadow,
                  ]}
                  rounded>
                  <Input
                    onChangeText={e => (this.expDate = e)}
                    style={styles.input}
                    keyboardType={'phone-pad'}
                    maxLength={5}
                  />
                </Item>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 30,
              }}>
              <Text style={{fontFamily: fonts.medium, fontSize: 14}}>
                Save Card
              </Text>
              <Switch
                ios_backgroundColor={colors.gray}
                trackColor={colors.default_text}
                onValueChange={() =>
                  this.setState({saveCard: !this.state.saveCard})
                }
                value={this.state.saveCard}
              />
            </View>
          </View>
        </Content>
        <View style={{padding: 10, marginVertical: 30, alignItems: 'center'}}>
          <Button
            onPress={() => this.chargeCard()}
            // BtnText={"Add Card"}
            BtnText={'Make Payment'}
            loading={this.state.isProcessing}
            style={{backgroundColor: colors.default, width: '80%'}}
            BtnTextStyles={{color: '#ffffff'}}
          />
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
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
)(AddCard);
