import React from 'react';
import TokensList from '../../../modules/UI/TokensList';
import {useSelector} from 'react-redux';
import {getNetworkDefaultTokens} from '../../../packages/hooks';

const SearchSwapToken = ({onSelectToken}) => {
  const appStore = useSelector(state => state.reducer);
  const network = appStore.activeNetwork;
  const TOKENS = getNetworkDefaultTokens(network);
  return (
    <TokensList
      customTokens={TOKENS}
      hideHeader
      onSelect={item => onSelectToken(item)}
    />
  );
};
export default SearchSwapToken;
