import React from 'react';
import {Button} from 'react-native';
export default function CustomButton({color, title, disabled, onPress}) {
  return (
    <Button
      color={color}
      title={title}
      disabled={disabled}
      onPress={onPress}></Button>
  );
}
