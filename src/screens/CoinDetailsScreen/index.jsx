import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Image,
  Platform,
} from 'react-native';
import {Text} from 'react-native-paper';
import {LineChart} from 'react-native-chart-kit';
import {useQuery} from 'react-query';
import {fetchCoinPricesViaNameAndDays} from '../../packages/apis/rest';
import {SkeletonLoadingComponent} from '../../modules';
import {useDispatch, useSelector} from 'react-redux';
import {
  BackIcon,
  FillHearIcon,
  HeartIcon,
  StatsIcon,
  TrendingDown,
  TrendingUp,
} from '../../modules/Icons';
import {useNavigation} from '@react-navigation/native';
import {addFavouriteToken} from '../../redux/slice';
import {TitleText} from '../../modules/UI/CustomText';
import colors from '../../utils/theme/colors';

const CoinDetailScreen = ({route}) => {
  const appStoreData = useSelector(state => state.reducer);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {symbol, id, name, coinDetail} = route.params;

  const [saved, setSaved] = useState(
    appStoreData?.favouriteTokens?.includes(symbol),
  );
  const [activeTab, setActiveTab] = useState({label: '1D', value: '1d'});

  const {data: coinPricesData, isLoading: loadingCoinPrices} = useQuery(
    [`${id}`, activeTab?.label, name],
    async () =>
      await fetchCoinPricesViaNameAndDays({
        coinId: id,
        countDays: activeTab.value,
      }),
  );

  const oneHourChange = Number(coinDetail?.quote['USD']?.percent_change_1h);
  const oneDayChange = Number(coinDetail?.quote['USD']?.percent_change_24h);
  const oneWeekChange = Number(coinDetail?.quote['USD']?.percent_change_7d);
  const oneMonthChange = Number(coinDetail?.quote['USD']?.percent_change_30d);
  const threeMonthChange = Number(coinDetail?.quote['USD']?.percent_change_90d);

  const segmentButtons = [
    {label: '1D', value: '1d'},
    {label: '1W', value: '7d'},
    {label: '1M', value: '30d'},
    {label: '3M', value: '90d'},
    {label: '1Y', value: '365d'},
  ];

  const changeChartTimeRange = async item => {
    setActiveTab(item);
  };

  const toggleSave = () => {
    setSaved(!saved);
    let favTokens = [...appStoreData?.favouriteTokens];
    if (!favTokens?.includes(symbol)) {
      favTokens.push(symbol);
      dispatch(addFavouriteToken(favTokens));
    } else {
      const res = favTokens.filter(item => item !== symbol);
      dispatch(addFavouriteToken(res));
    }
  };

  const handleDataPointClick = (data, index) => {
    if (data.datasets.length > 0 && data.datasets[0].data.length > index) {
      const price = data.datasets[0].data[index];
      console.log(price, 'price');
    }
  };

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('LandingScreen')}>
          <BackIcon />
        </TouchableOpacity>
        <TitleText>{name}</TitleText>
        <TouchableOpacity onPress={toggleSave}>
          {saved ? <FillHearIcon /> : <HeartIcon />}
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.titleContainer}>
          <Image
            source={{
              uri: `https://s2.coinmarketcap.com/static/img/coins/64x64/${id}.png`,
            }}
            style={{
              height: 40,
              width: 40,
              alignSelf: 'center',
              marginVertical: 10,
            }}
          />
          <Text style={styles.name}>{symbol?.toUpperCase()}</Text>
          <Text style={styles.quote}>
            ${coinDetail?.quote['USD']?.price?.toFixed(2)} USD
          </Text>
        </View>
        <View style={styles.chartContainer}>
          <View style={styles.chart}>
            {(!loadingCoinPrices && coinPricesData?.length === 0) ||
            coinPricesData === undefined ? (
              <View style={styles.loadingContainer}>
                <SkeletonLoadingComponent />
                <SkeletonLoadingComponent />
                <SkeletonLoadingComponent />
                <SkeletonLoadingComponent />
                <SkeletonLoadingComponent />
              </View>
            ) : (
              coinPricesData?.length > 0 && (
                <LineChart
                  data={{
                    labels: coinPricesData.map(elem => {
                      let output;
                      const item = elem.timestamp;
                      if (activeTab.value === '1d') {
                        const time = new Date(item).toLocaleTimeString();
                        output = time.split(':')[0] + ':' + time.split(':')[1];
                      } else if (activeTab.value === `365d`) {
                        // mm dd yy
                        const date = new Date(item)
                          .toLocaleDateString()
                          .split('/');
                        output = date[0] + '/' + date[2];
                      } else if (activeTab.value === '90d') {
                        // mm dd yy
                        const date = new Date(item)
                          .toLocaleDateString()
                          .split('/');
                        output = date[0] + '/' + date[1];
                      } else {
                        const date = new Date(item)
                          .toLocaleDateString()
                          .split('/');
                        output = date[0] + '/' + date[1];
                      }
                      return output;
                    }),
                    datasets: [
                      {
                        data: coinPricesData?.map(
                          item => item.quote['USD'].price,
                        ),
                      },
                    ],
                  }}
                  fromZero={false}
                  width={Dimensions.get('screen').width}
                  height={200}
                  yAxisInterval={0.5}
                  yAxisSuffix=""
                  withHorizontalLabels={false}
                  withVerticalLabels={false}
                  withVerticalLines={false}
                  withOuterLines={false}
                  withInnerLines={false}
                  withDots={true}
                  onDataPointClick={handleDataPointClick}
                  formatYLabel={() => ''}
                  formatXLabel={() => ''}
                  chartConfig={{
                    backgroundGradientFrom: '#09090b',
                    backgroundGradientTo: '#09090b',
                    fillShadowGradientOpacity: 0,
                    decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) =>
                      `rgba(255, 255, 255, ${opacity})`,
                    style: {
                      borderRadius: 16,
                      marginBottom: 0,
                    },
                    propsForDots: {
                      r: '0',
                      strokeWidth: '0',
                      stroke: '#ffa726',
                      strokeOpacity: '0.5',
                    },
                    propsForHorizontalLabels: {
                      opacity: '0',
                      padding: 0,
                    },
                  }}
                  bezier
                  style={{
                    borderRadius: 16,
                    paddingRight: 0,
                    paddingTop: 10,
                    backgroundColor: '#09090b',
                    borderWidth: 0,
                  }}
                />
              )
            )}
            {coinPricesData === undefined && !loadingCoinPrices && (
              <Text style={styles.emptyPricesText}>
                Error in fetching coin prices
              </Text>
            )}
          </View>
          <View style={styles.segmentButtons}>
            {segmentButtons.map(item => (
              <TouchableOpacity
                key={item.label}
                onPress={() => changeChartTimeRange(item)}
                style={{
                  color: 'white',
                  backgroundColor:
                    activeTab.label === item.label ? 'white' : 'transparent',
                  paddingHorizontal: 10,
                  paddingVertical: 4,
                  borderRadius: 4,
                }}>
                <Text
                  style={{
                    color: activeTab.label === item.label ? 'black' : '#9ca3af',
                  }}>
                  {' '}
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <Text variant="titleMedium" style={{color: 'white', margin: 10}}>
          Performance
        </Text>
        <View style={styles.flexContainer}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <StatsIcon />
            <Text style={styles.categoryText}>1 Hour</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {oneHourChange > 0 ? <TrendingUp /> : <TrendingDown />}
            <Text
              style={
                oneHourChange > 0
                  ? styles.increasePrecentageChange
                  : styles.decreasePrecentageChange
              }>
              %{oneHourChange}
            </Text>
          </View>
        </View>
        <View style={styles.flexContainer}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <StatsIcon />
            <Text style={styles.categoryText}>1 Day</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {oneDayChange > 0 ? <TrendingUp /> : <TrendingDown />}
            <Text
              style={
                oneDayChange > 0
                  ? styles.increasePrecentageChange
                  : styles.decreasePrecentageChange
              }>
              %{oneDayChange}
            </Text>
          </View>
        </View>
        <View style={styles.flexContainer}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <StatsIcon />
            <Text style={styles.categoryText}>1 Week</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {oneWeekChange > 0 ? <TrendingUp /> : <TrendingDown />}
            <Text
              style={
                oneWeekChange > 0
                  ? styles.increasePrecentageChange
                  : styles.decreasePrecentageChange
              }>
              {oneWeekChange}
            </Text>
          </View>
        </View>
        <View style={styles.flexContainer}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <StatsIcon />
            <Text style={styles.categoryText}>1 Month</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {oneMonthChange > 0 ? <TrendingUp /> : <TrendingDown />}
            <Text
              style={
                oneMonthChange > 0
                  ? styles.increasePrecentageChange
                  : styles.decreasePrecentageChange
              }>
              {oneMonthChange}
            </Text>
          </View>
        </View>
        <View style={styles.flexContainer}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <StatsIcon />
            <Text style={styles.categoryText}>3 Month</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {threeMonthChange > 0 ? <TrendingUp /> : <TrendingDown />}
            <Text
              style={
                threeMonthChange > 0
                  ? styles.increasePrecentageChange
                  : styles.decreasePrecentageChange
              }>
              {threeMonthChange}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default CoinDetailScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    color: 'white',
    position: 'relative',
    backgroundColor: '#09090b',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 50 : 0,
    borderBottomWidth: 1,
    padding: 10,
    borderBottomColor: colors.neutral[800],
  },
  loadingContainer: {
    alignSelf: 'center',
    width: '100%',
  },
  chartContainer: {
    marginBottom: 40,
  },
  chart: {
    minHeight: 220,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  name: {
    color: 'white',
    textAlign: 'center',
    fontSize: 28,
    fontWeight: '700',
  },
  quote: {
    color: 'white',
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '600',
  },
  categoryText: {
    color: colors.neutral[200],
    fontWeight: '400',
  },
  emptyPricesText: {
    color: 'white',
    alignSelf: 'center',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    marginHorizontal: 14,
    borderBottomColor: '#27272a',
    borderBottomWidth: 0.5,
  },
  segmentButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  increasePrecentageChange: {
    color: '#86efac',
    textAlign: 'right',
  },
  decreasePrecentageChange: {
    color: '#dc2626',
    textAlign: 'right',
  },
});
