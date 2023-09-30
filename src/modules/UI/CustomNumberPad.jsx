import React, {useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import colors from '../../utils/theme/colors';

const CustomNumberPad = ({onChange}) => {
  const [amount, setAmount] = useState([]);
  const renderNumberButtons = () => {
    const numbers = [
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '.',
      '0',
      '<',
    ];
    return numbers.map(number => (
      <TouchableOpacity
        key={number}
        style={styles.button}
        onPress={() => {
          if (number === '<') {
            let num = [...amount];
            num.pop();
            onChange(num.join(''));
            setAmount(num.join(''));
          } else {
            let num = [...amount];
            num.push(number);
            num.join('');
            onChange(num.join(''));
            setAmount(num.join(''));
          }
        }}>
        <Text style={styles.buttonText}>{number}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>{renderNumberButtons().slice(0, 3)}</View>
      <View style={styles.row}>{renderNumberButtons().slice(3, 6)}</View>
      <View style={styles.row}>{renderNumberButtons().slice(6, 9)}</View>
      <View style={styles.row}>{renderNumberButtons().slice(9, 12)}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    gap: 4,
  },
  button: {
    width: 100,
    height: 60,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
  },
});

export default CustomNumberPad;
