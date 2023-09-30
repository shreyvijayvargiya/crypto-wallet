import React from 'react';
import {StyleSheet, View} from 'react-native';
import {NormalText} from '../../../modules/UI/CustomText';
import colors from '../../../utils/theme/colors';
import LinearGradient from 'react-native-linear-gradient';
import {Button} from 'react-native-paper';
import {WarningIcon} from '../../../modules/Icons';
import {VerticalDividerComponent} from '../../../modules';

const notes = [
  {
    id: 1,
    text: `Your 12-word secret phrase is the master key to your wallet. Anyone that has your secret phrase can access and take your crypto.`,
  },
  {
    id: 2,
    text: 'ChainGPT does not keep a copy of your secret phrase.',
  },
  {
    id: 3,
    text: `Write down your secret phrase, and store it in a secure offline location!`,
  },
];

const UserManualBackupNote = ({closeBottomSheet}) => {
  return (
    <View style={styles.root}>
      <WarningIcon style={{alignSelf: 'center'}} />
      <NormalText isCenter>
        Never share your secreat phrase with anyone
      </NormalText>
      <View style={{marginVertical: 10}}>
        {notes.map(item => (
          <View key={item.id} style={styles.notes}>
            <NormalText>{item.id}</NormalText>
            <VerticalDividerComponent />
            <NormalText>{item.text}</NormalText>
          </View>
        ))}
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
          mode="contained"
          textColor="white"
          buttonColor={colors.neutral[1000]}
          style={styles.backupCloudButton}
          labelStyle={styles.backupCloudButtonLabel}
          onPress={() => {
            closeBottomSheet();
          }}>
          Got it
        </Button>
      </LinearGradient>
    </View>
  );
};
export default UserManualBackupNote;

const styles = StyleSheet.create({
  root: {
    padding: 20,
  },
  img: {
    width: 50,
    height: 50,
    alignSelf: 'center',
    margin: 10,
  },
  buttonContainer: {
    marginVertical: 20,
    marginHorizontal: 40,
  },
  backupCloudButtonLabel: {
    textTransform: 'uppercase',
    backgroundColor: 'transparent',
    marginVertical: 10,
    padding: 1,
  },
  backupCloudButton: {
    fontSize: 18,
    borderRadius: 0,
  },
  backupManuallyButton: {
    width: '100%',
    borderWidth: 1,
    borderColor: colors.neutral[400],
    borderRadius: 2,
    marginVertical: 20,
  },
  backupManuallyButtonLabel: {
    textTransform: 'uppercase',
  },
  notes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    marginVertical: 10,
  },
});
