import React from 'react';
import {View, Text} from 'react-native';
import styles from './messageCard.style';

export default function MessageCard({userName, content, date}) {
  return (
    <View >
      <View style={styles.card_header}>
        <Text style={styles.textLeft}>{userName}</Text>

        <Text style={styles.textRight}>{date}</Text>
      </View>
      <View>
        <Text>{content}</Text>
      </View>
    </View>
  );
}
