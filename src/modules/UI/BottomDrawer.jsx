import React from 'react';
import {View} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import colors from '../../utils/theme/colors';

const BottomDrawer = React.forwardRef((props, refRBSheet) => {
  return (
    <View>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={props.doNotCloseOnDragDown ? false : true}
        closeOnPressMask={props.doNotCloseOnDragDown ? false : true}
        onClose={props.onClose ? props.onClose() : null}
        height={props.customHeight ? props.customHeight : 280}
        customStyles={{
          wrapper: {
            backgroundColor: props.wrapperBackgroundColor
              ? props.wrapperBackgroundColor
              : 'transparent',
          },
          container: {
            borderColor: props.borderColor
              ? colors.neutral[800]
              : colors.neutral[1000],
            backgroundColor: colors.neutral[1000],
            borderWidth: 1,
            borderTopLeftRadius: props.borderRadius ? 20 : 0,
            borderTopRightRadius: props.borderRadius ? 20 : 0,
          },
          draggableIcon: {
            backgroundColor: colors.neutral[600],
          },
        }}>
        {props.children}
      </RBSheet>
    </View>
  );
});
export default BottomDrawer;
