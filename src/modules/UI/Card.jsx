import React from 'react';
import {View} from 'react-native';

export const CardLayout = ({children, style}) => {
  return <View style={{marginVertical: 10, ...style}}>{children}</View>;
};
export default CardLayout;
