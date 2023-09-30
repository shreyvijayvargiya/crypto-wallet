import React, {useState} from 'react';
import {Dimensions, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {View} from 'react-native';
import colors from '../../../utils/theme/colors';
import {HeadText, NormalText, TitleText} from '../../../modules/UI/CustomText';
import {BackIcon} from '../../../modules/Icons';
import BottomDrawer from '../../../modules/UI/BottomDrawer';
import TransakProvider from './TransakProvider';
import {useQuery} from 'react-query';
import {getTransakTokenPrice} from '../../../packages/apis/web3/buyTokenApi';
import {getBuyTokensProviderNetworkName} from '../../../packages/hooks';
import {useSelector} from 'react-redux';

const BuyTokenQuote = ({closeBuyTokenQuoteDrawer, tokenDetails}) => {
  const providerRef = React.useRef();
  const {amount, name, symbol, id} = tokenDetails;
  const appStore = useSelector(state => state.reducer);
  const {activeNetwork} = appStore;
  const network = getBuyTokensProviderNetworkName(activeNetwork);

  const {data: prices, isLoading} = useQuery(['providersPrices'], async () => {
    const data = await getTransakTokenPrice({name, symbol, network});
    return {transak: data};
  });

  const [activeProvider, setActiveProvider] = useState('transak');

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <TouchableOpacity onPress={closeBuyTokenQuoteDrawer}>
          <BackIcon />
        </TouchableOpacity>
        <HeadText isCenter style={{fontSize: 18}}>
          Select a Quote
        </HeadText>
        <TouchableOpacity onPress={closeBuyTokenQuoteDrawer}>
          <NormalText>Cancel</NormalText>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          style={styles.providerContainer}
          onPress={() => providerRef.current.open()}>
          <View style={styles.flexContainer}>
            <Image
              source={{
                uri: 'https://assets.transak.com/images/website/transak-logo.svg',
              }}
              width={40}
              height={40}
            />
            <TitleText>Transak</TitleText>
          </View>
          <View style={styles.flexContainer}>
            <TitleText>{amount?.toFixed(4)} </TitleText>
            <TitleText>{symbol?.toUpperCase()}</TitleText>
          </View>
        </TouchableOpacity>
      </View>
      <BottomDrawer
        ref={providerRef}
        customHeight={Dimensions.get('screen').height * 0.98}>
        <TransakProvider
          closeProviderDrawer={() => providerRef.current.close()}
          tokenDetails={tokenDetails}
        />
      </BottomDrawer>
    </View>
  );
};

export default BuyTokenQuote;

const styles = StyleSheet.create({
  root: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
  },
  providerContainer: {
    borderWidth: 1,
    borderColor: colors.neutral[800],
    borderRadius: 8,
    padding: 10,
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
