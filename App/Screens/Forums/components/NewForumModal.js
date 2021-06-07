import React, {useCallback, useEffect} from 'react';
import {View, Modal, StyleSheet, Text, useWindowDimensions} from 'react-native';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {useForm} from 'react-hook-form';
import {Input} from '../../../common/Input';
import {useDispatch} from 'react-redux';
import * as firebaseService from '../../../api/firebaseService';
import {extractErrorMessage} from '../../../utils/utils';

export const NewForumModal = ({userId, modalVisible, setModalVisible}) => {
  const width = useWindowDimensions().width;
  const {control, handleSubmit, reset, formState} = useForm();
  const dispatch = useDispatch();

  const TitleInput = {
    input: {
      placeholder: 'Forum name',
      textContentType: 'name',
      width: width * 0.8,
      name: 'forumName',
      control,
      rules: {
        required: 'This field is required',
        minLength: {value: 6, message: 'Not achieved min length 6'},
        maxLength: {value: 30, message: 'Exceeded max length 30'},
      },
    },
  };

  const DescriptionInput = {
    input: {
      placeholder: 'Description',
      textContentType: 'name',
      width: width * 0.8,
      name: 'description',
      control,
      rules: {
        required: 'This field is required',
        minLength: {value: 10, message: 'Not achieved min length 10'},
      },
      multiline: true,
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
            <Input inputConfig={TitleInput} />
            <Input inputConfig={DescriptionInput} />
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
              color="#3AD900"
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
    backgroundColor: '#EBEBEB',
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
