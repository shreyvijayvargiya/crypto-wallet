import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FontAwesomIcon from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {Image, View} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import colors from '../../utils/theme/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommmunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const HomeIcon = ({color, size, style}) => (
  <AntDesignIcon
    name="home"
    style={{...style}}
    size={size ? size : 20}
    color={color ? color : colors.neutral[100]}
  />
);

export const ArrowUpTiltIcon = ({style, color, size}) => (
  <AntDesignIcon
    name="arrowup"
    size={size ? size : 44}
    color={color ? color : colors.neutral[400]}
    {...style}
  />
);
export const CloseIcon = ({style, color, size}) => (
  <AntDesignIcon
    name="close"
    size={size ? size : 20}
    color={color ? color : colors.neutral[400]}
    {...style}
  />
);

export const RefreshIcon = ({style, color, size}) => (
  <EvilIcons
    name="refresh"
    size={size ? size : 28}
    color={color ? color : colors.neutral[200]}
    {...style}
  />
);

export const SearchIcon = ({size, color, style}) => (
  <AntDesignIcon
    name="search1"
    size={size ? size : 24}
    color={color ? color : colors.neutral[400]}
    {...style}
  />
);

export const SwapIcon = ({style, size, color}) => (
  <AntDesignIcon
    name="swap"
    size={size ? size : 44}
    color={color ? color : colors.neutral[400]}
    {...style}
  />
);

export const ConfirmBackupIcon = ({style, color, size}) => (
  <AntDesignIcon
    name="scan1"
    size={size ? size : 24}
    style={{margin: 20, ...style}}
    color={color ? color : 'white'}
  />
);
export const AIIcon = ({color}) => (
  <FontAwesomIcon name="robot" size={14} color={color} />
);

export const GasIcon = ({color, size, style}) => (
  <FontAwesomIcon
    name="gas-pump"
    style={{...style}}
    size={size ? size : 18}
    color={color ? color : colors.neutral[400]}
  />
);

export const TokenIcon = ({color, style}) => (
  <FontAwesomIcon
    name="bitcoin"
    size={14}
    color={color ? color : colors.neutral[400]}
    style={{...style}}
  />
);

export const HistoryIcon = ({color, style}) => (
  <FontAwesomIcon
    name="history"
    size={16}
    color={color ? color : 'white'}
    style={{...style}}
  />
);

export const StakingIcon = ({color}) => (
  <FontAwesomIcon name="coins" size={14} color={color} />
);

export const LaunchPadIcon = () => (
  <FontAwesomIcon name="rocket" size={20} color={colors.neutral[300]} />
);

export const AccountIcon = ({color}) => (
  <AntDesignIcon name="user" size={14} color={color} />
);
export const AddIcon = ({color, size}) => (
  <AntDesignIcon
    name="plus"
    color={color}
    size={size ? size : 18}
    style={{margin: 4}}
  />
);
export const MinusIcon = ({color}) => (
  <AntDesignIcon name="minus" color={color} size={18} style={{margin: 4}} />
);

export const BuyIcon = ({color, size, style}) => (
  <IonIcons
    name="add"
    color={color}
    size={size ? size : 36}
    style={{margin: 8, ...style}}
  />
);

export const EyeIcon = ({color}) => (
  <AntDesignIcon
    name="eyeo"
    color={colors.neutral[500]}
    size={24}
    style={{margin: 8}}
  />
);

export const CameraIcon = () => (
  <FontAwesomIcon name="camera" size={14} color="white" style={{margin: 8}} />
);
export const ImportIcon = () => (
  <AntDesignIcon name="download" size={18} color="white" style={{margin: 8}} />
);

export const ArrowDownIcon = ({style}) => (
  <AntDesignIcon
    name="down"
    size={16}
    color={colors.neutral[600]}
    style={{...style}}
  />
);
export const ArrowRightIcon = ({style, size}) => (
  <AntDesignIcon
    name="arrowright"
    size={size ? size : 16}
    color={colors.neutral[600]}
    style={{...style}}
  />
);

export const ArrowLeftIcon = () => (
  <AntDesignIcon name="arrowleft" size={16} color={colors.neutral[600]} />
);

export const ReceiveIcon = ({style, color, size}) => (
  <MaterialIcons
    name="call-received"
    size={size ? size : 28}
    color={color ? color : 'white'}
    style={{...style}}
  />
);

