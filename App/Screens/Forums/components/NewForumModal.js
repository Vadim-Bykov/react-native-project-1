import React, {useState} from 'react';
import {View, Modal, StyleSheet, Text, useWindowDimensions} from 'react-native';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {useDispatch, useSelector} from 'react-redux';
import * as selectors from '../../../store/common/selectors';
import * as actions from '../../../store/common/actions';

export const NewForumModal = () => {
  const modalVisible = useSelector(selectors.getModalVisible);
  const dispatch = useDispatch();
  // const [modalVisible, setModalVisible] = useState(false);
  const width = useWindowDimensions().width;

  const onClose = () => {
    // setModalVisible(!modalVisible);
    dispatch(actions.setModalVisible(false))
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={{...styles.modalView, width: 0.9 * width}}>
          <Icon name="error" type="material" color="red" size={28} />
          <Text style={styles.modalText}>{'errorMessage'}</Text>
          <Icon
            name="close"
            type="simple-line-icon"
            color="#888888"
            onPress={onClose}
            iconStyle={styles.iconClose}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 15,
    zIndex: 1,
  },
  modalView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  modalText: {
    flex: 1,
    marginHorizontal: 10,
  },
  iconClose: {
    backgroundColor: '#DDDDDD',
    borderRadius: 13,
  },
});
