import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
// import {RNCamera} from 'react-native-camera';

const CameraScreen = ({isCameraOpen, setIsCameraOpen}) => {
  const handleOpenCamera = () => {
    setIsCameraOpen(true);
  };

  return (
    <View style={{flex: 1}}>
      {isCameraOpen ? (
        <Text>Show Camera</Text>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity onPress={handleOpenCamera}>
            <Text style={{fontSize: 20, color: 'blue'}}>Open Camera</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default CameraScreen;