export const LayersIcon = () => (
  <Feather
    name="layers"
    size={18}
    color={colors.neutral[400]}
    style={{marginRight: 10}}
  />
);

export const MoreDropdownIcon = ({size, style}) => (
  <Feather
    name="more-horizontal"
    size={size ? size : 32}
    color={colors.neutral[400]}
    style={{...style}}
  />
);

export const SendIcon = ({size, color, style}) => (
  <Feather
    name="send"
    size={size ? size : 14}
    style={{margin: 12, ...style}}
    color={color ? color : colors.neutral[400]}
  />
);

export const BellIcon = () => (
  <Feather name="bell" size={18} color={colors.neutral[400]} />
);

export const SuccessfullIcon = () => (
  <IonIcons
    name="checkmark-done-circle-sharp"
    size={60}
    color={colors.green[800]}
  />
);
export const FillHearIcon = ({size, color, style}) => (
  <Entypo
    name="heart"
    size={size ? size : 24}
    color={color ? color : colors.neutral[400]}
    style={{...style}}
  />
);

export const WarningIcon = ({size, color, style}) => (
  <Entypo
    name="warning"
    size={size ? size : 44}
    color={color ? color : colors.yellow[400]}
    style={{...style}}
  />
);

export const NetworkIcon = ({size, color, style}) => (
  <Entypo
    name="network"
    size={14}
    color={color ? color : colors.neutral[400]}
    style={{margin: 12, ...style}}
  />
);

export const HeartIcon = ({style}) => (
  <Entypo
    name="heart-outlined"
    size={24}
    color={colors.neutral[400]}
    style={{margin: 8, ...style}}
  />
);

export const BackIcon = ({style}) => (
  <Feather
    name="arrow-left"
    size={20}
    color={colors.neutral[600]}
    style={{margin: 8, ...style}}
  />
);

export const BrowserIcon = ({style, color}) => (
  <Feather
    name="globe"
    size={20}
    color={color ? color : colors.neutral[600]}
    style={{...style}}
  />
);

export const EmptyNFTIcon = ({style}) => (
  <Image
    source={require('../../assets/images.png')}
    style={{width: 40, height: 40, margin: 10, ...style}}
  />
);

export const WalletIcon = ({style, size, color}) => (
  <Entypo
    name="wallet"
    size={size ? size : 16}
    color={color ? color : 'white'}
    style={{...style}}
  />
);

export const StatsIcon = ({style}) => (
  <IonIcons
    name="stats-chart-outline"
    size={14}
    color={colors.neutral[400]}
    style={{margin: 4, ...style}}
  />
);

export const TrendingUp = ({style}) => (
  <Feather
    name="trending-up"
    size={14}
    style={{margin: 4, ...style}}
    color={colors.green[600]}
  />
);

export const ArrrowUpTiltIcon = ({style}) => (
  <Feather
    name="trending-up"
    size={14}
    style={{margin: 4, ...style}}
    color={colors.green[600]}
  />
);

export const SettingsIcon = ({style, color, size}) => (
  <Feather
    name="settings"
    size={size ? size : 16}
    style={{...style}}
    color={color ? color : colors.neutral[400]}
  />
);

export const TransactionsHashIcon = ({style, color, size}) => (
  <Feather
    name="hash"
    size={size ? size : 16}
    style={{...style}}
    color={color ? color : colors.neutral[400]}
  />
);

export const HelpIcon = ({style}) => (
  <Feather
    name="help-circle"
    size={18}
    style={{margin: 4}}
    color={colors.neutral[400]}
    style={{...style}}
  />
);

export const InfoIcon = ({style, color, size}) => (
  <Feather
    name="info"
    size={size ? size : 14}
    style={{margin: 12, ...style}}
    color={color ? color : colors.neutral[400]}
  />
);

export const TrendingDown = ({style}) => (
  <Feather
    name="trending-down"
    size={12}
    style={{marginRight: 8, ...style}}
    color={colors.red[600]}
  />
);

export const CopyIcon = ({style, size, color}) => (
  <IonIcons
    name="copy-outline"
    size={size ? size : 14}
    color={color ? color : colors.neutral[400]}
    style={{marginHorizontal: 4, ...style}}
  />
);

export const ErrorInfoIcon = ({style, color, size}) => (
  <MaterialIcons
    name="error-outline"
    size={size ? size : 44}
    color={color ? color : colors.red[400]}
    {...style}
  />
);
