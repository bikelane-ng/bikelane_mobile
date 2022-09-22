import React from 'react';
import {View, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../../../actions';
import {Form, Item, Label, Input, Card, Icon, Thumbnail} from 'native-base';
import Text from '../../../config/AppText';
import {fonts, colors} from '../../../constants/DefaultProps';
import Button from '../../../components/Button';
import {SafeAreaView} from 'react-navigation';
import ImagePicker from 'react-native-image-crop-picker';

class AddPhoto extends React.Component {
  state = {
    isProcessing: false,
    image: '',
  };

  // UNSAFE_componentWillReceiveProps(prevProps) {
  //     if (prevProps.added && this.props.added !== prevProps.added) {
  //         this.props.navigation.navigate('BankDetails');
  //     }
  // }

  proceed = () => {
    // this.props.addPhoto({
    //     photo: this.state.image,
    // })
    this.props.navigation.navigate('BankDetails');
  };

  openGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    }).then(image => {
      let pathParts = image.path.split('/');
      this.props.addPhoto({
        avatar: `data:image/jpeg;base64,${image.data}`,
        avatarPrev: image.path,
      });
      // this.setState({ image: image.path })
      // console.log(image);
    });
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <Text
            style={{textAlign: 'center', fontFamily: fonts.bold, fontSize: 20}}>
            Add driver picture
          </Text>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View
              style={{
                width: 200,
                height: 200,
                borderRadius: 200 / 2,
                backgroundColor: '#707070',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: colors.white}}>Please add image</Text>
              {this.props.avatarPrev ? (
                <Thumbnail
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 100,
                    resizeMode: 'cover',
                    position: 'absolute',
                  }}
                  source={{uri: this.props.avatarPrev || ''}}
                />
              ) : null}
              <View style={{position: 'absolute', bottom: 0, left: 24}}>
                <TouchableWithoutFeedback onPress={() => this.openGallery()}>
                  <Card style={styles.cardShadow}>
                    <Icon
                      style={{textAlign: 'center', color: colors.white}}
                      name="ios-add"
                    />
                  </Card>
                </TouchableWithoutFeedback>
              </View>
            </View>
          </View>
        </View>
        <View style={{padding: 10, marginVertical: 10, alignItems: 'center'}}>
          <Button
            onPress={this.proceed}
            BtnText={'Continue'}
            loading={this.state.isProcessing}
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
    // justifyContent: 'center',
    padding: 30,
  },
  cardShadow: {
    width: 35,
    height: 35,
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: colors.default_text,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = state => ({
  added: state.driver.added,
  avatarPrev: state.driver.driverDetails.avatarPrev,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(actionCreators, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddPhoto);
