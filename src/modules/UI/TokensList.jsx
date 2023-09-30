/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState} from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';
import colors from '../../utils/theme/colors';
import {useSelector} from 'react-redux';
import {HeadText, NormalText} from './CustomText';
import {fetchCoinDetailsBySymbols} from '../../packages/apis/rest';
import _ from 'lodash';

const ListHeader = () => {
  return (
    <View>
      <Text style={styles.heading}>Select the token</Text>
    </View>
  );
};

const TokensList = ({onSelect, hideHeader, customTokens}) => {
  const appStore = useSelector(state => state.reducer);
  const network = appStore.activeWallet.network;
  const [tokens, setTokens] = useState(
    customTokens ? customTokens : appStore?.allTokens,
  );
  const [tokensMetadata, setTokensMetadata] = useState(null);

  const tokenSymbols = tokens.map(item => item.symbol.toUpperCase());

  const fetchTokenMetadata = async () => {
    if (!customTokens) {
      console.log(appStore.allTokensMetadata, 'metadata');
      setTokensMetadata(appStore.addAllTokensMetadata);
      return;
      const data = await fetchCoinDetailsBySymbols(tokenSymbols);
      setTokensMetadata(data);
    }
  };

  React.useEffect(() => {
    fetchTokenMetadata();
  }, [customTokens]);

  const handleSelect = async (e, item) => {
    if (tokensMetadata) {
      const contract_addresses =
        tokensMetadata[item.symbol][0]['contract_address'];
      const filterContractAddress = contract_addresses.filter(net => {
        const netName = net.platform.name.toUpperCase();
        const chainName = network.toUpperCase();
        const isEqual = _.isEqual(netName, chainName);
        if (isEqual) {
          return net;
        } else {
          return null;
        }
      });
      const contractAddress = filterContractAddress[0]['contract_address'];
      if (contractAddress) {
        const newObj = {
          id: item.id,
          image: item.image,
          usdBalance: item.usdBalance,
          contractAddress,
          name: item.name,
          symbol: item.symbol,
        };
        onSelect(newObj);
      }
    } else {
      onSelect(item);
    }
  };

  const renderChild = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.tokenItemContainer}
        onPress={e => handleSelect(e, item)}>
        <View style={styles.tokenImageContainer}>
          <Image
            source={{
              uri: `https://s2.coinmarketcap.com/static/img/coins/64x64/${item.id}.png`,
            }}
            width={30}
            height={30}
            style={styles.tokenImage}
          />
        </View>
        <View style={styles.tokenInfo}>
          <Text style={styles.tokenSymbol}>{item.symbol}</Text>
          <Text style={styles.tokenName}>{item.name}</Text>
        </View>
        {customTokens && (
          <View>
            <NormalText>
              {Number(item.balance) > 0 ? Number(item?.balance).toFixed(4) : 0}{' '}
              {item.symbol}
            </NormalText>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.root}>
      <FlatList
        data={tokens}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={!hideHeader && <ListHeader />}
        keyExtractor={item => item.id}
        renderItem={renderChild}
        ListEmptyComponent={
          <View style={{padding: 40}}>
            <HeadText isCenter>Nothing found</HeadText>
            <Image
              source={require('../../assets/icons/search-cgpt-icon.png')}
              width={50}
              height={50}
              style={{alignSelf: 'center', marginVertical: 10}}
            />
          </View>
        }
      />
    </View>
  );
};
export default TokensList;

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 10,
    paddingTop: 20,
    paddingBottom: 20,
  },
  loadingContainer: {
    alignSelf: 'center',
    width: '95%',
  },
  tokenItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    marginVertical: 4,
    borderColor: colors.neutral[900],
    borderWidth: 1,
    borderRadius: 10,
  },
  heading: {
    color: 'white',
    fontSize: 16,
    marginVertical: 4,
  },
  tokenImage: {
    borderRadius: 4,
    margin: 4,
  },
  tokenImageContainer: {
    marginRight: 12,
    padding: 8,
    borderRadius: 8,
    backgroundColor: colors.neutral[950],
  },
  tokenInfo: {
    flex: 1,
  },
  tokenSymbol: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFF',
  },
  tokenName: {
    fontSize: 10,
    color: '#FFF',
  },
  tokenBalance: {
    fontSize: 14,
    fontWeight: '400',
    color: '#FFF',
  },
});
