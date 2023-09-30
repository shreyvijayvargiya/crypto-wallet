import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {SkeletonLoadingComponent, WalletNavbar} from '../../../modules';
import colors from '../../../utils/theme/colors';
import {
  HeadText,
  HeadingText,
  NormalText,
  TitleText,
} from '../../../modules/UI/CustomText';
import {useQuery} from 'react-query';
import {useSelector} from 'react-redux';
import {ReceiveIcon, RefreshIcon, SendIcon} from '../../../modules/Icons';
import {getAddressTransactions} from '../../../packages/apis/web3/walletApi';
import Web3 from 'web3';
import {fetchCoinPrice} from '../../../packages/apis/rest';
import withWalletConnectProvider from '../WalletScreensRootProvider';

const WalletHistoryScreen = () => {
  const appStore = useSelector(state => state.reducer);
  const walletAddress = appStore.activeWallet.walletAddress;

  const {
    data: userTransactions,
    isLoading,
    refetch,
  } = useQuery(['userTransactions'], async () => {
    const data = await getAddressTransactions({
      walletAddress,
      network: appStore.activeWallet.network,
      limit: 5,
    });
    let txnObjs = {};
    const fetchCoinPricePromises = data?.map(async item => {
      const parsedItem = JSON.parse(JSON.stringify(item));
      if (!txnObjs[parsedItem.tokenName]) {
        const {price, id} = await fetchCoinPrice(
          parsedItem.tokenSymbol.toUpperCase(),
        );
        txnObjs[parsedItem.tokenName] = {price: price, id: id};
      }
    });
    await Promise.all(fetchCoinPricePromises);
    return {results: data, txnObjs};
  });

  const renderItem = ({item}) => {
    const parsedItem = JSON.parse(JSON.stringify(item));
    const txnsTokens = userTransactions?.txnObjs;
    const id = txnsTokens[parsedItem.tokenName]?.id
      ? txnsTokens[parsedItem.tokenName]?.id
      : 1;
    const valueDecimal = Number(
      Web3.utils.fromWei(parsedItem.value, 'ether'),
      4,
    ).toFixed(2);
    const amountInUSD = txnsTokens[parsedItem.tokenName]?.price
      ? Number(txnsTokens[parsedItem.tokenName]?.price).toFixed(4)
      : 1;

    const str1 = parsedItem.fromAddress.toLowerCase();
    const str2 = walletAddress.toLowerCase();

    return (
      <View style={styles.transactionCardContainer}>
        <View style={styles.flexContainer}>
          <View>
            {id && (
              <Image
                source={{
                  uri: `https://s2.coinmarketcap.com/static/img/coins/64x64/${id}.png`,
                }}
                width={40}
                height={40}
              />
            )}
          </View>
          <View>
            <View style={styles.flexContainer}>
              {str1 === str2 ? (
                <SendIcon
                  style={{
                    borderRadius: 100,
                    padding: 4,
                    color: 'white',
                    margin: 10,
                  }}
                  size={14}
                />
              ) : (
                <ReceiveIcon
                  style={{
                    borderRadius: 100,
                    padding: 4,
                    color: 'white',
                  }}
                  size={14}
                />
              )}
              {str1 === str2 ? (
                <HeadText style={{color: colors.green[600]}}>Sent</HeadText>
              ) : (
                <HeadText style={{color: colors.indigo[400]}}>
                  Received
                </HeadText>
              )}
            </View>
            <View style={{marginLeft: 18}}>
              <NormalText isCenter style={{fontSize: 18}}>
                {parsedItem.tokenName}
              </NormalText>
            </View>
          </View>
        </View>
        <View>
          <HeadingText style={{color: 'white', fontSize: 16}}>
            {valueDecimal} {parsedItem.tokenSymbol}
          </HeadingText>
          <View>
            {parsedItem.fromAddress === walletAddress ? (
              <NormalText>- ${amountInUSD}</NormalText>
            ) : (
              <NormalText>+ ${amountInUSD}</NormalText>
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.root}>
      <WalletNavbar />
      <View style={styles.body}>
        <TitleText>Transactions</TitleText>
        <TouchableOpacity onPress={refetch}>
          <RefreshIcon />
        </TouchableOpacity>
      </View>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <SkeletonLoadingComponent />
          <SkeletonLoadingComponent />
          <SkeletonLoadingComponent />
          <SkeletonLoadingComponent />
        </View>
      ) : (
        <FlatList
          data={userTransactions?.results}
          renderItem={renderItem}
          refreshing={isLoading}
          keyExtractor={(item, index) =>
            index.toString() + item.transactionHash
          }
          ListEmptyComponent={
            <View style={styles.transactionCardContainer}>
              <TitleText>No transaction history found</TitleText>
            </View>
          }
        />
      )}
    </View>
  );
};
export default withWalletConnectProvider(WalletHistoryScreen);

const styles = StyleSheet.create({
  root: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    backgroundColor: colors.neutral[950],
    color: 'white',
    paddingTop: 100,
    position: 'relative',
  },
  body: {
    paddingHorizontal: 10,
    marginHorizontal: 10,
    marginVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  loadingContainer: {
    alignSelf: 'center',
    width: '95%',
    margin: 20,
  },
  transactionCardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
    paddingHorizontal: 10,
  },
  flexContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
