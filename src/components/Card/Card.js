import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './card.style';
export default function Card({navigation, name}) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate('Detail', {otherParam: name.id, roomName: name.oda})
      }>
      <Text style={styles.cardText}>{name.oda}</Text>
    </TouchableOpacity>
  );
}
