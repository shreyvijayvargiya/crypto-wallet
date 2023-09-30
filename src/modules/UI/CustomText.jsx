import React from 'react';
import {Text} from 'react-native';
import colors from '../../utils/theme/colors';

export const HeadingText = ({children, isCenter, style}) => (
  <Text
    style={{
      color: 'white',
      fontSize: 24,
      fontWeight: '700',
      textAlign: isCenter ? 'center' : 'left',
      ...style,
    }}>
    {children}
  </Text>
);

export const TitleText = ({children, isCenter, style}) => (
  <Text
    style={{
      color: 'white',
      fontSize: 20,
      textAlign: isCenter ? 'center' : 'left',
      ...style,
    }}>
    {children}
  </Text>
);

export const CustomText = ({children, style}) => (
  <Text style={{color: 'white', color: colors.neutral[400], ...style}}>
    {children}
  </Text>
);

export const HeadText = ({children, isCenter, style}) => (
  <Text
    style={{
      color: 'white',
      fontSize: 18,
      textAlign: isCenter ? 'center' : 'left',
      ...style,
    }}>
    {children}
  </Text>
);
export const NormalText = ({children, style, isCenter}) => (
  <Text
    style={{
      color: 'white',
      color: colors.neutral[100],
      ...style,
      fontSize: 16,
      textAlign: isCenter ? 'center' : 'left',
    }}>
    {children}
  </Text>
);
