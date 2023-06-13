import React, {useState} from 'react';
import {Alert, Modal, Text, TextInput, Pressable, View} from 'react-native';
import styles from './buttomModal.style';
import database from '@react-native-firebase/database';
const ButtomModal = ({style = null, userName = null, id = null}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [textValue, setText] = useState(null);
  const newReference = database().ref('/users').push();

  function setContent() {
    if (textValue != null) {
      database()
        .ref(`/odalar/${newReference.key}`)
        .set({
          oda: textValue,
          odayiKuran: 'caner24',
          kurulmaTarihi: new Date().toJSON(),
        })
        .then(() => console.log('Data set.'));
    }
    setText(null);
    setModalVisible(!modalVisible);
  }
  function setContentDetail() {
    if (textValue != null) {
      const newReferenceId = new Date().getTime();
      database()
        .ref(`/odalar/${id}/detay/${userName + '_' + newReferenceId}`)
        .set({
          date: new Date().toJSON(),
          text: textValue,
        })
        .then(() => console.log('Data set.'));
    }
    setText(null);
    setModalVisible(!modalVisible);
  }
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              placeholder="BURAYA YAZABİLİRSİN !."
              style={styles.modalText}
              onChangeText={value => setText(value)}></TextInput>
            <Pressable
              style={[styles.buttonClose]}
              onPress={style === 'detail' ? setContentDetail : setContent}>
              <Text style={styles.textStyle2}>Gönder</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>+</Text>
      </Pressable>
    </View>
  );
};

export default ButtomModal;
