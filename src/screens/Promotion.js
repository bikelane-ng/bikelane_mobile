import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Icon, Container, Image, Thumbnail, Item, Input} from 'native-base';
import Text from '../config/AppText';
import {colors, fonts} from '../constants/DefaultProps';
import Header from '../components/Header';
import Button from '../components/Button';

class Promotion extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container style={{backgroundColor: colors.bg}}>
        <Header title={'My Trips'} />
        <View style={styles.container}>
          <Text
            style={{
              fontFamily: fonts.bold,
              fontSize: 20,
              paddingVertical: 30,
              textAlign: 'center',
            }}>
            Enter your promo code here and claim offer
          </Text>
          <View style={{marginVertical: 10}}>
            <Text style={{paddingVertical: 8}}>Promo code</Text>
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
        </View>
        <View style={{padding: 10, marginVertical: 30, alignItems: 'center'}}>
          <Button
            BtnText={'Claim Promo'}
            style={{backgroundColor: colors.black, width: '80%'}}
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

export default Promotion;
