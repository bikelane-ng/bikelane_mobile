import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../../../actions';
import {
  Icon,
  Container,
  Image,
  Thumbnail,
  Accordion,
  Content,
} from 'native-base';
import Text from '../../../config/AppText';
import {colors, fonts} from '../../../constants/DefaultProps';
import Button from '../../../components/Button';
import {SafeAreaView} from 'react-navigation';
import ImagePicker from 'react-native-image-crop-picker';
import {CheckCircle} from '../../assets/Components';
import NavigationService from '../../../navigation/NavigationService';

class PersonalDocs extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    isProccessing: false,
    validationErr: false,
    key: '',
    driversLicense: false,
    birthCertificate: false,
    votersIdentification: false,
    nationalIdentification: false,
  };

  UNSAFE_componentWillReceiveProps(prevProps) {
    if (prevProps.error && this.props.error !== prevProps.error) {
      alert(prevProps.error);
      this.setState({isProccessing: false});
    }
    if (prevProps.success && this.props.success !== prevProps.success) {
      alert('Driver has been created successfully');
      this.setState({isProccessing: false});
      this.props.navigation.dispatch(NavigationService.resetAction('Admin'));
    }
  }

  openGallery = key => {
    this.setState({[key]: false});
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    }).then(image => {
      this.setState({[key]: true});
      this.props.addPhoto({
        [key]: `data:image/jpeg;base64,${image.data}`,
      });
      // this.setState({ image: image.path })
      // console.log(image);
    });
  };

  doRegister = () => {
    this.setState({isProccessing: true});
    const {driver} = this.props;
    this.props.driverReg({
      firstName: driver.firstName,
      surname: driver.surname,
      email: driver.email,
      mobile: driver.mobile,
      driverInfo: {
        houseAddress: driver.houseAddress,
        vehicleInfo: {
          licensePlate: driver.licensePlate,
          model: driver.model,
          brand: driver.brand,
        },
        bankDetails: {
          accountName: driver.accountName,
          accountNumber: driver.accountNumber,
          bank: driver.bank,
        },
      },
      password: driver.password,
      avatar: driver.avatar,
      driversLicense: driver.driversLicense,
      birthCertificate: driver.birthCertificate,
      votersIdentification: driver.votersIdentification,
      nationalIdentification: driver.nationalIdentification,
    });
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: colors.bg}}>
        <View style={styles.container}>
          <View style={{paddingHorizontal: 30, paddingTop: 30}}>
            <Text
              style={{
                fontFamily: fonts.bold,
                fontSize: 20,
                paddingVertical: 30,
              }}>
              Personal Documents
            </Text>
          </View>
          <View>
            <View
              activeOpacity={0.7}
              style={{backgroundColor: '#ffffff', marginBottom: 5}}>
              <View
                style={{
                  padding: 25,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View>
                  <Text
                    style={{
                      fontFamily: fonts.medium,
                      fontSize: 16,
                      color: colors.gray,
                    }}>
                    Driver's License
                  </Text>
                  <Text
                    style={{fontSize: 10, marginTop: 3, color: colors.gray}}>
                    Please upload a scanned copy of your Driver's license
                  </Text>
                </View>
                <View style={{justifyContent: 'center'}}>
                  {!this.props.driver.driversLicense ? (
                    <TouchableOpacity
                      onPress={() => this.openGallery('driversLicense')}
                      activeOpacity={0.7}>
                      <Text style={{color: colors.default, fontSize: 12}}>
                        Upload
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <CheckCircle />
                  )}
                </View>
              </View>
            </View>
            <View
              activeOpacity={0.7}
              style={{backgroundColor: '#ffffff', marginBottom: 5}}>
              <View
                style={{
                  padding: 25,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View>
                  <Text
                    style={{
                      fontFamily: fonts.medium,
                      fontSize: 16,
                      color: colors.gray,
                    }}>
                    Birth Certificate
                  </Text>
                  <Text
                    style={{fontSize: 10, marginTop: 3, color: colors.gray}}>
                    Please upload a scanned copy of your Birth Certificate
                  </Text>
                </View>
                <View style={{justifyContent: 'center'}}>
                  {!this.props.driver.birthCertificate ? (
                    <TouchableOpacity
                      onPress={() => this.openGallery('birthCertificate')}
                      activeOpacity={0.7}>
                      <Text style={{color: colors.default, fontSize: 12}}>
                        Upload
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <CheckCircle />
                  )}
                </View>
              </View>
            </View>
            <View style={{padding: 20, alignItems: 'center'}}>
              <Text style={{color: colors.danger}}>
                Please upload ANY of the documents below
              </Text>
            </View>
            <View
              activeOpacity={0.7}
              style={{backgroundColor: '#ffffff', marginBottom: 5}}>
              <View
                style={{
                  padding: 25,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View>
                  <Text
                    style={{
                      fontFamily: fonts.medium,
                      fontSize: 16,
                      color: colors.gray,
                    }}>
                    Voter's Card
                  </Text>
                  <Text
                    style={{fontSize: 10, marginTop: 3, color: colors.gray}}>
                    Please upload a scanned copy of your Voter's Card
                  </Text>
                </View>
                <View style={{justifyContent: 'center'}}>
                  {!this.props.driver.votersIdentification ? (
                    <TouchableOpacity
                      onPress={() => this.openGallery('votersIdentification')}
                      activeOpacity={0.7}>
                      <Text style={{color: colors.default, fontSize: 12}}>
                        Upload
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <CheckCircle />
                  )}
                </View>
              </View>
            </View>
            <View
              activeOpacity={0.7}
              style={{backgroundColor: '#ffffff', marginBottom: 5}}>
              <View
                style={{
                  padding: 25,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View>
                  <Text
                    style={{
                      fontFamily: fonts.medium,
                      fontSize: 16,
                      color: colors.gray,
                    }}>
                    National ID card
                  </Text>
                  <Text
                    style={{fontSize: 10, marginTop: 3, color: colors.gray}}>
                    Please upload a scanned copy of your National ID card
                  </Text>
                </View>
                <View style={{justifyContent: 'center'}}>
                  {!this.props.driver.nationalIdentification ? (
                    <TouchableOpacity
                      onPress={() => this.openGallery('nationalIdentification')}
                      activeOpacity={0.7}>
                      <Text style={{color: colors.default, fontSize: 12}}>
                        Upload
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <CheckCircle />
                  )}
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={{padding: 10, marginVertical: 10, alignItems: 'center'}}>
          <Button
            onPress={this.doRegister}
            BtnText={'Continue'}
            loading={this.state.isProccessing}
            style={{backgroundColor: colors.default, width: '80%'}}
            BtnTextStyles={{color: '#ffffff'}}
          />
        </View>
      </SafeAreaView>
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
});

const mapStateToProps = state => ({
  driver: state.driver.driverDetails,
  mobile: state.app.mobile,
  error: state.admin.error,
  success: state.admin.success,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(actionCreators, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PersonalDocs);
