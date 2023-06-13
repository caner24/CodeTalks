import React, {useState, useEffect} from 'react';
import {View, Text, FlatList} from 'react-native';
import Card from '../../components/Card/Card';
import styles from './main.style';
import ButtomModal from '../../components/BottomModal/ButtomModal';
import database from '@react-native-firebase/database';
import ParseContentData from '../../utils/ParseContentData';
export default function Main({navigation}) {
  const [data, setData] = useState(null);
  useEffect(() => {
    database()
      .ref('odalar/')
      .on('value', snapshot => {
        const contentData = snapshot.val();
        const parsedData = ParseContentData(contentData || {});
        setData(parsedData);
      });
  }, []);

  const renderContent = ({item}) => (
    <Card navigation={navigation} name={item} />
  );
  return (
    <View style={styles.container}>
      <FlatList
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: 'space-evenly',
          alignItems: 'stretch',
          margin: 5,
        }}
        horizontal={false}
        data={data}
        renderItem={renderContent}
      />
      <View style={styles.bottomButton}>
        <ButtomModal />
      </View>
    </View>
  );
}
