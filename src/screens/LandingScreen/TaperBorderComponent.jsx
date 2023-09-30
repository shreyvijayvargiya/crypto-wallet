const {StyleSheet, View} = require('react-native');

const TaperedBorder = () => {
  return (
    <View style={styles.octagon}>
      <View style={[styles.octagonUp, styles.octagonBar]} />
      <View style={[styles.octagonFlat, styles.octagonBar]} />
      <View style={[styles.octagonLeft, styles.octagonBar]} />
      <View style={[styles.octagonRight, styles.octagonBar]} />
    </View>
  );
};

export default TaperedBorder;

const styles = StyleSheet.create({
  octagon: {
    margin: 40,
  },
  octagonBar: {
    width: 42,
    height: 100,
    backgroundColor: 'red',
  },
  octagonUp: {},
  octagonFlat: {
    position: 'absolute',
    top: 0,
    left: 0,
    transform: [{rotate: '90deg'}],
  },
  octagonLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
    transform: [{rotate: '-45deg'}],
  },
  octagonRight: {
    position: 'absolute',
    top: 0,
    left: 0,
    transform: [{rotate: '45deg'}],
  },
});
