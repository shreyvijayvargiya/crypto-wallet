import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../../utils/theme/colors';
import {Button} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

const EmptyWalletComponent = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState({
    createWalletLoading: false,
    importWalletLoading: false,
  });
  return (
    <View style={styles.root}>
      <View style={styles.emptyWalletContainer}>
        <Image
          source={require('../../assets/vectors/cgpt_coin.png')}
          style={styles.centerVector}
        />
        <View style={styles.buttonContainer}>
          <LinearGradient
            colors={[
              '#509ADD',
              '#2EF2CD',
              '#27F3D1',
              '#F8CF3E',
              '#6C5AE6',
              '#509ADD',
            ]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.createWalletButtonContainer}>
            <Button
              mode="contained"
              textColor="white"
              buttonColor={colors.neutral[950]}
              style={styles.createWalletButtonContainer}
              labelStyle={styles.createWalletButton}
              onPress={() => navigation.navigate('CreatingWalletScreen')}
              loading={loading.createWalletLoading}>
              Get a new wallet
            </Button>
          </LinearGradient>
          <Button
            mode="outlined"
            textColor="white"
            buttonColor={colors.neutral[950]}
            onPress={() => navigation.navigate('CreatingWalletScreen')}
            labelStyle={styles.importWalletButton}
            style={styles.importWalletButtonContainer}>
            I already have one
          </Button>
        </View>
      </View>
      <View style={styles.bodyBackgroundContainer}>
        {[1, 2, 3].map(item => (
          <View style={styles.verticalLine} key={item} />
        ))}
      </View>
      <View style={styles.termsAndConditionsContainer}>
        <Text style={styles.termsAndConditionsText}>
          By proceeding, you agree to ChainGPT’s
        </Text>
        <TouchableOpacity onPress={() => console.log('pressed')}>
          <Text style={{color: colors.indigo[400], fontSize: 16}}>
            Terms of Use
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default EmptyWalletComponent;

const styles = StyleSheet.create({
  root: {
    color: 'white',
    paddingTop: 70,
    zIndex: 9,
    position: 'relative',
  },
  emptyWalletContainer: {
    position: 'absolute',
    zIndex: 20,
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    top: Dimensions.get('window').height * 0.3,
    bottom: Dimensions.get('window').height * 0.4,
    alignSelf: 'center',
  },
  bodyBackgroundContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  verticalLine: {
    height: Dimensions.get('window').height * 0.9,
    width: 1,
    backgroundColor: colors.neutral[800],
  },
  centerVector: {
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
  gradientBorder: {
    margin: 10,
  },
  buttonContainer: {
    padding: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 0,
  },
  walletsButtonContainer: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 40 : 10,
    right: 20,
    left: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  createWalletButtonContainer: {
    borderRadius: 4,
    borderWidth: 1,
    margin: 1,
  },
  importWalletButtonContainer: {
    margin: 10,
    borderRadius: 8,
    borderColor: colors.neutral[200],
  },
  createWalletButton: {
    fontSize: 18,
    textTransform: 'uppercase',
  },
  importWalletButton: {
    fontSize: 18,
    margin: 1,
    textTransform: 'uppercase',
  },
  termsAndConditionsContainer: {
    position: 'absolute',
    bottom: 140,
    width: Dimensions.get('window').width * 0.7,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  termsAndConditionsText: {
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 18,
    color: colors.neutral[200],
  },
});
