import React from 'react';
import {StyleSheet, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Modal from 'react-native-modal';

import {
  CloseModal,
  ConfirmButton,
  ConfirmButtonText,
  ModalBody,
  ModalContainer,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from './styles';

interface ModalProps {
  title: string;
  visible: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  disableConfirmButton?: boolean;
  closeOnConfirm?: boolean;
}

const ReactModal: React.FC<ModalProps> = ({
  children,
  title,
  visible,
  disableConfirmButton,
  closeOnConfirm,
  onClose,
  onConfirm,
}) => {
  return (
    <Modal
      style={styles.modal}
      backdropTransitionOutTiming={0}
      isVisible={visible}
      animationOut="slideOutDown"
      statusBarTranslucent
      onBackdropPress={onClose}>
      <ModalContainer>
        <ModalContent behavior="padding">
          <ModalHeader>
            <ModalTitle>{title}</ModalTitle>

            <CloseModal onPress={onClose}>
              <Feather name="x" size={26} />
            </CloseModal>
          </ModalHeader>
          <ModalBody>{children}</ModalBody>
          {!!onConfirm && (
            <ModalFooter>
              <ConfirmButton
                onPress={
                  closeOnConfirm
                    ? () => {
                        onConfirm();
                        onClose();
                      }
                    : onConfirm
                }
                {...{
                  disabled:
                    disableConfirmButton === undefined
                      ? true
                      : disableConfirmButton,
                }}>
                <View accessible>
                  <ConfirmButtonText>Confirmar</ConfirmButtonText>
                </View>
              </ConfirmButton>
            </ModalFooter>
          )}
        </ModalContent>
      </ModalContainer>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
  },
});

export default ReactModal;
