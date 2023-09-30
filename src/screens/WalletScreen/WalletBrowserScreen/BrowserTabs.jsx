import React from 'react';
import {ScrollView, StyleSheet, View, TouchableOpacity} from 'react-native';
import colors from '../../../utils/theme/colors';
import {CloseIcon} from '../../../modules/Icons';
import {NormalText} from '../../../modules/UI/CustomText';
import BrowserView from './BrowserView';
import {v4 as uuidv4} from 'uuid';

const BrowserTabs = ({
  tabs,
  setTabs,
  tabsCount,
  activeTab,
  setTabsCount,
  setActiveTab,
  setShowTabs,
}) => {
  const {webViewRef} = !tabs[activeTab];

  const updateTabState = tabItems => {
    const {id, title, canGoBack, canGoForward, uri} = tabItems;
    const newTabs = tabs.map(item => {
      if (item.id === id) {
        return {
          title,
          canGoBack,
          canGoForward,
          uri,
          id,
          webViewRef: item.webViewRef,
        };
      } else {
        return item;
      }
    });
    setTabs(newTabs);
  };

  const removeTab = id => {
    setTabsCount(tabsCount - 1);
    const newTabs = tabs.filter(item => item.id !== id);
    setTabs(newTabs);
  };

  const addNewTab = () => {
    setShowTabs(true);
    setTabsCount(tabsCount + 1);
    const newTabs = [...tabs];
    newTabs.push({
      title: 'Google',
      uri: 'https://google.com/',
      canGoBack: false,
      canGoForward: false,
      webViewRef: React.createRef(),
      id: uuidv4(),
    });
    setTabs(newTabs);
  };

  return (
    <ScrollView style={styles.webViewStyle}>
      {tabs.map((item, index) => (
        <TouchableOpacity
          style={
            index === activeTab
              ? styles.activeTabStyleWebViewStyle
              : styles.webViewPreview
          }
          key={item.id}>
          <View style={styles.webViewHeader}>
            <NormalText>CGPT {item.title.substring(0, 40)}</NormalText>
            <TouchableOpacity onPress={() => removeTab(item.id)}>
              <CloseIcon />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
              setActiveTab(index);
              setShowTabs(false);
            }}
            style={{flex: 1, padding: 4}}>
            <BrowserView
              ref={webViewRef}
              webState={item}
              setWebState={updateTabState}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default BrowserTabs;

const styles = StyleSheet.create({
  root: {},
  flexContainer: {
    borderTopWidth: 1,
    borderTopColor: colors.neutral[700],
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 10,
    width: '100%',
    alignItems: 'center',
    padding: 10,
  },
  webViewPreview: {
    height: 140,
    width: '90%',
    borderRadius: 10,
    borderColor: colors.neutral[800],
    borderWidth: 1,
    marginVertical: 20,
    alignSelf: 'center',
  },
  activeTabStyleWebViewStyle: {
    height: 140,
    width: '90%',
    borderRadius: 10,
    borderColor: colors.indigo[600],
    borderWidth: 1,
    marginVertical: 20,
    alignSelf: 'center',
  },
  webViewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[700],
    padding: 8,
  },
});
