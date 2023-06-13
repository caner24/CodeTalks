import React, {useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import styles from './detail.style';
import database from '@react-native-firebase/database';
import MessageCard from '../../components/MessageCard/MessageCard';
import ButtomModal from '../../components/BottomModal/ButtomModal';
import {useSelector} from 'react-redux';
import ParseContentData from '../../utils/ParseContentData';
export default function Detail({navigation, route}) {
  const [data, setData] = useState([]);
  const [userNames, setUserNames] = useState([]);
  const favJob = useSelector(state =>
    state.userList[0].email.substring(0, state.userList[0].email.indexOf('@')),
  );

  useEffect(() => {
    database()
      .ref(`odalar/${route.params.otherParam}/detay`)
      .on('value', snapshot => {
        const contentData = snapshot.val();
        const parsedData = ParseContentData(contentData || {});
        setData(parsedData);
      });
    setUserNames(favJob);
  }, []);
  const renderContent = ({item}) => (
    <View style={styles.mainCard}>
      <MessageCard
        content={item.text}
        date={item.date}
        userName={item.id.substring(0, item.id.indexOf('_'))}
      />
    </View>
  );
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {route.params.roomName} odasi kuruldu !.
        </Text>
      </View>

      <FlatList data={data} renderItem={renderContent} />

      <View style={styles.bottomButton}>
        <ButtomModal
          style={'detail'}
          userName={userNames}
          id={route.params.otherParam}
        />
      </View>
    </View>
  );
}
