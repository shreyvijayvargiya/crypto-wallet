import React from 'react';
import {Alert, Image, StyleSheet, View} from 'react-native';
import {HeadingText, NormalText} from '../../../modules/UI/CustomText';
import colors from '../../../utils/theme/colors';
import LinearGradient from 'react-native-linear-gradient';
import {Button} from 'react-native-paper';

const UserICloudNote = ({closeBottomSheet}) => {
  return (
    <View style={styles.root}>
      <Image
        source={require('../../../assets/icons/search-cgpt-icon.png')}
        style={styles.img}
      />
      <HeadingText isCenter>Important</HeadingText>
      <NormalText isCenter style={{marginVertical: 20}}>
        Do not forget this password! It isseparate from your Apple iCloud
        password, and you should save it in secure location. You will need it to
        restore
      </NormalText>
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
            Alert.alert('Your wallet has been backup up successfully!!');
          }}>
          Got it
        </Button>
      </LinearGradient>
    </View>
  );
};
export default UserICloudNote;

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
});
