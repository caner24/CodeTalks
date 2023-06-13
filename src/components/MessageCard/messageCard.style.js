import React from 'react';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  card_header: {
    display: 'flex',
    flexDirection: 'row',
  },
  textLeft: {
    textAlign: 'left',
    width: '50%',
  },
  textRight: {
    width: '50%',
    textAlign: 'right',
  },
  bottomButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});
