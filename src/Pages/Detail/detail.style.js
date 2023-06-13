import React from 'react';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'orange',
  },
  header: {
    margin: 10,
    padding: 10,
    borderWidth: 5,
    borderStyle: 'dotted',
    borderColor: 'white',
  },
  headerText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
  },
  mainCard: {
    padding: 20,
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 15,
  },
  bottomButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});
