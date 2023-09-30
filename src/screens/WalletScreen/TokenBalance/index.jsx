/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {getActiveNetworkTokenBalances} from '../../../packages/apis/web3/walletApi';
import {batch, useDispatch, useSelector} from 'react-redux';
import {useQuery} from 'react-query';
import SkeletonLoadingComponent from '../../../modules/UI/SkeletonLoading';
import colors from '../../../utils/theme/colors';
import {
  addActiveWallet,
  addTotalBalance,
  toggleWalletConnectStatus,
} from '../../../redux/slice';
import {
  HeadText,
  HeadingText,
  NormalText,
  TitleText,
} from '../../../modules/UI/CustomText';
import LinearGradient from 'react-native-linear-gradient';
import {Button} from 'react-native-paper';
import {useWalletConnectModal} from '@walletconnect/modal-react-native';

const EmptyListComponent = () => (
  <View>
    <Text style={{color: 'white'}}>No tokens found</Text>
    <HeadText isCenter style={{marginVertical: 10}}>
      Add crypto to get started
    </HeadText>
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
      style={styles.createWalletButtonContainer}>
      <Button
        mode="contained"
        textColor="white"
        buttonColor={colors.neutral[950]}
        style={styles.createWalletButtonContainer}
        labelStyle={styles.createWalletButton}
        onPress={() => {}}>
        Buy ETH
      </Button>
    </LinearGradient>
  </View>
);

const TokenBalancesComponent = ({activeNetwork}) => {
  const navigation = useNavigation();
  const appStore = useSelector(state => state.reducer);
  const dispatch = useDispatch();
  const {provider} = useWalletConnectModal();

  const {data: tokenBalancesData, isLoading} = useQuery(
    ['walletTokensBalances', activeNetwork],
    async () => {
      const data = await getActiveNetworkTokenBalances({
        walletAddress: appStore.activeWallet.walletAddress,
        network: activeNetwork,
      });
      await fetchWalletTotalBalance();
      return data;
    },
  );
  const calculateTotalWalletBalance = () => {
    let totalAmount = 0.0;
    if (!isLoading && tokenBalancesData) {
      tokenBalancesData?.forEach(token => {
        totalAmount = totalAmount + token.usdBalance;
      });
      return Number(totalAmount).toFixed(4);
    } else {
      return 0;
    }
  };

  const fetchWalletTotalBalance = React.useCallback(async () => {
    const balance = calculateTotalWalletBalance();
    batch(() => {
      dispatch(
        addActiveWallet({
          walletAddress: appStore.activeWallet.walletAddress,
          network: activeNetwork,
          privateKey: appStore.activeWallet.privateKey,
          balance,
          walletName: appStore.activeWallet.walletName,
        }),
      );
      dispatch(addTotalBalance(balance));
    });
  }, [appStore.activeNetwork]);

  const renderTokenItem = ({item}) => (
    <TouchableOpacity
      style={styles.tokenItemContainer}
      onPress={() =>
        navigation.navigate('CoinDetailsScreen', {
          symbol: item.symbol,
          name: item.name,
          id: item.id,
        })
      }>
      <View style={styles.tokenImageContainer}>
        {item.image ? (
          <Image
            source={{uri: item.image}}
            style={styles.tokenImage}
            width={30}
            height={30}
          />
        ) : (
          <View style={styles.tokenImage} />
        )}
      </View>
      <View style={styles.tokenInfo}>
        <TitleText style={styles.tokenSymbol}>{item.symbol}</TitleText>
        <NormalText style={styles.tokenName}>{item.name}</NormalText>
      </View>
      <View>
        <HeadingText style={styles.usdBalance}>
          $ {item.usdBalance > 0 ? Number(item.usdBalance).toFixed(4) : 0}
        </HeadingText>
        <NormalText style={styles.tokenBalance}>
          {item.usdBalance > 0 ? Number(item.balance).toFixed(4) : 0}{' '}
          {item.symbol}
        </NormalText>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <SkeletonLoadingComponent />
          <SkeletonLoadingComponent />
          <SkeletonLoadingComponent />
          <SkeletonLoadingComponent />
          <SkeletonLoadingComponent />
          <SkeletonLoadingComponent />
          <SkeletonLoadingComponent />
        </View>
      ) : (
        <View>
          {appStore.activeWalletTokens !== null &&
            appStore.activeWalletTokens?.length > 0 && (
              <FlatList
                data={appStore.activeWalletTokens}
                ListEmptyComponent={<EmptyListComponent />}
                renderItem={renderTokenItem}
                keyExtractor={item => item.symbol}
              />
            )}
        </View>
      )}
      <TouchableOpacity
        onPress={() => {
          batch(() => {
            dispatch(
              addActiveWallet({
                network: null,
                privateKey: null,
                walletAddress: null,
                balance: null,
                walletName: null,
              }),
            );
            dispatch(toggleWalletConnectStatus(false));
            provider?.disconnect();
          });
          navigation.navigate('LandingScreen');
        }}
        style={{margin: 20, alignSelf: 'center'}}>
        <NormalText>Logout</NormalText>
      </TouchableOpacity>
    </View>
  );
};
export default TokenBalancesComponent;

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
  },
  tokenItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomColor: colors.neutral[700],
    borderBottomWidth: 1,
  },
  loadingContainer: {
    alignSelf: 'center',
    width: '95%',
  },
  tokenImageContainer: {
    marginRight: 12,
    padding: 8,
    backgroundColor: colors.neutral[1000],
  },
  tokenImage: {
    margin: 1,
  },
  tokenInfo: {
    flex: 1,
  },
  tokenSymbol: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  tokenName: {
    fontSize: 12,
    color: colors.normalTextColor,
  },
  tokenBalance: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.normalTextColor,
    width: 'auto',
    textAlign: 'right',
  },
  usdBalance: {
    fontSize: 22,
    fontWeight: '400',
    color: '#FFF',
    textAlign: 'right',
  },
  importTokenText: {
    color: colors.indigo[600],
    alignSelf: 'center',
    margin: 20,
  },
  buttonContainer: {
    padding: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 0,
  },
  createWalletButtonContainer: {
    borderRadius: 10,
    borderWidth: 1,
    margin: 1,
    alignSelf: 'center',
  },
  createWalletButton: {
    fontSize: 18,
    textTransform: 'uppercase',
    backgroundColor: 'transparent',
  },
});
