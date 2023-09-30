/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {View} from 'react-native';
import colors from '../../../utils/theme/colors';
import {HeadText, NormalText} from '../../../modules/UI/CustomText';
import BottomDrawer from '../../../modules/UI/BottomDrawer';
import TokensList from '../../../modules/UI/TokensList';
import {useSelector} from 'react-redux';
import {ArrowRightIcon} from '../../../modules/Icons';
import {Button, TextInput} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import BuyTokenQuote from './BuyTokenQuote';
import {getNetworkDefaultTokens} from '../../../packages/hooks';
import withWalletConnectProvider from '../WalletScreensRootProvider';

const BuyTokenScreen = ({route}) => {
  const {customToken} = route?.params ? route.params : {customToken: null};
  const tokensListBottomSheetRef = React.useRef();
  const buyTokenQuoteBottomSheetRef = React.useRef();
  const appStore = useSelector(state => state.reducer);
  const TOKENS = getNetworkDefaultTokens(appStore.activeNetwork);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const [activeToken, setActiveToken] = useState(
    customToken ? customToken : TOKENS[0],
  );

  const getTokenQuotes = async () => {
    buyTokenQuoteBottomSheetRef.current.open();
  };

  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <View>
          <HeadText isCenter>Buy</HeadText>
        </View>
        <View style={{marginVertical: 40}}>
          <View style={{marginVertical: 10}}>
            <NormalText style={{marginHorizontal: 10}}>
              You want to buy
            </NormalText>
            <TouchableOpacity
              style={styles.tokenDetailContainer}
              onPress={() => tokensListBottomSheetRef.current.open()}>
              <View style={styles.tokenDetails}>
                <Image
                  source={{
                    uri: `https://s2.coinmarketcap.com/static/img/coins/64x64/${activeToken?.id}.png`,
                  }}
                  style={styles.image}
                  width={40}
                  height={40}
                />
                <View style={{marginRight: 20}}>
                  <Text style={styles.symbol}>{activeToken?.symbol}</Text>
                  <Text style={styles.name}>{activeToken?.name}</Text>
                </View>
              </View>
              <View
                style={{
                  padding: 8,
                  borderWidth: 1,
                  borderColor: colors.neutral[700],
                }}>
                <ArrowRightIcon />
              </View>
            </TouchableOpacity>
          </View>
          <View style={{marginVertical: 10}}>
            <NormalText style={{marginHorizontal: 10}}>Amount</NormalText>
            <View style={styles.flexContainer}>
              <TextInput
                placeholder="Enter the amount"
                onChangeText={value => {
                  setAmount(Number(value));
                }}
                mode="text"
                value={amount.toString()}
                keyboardType="number-pad"
                error={error}
                activeUnderlineColor={colors.neutral[950]}
                underlineColor={colors.neutral[950]}
                placeholderTextColor={colors.neutral[400]}
                style={[styles.numberInput, error && styles.errorInputStyle]}
              />
              <NormalText>USD</NormalText>
            </View>
          </View>
          <View>
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
              style={[styles.confirmButtonStyle, {margin: 10}]}>
              <Button
                labelStyle={styles.reviewButtonLabelStyle}
                buttonColor={colors.neutral[950]}
                style={styles.reviewButtonContainer}
                mode="text"
                textColor="white"
                loading={loading}
                onPress={getTokenQuotes}>
                Get Buy Quote
              </Button>
            </LinearGradient>
          </View>
        </View>
      </View>
      <BottomDrawer
        ref={tokensListBottomSheetRef}
        customHeight={Dimensions.get('screen').height * 0.7}
        borderColor>
        <TokensList
          TOKENS={TOKENS}
          onSelect={item => {
            setError('');
            setActiveToken(item);
            tokensListBottomSheetRef.current.close();
          }}
        />
      </BottomDrawer>
      <BottomDrawer
        ref={buyTokenQuoteBottomSheetRef}
        customHeight={Dimensions.get('screen').height * 0.95}
        borderColor>
        <BuyTokenQuote
          closeBuyTokenQuoteDrawer={() =>
            buyTokenQuoteBottomSheetRef.current.close()
          }
          tokenDetails={{...activeToken, amount}}
        />
      </BottomDrawer>
    </View>
  );
};

export default BuyTokenScreen;

const styles = StyleSheet.create({
  root: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },
  container: {
    padding: 10,
    backgroundColor: colors.neutral[1000],
    height: '100%',
  },
  draggableIcon: {
    width: 100,
    height: 2,
    borderRadius: 100,
    backgroundColor: colors.neutral[600],
    marginBottom: 20,
    alignSelf: 'center',
  },
  flexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    margin: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.neutral[600],
  },
  tokenDetailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.neutral[600],
    padding: 10,
    margin: 10,
  },
  tokenDetails: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  image: {
    marginRight: 20,
    borderRadius: 10,
  },
  errorInputStyle: {
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[900],
  },
  inputContent: {
    color: 'white',
    borderWidth: 0,
  },
  walletNameInput: {
    backgroundColor: 'transparent',
    color: 'white',
    padding: 10,
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[700],
  },
  numberInput: {
    backgroundColor: 'transparent',
    width: '90%',
    color: 'white',
    fontSize: 18,
  },
  reviewButtonContainer: {
    margin: 1,
    color: 'white',
    borderRadius: 4,
    backgroundColor: colors.neutral[1000],
  },
  reviewButtonLabelStyle: {
    textTransform: 'uppercase',
  },
});
