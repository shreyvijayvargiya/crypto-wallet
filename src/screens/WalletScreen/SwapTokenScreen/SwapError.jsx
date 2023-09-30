import React, {useState} from 'react';
import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import {NormalText, TitleText} from '../../../modules/UI/CustomText';
import BottomDrawer from '../../../modules/UI/BottomDrawer';
import {Button} from 'react-native-paper';
import colors from '../../../utils/theme/colors';
import {ErrorInfoIcon} from '../../../modules/Icons';

const SwapTokenError = ({error, closePreviewQuotation}) => {
  const bottomSheetRef = React.useRef();

  const [message, setMessage] = useState('');

  React.useEffect(() => {
    bottomSheetRef.current.open();
    const filterError = () => {
      const errorStr = error?.split(' ');
      if (errorStr.includes('Insufficient') || errorStr.includes('funds')) {
        setMessage('Infussificient funds');
      } else if (
        errorStr.includes('gasLimit') ||
        errorStr.includes('too low')
      ) {
        setMessage('Gas limit ');
      }
    };
    filterError();
  }, [error]);

  return (
    <BottomDrawer
      ref={bottomSheetRef}
      customHeight={Dimensions.get('screen').height * 0.5}
      borderColor>
      <ScrollView style={{paddingVertical: 20}}>
        <TitleText isCenter>Oops, transaction failed</TitleText>
        <NormalText
          isCenter
          style={{padding: 10, color: colors.red[400], margin: 20}}>
          {error.length > 20 ? error.substring(0, 60) : error}
        </NormalText>
        <View style={styles.header}>
          <ErrorInfoIcon />
        </View>
        <View style={styles.bottomButtonContainer}>
          <Button
            onPress={() => bottomSheetRef.current.close()}
            mode="text"
            labelStyle={styles.viewOnExplorerButton}
            buttonColor="white"
            style={styles.confirmButton}
            textColor="black">
            Try again
          </Button>
          <Button
            onPress={() => closePreviewQuotation()}
            buttonColor="transparent"
            labelStyle={styles.okButtonContainer}
            style={styles.okButton}
            textColor="white">
            Close
          </Button>
        </View>
      </ScrollView>
    </BottomDrawer>
  );
};

export default SwapTokenError;

const styles = StyleSheet.create({
  header: {
    padding: 10,
    alignContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewOnExplorerButton: {
    textAlign: 'center',
    padding: 4,
    marginHorizontal: 30,
    borderRadius: 4,
    textTransform: 'uppercase',
  },
  confirmButton: {
    marginHorizontal: 30,
    marginVertical: 10,
    backgroundColor: colors.neutral[100],
    borderColor: colors.neutral[400],
    borderWidth: 1,
    borderRadius: 4,
  },
  okButtonContainer: {
    textAlign: 'center',
    padding: 4,
    textTransform: 'uppercase',
  },
  okButton: {
    marginHorizontal: 30,
    borderRadius: 4,
    borderColor: colors.neutral[400],
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  bottomButtonContainer: {
    marginVertical: 40,
  },
});
