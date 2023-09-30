import React from 'react';
import {StyleSheet} from 'react-native';
import WebView from 'react-native-webview';

const config = {
  allowStorage: true,
  allowJavascript: true,
  allowCookies: true,
  allowLocation: true,
  allowCaching: true,
  defaultSearchEngine: 'google',
};

const BrowserView = React.forwardRef((props, webViewRef) => {
  const onNavigationStateChange = navState => {
    const {canGoBack, canGoForward, title} = navState;
    props.setWebState({
      canGoBack,
      canGoForward,
      title,
      uri: props?.webState?.uri,
      id: props?.webState?.id,
      webViewRef: props?.webState?.webViewRef,
    });
  };

  return (
    <WebView
      ref={webViewRef}
      style={styles.root}
      source={{uri: props.webState?.uri}}
      cacheEnabled={config.allowCaching}
      domStorageEnabled={config.allowStorage}
      pullToRefreshEnabled={true}
      geolocationEnabled={config.allowLocation}
      javaScriptEnabled={config.allowJavascript}
      onNavigationStateChange={onNavigationStateChange}
      thirdPartyCookiesEnabled={config.allowCookies}
    />
  );
});
export default BrowserView;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
