import React, {useCallback, useEffect} from 'react';
import {View, Modal, StyleSheet, Text, useWindowDimensions} from 'react-native';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {useForm} from 'react-hook-form';
import {Input} from '../../../common/Input';
import {useDispatch} from 'react-redux';
import * as firebaseService from '../../../api/firebaseService';
import {extractErrorMessage} from '../../../utils/utils';
import {ModalInput} from './ModalInput';
import {COLOR_GREEN} from '../../../consts/consts';

export const NewForumModal = ({userId, modalVisible, setModalVisible}) => {
  const {width} = useWindowDimensions();
  const {control, handleSubmit, reset, formState} = useForm();
  const dispatch = useDispatch();

  const TitleInput = {
    icon: {iconName: 'forum-outline', type: 'material-community'},
    input: {
      placeholder: 'Forum name',
      textContentType: 'name',
      width: width * 0.8,
      name: 'forumName',
      control,
      rules: {
        required: 'This field is required',
        validate: value => !!value.trim() || 'No whitespaces',
        minLength: {value: 6, message: 'Not achieved min length 6'},
        maxLength: {value: 30, message: 'Exceeded max length 30'},
      },
      label: 'Name',
    },
  };

  const DescriptionInput = {
    icon: {iconName: 'description', type: 'material'},
    input: {
      placeholder: 'Description',
      textContentType: 'name',
      width: width * 0.8,
      name: 'description',
      control,
      rules: {
        required: 'This field is required',
        validate: value => !!value.trim() || 'Not only spaces',
        minLength: {value: 6, message: 'Not achieved min length 6'},
      },
      multiline: true,
      label: 'Description',
    },
  };

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
      setModalVisible(false);
    }
  }, [formState, reset]);

  const onClose = useCallback(() => {
    setModalVisible(false);
    reset();
  }, []);

  const onSubmit = useCallback(
    ({forumName, description}) => {
      firebaseService.addForum(forumName, description, userId).catch(error => {
        console.error(error);
        dispatch(actions.setError(extractErrorMessage(error)));
      });
    },
    [userId],
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={[styles.modalView, {width: 0.9 * width}]}>
          <View style={styles.content}>
            <Text style={styles.header}>Create a new forum</Text>
            <ModalInput inputConfig={TitleInput} />
            <ModalInput inputConfig={DescriptionInput} />
          </View>

          <View style={styles.buttonContainer}>
            <Icon
              name="close"
              type="antdesign"
              color="red"
              size={28}
              onPress={onClose}
            />
            <Icon
              name="push-outline"
              type="ionicon"
              color={COLOR_GREEN}
              size={28}
              onPress={handleSubmit(onSubmit)}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalView: {
    justifyContent: 'center',
    margin: 20,
    backgroundColor: '#E4E4E4',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  content: {
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    marginTop: 15,
  },
});
