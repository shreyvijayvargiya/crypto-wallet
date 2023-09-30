import React from 'react';
import {View} from 'react-native';
import {Avatar, Text} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';

const UserAvatar = ({initials}) => {
  const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const gradientColors = [generateRandomColor(), generateRandomColor()];


  return (
    <View style={{borderRadius: 50, overflow: 'hidden'}}>
      <LinearGradient colors={gradientColors} style={{padding: 8}}>
        <Avatar.Text
          size={14}
          label="P"
          labelStyle={{color: '#000'}}
          style={{backgroundColor: 'transparent'}}
        />
      </LinearGradient>
    </View>
  );
};

export default UserAvatar;

