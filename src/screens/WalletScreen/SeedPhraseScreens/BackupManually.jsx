import React, {useState} from 'react';
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import {HeadingText, NormalText} from '../../../modules/UI/CustomText';
import {Button} from 'react-native-paper';
import colors from '../../../utils/theme/colors';
import SeedPhraseTable from './SeedPhraseTable';
import LinearGradient from 'react-native-linear-gradient';

const BackupManuallyComponent = ({seedPhrase, setState, setCustomHeight}) => {
  const [show, setShow] = useState(false);
  return (
    <View style={styles.root}>
      <View>
        <HeadingText isCenter>Your secret phrase</HeadingText>
        <NormalText isCenter>
          These words are the keys to your wallet! Write them down or save them
          in your password manager.
        </NormalText>
      </View>
      <View>
        <TouchableOpacity
          mode="text"
          TouchableOpacityColor="transparent"
          textColor="white"
          backgroundColor={colors.neutral[1000]}
          onPress={() => {
            setShow(!show);
          }}
          labelStyle={styles.secondaryButtonLabelStyle}
          style={styles.secondayButtonStyle}>
          <NormalText isCenter>
            {show ? 'Hide' : 'Show'} secret phrase
          </NormalText>
        </TouchableOpacity>
        <SeedPhraseTable seedPhrase={seedPhrase} show={show} />
        <NormalText isCenter>
          Never share your secret phrase with anyone
        </NormalText>
      </View>
      <View style={{marginVertical: 40}}>
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
              setCustomHeight(Dimensions.get('screen').height * 0.5);
              setState(4);
            }}>
            I've saved these words
          </Button>
        </LinearGradient>
      </View>
    </View>
  );
};
export default BackupManuallyComponent;

const styles = StyleSheet.create({
  root: {
    padding: 30,
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    alignContent: 'center',
  },
  secondayButtonStyle: {
    marginVertical: 20,
    width: '80%',
    alignSelf: 'center',
  },
  secondaryButtonLabelStyle: {
    textTransform: 'uppercase',
    backgroundColor: 'transparent',
  },
  backupCloudButtonLabel: {
    textTransform: 'uppercase',
    backgroundColor: 'transparent',
    marginVertical: 10,
    padding: 1,
    borderRadius: 4,
  },
  backupCloudButton: {
    fontSize: 18,
    borderRadius: 0,
  },
});
