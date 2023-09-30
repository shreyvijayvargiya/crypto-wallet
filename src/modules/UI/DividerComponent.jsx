import React from 'react';
import colors from '../../utils/theme/colors';
import {View} from 'react-native';

export const HorizontalDividerComponent = ({style}) => {
  return (
    <View
      style={{
        width: '100%',
        height: 1,
        backgroundColor: colors.neutral[800],
        marginVertical: 10,
        ...style,
      }}
    />
  );
};

export const VerticalDividerComponent = ({style}) => {
  return (
    <View
      style={{
        width: 1,
        height: '100%',
        backgroundColor: colors.neutral[800],
        marginHorizontal: 10,
        ...style,
      }}
    />
  );
};
