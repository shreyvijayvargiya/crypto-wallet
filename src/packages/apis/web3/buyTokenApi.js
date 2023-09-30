import axios from 'axios';
import {TRANSAK_API_KEY} from '@env';

export const getTransakTokenPrice = async ({name, symbol, network}) => {
  try {
    const price = await axios.get(
      `https://api-stg.transak.com/api/v2/currencies/price?partnerApiKey=${TRANSAK_API_KEY}&network=${network}
      &isBuyOrSell=BUY&cryptoCurrency=${symbol.toUpperCase()}&paymentMethod=credit_debit_card`,
    );
    return price.data;
  } catch (e) {
    console.log(e, 'e');
    return 0;
  }
};

export const getMoonPayTokenPriceQuote = async () => {};

export const getBinanceConnectTokenPrice = async () => {};

export const getOnRampTokenPriceQuote = async () => {};
