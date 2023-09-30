import {useNavigation} from '@react-navigation/native';
import React, {Suspense} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
  Dimensions,
  Platform,
} from 'react-native';
import {fetchLatestBlockchainCoins} from '../../packages/apis/rest';
import {useQuery} from 'react-query';
import {NormalText, TitleText} from '../../modules/UI/CustomText';
import {SkeletonLoadingComponent} from '../../modules';
import colors from '../../utils/theme/colors';
import CoinPriceChart from '../../modules/Charts';
import {useSelector} from 'react-redux';

const BitCoinPrice = () => {
  const navigation = useNavigation();
  const appStore = useSelector(state => state.reducer);
  const allTokens = appStore.allTokens;
  const {
    data: coinDetailsQueryData,
    isLoading: loadingCoinDetails,
    isLoadingError,
  } = useQuery(['coinDetails'], async () => {
    const data = await fetchLatestBlockchainCoins();
    return data;
  });

  return (
    <View>
      {!isLoadingError ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.cryptoCoinsContainer}>
          {!loadingCoinDetails && allTokens !== undefined ? (
            allTokens?.map(item => {
              return (
                <TouchableOpacity
                  key={item.id}
                  style={styles.coinCardContainer}
                  onPress={() =>
                    navigation.navigate('CoinDetailsScreen', {
                      symbol: item.symbol,
                      name: item.name,
                      id: item.id,
                      coinDetail: item,
                    })
                  }>
                  <View style={{marginHorizontal: 10}}>
                    <Image
                      source={{
                        uri: `https://s2.coinmarketcap.com/static/img/coins/64x64/${item.id}.png`,
                      }}
                      width={50}
                      height={50}
                    />
                  </View>
                  <View style={{flex: 1, marginRight: 20}}>
                    <TitleText style={styles.symbol}>
                      {item?.symbol?.toUpperCase()}
                    </TitleText>
                    <NormalText style={{fontSize: 16}}>{item?.name}</NormalText>
                  </View>
                  <View style={{marginHorizontal: 20, marginTop: 10}}>
                    <Text style={styles.price}>
                      ${Number(item?.quote['USD']?.price).toFixed(2)}
                    </Text>
                    {Number(item.quote['USD']?.percent_change_1h) > 0 ? (
                      <View style={{flexDirection: 'row'}}>
                        <Text style={styles.increasePrecentageChange}>
                          +
                          {Number(item.quote['USD']?.percent_change_1h).toFixed(
                            2,
                          )}
                          %
                        </Text>
                        <Text
                          style={{
                            backgroundColor: colors.neutral[900],
                            padding: 4,
                            borderRadius: 4,
                            color: 'white',
                            marginLeft: 8,
                          }}>
                          24h
                        </Text>
                      </View>
                    ) : (
                      <View style={{flexDirection: 'row', padding: 4}}>
                        <Text style={styles.decreasePrecentageChange}>
                          {Number(item.quote['USD']?.percent_change_1h).toFixed(
                            2,
                          )}
                          %
                        </Text>
                        <Text
                          style={{
                            backgroundColor: colors.neutral[900],
                            padding: 4,
                            borderRadius: 4,
                            color: 'white',
                            marginLeft: 8,
                          }}>
                          24h
                        </Text>
                      </View>
                    )}
                  </View>
                  {/* <Suspense fallback={<Text>Chart....</Text>}>
                    <CoinPriceChart
                      id={item.id}
                      name={item.name}
                      customHeight={45}
                      customWidth={80}
                      customChartColor={
                        Number(item.quote['USD']?.percent_change_1h) > 0
                          ? colors.green[500]
                          : colors.pink[600]
                      }
                    />
                  </Suspense> */}
                </TouchableOpacity>
              );
            })
          ) : (
            <View style={styles.cardContainer}>
              <SkeletonLoadingComponent />
              <SkeletonLoadingComponent />
              <SkeletonLoadingComponent />
            </View>
          )}
        </ScrollView>
      ) : null}
    </View>
  );
};
export default BitCoinPrice;

const styles = StyleSheet.create({
  root: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    backgroundColor: colors.neutral[950],
    paddingTop: Platform.OS === 'ios' ? 40 : 0,
    paddingBottom: Platform.OS === 'ios' ? 20 : 0,
  },
  cardContainer: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
  },
  increasePrecentageChange: {
    color: '#86efac',
    textAlign: 'right',
    fontSize: 14,
    marginTop: 4,
  },
  decreasePrecentageChange: {
    color: '#fda4af',
    textAlign: 'right',
    fontSize: 14,
    marginTop: 4,
  },
  cryptoCoinsContainer: {
    flex: 1,
  },
  coinCardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: Dimensions.get('window'),
    borderColor: colors.neutral[800],
    borderWidth: 1,
    marginVertical: 10,
    marginRight: 20,
    paddingVertical: 18,
    paddingHorizontal: 10,
    clipPath: 'polygon(0 0, 83% 0, 100% 20%, 100% 100%, 19% 100%, 0 79%)',
  },
  usercgptbalanceContainer: {
    padding: 20,
    borderWidth: 1,
    borderColor: colors.neutral[800],
  },
});
