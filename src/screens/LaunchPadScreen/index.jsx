import React, {useState} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Platform,
  StyleSheet,
  Dimensions,
  Text,
} from 'react-native';
import {ArrowLeftIcon, ArrowRightIcon, BellIcon} from '../../modules/Icons';
import colors from '../../utils/theme/colors';
import {HeaderComponent} from '../../modules';
import {HeadText, NormalText} from '../../modules/UI/CustomText';
import {BottomTabNavigation} from '../../modules';
import CalenderPicker from 'react-native-calendar-picker';
import {TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

const LaunchPadScreen = () => {
  const [selectedDate, setSelectedDate] = useState('');

  const navigation = useNavigation();

  const minDate = new Date(); // Today
  const maxDate = new Date(2017, 6, 3);

  return (
    <View style={styles.root}>
      <HeaderComponent>
        <View style={styles.navbar}>
          <TouchableOpacity
            style={styles.logoContainer}
            onPress={() => navigation.navigate('LandingScreen')}>
            <Image
              source={require('../../assets/screensLogo/launchpad-logo.png')}
              style={styles.logo}
            />
            <Text>Launch Pad</Text>
          </TouchableOpacity>
          <View style={styles.userAvatar}>
            <TouchableOpacity>
              <BellIcon />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={require('../../assets/photo-mask.png')}
                style={styles.userProfile}
              />
            </TouchableOpacity>
          </View>
        </View>
      </HeaderComponent>
      <View style={styles.bodyContainer}>
        <View>
          <TextInput
            style={styles.textInput}
            placeholder="Search"
            placeholderTextColor="gray"
            theme={{
              colors: {
                primary: 'white',
                background: 'transparent',
                text: 'black',
              },
            }}
            right={() => <Icon name="search" size={20} color="black" />}
          />
        </View>
        <CalenderPicker
          startFromMonday={true}
          minDate={minDate}
          maxDate={maxDate}
          previousTitle={
            <View style={styles.arrowLeftIcon}>
              <ArrowLeftIcon />
            </View>
          }
          nextTitle={
            <View style={styles.arrowRightIcon}>
              <ArrowRightIcon />
            </View>
          }
          previousTitleStyle={styles.previousTitleStyle}
          nextTitleStyle={styles.nextTitleStyle}
          textStyle={styles.calenderTextStyle}
          todayBackgroundColor={colors.pink[600]}
          selectedDayColor={colors.neutral[100]}
          selectedDayTextColor={colors.neutral[200]}
          onDateChange={(date, type) => console.log(date, 'date')}
          changeDate={date => console.log(date)}
          onPress={date => console.log(date, 'date')}
        />
        <NormalText>Date: {selectedDate}</NormalText>
      </View>
      <BottomTabNavigation />
    </View>
  );
};

export default LaunchPadScreen;

export const styles = StyleSheet.create({
  root: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    backgroundColor: colors.neutral[950],
    position: 'relative',
  },
  userAvatar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userProfile: {
    width: 30,
    height: 30,
    marginLeft: 10,
    borderRadius: 4,
  },
  flexContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    // borderTopWidth: 1,
    borderBottomColor: colors.neutral[800],
    borderTopColor: colors.neutral[800],
    paddingVertical: 16,
    paddingHorizontal: 10,
  },
  logo: {
    width: 20,
    height: 20,
    marginRight: 10,
    objectFit: 'contain',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bodyContainer: {
    padding: 10,
    position: 'relative',
    top: Platform.OS === 'ios' ? 120 : 80,
  },
  previousTitleStyle: {
    color: colors.neutral[400],
  },
  nextTitleStyle: {
    color: colors.neutral[400],
  },
  calenderTextStyle: {
    color: colors.neutral[200],
  },
  arrowLeftIcon: {
    backgroundColor: colors.neutral[900],
    borderRadius: 4,
    padding: 6,
  },
  arrowRightIcon: {
    backgroundColor: colors.neutral[900],
    borderRadius: 4,
    padding: 6,
  },
});
