import React from 'react';
import {TextInput} from 'react-native';
import styles from './input.style';
export default function Input({
  value,
  onChangeText,
  onBlur,
  placeholder,
  secureTextEntry,
}) {
  return (
    <TextInput
      style={styles.Input}
      value={value}
      onChangeText={onChangeText}
      onBlur={onBlur}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}></TextInput>
  );
}
