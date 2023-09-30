/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  Alert,
  Text,
  Dimensions,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import {
  CustomText,
  HeadingText,
  NormalText,
} from '../../../modules/UI/CustomText';
import {Button} from 'react-native-paper';
import colors from '../../../utils/theme/colors';
import LinearGradient from 'react-native-linear-gradient';
import {storeSeedPhrase} from '../../../packages/apis/web3';
import {EyeIcon, InfoIcon, ConfirmBackupIcon} from '../../../modules/Icons';

const BackupToICloudComponent = ({seedPhrase, setState, setCustomHeight}) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(true);

  const confirmBackup = () => {
    if (password !== confirmPassword) {
      Alert.alert('Password and confirm password should be same');
    } else if (!password || !confirmPassword) {
      Alert.alert('Please add password and confirm password');
    } else if (password.length <= 8) {
      Alert.alert('Minimum 8 characters required');
    } else {
      storeSeedPhrase(password, seedPhrase);
      setCustomHeight(Dimensions.get('screen').height * 0.5);
      setState(3);
    }
  };

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <HeadingText isCenter>Choose a password</HeadingText>
        <Text
          isCenter
          style={{
            width: Dimensions.get('screen').width * 0.6,
            color: colors.normalTextColor,
            textAlign: 'center',
          }}>
          {"Please use password you’ll remember, It can't be recovered!"}
        </Text>
      </View>
      <View
        style={{
          marginVertical: 20,
        }}>
        <NormalText>Backup password</NormalText>
        <View style={styles.flexContainer}>
          <TextInput
            placeholder="Enter password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={showPassword}
            placeholderTextColor={colors.neutral[400]}
            style={{
              color: 'white',
              width: '90%',
              backgroundColor: colors.neutral[950],
            }}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <EyeIcon />
          </TouchableOpacity>
        </View>
        <NormalText>Confirm password</NormalText>
        <View style={styles.flexContainer}>
          <TextInput
            placeholder="Confirm Password"
            value={confirmPassword}
            keyboardType="default"
            placeholderTextColor={colors.neutral[400]}
            onChangeText={setConfirmPassword}
            secureTextEntry={showConfirmPassword}
            style={{
              width: '90%',
              color: 'white',
              backgroundColor: colors.neutral[950],
            }}
          />
          <TouchableOpacity
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
            <EyeIcon />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: colors.neutral[700],
            borderRadius: 4,
            width: 200,
          }}>
          <InfoIcon color={'white'} size={18} />
          <CustomText style={{color: 'white'}}>8 minimum characters</CustomText>
        </View>
      </View>
      <LinearGradient
        colors={[
          '#27F3D1',
          '#F8CF3E',
          '#509ADD',
          '#2EF2CD',
          '#6C5AE6',
          '#509ADD',
        ]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.backupCloudButtonLabel}>
        <Button
          mode="text"
          buttonColor="transparent"
          textColor="white"
          onPress={confirmBackup}
          labelStyle={styles.labelStyle}
          backgroundColor={colors.neutral[1000]}
          style={styles.confirmButton}>
          <ConfirmBackupIcon />
          Confirm Backup
        </Button>
      </LinearGradient>
    </View>
  );
};
export default BackupToICloudComponent;

const styles = StyleSheet.create({
  root: {
    padding: 10,
  },
  header: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.neutral[950],
    marginVertical: 14,
    padding: 10,
  },
  backupManuallyButton: {
    width: '100%',
    borderWidth: 1,
    borderColor: colors.neutral[400],
    borderRadius: 2,
    marginVertical: 80,
  },
  backupManuallyButtonLabel: {
    textTransform: 'uppercase',
  },
  confirmButton: {
    backgroundColor: colors.neutral[1000],
    borderRadius: 4,
  },
  backupCloudButtonLabel: {
    textTransform: 'uppercase',
    backgroundColor: 'transparent',
    marginVertical: 10,
    borderRadius: 4,
    padding: 1,
  },
  labelStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    textTransform: 'uppercase',
    fontSize: 18,
    padding: 6,
  },
});
