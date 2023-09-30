import React, {useState} from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {WalletNavbar} from '../../../modules';
import withWalletConnectProvider from '../WalletScreensRootProvider';
import colors from '../../../utils/theme/colors';
import {
  AddIcon,
  ArrowRightIcon,
  BackIcon,
  CloseIcon,
  RefreshIcon,
} from '../../../modules/Icons';
import {HeadText, NormalText} from '../../../modules/UI/CustomText';
import BrowserView from './BrowserView';
import {v4 as uuidv4} from 'uuid';

const getInitialTab = link => ({
  title: link ? link : 'Google',
  uri: link ? link : 'https://google.com/',
  canGoBack: false,
  canGoForward: false,
  webViewRef: React.createRef(),
  id: uuidv4(),
});

const WalletBrowserScreen = ({route}) => {
  const {link} = route.param ? route.params : {link: null};
  const initialTab = getInitialTab(link);
  const [tabs, setTabs] = useState([initialTab]);
  const [tabsCount, setTabsCount] = useState(1);
  const [showTabs, setShowTabs] = useState(false);
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const {webViewRef, canGoBack, canGoForward} = !activeTab;

  const updateTabState = tabItems => {
    const newTabs = tabs.map(item => {
      if (item.id === tabItems?.id) {
        return {
          title: tabItems?.title,
          canGoBack: tabItems?.canGoBack,
          canGoForward: tabItems?.canGoForward,
          uri: tabItems?.uri,
          id: tabItems?.id,
          webViewRef: React.createRef(),
        };
      } else {
        return item;
      }
    });
    setTabs(newTabs);
  };

  const handleBack = () => {
    if (webViewRef && canGoBack) {
      webViewRef.current.goBack();
    }
  };
  const handleFordwardPress = () => {
    if (webViewRef && canGoForward) {
      webViewRef.current.goForward();
    }
  };
  const reload = () => {
    if (webViewRef) {
      webViewRef.current.reload();
    }
  };

  const addNewTab = () => {
    setShowTabs(true);
    setTabsCount(tabsCount + 1);
    const newTabs = [...tabs];
    newTabs.push({
      title: 'Google',
      uri: link ? link : 'https://cgpt.org/',
      canGoBack: false,
      canGoForward: false,
      webViewRef: React.createRef(),
      id: uuidv4(),
    });
    setActiveTab(tabs[tabs.length - 1]);
    setTabs(newTabs);
  };

  const removeTab = id => {
    setTabsCount(tabsCount - 1);
    const newTabs = tabs.filter(item => item.id !== id);
    setActiveTab(newTabs[newTabs?.length - 1]);
    setTabs(newTabs);
  };
  
  return (
    <View style={styles.root}>
      <WalletNavbar />
      {showTabs ? (
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
                  setActiveTab(item);
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
      ) : (
        <BrowserView
          ref={webViewRef}
          webState={activeTab}
          setWebState={updateTabState}
        />
      )}
      {showTabs && tabsCount === 0 ? (
        <View
          style={{flex: 1, textAlign: 'center', alignSelf: 'center'}}
          isCenter>
          <HeadText>CGPT In-App Browser</HeadText>
          <NormalText isCenter>No Tabs Found</NormalText>
        </View>
      ) : null}
      <View style={styles.bottomContainer}>
        {!showTabs ? (
          <View style={styles.flexContainer}>
            <TouchableOpacity onPress={handleBack}>
              <BackIcon color={colors.neutral[400]} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleFordwardPress}>
              <ArrowRightIcon color={colors.neutral[400]} size={22} />
            </TouchableOpacity>
            <TouchableOpacity onPress={reload}>
              <RefreshIcon color={colors.neutral[400]} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setShowTabs(true)}
              style={{
                borderColor: colors.indigo[600],
                borderRadius: 4,
                borderWidth: 1,
                paddingHorizontal: 10,
                paddingVertical: 4,
                backgroundColor: colors.indigo[600],
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <AddIcon size={18} color={colors.neutral[300]} />
              <NormalText>{tabsCount}</NormalText>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.flexContainer}>
            <TouchableOpacity
              onPress={() => {
                setTabsCount(0);
                setActiveTab(null);
                setTabs([]);
              }}
              style={{color: colors.indigo[600]}}>
              <NormalText>Close</NormalText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={addNewTab}
              style={{
                padding: 4,
                borderRadius: 100,
                backgroundColor: colors.indigo[600],
              }}>
              <AddIcon size={20} color={colors.neutral[400]} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowTabs(false)}>
              <NormalText>Done</NormalText>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};
export default withWalletConnectProvider(WalletBrowserScreen);

const styles = StyleSheet.create({
  root: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    backgroundColor: colors.neutral[950],
    color: 'white',
    paddingTop: 100,
    position: 'relative',
  },
  container: {
    height: Dimensions.get('screen').height,
    flex: 1,
    padding: 20,
    marginVertical: 10,
  },
  webViewContainer: {
    marginVertical: 10,
    flex: 1,
  },
  webViewStyle: {
    flex: 1,
  },
  bottomContainer: {
    width: '100%',
    height: 140,
    backgroundColor: colors.neutral[950],
  },
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
