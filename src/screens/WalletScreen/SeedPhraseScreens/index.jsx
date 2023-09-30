import React, {useState} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import BottomDrawer from '../../../modules/UI/BottomDrawer';
import {NormalText, TitleText} from '../../../modules/UI/CustomText';
import {Button} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import BackupToICloudComponent from './BackupToICloud';
import BackupManuallyComponent from './BackupManually';
import colors from '../../../utils/theme/colors';
import UserICloudNote from './UserICloudNote';
import UserManualBackupNote from './UserManualNote';
import {walletBackupIcon} from '../../../assets/vectors/walletBackupXml.js';
import {SvgXml, Svg} from 'react-native-svg';
import BackupIcon from '../../../assets/backupIcon.svg';

const SeedPhraseScreens = ({showSeedPhraseScreens}) => {
  const backupBottomDrawerRef = React.useRef();

  const [state, setState] = useState(0);
  const [customHeight, setCustomHeight] = useState(450);


  React.useEffect(() => {
    if (showSeedPhraseScreens === undefined || !showSeedPhraseScreens) {
      return;
    } else {
      backupBottomDrawerRef?.current.open();
    }
  }, [customHeight, showSeedPhraseScreens]);

  return (
    <View style={styles.root}>
      <BottomDrawer customHeight={customHeight} ref={backupBottomDrawerRef}>
        {state === 0 && (
          <View style={styles.root}>
            <SvgXml
              style={styles.img}
              xml={walletBackupIcon}
              width={50}
              height={50}
            />
            <TitleText style={{fontSize: 34}} isCenter>
              Back up your wallet
            </TitleText>
            <NormalText
              isCenter
              style={{
                marginVertical: 10,
                width: Dimensions.get('screen').width * 0.6,
                alignSelf: 'center',
              }}>
              {`Don’t lose your wallet! Save an encrypted copy to iCloud`}
            </NormalText>
            <View style={styles.buttonContainer}>
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
                    console.log('called');
                    setCustomHeight(Dimensions.get('screen').height * 0.92);
                    setState(1);
                  }}>
                  back up to icloud
                </Button>
              </LinearGradient>
              <Button
                onPress={() => {
                  console.log('called');
                  setCustomHeight(Dimensions.get('screen').height * 0.92);
                  setState(2);
                }}
                mode="text"
                textColor="white"
                buttonColor={colors.neutral[1000]}
                style={styles.backupManuallyButton}
                labelStyle={styles.backupManuallyButtonLabel}>
                Back up Manually
              </Button>
            </View>
          </View>
        )}
        {state === 1 && (
          <BackupToICloudComponent
            seedPhrase={showSeedPhraseScreens?.seedPhrase}
            setState={setState}
            setCustomHeight={setCustomHeight}
          />
        )}
        {state === 2 && (
          <BackupManuallyComponent
            setState={setState}
            setCustomHeight={setCustomHeight}
            seedPhrase={showSeedPhraseScreens?.seedPhrase}
          />
        )}
        {state === 3 && (
          <UserICloudNote
            closeBottomSheet={() => backupBottomDrawerRef.current.close()}
          />
        )}
        {state === 4 && (
          <UserManualBackupNote
            closeBottomSheet={() => backupBottomDrawerRef.current.close()}
          />
        )}
      </BottomDrawer>
    </View>
  );
};
export default SeedPhraseScreens;

const styles = StyleSheet.create({
  root: {
    padding: 0,
  },
  img: {
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
    color: 'white',
    fontSize: 18,
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
    fontSize: 18,
    color: 'white',
  },
});
