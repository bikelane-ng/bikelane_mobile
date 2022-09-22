import React from 'react';
import {StyleSheet} from 'react-native';
import {Button, Spinner} from 'native-base';
import Text from '../config/AppText';
import {fonts, colors} from '../constants/DefaultProps';

const PjButton = ({
  BtnType,
  BtnColor,
  BtnText,
  onPress,
  BtnTextStyles,
  style,
  loading,
}) => {
  const mainStyles = [
    {
      width: BtnType === 'small' ? 103 : '100%',
      height: BtnType === 'small' ? 36 : 42,
      backgroundColor: colors.default,
      borderRadius: 30,
      justifyContent: 'center',
    },
  ];

  if (style) {
    if (Array.isArray(style)) {
      mainStyles = mainStyles.concat(style);
    } else {
      mainStyles.push(style);
    }
  }

  return (
    <Button
      disabled={loading ? true : false}
      activeOpacity={0.7}
      style={mainStyles}
      onPress={onPress}>
      {BtnText && !loading ? (
        <Text style={(styles.ButtonText, BtnTextStyles)}>{BtnText}</Text>
      ) : null}
      {loading ? <Spinner color={colors.info} size="large" /> : null}
    </Button>
  );
};

const styles = StyleSheet.create({
  ButtonText: {
    flex: 1,
    width: 154,
    height: 22,
    fontFamily: fonts.medium,
    fontSize: 12,
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export default PjButton;
