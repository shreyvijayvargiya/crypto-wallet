import {store} from '../../../redux/store';
import {addAllTokens, addAllTokensMetadata} from '../../../redux/slice';
import customAxios from '../..';

export const fetchLatestBlockchainCoins = async () => {
  try {
    const data = await customAxios.get(
      'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=20',
      {
        headers: {
          'X-CMC_PRO_API_KEY': 'c01b06ae-d716-42d2-8b24-5a2119cc1adb',
        },
      },
    );
    store.dispatch(addAllTokens(data.data.data));
    return data.data.data;
  } catch (e) {
    console.log(e, 'error in bitcoin list api');
    return undefined;
  }
};

export const fetchCoinDetailsBySymbols = async symbols => {
  try {
    const response = await customAxios.get(
      `https://pro-api.coinmarketcap.com/v2/cryptocurrency/info?symbol=${symbols.join(
        ',',
      )}`,
      {
        headers: {
          'X-CMC_PRO_API_KEY': 'c01b06ae-d716-42d2-8b24-5a2119cc1adb',
        },
      },
    );
    return response.data.data;
  } catch (e) {
    console.log(e, 'error in coin details by symbol api');
  }
};
export const fetchCoinPrice = async symbol => {
  try {
    if (!symbol || symbol.length === 0) {
      console.log('symbol required');
      return undefined;
    }
    const res = await customAxios.get(
      `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${symbol}&convert=USD`,
      {
        headers: {
          'X-CMC_PRO_API_KEY': 'c01b06ae-d716-42d2-8b24-5a2119cc1adb',
        },
      },
    );
    return {
      price: res.data?.data[symbol]?.quote?.USD?.price ?? 0,
      id: res.data?.data[symbol]?.id,
    };
  } catch (e) {
    console.log(e, 'error in fetching coin price in USD from API');
    return {price: 0};
  }
};

export const fetchCoinPricesViaNameAndDays = async ({coinId, countDays}) => {
  try {
    const response = await customAxios.get(
      `https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/historical?id=${coinId}&convert=USD&interval=${countDays}`,
      {
        headers: {
          'X-CMC_PRO_API_KEY': '9e39d8b1-4421-4fbf-8866-c7157735e169',
        },
      },
    );
    return response?.data?.data?.quotes;
  } catch (e) {
    console.log(e, 'error in coin price via name and days api');
    return undefined;
  }
};

export const getEthTokens = async () => {
  try {
    const response = await customAxios.get(
      'https://pro-api.coinmarketcap.com/v1/cryptocurrency/map?limit=50',
      {
        headers: {
          'X-CMC_PRO_API_KEY': '9e39d8b1-4421-4fbf-8866-c7157735e169',
        },
      },
    );
    const ids = response.data.data?.map(item => item.id);
    const metadata = await getTokensMetadata(ids);
    const data = response.data?.data?.map(item => ({
      ...item,
      image: metadata[item.id].logo,
      tokenAddress: item?.platform?.token_address,
    }));
    store.dispatch(addAllTokens(data));
    return data;
  } catch (e) {
    console.log(e, 'error in fetching tokens');
    return;
  }
};

export const getTokensMetadata = async ids => {
  try {
    const response = await customAxios.get(
      `https://pro-api.coinmarketcap.com/v2/cryptocurrency/info?id=${ids.join(
        ',',
      )}`,
      {
        headers: {
          'X-CMC_PRO_API_KEY': '9e39d8b1-4421-4fbf-8866-c7157735e169',
        },
      },
    );
    return response.data.data;
  } catch (e) {
    console.log(e, 'error in fetching tokens metadata');
    return;
  }
};
