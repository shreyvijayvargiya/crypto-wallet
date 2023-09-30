import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import colors from '../../utils/theme/colors';
import {HeadText, NormalText} from '../UI/CustomText';
import {InfoIcon, SendIcon} from '../Icons';
import {TextInput} from 'react-native-paper';

const ChatBotBottomDrawerModule = () => {
  const [activeTab, setActiveTab] = useState('Chat');
  const [message, setMessage] = useState('');

  return (
    <View>
      <View style={styles.tabHeader}>
        <TouchableOpacity
          onPress={() => setActiveTab('Chat')}
          style={
            activeTab === 'Chat'
              ? styles.activeTabStyle
              : styles.nonActiveTabStyle
          }>
          <Text
            style={
              activeTab === 'Chat'
                ? styles.activeTabText
                : styles.nonActiveTabText
            }>
            Chat
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab('History')}
          style={
            activeTab === 'History'
              ? styles.activeTabStyle
              : styles.nonActiveTabStyle
          }>
          <Text
            style={
              activeTab === 'History'
                ? styles.activeTabText
                : styles.nonActiveTabText
            }>
            History
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.tabBody}>
        {activeTab === 'Chat' && (
          <View style={{padding: 10}}>
            <View style={styles.card}>
              <Image
                source={require('../../assets/icons/cgpt-ai-bot-icon.png')}
                style={styles.cgptBotIcon}
              />
              <Text>AI powered answer engine</Text>
            </View>
            <View style={styles.flexCard}>
              <View style={{flex: 1}}>
                <Text style={styles.headText}>CAPABILITIES</Text>
                <Text style={styles.normalText}>
                  Allows user to provide follow-up corrections
                </Text>
                <Text style={styles.normalText}>
                  Remembers what user said earlier in the conversation
                </Text>
              </View>
              <View style={{flex: 1}}>
                <Text style={styles.headText}>LIMITATIONS</Text>
                <Text style={styles.normalText}>
                  Allows user to provide follow-up corrections
                </Text>
                <Text style={styles.normalText}>
                  Remembers what user said earlier in the conversation
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}>
              <NormalText>Choose a searching theme</NormalText>
              <InfoIcon />
            </View>
            <ScrollView
              style={styles.themeContainer}
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              <TouchableOpacity style={styles.flexContainer}>
                <Image
                  source={require('../../assets/icons/assistant-icon.png')}
                />
                <HeadText>General Assistant</HeadText>
              </TouchableOpacity>
              <TouchableOpacity style={styles.flexContainer}>
                <Image
                  source={require('../../assets/icons/smart-contract-generator-icon.png')}
                />
                <HeadText>Smart Contract Generator</HeadText>
              </TouchableOpacity>
            </ScrollView>
            <View>
              <Text>Message*</Text>
              <TextInput
                onChangeText={value => setMessage(value)}
                activeOutlineColor={colors.neutral[600]}
                mode="outlined"
                placeholder="Send a message..."
                dense={true}
                contentStyle={styles.inputContent}
                style={styles.walletNameInput}
                right={() => (
                  <TouchableOpacity>
                    <SendIcon />
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        )}
        {activeTab === 'History' && <View></View>}
      </ScrollView>
    </View>
  );
};

export default ChatBotBottomDrawerModule;

export const styles = StyleSheet.create({
  tabHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'stretch',
    marginVertical: 20,
    borderBottomWidth: 1,
    borderColor: colors.neutral[700],
  },
  flexCard: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    margin: 10,
  },

  flexContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    margin: 10,
    borderWidth: 1,
    borderColor: colors.neutral[800],
    borderRadius: 8,
    padding: 8,
    flex: 1,
  },
  activeTabStyle: {
    fontSize: 18,
    borderBottomColor: colors.neutral[400],
    borderBottomWidth: 2,
    flex: 1,
    flexBasis: '50%',
  },
  activeTabText: {
    color: colors.neutral[100],
    textAlign: 'center',
    padding: 10,
  },
  nonActiveTabText: {
    color: colors.neutral[400],
    textAlign: 'center',
    padding: 10,
  },
  nonActiveTabStyle: {
    fontSize: 18,
    flex: 1,
    flexBasis: '50%',
  },
  card: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cgptBotIcon: {
    height: 100,
  },
  headText: {
    fontSize: 18,
    color: 'white',
    borderStyle: 'dotted',
    borderWidth: 1,
    borderColor: colors.neutral[800],
    margin: 10,
    padding: 8,
    textAlign: 'center',
  },
  normalText: {
    color: colors.neutral[700],
    textAlign: 'center',
    flexWrap: 'wrap',
    marginVertical: 4,
  },
  inputContent: {
    color: 'white',
    borderWidth: 0,
  },
  walletNameInput: {
    backgroundColor: colors.neutral[950],
    borderWidth: 0,
    margin: 10,
  },
  themeContainer: {
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'space-around',
  },
});
