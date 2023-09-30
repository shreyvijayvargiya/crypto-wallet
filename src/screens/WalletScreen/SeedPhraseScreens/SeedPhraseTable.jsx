import React from 'react';
import {StyleSheet, View} from 'react-native';
import {NormalText} from '../../../modules/UI/CustomText';
import colors from '../../../utils/theme/colors';

const SeedPhraseTable = ({seedPhrase, show}) => {
  const data = seedPhrase?.split(' ');
  const renderTable = (startIndex, endIndex) => {
    const tableRows = [];
    for (let i = startIndex; i <= endIndex; i++) {
      tableRows.push(
        <View key={i} style={styles.tableRow}>
          <View style={styles.indexCell}>
            <NormalText isCenter>{i + 1}</NormalText>
          </View>
          <NormalText style={styles.cell}>{show ? data[i] : '****'}</NormalText>
        </View>,
      );
    }
    return tableRows;
  };
  return (
    <View style={styles.container}>
      <View style={styles.tableContainer}>
        <View style={styles.column}>{renderTable(0, 5)}</View>
        <View style={styles.column}>{renderTable(6, 11)}</View>
      </View>
    </View>
  );
};
export default SeedPhraseTable;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    alignSelf: 'center',
    width: '100%',
  },
  tableContainer: {
    flexDirection: 'row',
    borderWidth: 0,
    borderColor: colors.neutral[400],
  },
  column: {
    borderWidth: 0,
    borderColor: colors.neutral[400],
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.neutral[400],
  },
  cell: {
    textAlign: 'left',
    color: 'white',
    width: 120,
    paddingLeft: 20,
  },
  indexCell: {
    width: 40,
    fontSize: 12,
    paddingVertical: 8,
    color: colors.neutral[400],
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderRightWidth: 1,
    borderRightColor: colors.neutral[100],
  },
});
