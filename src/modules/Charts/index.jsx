import React, {useState} from 'react';
import {useQuery} from 'react-query';
import SkeletonLoadingComponent from '../UI/SkeletonLoading';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {fetchCoinPricesViaNameAndDays} from '../../packages/apis/rest';
import colors from '../../utils/theme/colors';
import {LineChart} from 'react-native-chart-kit';

const activeTab = {label: '1D', value: 1};
const CoinPriceChart = ({
  id,
  name,
  handleDataPointClick,
  customWidth,
  customHeight,
  customChartColor,
}) => {
  const {data: coinPricesData, isLoading: loadingCoinPrices} = useQuery(
    [`${id}`, activeTab?.label, name],
    async () =>
      await fetchCoinPricesViaNameAndDays({
        coinId: id,
        countDays: activeTab.label.toLowerCase(),
      }),
  );
  return (
    <View>
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
                    const date = new Date(item).toLocaleDateString().split('/');
                    output = date[0] + '/' + date[2];
                  } else if (activeTab.value === '90d') {
                    // mm dd yy
                    const date = new Date(item).toLocaleDateString().split('/');
                    output = date[0] + '/' + date[1];
                  } else {
                    const date = new Date(item).toLocaleDateString().split('/');
                    output = date[0] + '/' + date[1];
                  }
                  return output;
                }),
                datasets: [
                  {
                    data: coinPricesData?.map(item => item.quote['USD'].price),
                  },
                ],
              }}
              fromZero={false}
              width={customWidth ? customWidth : Dimensions.get('window').width}
              height={customHeight ? customHeight : 50}
              yAxisInterval={0.5}
              yAxisSuffix=""
              withHorizontalLabels={false}
              withVerticalLabels={false}
              withVerticalLines={false}
              withOuterLines={false}
              withInnerLines={false}
              withDots={true}
              onDataPointClick={
                handleDataPointClick ? handleDataPointClick : () => {}
              }
              formatYLabel={() => ''}
              formatXLabel={() => ''}
              chartConfig={{
                backgroundGradientFrom: '#09090b',
                backgroundGradientTo: '#09090b',
                fillShadowGradientOpacity: 0,
                decimalPlaces: 2,
                color: (opacity = 1) =>
                  customChartColor ? customChartColor : colors.neutral[400],
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
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
        {coinPricesData === undefined && !loadingCoinPrices && null}
      </View>
    </View>
  );
};
export default CoinPriceChart;

const styles = StyleSheet.create({
  chart: {
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
});
