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
import {useQuery} from 'react-query';
import {useDispatch, useSelector} from 'react-redux';
import {addImportedTokens} from '../../redux/slice';
import {getEthTokens} from '../../packages/apis/web3/walletApi';
import SkeletonLoadingComponent from './SkeletonLoading';

const ImportTokens = () => {
  const {
    data: tokensList,
    isLoading,
    isLoadingError,
  } = useQuery(['allTokensList'], getEthTokens);
  const appStore = useSelector(state => state.reducer);
  const [tokens, setTokens] = useState(appStore?.userImportedTokens);
  const dispatch = useDispatch();

  const toggleTokenState = async item => {
    let response;
    const tokensCopy = [...tokens];
    if (tokensCopy.includes(item.id)) {
      response = tokensCopy.filter(element => element.id !== item.id);
    } else {
      tokensCopy.push(item.id);
      response = tokensCopy;
    }
    setTokens(response);
    dispatch(addImportedTokens(response));
  };

  const renderChild = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.tokenItemContainer}
        onPress={() => toggleTokenState(item)}>
        <View style={styles.tokenImageContainer}>
          <Image source={{uri: item.logo}} style={styles.tokenImage} />
        </View>
        <View style={styles.tokenInfo}>
          <Text style={styles.tokenSymbol}>{item.symbol}</Text>
          <Text style={styles.tokenName}>{item.name}</Text>
        </View>
        {/* <Switch value={tokens.includes(item.id)} onValueChange={() => {}} /> */}
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.root}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <SkeletonLoadingComponent />
          <SkeletonLoadingComponent />
          <SkeletonLoadingComponent />
          <SkeletonLoadingComponent />
        </View>
      ) : (
        <View>
          {isLoadingError ? (
            <Text>Error</Text>
          ) : (
            <FlatList
              data={tokensList}
              ListHeaderComponent={() => (
                <View>
                  <Text style={styles.title}>Select token</Text>
                </View>
              )}
              keyExtractor={item => item.id}
              renderItem={renderChild}
            />
          )}
        </View>
      )}
    </View>
  );
};
export default ImportTokens;

const styles = StyleSheet.create({
  root: {
    padding: 20,
  },
  loadingContainer: {
    alignSelf: 'center',
    width: '95%',
  },
  title: {
    color: 'white',
  },
  tokenItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginVertical: 4,
    borderColor: colors.neutral[900],
    borderWidth: 1,
    borderRadius: 10,
  },
  tokenImage: {
    width: 30,
    height: 30,
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
