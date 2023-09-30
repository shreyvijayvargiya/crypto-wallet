import axios from 'axios';
import rateLimit from 'axios-rate-limit';

const customAxios = rateLimit(axios, {
  maxRequests: 5,
  perMilliseconds: 1000,
  maxRPS: 2,
});
export default customAxios;
